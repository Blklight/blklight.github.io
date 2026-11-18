"use client";

import { useEffect, useRef } from "react";

// 8×8 Bayer matrix: ordered-dither thresholds 0..63.
const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
];

const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// Smooth 2D value noise in [0, 1].
const noise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

interface Props {
  /** Radius of the ink field, in CSS px. */
  radius?: number;
  /** Size of one dither pixel, in CSS px. */
  cell?: number;
  /** Peak density at the center, 0..1. */
  density?: number;
  className?: string;
}

/**
 * 1-bit ordered-dither ink blot that trails the pointer over its parent.
 * Drawn in the canvas' CSS `color`, so callers tint it with a text-* class.
 */
export function DitherSpotlight({
  radius = 160,
  cell = 2,
  density = 0.62,
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let w = 0;
    let h = 0;
    let px = 0;
    let py = 0;
    let x = 0;
    let y = 0;
    let level = 0;
    let target = 0;
    let raf = 0;
    let t = 0;
    // Read once per hover, not per frame: getComputedStyle forces a style recalc.
    let color = "";

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (level < 0.01) return;
      ctx.fillStyle = color;
      const r = radius * (0.85 + 0.15 * level);
      const x0 = Math.max(0, Math.floor((x - r) / cell) * cell);
      const y0 = Math.max(0, Math.floor((y - r) / cell) * cell);
      const x1 = Math.min(w, x + r);
      const y1 = Math.min(h, y + r);
      for (let cy = y0; cy < y1; cy += cell) {
        for (let cx = x0; cx < x1; cx += cell) {
          const dx = (cx - x) / r;
          const dy = (cy - y) / r;
          const d2 = dx * dx + dy * dy;
          if (d2 >= 1) continue;
          const wobble = noise(cx / 38 + t, cy / 38 - t * 0.6);
          const value =
            Math.exp(-d2 * 3.2) * (0.55 + 0.45 * wobble) * density * level;
          const threshold =
            (BAYER8[((cy / cell) & 7) * 8 + ((cx / cell) & 7)] + 0.5) / 64;
          if (value > threshold) ctx.fillRect(cx, cy, cell, cell);
        }
      }
    };

    const tick = () => {
      const still = reduce.matches;
      const follow = still ? 1 : 0.16;
      x += (px - x) * follow;
      y += (py - y) * follow;
      level += (target - level) * (still ? 1 : 0.12);
      if (!still) t += 0.012;
      if (Math.abs(target - level) < 0.005) level = target;
      draw();
      const settled =
        level === 0 || (still && Math.abs(px - x) < 0.5 && level === target);
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      color = getComputedStyle(canvas).color;
      const rect = host.getBoundingClientRect();
      px = x = e.clientX - rect.left;
      py = y = e.clientY - rect.top;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
      if (!color) color = getComputedStyle(canvas).color;
      target = 1;
      kick();
    };
    const onLeave = () => {
      target = 0;
      kick();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [radius, cell, density]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 size-full pointer-events-none opacity-55 [image-rendering:pixelated] ${className ?? ""}`}
    />
  );
}
