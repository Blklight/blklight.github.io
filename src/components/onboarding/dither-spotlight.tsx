"use client";

import { useEffect, useRef } from "react";

// 8×8 Bayer matrix: ordered-dither thresholds 0..63.
const BAYER8 = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36,
  14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54, 22, 3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23,
  61, 29, 53, 21,
];

interface Props {
  radius?: number;
  cell?: number;
  strength?: number;
}

/**
 * Ordered-dither spotlight that follows the pointer over its parent.
 * Drawn in the parent's text color, so it inverts with the card.
 */
export function DitherSpotlight({
  radius = 140,
  cell = 4,
  strength = 0.8,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    let w = 0;
    let h = 0;
    let x = 0;
    let y = 0;
    let level = 0;
    let target = 0;
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (level < 0.01) return;
      ctx.fillStyle = getComputedStyle(canvas).color;
      const dot = Math.max(1, cell / 2);
      const x0 = Math.max(0, Math.floor((x - radius) / cell) * cell);
      const y0 = Math.max(0, Math.floor((y - radius) / cell) * cell);
      for (let cy = y0; cy < Math.min(h, y + radius); cy += cell) {
        for (let cx = x0; cx < Math.min(w, x + radius); cx += cell) {
          const d = Math.hypot(cx - x, cy - y) / radius;
          if (d >= 1) continue;
          const value = (1 - d) ** 2.2 * level * strength;
          const threshold =
            (BAYER8[((cy / cell) & 7) * 8 + ((cx / cell) & 7)] + 0.5) / 64;
          if (value > threshold) ctx.fillRect(cx, cy, dot, dot);
        }
      }
    };

    const tick = () => {
      level += (target - level) * 0.2;
      if (Math.abs(target - level) < 0.01) level = target;
      draw();
      raf = level === target ? 0 : requestAnimationFrame(tick);
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

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const rect = host.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      target = 1;
      if (raf) return;
      if (level === target) draw();
      else kick();
    };
    const onLeave = () => {
      target = 0;
      kick();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [radius, cell, strength]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 size-full pointer-events-none opacity-30"
    />
  );
}
