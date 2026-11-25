import type { CSSProperties, ReactNode } from "react";
import type { DossierSection } from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { EAR_W, earSlot } from "./geometry";

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
 * Section ears, upright with the number always at the same spot on top. The
 * current one slides a little further out and shows its title below the number.
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
        return (
          <button
            key={s.id}
            type="button"
            aria-current={active ? "true" : undefined}
            aria-label={`${number} ${s.title}`}
            onClick={() => onSection(s.id)}
            className={cn(
              "background-texture absolute left-full flex flex-col items-start gap-1.5 overflow-hidden pt-3.5 pb-3 pl-2.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.08em] text-[oklch(0.18_0_0)] transition-[width,filter] duration-300 ease-out",
              "shadow-[inset_6px_0_8px_-6px_rgb(0_0_0/0.45)] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current",
              EAR_CLIP,
              active ? "z-10" : "brightness-[0.85] hover:brightness-95",
            )}
            style={{
              ...earSlot(i + 1, total),
              backgroundColor: s.color,
              width: active ? EAR_W + 6 : EAR_W - 8,
            }}
          >
            <span aria-hidden>{number}</span>
            <span
              aria-hidden
              className={cn(
                "min-h-0 truncate pl-0.5 [writing-mode:vertical-rl] transition-opacity duration-300",
                active ? "opacity-100" : "opacity-0",
              )}
            >
              {s.title}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
