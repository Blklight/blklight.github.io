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
const TUCK_MS = 650;
const EASE = "cubic-bezier(.22,.8,.3,1)";
/** Turned sheets lie on the open cover's back, above it (the cover is z-50). */
const TURNED_Z = 60;
/** Pages turn on the folder's spine, PANEL_PAD_X left of the sheet. */
const SPINE = `-${PANEL_PAD_X}px 50%`;

/* One function list for every state, so transitions interpolate cleanly. */
const place = ({ x = 0, y = 0, turn = 0, tilt = 0 }) =>
  `translate(${x}px, ${y}px) perspective(2800px) rotateY(${turn}deg) rotate(${tilt}deg)`;

const SHADOW = {
  top: "0 1px 1px rgb(0 0 0 / 0.2), 4px 8px 18px -4px rgb(0 0 0 / 0.35)",
  under: "0 1px 1px rgb(0 0 0 / 0.25), 0 2px 4px rgb(0 0 0 / 0.12)",
};

/**
 * Sheets in a pile, after the tally stack: the top sheet follows the pointer;
 * past a distance or with a flick it is thrown left and slips under the pile
 * (next), or the last one comes back out from under it (prev). Dragging never
 * closes the folder. At `index === sheets.length` (the folder's back, `bottom`)
 * every sheet is turned like a book page and lies face down on the cover.
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
  const thrownFrom = useRef(0);
  const [seen, setSeen] = useState({ index, from: index });
  if (seen.index !== index) setSeen({ index, from: seen.index });
  const from = seen.from;
  const notes = index === sheets.length;
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
    thrownFrom.current = distance;
    if (distance < 0 && canNext) onNext();
    else if (distance > 0 && canPrev) onPrev();
  };

  const progress = Math.min(1, Math.abs(pull) / width);

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
        const turned = notes && o < 0;
        const top = o === 0;
        const tucking = !notes && o === -1 && from === index - 1;
        const untucking = top && from === index + 1 && from < sheets.length;
        if (!(turned ? o >= -DEPTH : o >= 0 && o < DEPTH) && !tucking)
          return null;
        const d = turned ? -o - 1 : Math.max(0, o - (top ? 0 : progress));
        let transform: string;
        if (turned)
          transform = place({ x: -d * STEP, y: d * STEP, turn: -180 });
        else if (top) transform = place({ x: pull, tilt: pull / 40 });
        else transform = place({ x: d * STEP, y: d * STEP });
        const tuckVars = tucking
          ? {
              "--fx": `${thrownFrom.current}px`,
              "--fr": `${thrownFrom.current / 40}deg`,
              "--under": `${DEPTH * STEP}px`,
            }
          : untucking
            ? { "--fx": "0px", "--fr": "0deg", "--under": `${DEPTH * STEP}px` }
            : {};
        return (
          <div
            key={sheet.id}
            aria-hidden={top ? undefined : true}
            inert={top ? undefined : true}
            className="absolute inset-0 [transform-style:preserve-3d] motion-reduce:!animate-none motion-reduce:!transition-none"
            style={{
              ...tuckVars,
              zIndex: turned ? TURNED_Z + i : 20 - o,
              transform,
              transformOrigin:
                turned || from === sheets.length
                  ? SPINE
                  : top
                    ? "50% 90%"
                    : "0 0",
              animation: tucking
                ? `dossier-tuck ${TUCK_MS}ms ${EASE} forwards`
                : untucking
                  ? `dossier-tuck ${TUCK_MS}ms ${EASE} reverse`
                  : undefined,
              // a sheet turned back stays above the cover until it lands
              transition: dragging
                ? "none"
                : `transform ${TURN_MS}ms ${EASE}, z-index 0s ${top && from === sheets.length ? TURN_MS : 0}ms`,
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
