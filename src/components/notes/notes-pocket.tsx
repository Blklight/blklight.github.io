"use client";

import type { Annotation } from "@/features/notes/types";

export interface NoteGroup {
  id: string;
  label: string;
  color?: string;
  notes: Annotation[];
}

const NEUTRAL = "oklch(0.94 0.012 85)";

function Pile({ group, onOpen }: { group: NoteGroup; onOpen: () => void }) {
  const color = group.color ?? NEUTRAL;
  const under = Math.min(group.notes.length - 1, 2);
  return (
    <li className="relative h-40 min-w-0 max-w-40 flex-1">
      {Array.from({ length: under }, (_, i) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: decorative layers
          key={i}
          aria-hidden
          className="background-texture absolute inset-x-0 h-full shadow-[0_-1px_2px_rgb(0_0_0/0.25)]"
          style={{
            backgroundColor: color,
            top: -(under - i) * 6,
            left: (under - i) * 3,
            filter: `brightness(${0.82 + i * 0.06})`,
          }}
        />
      ))}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${group.label}: ${group.notes.length} notas, abrir no quadro`}
        className="background-texture absolute inset-0 flex items-start justify-between gap-2 px-2.5 pt-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.08em] text-[oklch(0.18_0_0)] shadow-[0_-1px_3px_rgb(0_0_0/0.3)] hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[oklch(0.92_0.012_85)] motion-safe:transition-transform"
        style={{ backgroundColor: color }}
      >
        <span className="truncate">{group.label}</span>
        <span className="shrink-0 tabular-nums opacity-70">
          {group.notes.length}
        </span>
      </button>
    </li>
  );
}

/**
 * The notes kept in a pocket: one block per group (a tab's color), cards
 * stacked straight into the pocket so only their top strip shows. `pileTop`
 * places the blocks so the pocket flap, drawn after, covers the rest.
 */
export function NotesPocket({
  groups,
  pileTop,
  onOpenBoard,
}: {
  groups: NoteGroup[];
  pileTop: string;
  onOpenBoard: () => void;
}) {
  const filled = groups.filter((g) => g.notes.length > 0);
  const total = filled.reduce((n, g) => n + g.notes.length, 0);
  return (
    <section aria-label="Anotações" className="absolute inset-0">
      <div className="absolute inset-x-0 top-10 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[oklch(0.92_0.012_85)]">
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
        <p className="absolute inset-x-0 top-24 max-w-64 font-mono text-xs uppercase leading-relaxed tracking-widest text-[oklch(0.92_0.012_85)] opacity-70">
          Nada guardado ainda. Ligue o marcador enquanto lê para marcar ou
          comentar.
        </p>
      ) : (
        <ol className="absolute inset-x-4 flex gap-3" style={{ top: pileTop }}>
          {filled.map((g) => (
            <Pile key={g.id} group={g} onOpen={onOpenBoard} />
          ))}
        </ol>
      )}
    </section>
  );
}
