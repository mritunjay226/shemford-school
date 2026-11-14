"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 299;
const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;
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
    const overscan = 1.08;

    let drawW: number;
    let drawH: number;

    if (screenAspect > imgAspect) {
      drawW = cw * overscan;
      drawH = drawW / imgAspect;
    } else {
      drawH = ch * overscan;
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

    // Helper to safely render an asset without crashing if ImageBitmap is detached
    const safeDraw = (
      asset: CanvasImageSource | null | undefined,
      x: number,
      y: number,
      w: number,
      h: number,
      alpha: number,
      frameIdx: number
    ): boolean => {
      if (!asset) return false;

      // Fast check for detached ImageBitmap
      if (typeof ImageBitmap !== "undefined" && asset instanceof ImageBitmap) {
        // @ts-expect-error closed property check on ImageBitmap
        if (asset.closed || asset.width === 0 || asset.height === 0) {
          bitmapsRef.current[frameIdx] = null;
          const fallback = imagesRef.current[frameIdx];
          if (fallback && fallback.complete && fallback.naturalWidth > 0) {
            try {
              ctx.globalAlpha = alpha;
              ctx.drawImage(fallback, x, y, w, h);
              return true;
            } catch {
              return false;
            }
          }
          return false;
        }
      }

      if (asset instanceof HTMLImageElement) {
        if (!asset.complete || asset.naturalWidth === 0) return false;
      }

      try {
        ctx.globalAlpha = alpha;
        ctx.drawImage(asset, x, y, w, h);
        return true;
      } catch {
        // If drawImage throws InvalidStateError or detached error, purge bitmap and try fallback image
        bitmapsRef.current[frameIdx] = null;
        const fallback = imagesRef.current[frameIdx];
        if (fallback && fallback !== asset && fallback.complete && fallback.naturalWidth > 0) {
          try {
            ctx.globalAlpha = alpha;
            ctx.drawImage(fallback, x, y, w, h);
            return true;
          } catch {
            return false;
          }
        }
        return false;
      }
    };

    // Fast path: if blendAlpha > 0.96 and next frame is available, render next frame directly
    if (nextAsset && blendAlpha >= 0.96) {
      if (safeDraw(nextAsset as CanvasImageSource, offsetX, offsetY, drawW, drawH, 1, nextIndex)) {
        ctx.globalAlpha = 1;
        return;
      }
    }

    // Draw primary frame
    const baseDrawn = safeDraw(
      baseAsset as CanvasImageSource,
      offsetX,
      offsetY,
      drawW,
      drawH,
      1,
      baseIndex
    );

    // Sub-frame cross-dissolve: blend next frame only when visibly significant (0.04 - 0.96)
    if (
      baseDrawn &&
      nextAsset &&
      nextAsset !== baseAsset &&
      blendAlpha > 0.04
    ) {
      safeDraw(
        nextAsset as CanvasImageSource,
        offsetX,
        offsetY,
        drawW,
        drawH,
        blendAlpha,
        nextIndex
      );
    }
    ctx.globalAlpha = 1;
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

  // Main 60-120fps continuous animation and render loop with frame-rate independent physics
  useEffect(() => {
    let rafId: number;

    const updateCanvasResolution = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round((canvas.clientWidth || window.innerWidth) * dpr);
      const h = Math.round((canvas.clientHeight || window.innerHeight) * dpr);
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

      // Fade out scroll down button as user scrolls down
      const visualProgress = currentFrameRef.current / (TOTAL_FRAMES - 1);
      if (introOverlayRef.current) {
        const fade = Math.max(0, 1 - visualProgress * 4.5);
        introOverlayRef.current.style.opacity = fade.toFixed(2);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateCanvasResolution);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [drawFrame, prioritizeAroundFrame, readTrackProgress, updateGeometry]);

  // Pure hardware-accelerated GPU contrast & saturation filter
  const canvasFilterStyle =
    "contrast(1.15) brightness(1.02) saturate(1.25)";

  return (
    <section
      ref={trackRef}
      aria-label="3D Aerial Campus Tour"
      className="relative w-full bg-black select-none text-white"
      style={{ height: "250vh" }}
    >
      {/* Pinned 100vh Viewport while user scrolls through 299 frames */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden bg-black">
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
            className="w-full h-full block pointer-events-none transition-[filter] duration-300"
            style={{ filter: canvasFilterStyle }}
          />
        </div>

        {/* Layer 1: Fine 35mm Analog Film Grain Texture (Hides pixelation & compression blur) */}
        <div className="absolute inset-0 video-film-grain mix-blend-overlay opacity-65 pointer-events-none" />

        {/* Layer 2: Deep Radial Vignette (Masks peripheral blurring & focuses central lens) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

        {/* Layer 3: Vertical Cinematic Soft Grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />

        {/* =============================================================== */}
        {/* CLEAN MINIMALIST SCROLL DOWN BUTTON                             */}
        {/* =============================================================== */}
        <div
          ref={introOverlayRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-200 pointer-events-auto select-none"
        >
          <button
            type="button"
            onClick={skipToWebsite}
            aria-label="Scroll down to explore campus"
            className="group flex items-center gap-3 px-6 py-3 rounded-full bg-black/65 hover:bg-black/85 backdrop-blur-xl border border-white/20 text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-extrabold tracking-widest uppercase text-white/90 group-hover:text-white">
              Scroll Down
            </span>
            <div className="w-6 h-6 rounded-full bg-[#FF6B35] flex items-center justify-center text-white text-xs font-black shadow-md group-hover:translate-y-0.5 transition-transform animate-bounce">
              ↓
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
