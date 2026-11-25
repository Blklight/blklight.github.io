import type { CSSProperties, ReactNode } from "react";
import type { DossierSection } from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { EASE, TURN_MS, TURNED_Z } from "./dossier-stack";
import {
  EAR_W,
  earSlot,
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
  const total = sections.length + 1;
  return (
    <nav
      aria-label="Divisórias"
      className="absolute flex flex-col gap-1"
      style={{
        top: earSlot(1, total).top,
        bottom: SHEET_BOTTOM + 12,
        left: PANEL_W - TAB_TEXT_W,
        width: TAB_TEXT_W + TAB_NUM_W,
      }}
    >
      {sections.map((s, i) => {
        const active = s.id === activeSectionId;
        const number = String(i + 1).padStart(2, "0");
        return (
          <button
            key={s.id}
            type="button"
            aria-current={active ? "true" : undefined}
            aria-label={`${number} ${s.title}`}
            onClick={() => onSection(s.id)}
            className={cn(
              "background-texture relative flex max-h-44 min-h-0 flex-1 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[oklch(0.18_0_0)] motion-reduce:!transition-none",
              "focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current",
              EAR_CLIP,
              !active && "brightness-[0.85] hover:brightness-95",
            )}
            style={{
              backgroundColor: s.color,
              zIndex: turned ? TURNED_Z - 1 : active ? 25 : 5,
              transform: `perspective(2800px) rotateY(${turned ? -180 : 0}deg)`,
              transformOrigin: `${TAB_TEXT_W - PANEL_W}px 50%`,
              transition: `transform ${TURN_MS}ms ${EASE}, z-index 0s ${turned ? 0 : TURN_MS}ms, filter 300ms`,
            }}
          >
            <span
              aria-hidden
              className={cn(
                "flex min-h-0 shrink-0 justify-center overflow-hidden pt-4 pb-3 transition-opacity duration-300",
                active && !turned ? "opacity-100" : "opacity-0",
              )}
              style={{ width: TAB_TEXT_W }}
            >
              <span className="truncate [writing-mode:vertical-rl]">
                {s.title}
              </span>
            </span>
            <span
              aria-hidden
              className={cn(
                "flex-1 pt-3.5 text-center transition-opacity",
                turned && "opacity-0",
              )}
            >
              {number}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
