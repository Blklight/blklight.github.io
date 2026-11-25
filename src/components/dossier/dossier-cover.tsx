import type { DossierCoverData } from "@/features/dossier/types";
import { cn } from "@/lib/utils";

/** Notch cut on the spine side, like a file folder board. */
export const BOARD_CLIP =
  "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%,0_62%,1.1rem_59%,1.1rem_41%,0_38%)]";

export function DossierCover({
  cover,
  readFlags,
  onOpen,
}: {
  cover: DossierCoverData;
  /** One flag per document, in order. */
  readFlags: boolean[];
  onOpen: () => void;
}) {
  const done = readFlags.filter(Boolean).length;
  return (
    <div
      className={cn(
        "dossier-board flex h-full flex-col gap-8 p-14 pl-16",
        BOARD_CLIP,
      )}
    >
      <div className="flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-70">
        <span>Blklight · Arquivo de estudo</span>
        <span>Uso de leitura</span>
      </div>

      <div className="w-[62%] -rotate-1 bg-[oklch(0.94_0.012_85)] p-3 font-mono text-[0.68rem] text-[oklch(0.2_0_0)] uppercase shadow-[2px_3px_0_rgb(0_0_0/0.35)] background-texture">
        <div className="flex items-end justify-between border-b border-current pb-2">
          <span className="font-pixel text-[2.4rem] leading-none">
            {cover.code}
          </span>
          <span>N° {String(readFlags.length).padStart(2, "0")}</span>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 pt-2">
          <dt className="opacity-60">Título</dt>
          <dd>{cover.title}</dd>
          <dt className="opacity-60">Status</dt>
          <dd>{cover.statusLabel}</dd>
          {cover.subtitle && (
            <>
              <dt className="opacity-60">Conteúdo</dt>
              <dd>{cover.subtitle}</dd>
            </>
          )}
        </dl>
        <div
          aria-hidden
          className="mt-2 h-6 bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_8px,currentColor_8px_11px,transparent_11px_12px)]"
        />
      </div>

      <h2 className="dossier-emboss mt-auto text-[7rem] leading-[0.9] font-bold tracking-tight">
        {cover.title}
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em]">
          <span>Progresso</span>
          <span>
            {done}/{readFlags.length}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Progresso de leitura"
          aria-valuemin={0}
          aria-valuemax={readFlags.length}
          aria-valuenow={done}
          className="flex gap-1"
        >
          {readFlags.map((read, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length segments
              key={i}
              className={cn(
                "h-2 flex-1 -skew-x-12",
                read ? "bg-current" : "bg-current/20",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="mt-2 w-full bg-[oklch(0.94_0.012_85)] py-3 font-mono text-xs font-bold uppercase tracking-[0.25em] text-[oklch(0.2_0_0)] [clip-path:polygon(0.75rem_0,100%_0,100%_calc(100%-0.75rem),calc(100%-0.75rem)_100%,0_100%,0_0.75rem)] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          Abrir dossiê →
        </button>
      </div>
    </div>
  );
}
