import type { CSSProperties, ReactNode } from "react";
import type { DossierSection } from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { EAR_W, earSlot } from "./geometry";

/** Diagonal cut on both ends, like a divider tab. */
const EAR_CLIP =
  "[clip-path:polygon(0_0,100%_0.85rem,100%_calc(100%-0.85rem),0_100%)]";
const EAR_CLIP_LEFT =
  "[clip-path:polygon(0_0.85rem,100%_0,100%_100%,0_calc(100%-0.85rem))]";

export function Ear({
  slot,
  total,
  side = "right",
  active,
  label,
  number,
  className,
  style,
  onClick,
}: {
  slot: number;
  total: number;
  side?: "left" | "right";
  active?: boolean;
  label: ReactNode;
  number?: string;
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
        "group absolute flex flex-col items-center gap-2 py-4 font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] transition-[width,filter,transform] duration-200 ease-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "shadow-[inset_6px_0_8px_-6px_rgb(0_0_0/0.5)]",
        side === "right"
          ? cn("left-full", EAR_CLIP)
          : cn("right-full", EAR_CLIP_LEFT),
        active ? "brightness-100" : "brightness-[0.78] hover:brightness-95",
        className,
      )}
      style={{
        ...earSlot(slot, total),
        width: active ? EAR_W : EAR_W - 10,
        ...style,
      }}
    >
      {number && (
        <span className="text-[0.6rem] opacity-70 [writing-mode:horizontal-tb]">
          {number}
        </span>
      )}
      <span className="[writing-mode:vertical-rl]">{label}</span>
    </button>
  );
}

/** Divider ears and the last (notes) ear on the folder's outer edge. The cover's ear lives on the cover. */
export function DossierTabs({
  sections,
  activeSectionId,
  notesActive,
  onSection,
  onNotes,
}: {
  sections: DossierSection[];
  activeSectionId?: string;
  notesActive: boolean;
  onSection: (id: string) => void;
  onNotes: () => void;
}) {
  const total = sections.length + 2;
  return (
    <nav aria-label="Divisórias" className="contents">
      {sections.map((s, i) => (
        <Ear
          key={s.id}
          slot={i + 1}
          total={total}
          active={s.id === activeSectionId}
          number={String(i + 1).padStart(2, "0")}
          label={s.title}
          onClick={() => onSection(s.id)}
          className="background-texture text-[oklch(0.18_0_0)]"
          style={{ backgroundColor: s.color }}
        />
      ))}
      <Ear
        slot={total - 1}
        total={total}
        active={notesActive}
        label="Anotações"
        onClick={onNotes}
        className="background-texture bg-[oklch(0.78_0.06_80)] text-[oklch(0.2_0_0)]"
      />
    </nav>
  );
}
