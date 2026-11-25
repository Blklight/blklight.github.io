import type { DossierCoverData } from "@/features/dossier/types";

export function DossierCover({
  cover,
  done,
  total,
  onOpen,
}: {
  cover: DossierCoverData;
  done: number;
  total: number;
  onOpen: () => void;
}) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="flex h-full flex-col justify-between p-8 text-background">
      <div className="flex items-start justify-between font-mono text-xs uppercase tracking-widest">
        <span>{cover.code}</span>
        <span className="border border-current px-2 py-0.5">
          {cover.statusLabel}
        </span>
      </div>
      <div>
        <h2 className="text-5xl font-semibold tracking-tight">{cover.title}</h2>
        {cover.subtitle && (
          <p className="mt-2 font-mono text-xs uppercase tracking-widest opacity-70">
            {cover.subtitle}
          </p>
        )}
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between font-mono text-xs uppercase tracking-widest">
            <span>Progresso</span>
            <span>
              {done}/{total}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label="Progresso de leitura"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            className="h-1.5 bg-background/20"
          >
            <div
              className="h-full bg-background"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onOpen}
          className="w-full border border-current py-2 font-mono text-xs uppercase tracking-widest hover:bg-background hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Abrir dossiê
        </button>
      </div>
    </div>
  );
}
