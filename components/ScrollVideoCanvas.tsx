"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 299;
const FPS = 30;
const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
const TOTAL_SECONDS_STR = ((TOTAL_FRAMES - 1) / FPS).toFixed(1);
const MAX_CONCURRENT_DOWNLOADS = 12;

function getFrameUrl(index: number, isMobile = false): string {
  const frameNumber = index + 1;
  const padded = String(frameNumber).padStart(4, "0");
  return isMobile
    ? `/frames/mobile/frame_${padded}.webp`
    : `/frames/frame_${padded}.webp`;
}

export default function ScrollVideoCanvas() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scene3DRef = useRef<HTMLDivElement | null>(null);
  const scrubberTrackRef = useRef<HTMLDivElement | null>(null);

  // Direct DOM refs for zero-lag HUD updates without re-renders
  const scrubberFillRef = useRef<HTMLDivElement | null>(null);
  const bufferBarRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);
  const frameBadgeRef = useRef<HTMLSpanElement | null>(null);
  const introOverlayRef = useRef<HTMLDivElement | null>(null);

  // Hardware-accelerated GPU ImageBitmap cache & fallback HTMLImageElement cache
  const bitmapsRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  );
  const loadingSetRef = useRef<Set<number>>(new Set());
  const loadedCountRef = useRef<number>(0);
  const activeDownloadsRef = useRef<number>(0);
  const queueRef = useRef<number[]>([]);
  const pumpLoaderRef = useRef<() => void>(() => {});

  // Pre-computed canvas geometry (eliminates per-frame math overhead)
  const drawGeometryRef = useRef<{
    drawW: number;
    drawH: number;
    baseOffsetX: number;
    baseOffsetY: number;
  }>({ drawW: 0, drawH: 0, baseOffsetX: 0, baseOffsetY: 0 });

  // Physics, frame-rate independent delta time & mouse state
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastRenderedFrameRef = useRef<number>(-1);
  const lastTimestampRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, lastX: 0, lastY: 0 });

  const [canvasReady, setCanvasReady] = useState<boolean>(false);

  // Read scroll progress strictly within this 400vh video track
  const readTrackProgress = useCallback((): number => {
    const track = trackRef.current;
    if (!track) return 0;

    const rect = track.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    if (scrollable <= 0) return 0;

    const raw = -rect.top / scrollable;
    return Math.max(0, Math.min(1, raw));
  }, []);

  // Jump to a given progress ratio (0 to 1) along the video track
  const scrollToProgress = useCallback((progress: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;

    const clamped = Math.max(0, Math.min(1, progress));
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    const targetY = trackTop + clamped * scrollable;

    window.scrollTo({
      top: targetY,
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  // Skip straight to the website content
  const skipToWebsite = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: trackTop + track.offsetHeight,
      behavior: "smooth",
    });
  }, []);

  // Recompute aspect ratio & overscan geometry only on resize
  const updateGeometry = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cw = canvas.width;
    const ch = canvas.height;
    if (!cw || !ch) return;

    const imgAspect = VIDEO_WIDTH / VIDEO_HEIGHT;
    const screenAspect = cw / ch;
    const overscan = 1.05;

    let drawW = cw * overscan;
    let drawH = ch * overscan;

    if (screenAspect > imgAspect) {
      drawH = drawW / imgAspect;
    } else {
      drawW = drawH * imgAspect;
    }

    drawGeometryRef.current = {
      drawW,
      drawH,
      baseOffsetX: (cw - drawW) / 2,
      baseOffsetY: (ch - drawH) / 2,
    };
  }, []);

  // Ultra-fast GPU draw using pre-decoded ImageBitmaps with optimized sub-frame blending
  const drawFrame = useCallback((continuousFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, continuousFrame));
    const baseIndex = Math.floor(clamped);
    const nextIndex = Math.min(TOTAL_FRAMES - 1, baseIndex + 1);
    const blendAlpha = clamped - baseIndex;

    // Retrieve GPU ImageBitmap or fallback Image
    let baseAsset = bitmapsRef.current[baseIndex] || imagesRef.current[baseIndex];

    // Nearest-neighbor fallback if exact frame isn't decoded yet
    if (!baseAsset) {
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = baseIndex - offset;
        const next = baseIndex + offset;
        if (prev >= 0 && (bitmapsRef.current[prev] || imagesRef.current[prev])) {
          baseAsset = bitmapsRef.current[prev] || imagesRef.current[prev];
          break;
        }
        if (next < TOTAL_FRAMES && (bitmapsRef.current[next] || imagesRef.current[next])) {
          baseAsset = bitmapsRef.current[next] || imagesRef.current[next];
          break;
        }
      }
    }

    if (!baseAsset) return;

    const nextAsset = bitmapsRef.current[nextIndex] || imagesRef.current[nextIndex];
    const { drawW, drawH, baseOffsetX, baseOffsetY } = drawGeometryRef.current;

    const parallaxX = mouseRef.current.x * 14;
    const parallaxY = mouseRef.current.y * 9;
    const offsetX = baseOffsetX + parallaxX;
    const offsetY = baseOffsetY + parallaxY;

    // Fast path: if blendAlpha > 0.96 and next frame is available, render next frame directly
    if (nextAsset && blendAlpha >= 0.96) {
      ctx.globalAlpha = 1;
      ctx.drawImage(nextAsset as CanvasImageSource, offsetX, offsetY, drawW, drawH);
      return;
    }

    // Draw primary frame
    ctx.globalAlpha = 1;
    ctx.drawImage(baseAsset as CanvasImageSource, offsetX, offsetY, drawW, drawH);

    // Sub-frame cross-dissolve: blend next frame only when visibly significant (0.04 - 0.96)
    if (
      nextAsset &&
      nextAsset !== baseAsset &&
      blendAlpha > 0.04
    ) {
      ctx.globalAlpha = blendAlpha;
      ctx.drawImage(nextAsset as CanvasImageSource, offsetX, offsetY, drawW, drawH);
      ctx.globalAlpha = 1;
    }
  }, []);

  // Concurrent loader with asynchronous ImageBitmap GPU decoding (off-main-thread)
  const pumpLoader = useCallback(() => {
    while (
      activeDownloadsRef.current < MAX_CONCURRENT_DOWNLOADS &&
      queueRef.current.length > 0
    ) {
      const index = queueRef.current.shift();
      if (index === undefined) break;
      if (bitmapsRef.current[index] || loadingSetRef.current.has(index)) continue;

      loadingSetRef.current.add(index);
      activeDownloadsRef.current += 1;

      const isMobile =
        typeof window !== "undefined" && window.innerWidth <= 768;
      const img = new Image();
      img.src = getFrameUrl(index, isMobile);

      const finish = () => {
        activeDownloadsRef.current = Math.max(0, activeDownloadsRef.current - 1);
        loadingSetRef.current.delete(index);
        pumpLoaderRef.current();
      };

      const onDecoded = (asset: ImageBitmap | HTMLImageElement) => {
        bitmapsRef.current[index] = asset;
        imagesRef.current[index] = img;
        loadedCountRef.current += 1;

        if (bufferBarRef.current) {
          bufferBarRef.current.style.width = `${
            (loadedCountRef.current / TOTAL_FRAMES) * 100
          }%`;
        }
        if (index === 0 || loadedCountRef.current === 1) {
          setCanvasReady(true);
        }
        finish();
      };

      img.onload = () => {
        // Off-thread GPU texture decoding: eliminates UI stutter during drawImage
        if (typeof window !== "undefined" && "createImageBitmap" in window) {
          createImageBitmap(img)
            .then((bitmap) => onDecoded(bitmap))
            .catch(() => onDecoded(img));
        } else if (img.decode) {
          img
            .decode()
            .then(() => onDecoded(img))
            .catch(() => onDecoded(img));
        } else {
          onDecoded(img);
        }
      };

      img.onerror = () => {
        if (isMobile) {
          const fallback = new Image();
          fallback.src = getFrameUrl(index, false);
          fallback.onload = () => {
            if ("createImageBitmap" in window) {
              createImageBitmap(fallback)
                .then((bitmap) => onDecoded(bitmap))
                .catch(() => onDecoded(fallback));
            } else {
              onDecoded(fallback);
            }
          };
          fallback.onerror = () => finish();
          return;
        }
        finish();
      };
    }
  }, []);

  useEffect(() => {
    pumpLoaderRef.current = pumpLoader;
  }, [pumpLoader]);

  // Prioritize downloading frames immediately surrounding current playback position
  const prioritizeAroundFrame = useCallback((centerFrame: number) => {
    const base = Math.round(centerFrame);
    for (let offset = 16; offset >= -4; offset--) {
      const idx = base + offset;
      if (
        idx >= 0 &&
        idx < TOTAL_FRAMES &&
        !bitmapsRef.current[idx] &&
        !loadingSetRef.current.has(idx)
      ) {
        queueRef.current.unshift(idx);
      }
    }
    pumpLoaderRef.current();
  }, []);

  // Initial prioritized queue: frame 0, early frames, keyframes, then remainder
  useEffect(() => {
    const order: number[] = [0];
    for (let i = 1; i < Math.min(24, TOTAL_FRAMES); i++) order.push(i);
    for (let i = 24; i < TOTAL_FRAMES; i += 4) order.push(i);
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (!order.includes(i)) order.push(i);
    }
    queueRef.current = order;
    pumpLoaderRef.current();
  }, []);

  // Interactive scrubber pointer events (drag & click)
  const handleScrubPointer = useCallback(
    (clientX: number) => {
      const scrubber = scrubberTrackRef.current;
      if (!scrubber) return;
      const rect = scrubber.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      scrollToProgress(p, false);
    },
    [scrollToProgress]
  );

  const onScrubberMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleScrubPointer(e.clientX);

    const onMouseMove = (moveEvt: MouseEvent) => {
      handleScrubPointer(moveEvt.clientX);
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onScrubberTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleScrubPointer(e.touches[0].clientX);

      const onTouchMove = (moveEvt: TouchEvent) => {
        if (moveEvt.touches[0]) {
          handleScrubPointer(moveEvt.touches[0].clientX);
        }
      };
      const onTouchEnd = () => {
        window.removeEventListener("touchmove", onTouchMove);
        window.removeEventListener("touchend", onTouchEnd);
      };

      window.addEventListener("touchmove", onTouchMove, { passive: true });
      window.addEventListener("touchend", onTouchEnd);
    }
  };

  // Main 60-120fps continuous animation and render loop with frame-rate independent physics
  useEffect(() => {
    let rafId: number;

    const updateCanvasResolution = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        updateGeometry();
      }
    };

    updateCanvasResolution();
    window.addEventListener("resize", updateCanvasResolution, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    lastTimestampRef.current = performance.now();

    const tick = (timestamp: number) => {
      // Delta-time calculation: ensures identical smooth spring physics across 60Hz, 120Hz, 144Hz monitors
      const dt = Math.min((timestamp - (lastTimestampRef.current || timestamp)) / 1000, 0.08);
      lastTimestampRef.current = timestamp;

      const progress = readTrackProgress();
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // Frame-rate independent exponential smoothing filter (~13.5 lambda for luxurious fluid momentum)
      const decay = 1 - Math.exp(-13.5 * dt);
      const diff = targetFrameRef.current - currentFrameRef.current;

      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * decay;
        prioritizeAroundFrame(currentFrameRef.current);
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      // Smooth mouse parallax damping with delta time
      const mouseDecay = 1 - Math.exp(-10 * dt);
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * mouseDecay;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * mouseDecay;

      if (scene3DRef.current) {
        const rotX = -mouseRef.current.y * 1.5;
        const rotY = mouseRef.current.x * 1.5;
        scene3DRef.current.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg)`;
      }

      // Draw frame to screen
      drawFrame(currentFrameRef.current);
      lastRenderedFrameRef.current = currentFrameRef.current;

      // Instant HUD DOM updates without triggering React renders
      const visualProgress = currentFrameRef.current / (TOTAL_FRAMES - 1);
      const pct = `${(visualProgress * 100).toFixed(2)}%`;

      if (scrubberFillRef.current) scrubberFillRef.current.style.width = pct;
      if (timecodeRef.current) {
        const curSec = (visualProgress * ((TOTAL_FRAMES - 1) / FPS)).toFixed(1);
        timecodeRef.current.textContent = `${curSec}s / ${TOTAL_SECONDS_STR}s`;
      }
      if (frameBadgeRef.current) {
        frameBadgeRef.current.textContent = `F${
          Math.round(currentFrameRef.current) + 1
        }`;
      }

      // Fade out center intro overlay as user scrolls down
      if (introOverlayRef.current) {
        const fade = Math.max(0, 1 - visualProgress * 4.5);
        introOverlayRef.current.style.opacity = fade.toFixed(2);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const bitmaps = bitmapsRef.current;

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateCanvasResolution);
      window.removeEventListener("mousemove", handleMouseMove);

      // Clean up GPU ImageBitmap memory allocations
      bitmaps.forEach((bitmap) => {
        if (bitmap && "close" in bitmap) {
          try {
            bitmap.close();
          } catch {
            // ignore
          }
        }
      });
    };
  }, [drawFrame, prioritizeAroundFrame, readTrackProgress, updateGeometry]);

  return (
    <section
      ref={trackRef}
      aria-label="3D Aerial Campus Tour"
      className="relative w-full bg-black select-none text-white"
      style={{ height: "400vh" }}
    >
      {/* Pinned 100vh Viewport while user scrolls through 299 frames */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
        {/* Instant fallback placeholder while frame 1 is decoded */}
        {!canvasReady && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/frames/frame_0001.webp"
            alt="SHEMFORD Futuristic School Aerial View"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* 3D Perspective Wrapper for Interactive Mouse Tilt */}
        <div ref={scene3DRef} className="w-full h-full will-change-transform">
          <canvas
            ref={canvasRef}
            className="w-full h-full block pointer-events-none"
          />
        </div>

        {/* Subtle cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

        {/* Minimal Center Title Overlay (Fades out automatically as you scroll) */}
        <div
          ref={introOverlayRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-150"
        >
          <span className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold tracking-widest uppercase mb-4">
            3D Interactive Aerial Campus Tour
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-6xl md:text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
            SHEMFORD SAHARANPUR
          </h2>
          <p className="mt-3 text-white/85 text-sm sm:text-base max-w-lg drop-shadow">
            Scroll down to fly through our campus in Village Meharbani, Behat Road
          </p>
        </div>

        {/* Minimal Bottom Scrubber & Skip Button */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl">
          <div
            ref={scrubberTrackRef}
            onMouseDown={onScrubberMouseDown}
            onTouchStart={onScrubberTouchStart}
            className="relative w-32 sm:w-48 h-3 flex items-center cursor-pointer group"
            role="slider"
            aria-label="Timeline scrubber"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <div className="relative w-full h-1.5 group-hover:h-2 transition-all bg-white/20 rounded-full overflow-hidden">
              <div
                ref={bufferBarRef}
                className="absolute inset-y-0 left-0 bg-white/30 rounded-full transition-all duration-300"
                style={{ width: "0%" }}
              />
              <div
                ref={scrubberFillRef}
                className="absolute inset-y-0 left-0 bg-[#FF6B35] rounded-full"
                style={{ width: "0%" }}
              />
            </div>
          </div>

          <span
            ref={timecodeRef}
            className="hidden sm:inline font-mono text-[11px] text-white/70"
          >
            0.0s / {TOTAL_SECONDS_STR}s
          </span>

          <span
            ref={frameBadgeRef}
            className="hidden sm:inline font-mono text-[10px] text-white/50"
          >
            F1
          </span>

          <button
            type="button"
            onClick={skipToWebsite}
            className="ml-1 px-3 py-1 rounded-full bg-[#FF6B35] hover:bg-[#ff8255] text-white text-[11px] font-bold tracking-wide transition-all pointer-events-auto"
          >
            Enter Site ↓
          </button>
        </div>
      </div>
    </section>
  );
}
