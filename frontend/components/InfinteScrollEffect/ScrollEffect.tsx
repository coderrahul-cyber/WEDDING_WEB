"use client";

import React, { useRef, useState, useEffect, useCallback, JSX } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import "./scroll.css"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

// A tuple representing [R, G, B]
type RGBColor = [number, number, number];

interface ColorPalette {
  c1: RGBColor;
  c2: RGBColor;
}

interface CarouselItem {
  el: HTMLElement;
  x: number;
}

interface LayoutState {
  CARD_W: number;
  CARD_H: number;
  STEP: number;
  TRACK: number;
  VW_HALF: number;
}

interface TimeState {
  lastTime: number;
  lastBgDraw: number;
}

interface GradientState {
  palette: ColorPalette[];
  current: {
    r1: number; g1: number; b1: number;
    r2: number; g2: number; b2: number;
  };
  fastUntil: number;
}

interface DragState {
  dragging: boolean;
  lastX: number;
  lastT: number;
  lastDelta: number;
}

interface VisibleCard {
  item: CarouselItem;
  screenX: number;
  index: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const IMAGES: string[] = [
  '/assets/img/img1.jpg',
  '/assets/img/img2.jpg',
  '/assets/img/img3.jpg',
  '/assets/img/img4.webp',
  '/assets/img/img5.jpg',
  '/assets/img/img6.jpg',
  '/assets/img/img7.jpg',
  '/assets/img/img8.jpg',
  // '/assets/img/img09.webp',
  // '/assets/img/img10.webp',
  '/assets/img/me.mp4' // Video file
];

// Physics constants
const FRICTION = 0.9;
const WHEEL_SENS = 0.6;
const DRAG_SENS = 1.0;

// Visual constants
const MAX_ROTATION = 28;
const MAX_DEPTH = 140;
const MIN_SCALE = 0.92;
const SCALE_RANGE = 0.1;
const GAP = 28;

// ============================================================================
// PURE UTILITY FUNCTIONS
// ============================================================================

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      default: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): RGBColor {
  h = ((h % 360) + 360) % 360;
  h /= 360;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// ============================================================================
// REACT COMPONENT
// ============================================================================

export default function InfiniteCarousel(): JSX.Element {
  // DOM Refs
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardsRootRef = useRef<HTMLDivElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const cardElementsRef = useRef<HTMLElement[]>([]);

  // State
  const [isEntering, setIsEntering] = useState<boolean>(true);

  // State Refs
  const itemsRef = useRef<CarouselItem[]>([]);
  const positionsRef = useRef<Float32Array | null>(null);
  const activeIndexRef = useRef<number>(-1);
  const bgCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // Layout Refs
  const layoutRef = useRef<LayoutState>({
    CARD_W: 300,
    CARD_H: 400,
    STEP: 328,
    TRACK: 0,
    VW_HALF: 0,
  });
  
  // Physics Refs
  const vXRef = useRef<number>(0);
  const scrollXRef = useRef<number>(0);
  
  // Animation Refs
  const rafIdRef = useRef<number | null>(null);
  const bgRafIdRef = useRef<number | null>(null);
  const timeRef = useRef<TimeState>({ lastTime: 0, lastBgDraw: 0 });
  
  // Gradient Refs
  const gradientRef = useRef<GradientState>({
    palette: [],
    current: { r1: 240, g1: 240, b1: 240, r2: 235, g2: 235, b2: 235 },
    fastUntil: 0,
  });

  // Drag State Ref
  const dragStateRef = useRef<DragState>({
    dragging: false,
    lastX: 0,
    lastT: 0,
    lastDelta: 0,
  });

  // ==========================================================================
  // CORE FUNCTIONS (wrapped in useCallback)
  // ==========================================================================

  const preloadImageLinks = useCallback((srcs: string[]) => {
    if (!document.head) return;
    srcs.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = href.endsWith('.mp4') ? 'video' : 'image';
      link.href = href;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });
  }, []);

  const waitForMedia = useCallback((): Promise<void[]> => {
    const promises = itemsRef.current.map((it) => {
      const media = it.el.querySelector('img, video');
      if (!media) return Promise.resolve();

      if (media.tagName === 'IMG') {
        const img = media as HTMLImageElement;
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          const done = () => resolve();
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        });
      }

      if (media.tagName === 'VIDEO') {
        const vid = media as HTMLVideoElement;
        if (vid.readyState >= 2) return Promise.resolve(); // HAVE_CURRENT_DATA
        return new Promise<void>((resolve) => {
          const done = () => resolve();
          vid.addEventListener('loadeddata', done, { once: true });
          vid.addEventListener('error', done, { once: true });
        });
      }
      
      return Promise.resolve();
    });
    return Promise.all(promises);
  }, []);
  
  const decodeAllImages = useCallback(async (): Promise<void> => {
    const tasks = itemsRef.current.map((it) => {
      const img = it.el.querySelector('img') as HTMLImageElement | null;
      if (!img) return Promise.resolve();
      if (typeof img.decode === 'function') {
        return img.decode().catch(() => {});
      }
      return Promise.resolve();
    });
    await Promise.allSettled(tasks);
  }, []);

  const fallbackFromIndex = useCallback((idx: number): ColorPalette => {
    const h = (idx * 37) % 360;
    const s = 0.65;
    const c1 = hslToRgb(h, s, 0.52);
    const c2 = hslToRgb(h, s, 0.72);
    return { c1, c2 };
  }, []);

  const extractColors = useCallback((img: HTMLImageElement, idx: number): ColorPalette => {
    try {
      const MAX = 48;
      const ratio = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;
      const tw = ratio >= 1 ? MAX : Math.max(16, Math.round(MAX * ratio));
      const th = ratio >= 1 ? Math.max(16, Math.round(MAX / ratio)) : MAX;

      const canvas = document.createElement('canvas');
      canvas.width = tw;
      canvas.height = th;
      const ctx = canvas.getContext('2d');
      if (!ctx) return fallbackFromIndex(idx);
      
      ctx.drawImage(img, 0, 0, tw, th);
      const data = ctx.getImageData(0, 0, tw, th).data;

      const H_BINS = 36;
      const S_BINS = 5;
      const SIZE = H_BINS * S_BINS;
      const wSum = new Float32Array(SIZE);
      const rSum = new Float32Array(SIZE);
      const gSum = new Float32Array(SIZE);
      const bSum = new Float32Array(SIZE);

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3] / 255;
        if (a < 0.05) continue;

        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const [h, s, l] = rgbToHsl(r, g, b);

        if (l < 0.1 || l > 0.92 || s < 0.08) continue;

        const w = a * (s * s) * (1 - Math.abs(l - 0.5) * 0.6);
        const hi = Math.max(0, Math.min(H_BINS - 1, Math.floor((h / 360) * H_BINS)));
        const si = Math.max(0, Math.min(S_BINS - 1, Math.floor(s * S_BINS)));
        const bidx = hi * S_BINS + si;

        wSum[bidx] += w;
        rSum[bidx] += r * w;
        gSum[bidx] += g * w;
        bSum[bidx] += b * w;
      }

      let pIdx = -1, pW = 0;
      for (let i = 0; i < SIZE; i++) {
        if (wSum[i] > pW) {
          pW = wSum[i];
          pIdx = i;
        }
      }

      if (pIdx < 0 || pW <= 0) return fallbackFromIndex(idx);

      const pHue = Math.floor(pIdx / S_BINS) * (360 / H_BINS);
      let sIdx = -1, sW = 0;

      for (let i = 0; i < SIZE; i++) {
        const w = wSum[i];
        if (w <= 0) continue;
        const h = Math.floor(i / S_BINS) * (360 / H_BINS);
        let dh = Math.abs(h - pHue);
        dh = Math.min(dh, 360 - dh);
        if (dh >= 25 && w > sW) {
          sW = w;
          sIdx = i;
        }
      }

      const avgRGB = (idx: number): RGBColor => {
        const w = wSum[idx] || 1e-6;
        return [
          Math.round(rSum[idx] / w),
          Math.round(gSum[idx] / w),
          Math.round(bSum[idx] / w)
        ];
      };

      const [pr, pg, pb] = avgRGB(pIdx);
      // eslint-disable-next-line prefer-const
      let [h1, s1] = rgbToHsl(pr, pg, pb);
      s1 = Math.max(0.45, Math.min(1, s1 * 1.15));
      const c1 = hslToRgb(h1, s1, 0.5);

      let c2: RGBColor;
      if (sIdx >= 0 && sW >= pW * 0.6) {
        const [sr, sg, sb] = avgRGB(sIdx);
        // eslint-disable-next-line prefer-const
        let [h2, s2] = rgbToHsl(sr, sg, sb);
        s2 = Math.max(0.45, Math.min(1, s2 * 1.05));
        c2 = hslToRgb(h2, s2, 0.72);
      } else {
        c2 = hslToRgb(h1, s1, 0.72);
      }
      return { c1, c2 };
    } catch {
      return fallbackFromIndex(idx);
    }
  }, [fallbackFromIndex]);

  const buildPalette = useCallback(() => {
    gradientRef.current.palette = itemsRef.current.map((it, i) => {
      const img = it.el.querySelector('img') as HTMLImageElement | null;
      if (!img) {
        return fallbackFromIndex(i);
      }
      return extractColors(img, i);
    });
  }, [extractColors, fallbackFromIndex]);

  const setActiveGradient = useCallback((idx: number) => {
    const bgCtx = bgCtxRef.current;
    if (!bgCtx || idx < 0 || idx >= itemsRef.current.length || idx === activeIndexRef.current) return;
    
    activeIndexRef.current = idx;
    const pal = gradientRef.current.palette[idx] || { c1: [240, 240, 240], c2: [235, 235, 235] };
    const to = {
      r1: pal.c1[0], g1: pal.c1[1], b1: pal.c1[2],
      r2: pal.c2[0], g2: pal.c2[1], b2: pal.c2[2],
    };

    gradientRef.current.fastUntil = performance.now() + 800;
    gsap.to(gradientRef.current.current, { ...to, duration: 0.45, ease: 'power2.out' });
  }, []);

  const computeTransformComponents = useCallback((screenX: number) => {
    const { VW_HALF } = layoutRef.current;
    const norm = Math.max(-1, Math.min(1, screenX / VW_HALF));
    const absNorm = Math.abs(norm);
    const invNorm = 1 - absNorm;

    const ry = -norm * MAX_ROTATION;
    const tz = invNorm * MAX_DEPTH;
    const scale = MIN_SCALE + invNorm * SCALE_RANGE;

    return { norm, absNorm, invNorm, ry, tz, scale };
  }, []);

  // Inside ScrollEffect.tsx
