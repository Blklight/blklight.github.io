import type { CSSProperties, ReactNode } from "react";
import type { DossierSection } from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { EASE, TURN_MS } from "./dossier-stack";
import {
  BOARD_EAR_SLOTS,
  EAR_W,
  earSlot,
  LAYER,
  PANEL_W,
  SHEET_BOTTOM,
  TAB_NUM_W,
  TAB_TEXT_W,
} from "./geometry";

/** Diagonal cut on both ends, like a divider tab. */
const EAR_CLIP =
  "[clip-path:polygon(0_0,100%_0.85rem,100%_calc(100%-0.85rem),0_100%)]";
const EAR_CLIP_LEFT =
  "[clip-path:polygon(0_0.85rem,100%_0,100%_100%,0_calc(100%-0.85rem))]";

/** A board ear: part of the cover (or the folder's back), same board and color. Never resizes. */
export function Ear({
  slot,
  total,
  side = "right",
  active,
  label,
  className,
  style,
  onClick,
}: {
  slot: number;
  total: number;
  side?: "left" | "right";
  active?: boolean;
  label: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      className={cn(
        "absolute flex flex-col items-center justify-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em]",
        "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current",
        side === "right"
          ? cn("left-[calc(100%-1px)]", EAR_CLIP)
          : cn("right-[calc(100%-1px)]", EAR_CLIP_LEFT),
        className,
      )}
      style={{ ...earSlot(slot, total), width: EAR_W, ...style }}
    >
      <span className="[writing-mode:vertical-rl]">{label}</span>
    </button>
  );
}

/** Up to this many sections, every ear shows (shorter as there are more). */
export const EARS_SHRINK_MAX = 8;
/** Past it, ears repeat every this many positions, like a real divider set. */
export const EARS_CYCLE = 4;

/**
 * Section indices whose ears show, top to bottom. Past `EARS_SHRINK_MAX`
 * sections, each of the `EARS_CYCLE` positions shows the next divider in the
 * pile from the current section; the ones behind it stay hidden.
 */
export function visibleEars(count: number, active: number): number[] {
  const all = Array.from({ length: count }, (_, i) => i);
  if (count <= EARS_SHRINK_MAX) return all;
  const from = Math.max(0, active);
  return Array.from({ length: EARS_CYCLE }, (_, slot) => {
    const inSlot = all.filter((i) => i % EARS_CYCLE === slot);
    const ahead = (i: number) => (i - from + count) % count;
    return inSlot.reduce((a, b) => (ahead(b) < ahead(a) ? b : a));
  });
}

/**
 * Section ears, as divider sheets in the pile: the title strip lies under the
 * pile's edge and only the number sticks out of the board. The current one
 * comes on top of the pile, against its document, showing its title. With
 * the pile turned onto the cover (`turned`), they turn with it.
 */
export function DossierTabs({
  sections,
  activeSectionId,
  turned,
  onSection,
}: {
  sections: DossierSection[];
  activeSectionId?: string;
  turned?: boolean;
  onSection: (id: string) => void;
}) {
  const active = sections.findIndex((s) => s.id === activeSectionId);
  return (
    <nav
      aria-label="Divisórias"
      className="absolute flex flex-col gap-1"
      style={{
        top: earSlot(1, BOARD_EAR_SLOTS).top,
        bottom: SHEET_BOTTOM + 12,
        left: PANEL_W - TAB_TEXT_W,
        width: TAB_TEXT_W + TAB_NUM_W,
      }}
    >
      {visibleEars(sections.length, active).map((i, pos, shown) => {
        const s = sections[i];
        const current = i === active;
        const number = String(i + 1).padStart(2, "0");
        return (
          <div
            key={s.id}
            className="relative min-h-0 max-h-44 flex-1 motion-reduce:!transition-none"
            style={{
              zIndex: turned
                ? LAYER.earTurned
                : current
                  ? LAYER.earActive
                  : LAYER.earUnder,
              transform: `perspective(2800px) rotateY(${turned ? -180 : 0}deg)`,
              transformOrigin: `${TAB_TEXT_W - PANEL_W}px 50%`,
              transition: `transform ${TURN_MS}ms ${EASE}, z-index 0s ${turned ? 0 : TURN_MS}ms`,
            }}
          >
            <button
              type="button"
              aria-current={current ? "true" : undefined}
              aria-label={`${number} ${s.title}`}
              onClick={() => onSection(s.id)}
              className={cn(
                "background-texture absolute inset-0 flex flex-col font-mono text-[0.6rem] font-bold text-[oklch(0.18_0_0)] transition-[filter] duration-300",
                "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current",
                EAR_CLIP,
                !current && "brightness-[0.85] hover:brightness-95",
              )}
              style={{ backgroundColor: s.color, paddingLeft: TAB_TEXT_W }}
            >
              <span
                aria-hidden
                className={cn(
                  "block pt-3.5 text-center transition-opacity",
                  turned && "opacity-0",
                )}
              >
                {number}
              </span>
            </button>
            {current && !turned && (
              <span
                aria-hidden
                className={cn(
                  "background-texture pointer-events-none absolute left-0 flex h-44 min-h-full justify-center pt-4 pb-3 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[oklch(0.18_0_0)]",
                  EAR_CLIP_LEFT,
                  pos < shown.length / 2 ? "top-0" : "bottom-0",
                )}
                style={{ width: TAB_TEXT_W, backgroundColor: s.color }}
              >
                <span className="truncate [writing-mode:vertical-rl]">
                  {s.title}
                </span>
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
