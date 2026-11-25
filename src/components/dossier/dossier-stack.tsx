"use client";

import { type ReactNode, useRef, useState } from "react";
import type { DossierSheetData } from "@/features/dossier/types";

const DEPTH = 3;
const VELOCITY_WINDOW = 100;
const FLICK_VELOCITY = 0.45;

/**
 * Sheets held in a pile, after the tally stack: drag the top sheet sideways
 * (it follows the pointer); past a distance or with a flick it is set aside
 * to the left (next) or brought back (prev). Sheets below rise as you drag.
 * `index === sheets.length` shows what lies under the pile (`bottom`).
 */
export function DossierStack<T>({
  sheets,
  index,
  onNext,
  onPrev,
  renderSheet,
  bottom,
  width,
}: {
  sheets: DossierSheetData<T>[];
  index: number;
  onNext: () => void;
  onPrev: () => void;
  renderSheet: (sheet: DossierSheetData<T>, index: number) => ReactNode;
  bottom: ReactNode;
  /** Unscaled sheet width, for thresholds. */
  width: number;
}) {
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const start = useRef<{
    x: number;
    y: number;
    axis: "x" | "y" | null;
    id: number;
    scale: number;
  } | null>(null);
  const samples = useRef<Array<[number, number]>>([]);
  const suppressClick = useRef(false);

  const end = (commit: boolean, at: number) => {
    const s = start.current;
    start.current = null;
    setDragging(false);
    if (!s || s.axis !== "x") return;
    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
    const recent = samples.current.filter(([t]) => at - t <= VELOCITY_WINDOW);
    const distance = samples.current.at(-1)?.[1] ?? dx;
    const [t0, x0] = recent[0] ?? [at, distance];
    const [t1, x1] = recent.at(-1) ?? [at, distance];
    const velocity = recent.length > 1 ? (x1 - x0) / Math.max(1, t1 - t0) : 0;
    const far = Math.abs(distance) > width * 0.18;
    const flick =
      Math.abs(distance) > 16 &&
      Math.abs(velocity) > FLICK_VELOCITY &&
      Math.sign(velocity) === Math.sign(distance);
    setDx(0);
    if (commit && (far || flick)) {
      if (distance < 0) onNext();
      else onPrev();
    }
  };

  const progress = Math.min(1, Math.abs(dx) / width);

  return (
    <div
      className="relative h-full touch-pan-y select-none"
      onPointerDown={(e) => {
        if (
          (e.target as HTMLElement).closest(
            "input, textarea, select, form, [data-no-drag]",
          )
        )
          return;
        const rect = e.currentTarget.getBoundingClientRect();
        start.current = {
          x: e.clientX,
          y: e.clientY,
          axis: null,
          id: e.pointerId,
          scale: rect.width / e.currentTarget.offsetWidth || 1,
        };
        samples.current = [];
      }}
      onPointerMove={(e) => {
        const s = start.current;
        if (!s) return;
        const x = (e.clientX - s.x) / s.scale;
        const y = (e.clientY - s.y) / s.scale;
        if (!s.axis && (Math.abs(x) > 8 || Math.abs(y) > 8)) {
          s.axis = Math.abs(x) > Math.abs(y) * 0.8 ? "x" : "y";
          if (s.axis === "x") {
            setDragging(true);
            try {
              e.currentTarget.setPointerCapture(s.id);
            } catch {
              /* pointer already released */
            }
          }
        }
        if (s.axis === "x") {
          const now = e.timeStamp;
          samples.current = [
            ...samples.current.filter(([t]) => now - t <= VELOCITY_WINDOW),
            [now, x],
          ];
          setDx(x);
        }
      }}
      onPointerUp={(e) => end(true, e.timeStamp)}
      onPointerCancel={(e) => end(false, e.timeStamp)}
      onClickCapture={(e) => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <div className="absolute inset-0">{bottom}</div>
      {sheets.map((sheet, i) => {
        const o = i - index;
        if (o < -1 || o >= DEPTH) return null;
        const gone = o < 0;
        const top = o === 0;
        const d = Math.max(0, o - progress);
        let transform = `translate(${d * 10}px, ${d * 10}px)`;
        if (top) transform = `translateX(${dx}px) rotate(${dx / 50}deg)`;
        if (gone) transform = "translateX(-108%) rotate(-7deg)";
        return (
          <div
            key={sheet.id}
            aria-hidden={top ? undefined : true}
            inert={top ? undefined : true}
            className="absolute inset-0 motion-reduce:!transform-none"
            style={{
              zIndex: gone ? 30 : 20 - o,
              transform,
              transformOrigin: top ? "50% 90%" : "0 0",
              opacity: gone ? 0 : 1,
              filter: `brightness(${1 - d * 0.05}) drop-shadow(2px 3px 4px rgb(0 0 0 / 0.25)) drop-shadow(6px 10px 16px rgb(0 0 0 / 0.2))`,
              transition: dragging
                ? "none"
                : "transform 420ms cubic-bezier(.22,.8,.3,1), opacity 420ms, filter 300ms",
            }}
          >
            {renderSheet(sheet, i)}
          </div>
        );
      })}
    </div>
  );
}
