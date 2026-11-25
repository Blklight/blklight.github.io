"use client";

import { type ReactNode, useRef, useState } from "react";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import type { DossierSheetData } from "@/features/dossier/types";
import { PAPER_GRAINS } from "./document-paper";
import { PANEL_PAD_X } from "./geometry";

const DEPTH = 6;
const STEP = 1.5;
const VELOCITY_WINDOW = 100;
const FLICK_VELOCITY = 0.3;
const TURN_MS = 520;
const EASE = "cubic-bezier(.22,.8,.3,1)";
/** Turned sheets lie on the open cover's back, above it (the cover is z-50). */
const TURNED_Z = 60;
/** Pages turn on the folder's spine, PANEL_PAD_X left of the sheet. */
const SPINE = `-${PANEL_PAD_X}px 50%`;

const turn = (deg: number, x = 0, y = 0) =>
  `translate(${x}px, ${y}px) perspective(2800px) rotateY(${deg}deg)`;

const SHADOW = {
  top: "0 1px 1px rgb(0 0 0 / 0.2), 4px 8px 18px -4px rgb(0 0 0 / 0.35)",
  under: "0 1px 1px rgb(0 0 0 / 0.25), 0 2px 4px rgb(0 0 0 / 0.12)",
};

/**
 * Sheets fastened on the folder's spine. Drag the top sheet left and it turns
 * like a book page, following the pointer, and lands face down on the cover's
 * back; drag right to turn the last one back. Past a distance or with a flick
 * the turn completes. Dragging never closes the folder.
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
  const canNext = index < sheets.length;
  const canPrev = index > 0;
  const pull = dx < 0 ? (canNext ? dx : 0) : canPrev ? dx : 0;

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
    const far = Math.abs(distance) > Math.max(40, width * 0.12);
    const flick =
      Math.abs(distance) > 16 &&
      Math.abs(velocity) > FLICK_VELOCITY &&
      Math.sign(velocity) === Math.sign(distance);
    setDx(0);
    if (!commit || !(far || flick)) return;
    if (distance < 0 && canNext) onNext();
    else if (distance > 0 && canPrev) onPrev();
  };

  const angle = Math.min(180, (Math.abs(pull) / width) * 180);
  const rise = pull < 0 ? angle / 180 : 0;

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
        if (o < -DEPTH || o >= DEPTH) return null;
        const turned = o < 0;
        const top = o === 0;
        const d = turned ? -o - 1 : Math.max(0, o - rise);
        let transform: string;
        if (turned) {
          const back = o === -1 && pull > 0 ? angle : 0;
          transform = turn(-180 + back, -d * STEP, d * STEP);
        } else if (top) {
          transform = turn(pull < 0 ? -angle : 0);
        } else {
          transform = turn(0, d * STEP, d * STEP);
        }
        return (
          <div
            key={sheet.id}
            aria-hidden={top ? undefined : true}
            inert={top ? undefined : true}
            className="absolute inset-0 [transform-style:preserve-3d] motion-reduce:!transition-none"
            style={{
              zIndex: turned ? TURNED_Z + i : 20 - o,
              transform,
              transformOrigin: SPINE,
              // a sheet turned back stays above the cover until it lands
              transition: dragging
                ? "none"
                : `transform ${TURN_MS}ms ${EASE}, z-index 0s ${top ? TURN_MS : 0}ms`,
            }}
          >
            <div
              className="absolute inset-0 [backface-visibility:hidden]"
              style={{
                boxShadow: top ? SHADOW.top : SHADOW.under,
                filter: top ? undefined : `brightness(${1 - d * 0.035})`,
              }}
            >
              {renderSheet(sheet, i)}
            </div>
            <PaperSurface
              paperColors={null}
              paperTexture={{ type: "none", opacity: 0 }}
              textureStyle={{}}
              grains={PAPER_GRAINS}
              className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
              contentClassName="h-full"
            >
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  boxShadow: SHADOW.under,
                  background: `rgb(0 0 0 / ${0.04 + d * 0.03})`,
                }}
              />
            </PaperSurface>
          </div>
        );
      })}
    </div>
  );
}
