import type { CSSProperties, ReactNode } from "react";
import type { DossierSection } from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { EAR_W, earSlot, MARK_OVERLAP } from "./geometry";

/** Diagonal cut on both ends, like a divider tab. */
const EAR_CLIP =
  "[clip-path:polygon(0_0,100%_0.85rem,100%_calc(100%-0.85rem),0_100%)]";
const EAR_CLIP_LEFT =
  "[clip-path:polygon(0_0.85rem,100%_0,100%_100%,0_calc(100%-0.85rem))]";
const MARK_CLIP =
  "[clip-path:polygon(0_0,calc(100%-0.7rem)_0,100%_0.7rem,100%_calc(100%-0.7rem),calc(100%-0.7rem)_100%,0_100%)]";

/** A board ear: the cover's and the folder back's, same slot and color. */
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
        "absolute flex flex-col items-center justify-center font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-[width,filter] duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        side === "right"
          ? cn("left-full", EAR_CLIP)
          : cn("right-full", EAR_CLIP_LEFT),
        active ? "brightness-100" : "brightness-[0.85] hover:brightness-95",
        className,
      )}
      style={{
        ...earSlot(slot, total),
        width: active ? EAR_W : EAR_W - 8,
        ...style,
      }}
    >
      <span className="[writing-mode:vertical-rl]">{label}</span>
    </button>
  );
}

/**
 * Section ears carry only their number. The current one is a bookmark: it
 * lies over the document it belongs to and shows its full title.
 */
export function DossierTabs({
  sections,
  activeSectionId,
  onSection,
}: {
  sections: DossierSection[];
  activeSectionId?: string;
  onSection: (id: string) => void;
}) {
  const total = sections.length + 1;
  return (
    <nav aria-label="Divisórias" className="contents">
      {sections.map((s, i) => {
        const active = s.id === activeSectionId;
        const number = String(i + 1).padStart(2, "0");
        const { top } = earSlot(i + 1, total);
        return (
          <button
            key={s.id}
            type="button"
            aria-current={active ? "true" : undefined}
            aria-label={active ? undefined : `${number} ${s.title}`}
            onClick={() => onSection(s.id)}
            className={cn(
              "background-texture absolute flex h-10 items-center gap-2 whitespace-nowrap pr-4 pl-2.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[oklch(0.18_0_0)] transition-[left,filter] duration-300 ease-out",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              MARK_CLIP,
              active
                ? "z-40 drop-shadow-[2px_3px_3px_rgb(0_0_0/0.35)]"
                : "brightness-[0.8] hover:brightness-95",
            )}
            style={{
              backgroundColor: s.color,
              top,
              left: active ? `calc(100% - ${MARK_OVERLAP}px)` : "100%",
            }}
          >
            <span className={cn(active && "opacity-60")}>{number}</span>
            {active && <span className="leading-snug">{s.title}</span>}
          </button>
        );
      })}
    </nav>
  );
}
