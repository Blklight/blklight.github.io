"use client";

import { X } from "lucide-react";
import { type ReactNode, Suspense, use, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { DossierSheetData } from "@/features/dossier/types";
import { cn } from "@/lib/utils";

function Body({ promise }: { promise: Promise<string> }) {
  const html = use(promise);
  return (
    <div
      lang="pt-BR"
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
 * Reading mode: the document in the page flow (the page scrolls), centered
 * like an article; the index sits to the right. Not a dialog.
 * `bodyPromise` must be stable per sheet (cached loader), since `use()` suspends on it.
 */
export function DossierFocus({
  sheet,
  bodyPromise,
  renderDocument,
  sidebar,
  onClose,
}: {
  sheet: DossierSheetData;
  bodyPromise: Promise<string>;
  renderDocument: (parts: { title: ReactNode; body: ReactNode }) => ReactNode;
  sidebar: ReactNode;
  onClose: () => void;
}) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    titleRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="relative z-10 grid gap-8 px-4 pt-6 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,48rem)_minmax(0,1fr)] lg:px-8">
      <div className="lg:col-start-2">
        <div className="mb-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 bg-foreground px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <X className="size-3.5" aria-hidden />
            Voltar à pasta
            <kbd className="opacity-60">Esc</kbd>
          </button>
        </div>
        {renderDocument({
          title: (
            <h1
              ref={titleRef}
              tabIndex={-1}
              className="text-3xl font-bold tracking-tight focus:outline-none md:text-4xl"
            >
              {sheet.title}
            </h1>
          ),
          body: (
            <Suspense fallback={<BodySkeleton sheet={sheet} />}>
              <Body promise={bodyPromise} />
            </Suspense>
          ),
        })}
      </div>
      <aside className="hidden lg:block">
        <div className="sticky top-20 h-[calc(100dvh-7rem)] w-full max-w-72">
          {sidebar}
        </div>
      </aside>
    </div>
  );
}
