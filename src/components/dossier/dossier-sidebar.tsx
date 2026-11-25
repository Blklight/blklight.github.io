"use client";

import { useEffect, useRef } from "react";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import type {
  DossierSection,
  DossierSheetData,
} from "@/features/dossier/types";
import { cn } from "@/lib/utils";

/** Same width clipped in the cover and as the reading sidebar. */
export const INDEX_W = "w-72";

/**
 * The index, set like a memo: big title, mono meta line, numbered ruled rows.
 * Clipped inside the cover when browsing; the left sidebar while reading.
 */
export function DossierSidebar({
  code,
  sections,
  sheets,
  currentIndex,
  readIds,
  expandCurrent,
  onSelect,
  className,
}: {
  code: string;
  sections: DossierSection[];
  sheets: DossierSheetData[];
  currentIndex: number;
  readIds: ReadonlySet<string>;
  /** Show the current document's headings (reading mode). */
  expandCurrent?: boolean;
  onSelect: (index: number) => void;
  className?: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const groups = [
    ...sections.map((s) => ({
      section: s as DossierSection | undefined,
      id: s.id,
    })),
    { section: undefined, id: undefined },
  ]
    .map((g) => ({
      ...g,
      items: sheets
        .map((sheet, index) => ({ sheet, index }))
        .filter(({ sheet }) => sheet.sectionId === g.id),
    }))
    .filter((g) => g.items.length > 0);
  const done = sheets.filter((s) => readIds.has(s.id)).length;

  useEffect(() => {
    const nav = navRef.current;
    const row = nav?.querySelector<HTMLElement>(`[data-row="${currentIndex}"]`);
    if (!nav || !row) return;
    const top = row.offsetTop - nav.clientHeight / 3;
    nav.scrollTo({ top, behavior: "smooth" });
  }, [currentIndex]);

  return (
    <PaperSurface
      paperColors={null}
      paperTexture={{ type: "none", opacity: 0 }}
      textureStyle={{}}
      grains={["background-texture"]}
      className={cn(
        INDEX_W,
        "rounded-[1rem] bg-background text-foreground shadow-lg",
        className,
      )}
      contentClassName="flex h-full flex-col"
    >
      <header className="px-5 pt-6 pb-3">
        <p className="text-3xl font-semibold tracking-tight">Sumário</p>
        <div className="mt-3 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
          <span>Memo — {code}</span>
          <span>
            \ {done}/{sheets.length} lidos
          </span>
        </div>
      </header>
      <nav
        ref={navRef}
        aria-label="Sumário"
        className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 font-mono text-[0.72rem] uppercase [mask-image:linear-gradient(transparent,#000_0.75rem,#000_calc(100%-2rem),transparent)] [scrollbar-color:color-mix(in_oklab,currentColor_30%,transparent)_transparent] [scrollbar-width:thin]"
      >
        {groups.map((g, gi) => (
          <div key={g.id ?? "_"} className="pt-4">
            {g.section && (
              <p className="text-[0.6rem] tracking-[0.2em] text-muted-foreground">
                {String(gi + 1).padStart(2, "0")} — {g.section.title}
              </p>
            )}
            <ol>
              {g.items.map(({ sheet, index }) => {
                const current = index === currentIndex;
                return (
                  <li key={sheet.id} data-row={index}>
                    <button
                      type="button"
                      aria-current={current ? "true" : undefined}
                      onClick={() => onSelect(index)}
                      className={cn(
                        "flex w-full items-baseline gap-2 border-b-2 border-foreground/20 pt-3 pb-1 text-left tracking-wider shadow-[0_1px_0_rgb(255_255_255/0.5)] hover:border-foreground/50 focus-visible:outline-2 focus-visible:outline-ring dark:shadow-none",
                        current
                          ? "border-foreground font-bold"
                          : "text-foreground/75",
                      )}
                    >
                      <span className="w-6 shrink-0 text-muted-foreground">
                        {index + 1}.
                      </span>
                      <span className="flex-1 leading-snug">{sheet.title}</span>
                      {readIds.has(sheet.id) && (
                        <span className="shrink-0">
                          <span aria-hidden>✓</span>
                          <span className="sr-only">lido</span>
                        </span>
                      )}
                    </button>
                    {current && expandCurrent && (
                      <ol className="mt-2 mb-1 ml-8 space-y-1 border-l border-foreground/25 pl-2 text-[0.68rem] normal-case">
                        {sheet.headings.map((h) => (
                          <li
                            key={h.id}
                            className={cn(h.level === 3 && "pl-3")}
                          >
                            <a
                              href={`#${h.id}`}
                              className="text-muted-foreground hover:text-foreground hover:underline"
                            >
                              {h.text}
                            </a>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </nav>
    </PaperSurface>
  );
}
