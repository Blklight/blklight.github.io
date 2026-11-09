"use client";

import { useMemo, useState } from "react";
import { SimpleFlipCard } from "@/components/onboarding/simple-flip-card";
import type { PlatformApp } from "@/types/api.types";

interface Props {
  apps: PlatformApp[];
  /**
   * Previously selected apps, identified by slug (the same key the API
   * expects on POST /api/v1/platform-apps/me).
   */
  initial: string[];
  onConfirm: (slugs: string[]) => void;
}

export const AppsStep = ({ apps, initial, onConfirm }: Props) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(initial));
  const [query, setQuery] = useState("");

  const openApps = useMemo(
    () => apps.filter((a) => a.accessMode === "open"),
    [apps],
  );

  // Selection is keyed by slug, not id: the onboarding API
  // (POST /api/v1/platform-apps/me) activates apps by slug, and the ConfirmStep
  // resolves the selection back to the catalog the same way.
  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return openApps;
    return openApps.filter((a) =>
      [a.name, a.tagline, a.category, a.description]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, openApps]);

  const count = selected.size;

  return (
    <div className="flex-1 flex flex-col px-6 md:px-10 py-10 animate-fade-in">
      <div className="mb-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          [ 02 ] catálogo
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b hairline p-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-2">
              Escolha seus apps
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg">
              {"> "}selecione um ou mais. clique no card para escolher, no
              cantinho inferior direito para virar.
            </p>
          </div>
          {/* biome-ignore lint/a11y/useSemanticElements: live region around block content; <output> is meant for form results */}
          <div
            role="status"
            aria-live="polite"
            className="text-xs uppercase tracking-widest border hairline px-4 py-2 self-start md:self-auto"
          >
            [ {String(count).padStart(2, "0")} selecionado
            {count === 1 ? "" : "s"} ]
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none"
          >
            {">"}
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="buscar app_"
            aria-label="buscar apps"
            className="w-full bg-transparent border hairline pl-8 pr-3 py-2.5 text-sm font-mono placeholder:text-muted-foreground/70 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          />
        </div>
        <div
          aria-live="polite"
          className="text-[11px] uppercase tracking-widest text-muted-foreground sm:px-2 whitespace-nowrap"
        >
          [ {String(filtered.length).padStart(2, "0")} /{" "}
          {String(openApps.length).padStart(2, "0")} ]
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 mb-10">
          {filtered.map((app) => (
            <SimpleFlipCard
              key={app.id}
              app={app}
              selected={selected.has(app.slug)}
              onToggle={() => toggle(app.slug)}
              hoverDither
            />
          ))}
        </div>
      ) : (
        <div className="border hairline p-10 mb-10 flex flex-col items-start gap-4">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            nenhum app encontrado para "{query}"
          </div>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-xs uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            [ limpar busca ]
          </button>
        </div>
      )}

      <div className="sticky bottom-0 bg-background border-t hairline -mx-6 md:-mx-10 px-6 md:px-10 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 mt-auto">
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {count === 0
            ? "// selecione ao menos um app para continuar"
            : `// ${count} ferramenta${count === 1 ? "" : "s"} no seu workspace`}
        </div>
        <button
          type="button"
          disabled={count === 0}
          aria-disabled={count === 0}
          onClick={() => onConfirm(Array.from(selected))}
          className="bg-ink text-background px-6 py-3 text-xs uppercase tracking-widest font-bold border hairline hover:bg-background hover:text-ink transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ink disabled:hover:text-background group"
        >
          <span className="inline-flex items-center gap-3">
            [ confirmar seleção ({count})
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
            ]
          </span>
        </button>
      </div>
    </div>
  );
};
