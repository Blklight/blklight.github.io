"use client";

import type { Annotation } from "@/features/notes/types";

export interface NoteGroup {
  id: string;
  label: string;
  color?: string;
  notes: Annotation[];
}

const NEUTRAL = "oklch(0.94 0.012 85)";
const PILE_W = 144;
/** Room for the piles: the sheet's width. */
const ROW_W = 580;

/** Piles share one row; past what fits side by side, they overlap like a fanned hand. */
const pileStep = (count: number) =>
  count < 2 ? 0 : Math.min(PILE_W + 20, (ROW_W - PILE_W) / (count - 1));
const TILTS = [-4, 3, -1.5, 5, -3];

function Pile({
  group,
  index,
  step,
}: {
  group: NoteGroup;
  index: number;
  step: number;
}) {
  const top = group.notes.at(-1);
  const tilt = TILTS[index % TILTS.length];
  const color = group.color ?? NEUTRAL;
  return (
    <li
      className="relative h-48 shrink-0"
      style={{
        width: PILE_W,
        marginLeft: index === 0 ? 0 : step - PILE_W,
        transform: `rotate(${tilt}deg)`,
      }}
    >
      {group.notes.slice(-3, -1).map((n, i) => (
        <span
          key={n.id}
          aria-hidden
          className="background-texture absolute inset-0 shadow-[1px_2px_4px_rgb(0_0_0/0.3)]"
          style={{
            backgroundColor: color,
            transform: `translate(${(i + 1) * 4}px, ${(i + 1) * -3}px) rotate(${(i + 1) * 3}deg)`,
            filter: "brightness(0.9)",
          }}
        />
      ))}
      <div
        className="background-texture absolute inset-0 flex flex-col gap-2 p-3 text-[oklch(0.18_0_0)] shadow-[2px_4px_10px_rgb(0_0_0/0.35)]"
        style={{ backgroundColor: color }}
      >
        <p className="flex justify-between gap-2 font-mono text-[0.55rem] font-bold uppercase tracking-[0.18em]">
          <span className="truncate">{group.label}</span>
          <span className="shrink-0 opacity-70">{group.notes.length}</span>
        </p>
        {top?.anchor && (
          <p className="line-clamp-4 border-current/40 border-l-2 pl-2 font-mono text-[0.7rem] leading-snug">
            “{top.anchor.exact.trim()}”
          </p>
        )}
        {top?.text && (
          <p className="line-clamp-3 whitespace-pre-line font-mono text-[0.75rem] leading-snug">
            {top.text}
          </p>
        )}
      </div>
    </li>
  );
}

/** The notes kept in a pocket: one pile per group, the latest note on top. */
export function NotesPocket({
  groups,
  onOpenBoard,
  className,
}: {
  groups: NoteGroup[];
  onOpenBoard: () => void;
  className?: string;
}) {
  const filled = groups.filter((g) => g.notes.length > 0);
  const total = filled.reduce((n, g) => n + g.notes.length, 0);
  return (
    <section aria-label="Anotações" className={className}>
      <div className="flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[oklch(0.92_0.012_85)]">
        <span className="opacity-60">
          {total} {total === 1 ? "anotação" : "anotações"}
        </span>
        <button
          type="button"
          onClick={onOpenBoard}
          className="bg-[oklch(0.94_0.012_85)] px-3 py-1.5 font-bold text-[oklch(0.2_0_0)] shadow-[2px_3px_0_rgb(0_0_0/0.35)] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          Abrir quadro →
        </button>
      </div>
      {filled.length === 0 ? (
        <p className="mt-10 max-w-64 font-mono text-xs uppercase leading-relaxed tracking-widest text-[oklch(0.92_0.012_85)] opacity-70">
          Nada guardado ainda. Selecione um trecho enquanto lê para marcar ou
          comentar.
        </p>
      ) : (
        <ol className="mt-56 flex pl-2">
          {filled.map((g, i) => (
            <Pile
              key={g.id}
              group={g}
              index={i}
              step={pileStep(filled.length)}
            />
          ))}
        </ol>
      )}
    </section>
  );
}
