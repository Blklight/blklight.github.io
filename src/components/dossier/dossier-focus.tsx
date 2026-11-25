"use client";

import { X } from "lucide-react";
import { type ReactNode, Suspense, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { DossierSheetData } from "@/features/dossier/types";
import { cn } from "@/lib/utils";

function Body({ promise }: { promise: Promise<string> }) {
  const html = use(promise);
  return (
    <div
      className="doc-prose font-serif"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: lab mock HTML, authored in mock.ts
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function BodySkeleton({ sheet }: { sheet: DossierSheetData }) {
  return (
    <div aria-busy="true" className="space-y-6">
      <output className="sr-only">Carregando documento</output>
      {sheet.headings.map((h) => (
        <div key={h.id} className="space-y-2">
          <p
            className={cn(
              "font-semibold text-muted-foreground/60",
              h.level === 2 ? "text-2xl" : "text-xl",
            )}
          >
            {h.text}
          </p>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}

/**
 * `bodyPromise` must be stable per sheet (cached by the loader), since `use()`
 * suspends on it.
 */
export function DossierFocus({
  sheet,
  bodyPromise,
  sidebar,
  onClose,
}: {
  sheet: DossierSheetData;
  bodyPromise: Promise<string>;
  sidebar: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[16rem_1fr]">
      <aside className="md:sticky md:top-8 md:max-h-[calc(100vh-4rem)] md:self-start md:overflow-y-auto">
        {sidebar}
      </aside>
      <article
        aria-labelledby={`focus-title-${sheet.id}`}
        className="min-w-0 bg-card p-8 text-card-foreground shadow-xl md:p-12"
      >
        <header className="mb-8 flex items-start justify-between gap-4">
          <h1
            id={`focus-title-${sheet.id}`}
            tabIndex={-1}
            className="text-4xl font-semibold tracking-tight focus:outline-none"
          >
            {sheet.title}
          </h1>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar leitura"
            className="shrink-0 border border-foreground/20 p-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-4" />
          </button>
        </header>
        <Suspense fallback={<BodySkeleton sheet={sheet} />}>
          <Body promise={bodyPromise} />
        </Suspense>
      </article>
    </div>
  );
}
