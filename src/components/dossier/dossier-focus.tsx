"use client";

import { X } from "lucide-react";
import { type ReactNode, Suspense, use, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { DossierSheetData } from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { DOC_TITLE } from "./article-card";

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
 * like an article (same 720px paper); the index is pinned to the screen's left
 * edge under the navbar. Not a dialog.
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
    <div className="relative z-10 grid gap-8 pb-24 lg:grid-cols-[minmax(20rem,1fr)_45rem_minmax(0,1fr)]">
      <aside className="hidden lg:block">
        <div className="fixed top-[calc(3.5625rem+0.5rem)] bottom-4 left-4 z-20">
          {sidebar}
        </div>
      </aside>
      <div className="min-w-0 px-4 lg:px-0">
        <div className="sticky top-12 z-20 flex justify-end pt-6 pb-3 lg:top-[3.5625rem]">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 bg-foreground px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-background shadow-md hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
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
              className={cn(DOC_TITLE, "focus:outline-none")}
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
    </div>
  );
}