const transformForScreenX = useCallback((screenX: number): { transform: string, z: number } => {
  const { ry, tz, scale } = computeTransformComponents(screenX);
  
  // CRITICAL FIX: Calculate half the card width offset.
  const offsetX = layoutRef.current.CARD_W * -0.5;

  return {
      // Apply the card's half-width offset (offsetX) to the calculated screenX position 
      // for perfect centering.
      transform: `translate3d(${screenX + offsetX}px, -50%, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
      z: tz,
  };
}, [computeTransformComponents]);

  const updateCarouselTransforms = useCallback(() => {
    const { TRACK } = layoutRef.current;
    if (TRACK === 0 || !positionsRef.current) return;

    const half = TRACK / 2;
    let closestIdx = -1;
    let closestDist = Infinity;

    for (let i = 0; i < itemsRef.current.length; i++) {
      let pos = itemsRef.current[i].x - scrollXRef.current;
      if (pos < -half) pos += TRACK;
      if (pos > half) pos -= TRACK;
      positionsRef.current[i] = pos;

      const dist = Math.abs(pos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i;
      }
    }

    const prevIdx = mod(closestIdx - 1, itemsRef.current.length);
    const nextIdx = mod(closestIdx + 1, itemsRef.current.length);

    for (let i = 0; i < itemsRef.current.length; i++) {
      const it = itemsRef.current[i];
      const pos = positionsRef.current[i];
      const norm = Math.max(-1, Math.min(1, pos / layoutRef.current.VW_HALF));
      const { transform, z } = transformForScreenX(pos);

      it.el.style.transform = transform;
      it.el.style.zIndex = String(1000 + Math.round(z));

      const isCore = i === closestIdx || i === prevIdx || i === nextIdx;
      const blur = isCore ? 0 : 2 * Math.pow(Math.abs(norm), 1.1);
      it.el.style.filter = `blur(${blur.toFixed(2)}px)`;
    }

    if (closestIdx !== activeIndexRef.current) {
      setActiveGradient(closestIdx);
    }
  }, [transformForScreenX, setActiveGradient]);

  const tick = useCallback((t: number) => {
    const dt = timeRef.current.lastTime ? (t - timeRef.current.lastTime) / 1000 : 0;
    timeRef.current.lastTime = t;

    scrollXRef.current = mod(scrollXRef.current + vXRef.current * dt, layoutRef.current.TRACK);

    const decay = Math.pow(FRICTION, dt * 60);
    vXRef.current *= decay;
    if (Math.abs(vXRef.current) < 0.02) vXRef.current = 0;

    updateCarouselTransforms();
    rafIdRef.current = requestAnimationFrame(tick);
  }, [updateCarouselTransforms]);
  
  const cancelCarousel = useCallback(() => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = null;
  }, []);

  const startCarousel = useCallback(() => {
    cancelCarousel();
    timeRef.current.lastTime = 0;
    rafIdRef.current = requestAnimationFrame((t) => {
      updateCarouselTransforms();
      tick(t);
    });
  }, [tick, updateCarouselTransforms, cancelCarousel]);

  const resizeBG = useCallback(() => {
    const bgCanvas = bgCanvasRef.current;
    const bgCtx = bgCtxRef.current;
    const stage = stageRef.current;
    if (!bgCanvas || !bgCtx || !stage) return;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const w = bgCanvas.clientWidth || stage.clientWidth;
    const h = bgCanvas.clientHeight || stage.clientHeight;
    const tw = Math.floor(w * dpr);
    const th = Math.floor(h * dpr);

    if (bgCanvas.width !== tw || bgCanvas.height !== th) {
      bgCanvas.width = tw;
      bgCanvas.height = th;
      bgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  const drawBackground = useCallback(() => {
    const bgCanvas = bgCanvasRef.current;
    const bgCtx = bgCtxRef.current;
    const stage = stageRef.current;
    if (!bgCanvas || !bgCtx || !stage) return;

    const now = performance.now();
    const minInterval = now < gradientRef.current.fastUntil ? 16 : 33;

    if (now - timeRef.current.lastBgDraw < minInterval) {
      bgRafIdRef.current = requestAnimationFrame(drawBackground);
      return;
    }

    timeRef.current.lastBgDraw = now;
    resizeBG();

    const w = bgCanvas.clientWidth || stage.clientWidth;
    const h = bgCanvas.clientHeight || stage.clientHeight;
    const { current: grad } = gradientRef.current;

    bgCtx.fillStyle = '#f6f7f9';
    bgCtx.fillRect(0, 0, w, h);

    const time = now * 0.0002;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const a1 = Math.min(w, h) * 0.35;
    const a2 = Math.min(w, h) * 0.28;

    const x1 = cx + Math.cos(time) * a1;
    const y1 = cy + Math.sin(time * 0.8) * a1 * 0.4;
    const x2 = cx + Math.cos(-time * 0.9 + 1.2) * a2;
    const y2 = cy + Math.sin(-time * 0.7 + 0.7) * a2 * 0.5;

    const r1 = Math.max(w, h) * 0.75;
    const r2 = Math.max(w, h) * 0.65;

    const g1 = bgCtx.createRadialGradient(x1, y1, 0, x1, y1, r1);
    g1.addColorStop(0, `rgba(${grad.r1},${grad.g1},${grad.b1},0.85)`);
    g1.addColorStop(1, 'rgba(255,255,255,0)');
    bgCtx.fillStyle = g1;
    bgCtx.fillRect(0, 0, w, h);

    const g2 = bgCtx.createRadialGradient(x2, y2, 0, x2, y2, r2);
    g2.addColorStop(0, `rgba(${grad.r2},${grad.g2},${grad.b2},0.70)`);
    g2.addColorStop(1, 'rgba(255,255,255,0)');
    bgCtx.fillStyle = g2;
    bgCtx.fillRect(0, 0, w, h);

    bgRafIdRef.current = requestAnimationFrame(drawBackground);
  }, [resizeBG]);
  
  const cancelBG = useCallback(() => {
    if (bgRafIdRef.current) cancelAnimationFrame(bgRafIdRef.current);
    bgRafIdRef.current = null;
  }, []);
  
  const startBG = useCallback(() => {
    if (!bgCanvasRef.current || !bgCtxRef.current) return;
    cancelBG();
    bgRafIdRef.current = requestAnimationFrame(drawBackground);
  }, [drawBackground, cancelBG]);

  const warmupCompositing = useCallback(async (): Promise<void> => {
    const originalScrollX = scrollXRef.current;
    const stepSize = layoutRef.current.STEP * 0.5;
    const numSteps = Math.ceil(layoutRef.current.TRACK / stepSize);

    for (let i = 0; i < numSteps; i++) {
      scrollXRef.current = mod(originalScrollX + i * stepSize, layoutRef.current.TRACK);
      updateCarouselTransforms();
      if (i % 3 === 0) {
        await new Promise((r) => requestAnimationFrame(r));
      }
    }

    scrollXRef.current = originalScrollX;
    updateCarouselTransforms();
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => requestAnimationFrame(r));
  }, [updateCarouselTransforms]);
  
  const animateEntry = useCallback(async (visibleCards: VisibleCard[]) => {
    await new Promise((r) => requestAnimationFrame(r));
    const tl = gsap.timeline();

    visibleCards.forEach(({ item, screenX }, idx) => {
      const state = { p: 0 };
      const { ry, tz, scale: baseScale } = computeTransformComponents(screenX);

      const START_SCALE = 0.92;
      const START_Y = 40;

      item.el.style.opacity = '0';
      item.el.style.transform =
        `translate3d(${screenX}px,-50%,${tz}px) ` +
        `rotateY(${ry}deg) ` +
        `scale(${START_SCALE}) ` +
        `translateY(${START_Y}px)`;

      tl.to(
        state,
        {
          p: 1,
          duration: 0.6,
          ease: 'power3.out',
          onUpdate: () => {
            const t = state.p;
            const currentScale = START_SCALE + (baseScale - START_SCALE) * t;
            const currentY = START_Y * (1 - t);
            const opacity = t;
            item.el.style.opacity = opacity.toFixed(3);

            if (t >= 0.999) {
              const { transform } = transformForScreenX(screenX);
              item.el.style.transform = transform;
            } else {
              item.el.style.transform =
                `translate3d(${screenX}px,-50%,${tz}px) ` +
                `rotateY(${ry}deg) ` +
                `scale(${currentScale}) ` +
                `translateY(${currentY}px)`;
            }
          },
        },
        idx * 0.05
      );
    });

    await new Promise<void>((resolve) => {
      tl.eventCallback('onComplete', () => resolve());
    });
  }, [computeTransformComponents, transformForScreenX]);

  // ==========================================================================
  // EVENT HANDLERS (for React JSX)
  // ==========================================================================

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    if (isEntering) return;
    e.preventDefault();
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    vXRef.current += delta * WHEEL_SENS * 20;
  }, [isEntering]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isEntering) return;
    if ((e.target as HTMLElement).closest('.frame')) return;

    const stage = stageRef.current;
    if (!stage) return;

    dragStateRef.current = {
      dragging: true,
      lastX: e.clientX,
      lastT: performance.now(),
      lastDelta: 0,
    };
    stage.setPointerCapture(e.pointerId);
    stage.classList.add('dragging');
  }, [isEntering]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const { dragging, lastX, lastT } = dragStateRef.current;
    if (!dragging) return;

    const now = performance.now();
    const dx = e.clientX - lastX;
    const dt = Math.max(1, now - lastT) / 1000;

    scrollXRef.current = mod(scrollXRef.current - dx * DRAG_SENS, layoutRef.current.TRACK);
    
    dragStateRef.current.lastDelta = dx / dt;
    dragStateRef.current.lastX = e.clientX;
    dragStateRef.current.lastT = now;
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const { dragging, lastDelta } = dragStateRef.current;
    if (!dragging) return;
    
    const stage = stageRef.current;
    if (!stage) return;

    dragStateRef.current.dragging = false;
    stage.releasePointerCapture(e.pointerId);
    vXRef.current = -lastDelta * DRAG_SENS;
    stage.classList.remove('dragging');
  }, []);

  // ==========================================================================
  // INITIALIZATION EFFECT (replaces init())
  // ==========================================================================
  
  useEffect(() => {
    const stageEl = stageRef.current;
    const bgCanvas = bgCanvasRef.current;
    if (!stageEl || !bgCanvas) return;
    
    const ctx = bgCanvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    bgCtxRef.current = ctx;
    
    // --- 1. Measure and build items
    cardElementsRef.current = cardElementsRef.current.slice(0, IMAGES.length);
    const sample = cardElementsRef.current[0];
    if (!sample) return;
    
    const r = sample.getBoundingClientRect();
    layoutRef.current.CARD_W = r.width || layoutRef.current.CARD_W;
    layoutRef.current.CARD_H = r.height || layoutRef.current.CARD_H;
    layoutRef.current.STEP = layoutRef.current.CARD_W + GAP;
    layoutRef.current.TRACK = cardElementsRef.current.length * layoutRef.current.STEP;
    layoutRef.current.VW_HALF = window.innerWidth * 0.5;

    itemsRef.current = cardElementsRef.current.map((el, i) => ({
      el,
      x: i * layoutRef.current.STEP,
    }));
    positionsRef.current = new Float32Array(itemsRef.current.length);
    
    // --- 2. Set initial transforms
    updateCarouselTransforms();
    stageEl.classList.add('carousel-mode');

    // --- 3. Resize Handler
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const prevStep = layoutRef.current.STEP || 1;
        const ratio = scrollXRef.current / (itemsRef.current.length * prevStep);
        
        const r = cardElementsRef.current[0]?.getBoundingClientRect();
        if (!r) return;

        layoutRef.current.CARD_W = r.width || layoutRef.current.CARD_W;
        layoutRef.current.CARD_H = r.height || layoutRef.current.CARD_H;
        layoutRef.current.STEP = layoutRef.current.CARD_W + GAP;
        layoutRef.current.TRACK = itemsRef.current.length * layoutRef.current.STEP;
        
        // CRITICAL FIX: Ensure VW_HALF is always updated from the window size
        layoutRef.current.VW_HALF = window.innerWidth * 0.5; 
        
        itemsRef.current.forEach((it, i) => { it.x = i * layoutRef.current.STEP; });

        scrollXRef.current = mod(ratio * layoutRef.current.TRACK, layoutRef.current.TRACK);
        updateCarouselTransforms();
        resizeBG();
      }, 80);
    };
    window.addEventListener('resize', handleResize);

    // --- 4. Visibility Handler
    const handleVisibility = () => {
      if (document.hidden) {
        cancelCarousel();
        cancelBG();
      } else {
        startCarousel();
        startBG();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // --- 5. Async Init Sequence
    const initialize = async () => {
      preloadImageLinks(IMAGES);
      await waitForMedia();
      await decodeAllImages();
      
      itemsRef.current.forEach((it) => {
        const media = it.el.querySelector('img, video');
        if (media) void (media as HTMLElement).offsetHeight;
      });

      buildPalette();
      
      const half = layoutRef.current.TRACK / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      for (let i = 0; i < itemsRef.current.length; i++) {
        let pos = itemsRef.current[i].x - scrollXRef.current;
        if (pos < -half) pos += layoutRef.current.TRACK;
        if (pos > half) pos -= layoutRef.current.TRACK;
        const d = Math.abs(pos);
        if (d < closestDist) {
          closestDist = d;
          closestIdx = i;
        }
      }
      setActiveGradient(closestIdx);

      resizeBG();
      const w = bgCanvas.clientWidth || stageEl.clientWidth;
      const h = bgCanvas.clientHeight || stageEl.clientHeight;
      if (!bgCtxRef.current) return
      bgCtxRef.current.fillStyle = '#f6f7f9';
      bgCtxRef.current.fillRect(0, 0, w, h);

      await warmupCompositing();

      if ('requestIdleCallback' in window) {
        await new Promise((r) => requestIdleCallback(r, { timeout: 100 }));
      }

      startBG();
      await new Promise((r) => setTimeout(r, 100));

      const viewportWidth = window.innerWidth;
      const visibleCards: VisibleCard[] = [];
      for (let i = 0; i < itemsRef.current.length; i++) {
        let pos = itemsRef.current[i].x - scrollXRef.current;
        if (pos < -half) pos += layoutRef.current.TRACK;
        if (pos > half) pos -= layoutRef.current.TRACK;
        if (Math.abs(pos) < viewportWidth * 0.6) {
          visibleCards.push({ item: itemsRef.current[i], screenX: pos, index: i });
        }
      }
      visibleCards.sort((a, b) => a.screenX - b.screenX);

      if (loaderRef.current) loaderRef.current.classList.add('loader--hide');

      await animateEntry(visibleCards);

      setIsEntering(false);
      startCarousel();
    };

    initialize();

    // --- 6. Cleanup
    return () => {
      cancelCarousel();
      cancelBG();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dep array runs this once on mount, like init()

  return (
    <div
      className="stage"
      ref={stageRef}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="cards" id="cards" ref={cardsRootRef}>
        {IMAGES.map((src, i) => (
          <article
            className="card"
            key={src}
            ref={(el: HTMLElement | null) => {
              if (el) cardElementsRef.current[i] = el;
            }}
            style={{ willChange: 'transform' }}
          >
            {src.endsWith('.mp4') ? (
              <video
                className="card__img"
                src={src}
                autoPlay
                muted
                loop
                playsInline
                draggable={false}
              />
            ) : (
              <Image
              width={100}
              height={100}
                className="card__img"
                src={src}
                alt={`Carousel item ${i + 1}`}
                decoding="async"
                loading="eager"
                fetchPriority="high"
                draggable={false}
                unoptimized
              />
            )}
          </article>
        ))}
      </div>
      <canvas id="bg" ref={bgCanvasRef} />
      <div id="loader" ref={loaderRef}>
        <div className="loader__spinner"></div>
      </div>
    </div>
  );
}