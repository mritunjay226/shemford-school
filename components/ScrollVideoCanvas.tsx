"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 239;
const FPS = 24;
const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(4, "0");
  return `/frames/frame_${padded}.webp`;
}

export default function ScrollVideoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Cache of loaded HTMLImageElements
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  // Set of frame indices currently being fetched to prevent duplicate network calls
  const loadingSetRef = useRef<Set<number>>(new Set());

  // Animation & scroll state
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const prefersReducedMotionRef = useRef<boolean>(false);

  // React state for subtle HUD
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [hasScrolled, setHasScrolled] = useState<boolean>(false);
  const [initialFrameReady, setInitialFrameReady] = useState<boolean>(false);

  // Draw a specific frame onto the canvas with object-fit: cover scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Check if the requested frame is loaded; if not, find the nearest loaded frame
    let img = imagesRef.current[frameIndex];
    let actualIndex = frameIndex;

    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let found: HTMLImageElement | null = null;
      let minDiff = Infinity;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const diff = Math.abs(i - frameIndex);
          if (diff < minDiff) {
            minDiff = diff;
            found = candidate;
            actualIndex = i;
          }
        }
      }
      img = found;
    }

    if (!img) return; // No frames ready at all yet

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const targetCanvasW = Math.round(viewportWidth * dpr);
    const targetCanvasH = Math.round(viewportHeight * dpr);

    if (canvas.width !== targetCanvasW || canvas.height !== targetCanvasH) {
      canvas.width = targetCanvasW;
      canvas.height = targetCanvasH;
    }

    // High performance 'cover' math
    const imgAspect = VIDEO_WIDTH / VIDEO_HEIGHT;
    const viewAspect = viewportWidth / viewportHeight;

    let drawW = viewportWidth;
    let drawH = viewportHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (viewAspect > imgAspect) {
      // Screen is wider than 16:9
      drawW = viewportWidth;
      drawH = viewportWidth / imgAspect;
      offsetY = (viewportHeight - drawH) / 2;
    } else {
      // Screen is taller than 16:9 (e.g. mobile portrait)
      drawH = viewportHeight;
      drawW = viewportHeight * imgAspect;
      offsetX = (viewportWidth - drawW) / 2;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    // Draw the image
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    ctx.restore();

    lastDrawnFrameRef.current = actualIndex;
  }, []);

  // Request to load a specific frame
  const loadFrame = useCallback((index: number, priority = false): Promise<HTMLImageElement | null> => {
    if (index < 0 || index >= TOTAL_FRAMES) return Promise.resolve(null);
    if (imagesRef.current[index]) return Promise.resolve(imagesRef.current[index]);
    if (loadingSetRef.current.has(index)) return Promise.resolve(null);

    loadingSetRef.current.add(index);

    return new Promise((resolve) => {
      const img = new Image();
      if (priority && "fetchPriority" in img) {
        (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = "high";
      }
      img.src = getFrameUrl(index);
      img.onload = () => {
        imagesRef.current[index] = img;
        loadingSetRef.current.delete(index);
        setLoadedCount((prev) => prev + 1);

        if (index === 0) {
          setInitialFrameReady(true);
        }

        // If the frame just loaded matches our current target, trigger redraw
        const currentTargetInt = Math.round(currentFrameRef.current);
        if (Math.abs(currentTargetInt - index) <= 1) {
          drawFrame(currentTargetInt);
        }
        resolve(img);
      };
      img.onerror = () => {
        loadingSetRef.current.delete(index);
        resolve(null);
      };
    });
  }, [drawFrame]);

  // Main animation render loop using Lerp damping for 60fps/120fps ultra-fluid scrubbing
  const startLoop = useCallback(() => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      // If user prefers reduced motion, snap immediately; otherwise use gentle lerp damping
      const lerpFactor = prefersReducedMotionRef.current ? 1 : 0.14;

      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current = current + diff * lerpFactor;
        const frameToDraw = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );

        if (frameToDraw !== lastDrawnFrameRef.current) {
          // Pre-fetch surrounding frames for instant playback response
          loadFrame(frameToDraw, true);
          loadFrame(Math.min(TOTAL_FRAMES - 1, frameToDraw + 1), true);
          loadFrame(Math.max(0, frameToDraw - 1), true);

          drawFrame(frameToDraw);
        }

        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // Snapped to target
        currentFrameRef.current = target;
        const finalFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(target))
        );
        if (finalFrame !== lastDrawnFrameRef.current) {
          drawFrame(finalFrame);
        }
        isRunningRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [drawFrame, loadFrame]);

  // Initial setup: Load frame 0 immediately and setup scroll listeners
  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined") {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      prefersReducedMotionRef.current = mql.matches;
      const handler = (e: MediaQueryListEvent) => {
        prefersReducedMotionRef.current = e.matches;
      };
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
  }, []);

  // Priority load frame 0 immediately for instant First Paint
  useEffect(() => {
    loadFrame(0, true).then((img) => {
      if (img) {
        drawFrame(0);
      }
    });

    // Next, preload the first 15 frames immediately so initial scrolls are frictionless
    for (let i = 1; i <= 15 && i < TOTAL_FRAMES; i++) {
      loadFrame(i, true);
    }

    // Progressively load all remaining frames in non-blocking background chunks
    let currentBatchIndex = 16;
    const batchSize = 12;

    const loadNextBatch = () => {
      if (currentBatchIndex >= TOTAL_FRAMES) return;

      const endIndex = Math.min(TOTAL_FRAMES, currentBatchIndex + batchSize);
      const promises: Promise<HTMLImageElement | null>[] = [];

      for (let i = currentBatchIndex; i < endIndex; i++) {
        promises.push(loadFrame(i, false));
      }

      currentBatchIndex = endIndex;

      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
          () => {
            setTimeout(loadNextBatch, 30);
          }
        );
      } else {
        setTimeout(loadNextBatch, 60);
      }
    };

    const timer = setTimeout(loadNextBatch, 150);
    return () => clearTimeout(timer);
  }, [loadFrame, drawFrame]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollY / maxScroll)) : 0;

      setScrollProgress(progress);
      if (scrollY > 15 && !hasScrolled) {
        setHasScrolled(true);
      }

      // Calculate target frame
      const targetFrame = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = targetFrame;

      startLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to capture initial position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [startLoop, hasScrolled]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const currentInt = Math.round(currentFrameRef.current);
      drawFrame(currentInt);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Format timestamp helper (e.g. 00:04.2)
  const currentSeconds = (scrollProgress * ((TOTAL_FRAMES - 1) / FPS)).toFixed(1);
  const totalSeconds = ((TOTAL_FRAMES - 1) / FPS).toFixed(1);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: "550vh" }} // 5.5 viewports of scroll real estate for cinematic control
    >
      {/* Sticky / Fixed Canvas Background */}
      <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-cover"
          style={{ willChange: "transform" }}
        />
      </div>

      {/* Subtle initial loading pulse if first frame is preparing */}
      {!initialFrameReady && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white/60 font-mono text-xs tracking-widest uppercase">
              Initializing...
            </span>
          </div>
        </div>
      )}

      {/* Minimalist Floating Bottom Bar / HUD */}
      <aside
        aria-label="Video playback status"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 select-none pointer-events-auto"
      >
        {/* Scroll hint pill - fades away gracefully when scrolling starts */}
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 text-xs font-medium tracking-wide transition-all duration-700 ${
            hasScrolled ? "opacity-0 translate-y-3 pointer-events-none" : "opacity-100 translate-y-0"
          }`}
        >
          <svg
            className="w-3.5 h-3.5 animate-bounce text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span>Scroll to scrub</span>
        </div>

        {/* High-end minimalist scrubber bar */}
        <div className="flex items-center gap-3 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-lg border border-white/10 shadow-2xl transition-all duration-300 hover:bg-black/75">
          {/* Progress bar container */}
          <div className="relative w-36 sm:w-48 h-1.5 bg-white/15 rounded-full overflow-hidden">
            {/* Background preloaded buffer indicator */}
            <div
              className="absolute inset-y-0 left-0 bg-white/20 rounded-full transition-all duration-300"
              style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              title={`Loaded ${loadedCount}/${TOTAL_FRAMES} frames`}
            />
            {/* Active scrub position bar */}
            <div
              className="absolute inset-y-0 left-0 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          {/* Timecode display */}
          <span className="font-mono text-[11px] text-white/70 tabular-nums tracking-tight">
            {currentSeconds}s / {totalSeconds}s
          </span>

          {/* Frame count badge */}
          <span className="hidden sm:inline font-mono text-[10px] text-white/40 tracking-wider">
            F{Math.round(scrollProgress * (TOTAL_FRAMES - 1))}
          </span>
        </div>
      </aside>

      {/* Top hairline progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-white/40 via-white to-white/80 z-30 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  );
}
