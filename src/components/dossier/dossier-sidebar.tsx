import { PaperSurface } from "@/features/documents/design/paper-surface";
import type {
  DossierSection,
  DossierSheetData,
} from "@/features/dossier/types";
import { cn } from "@/lib/utils";
import { PAPER_GRAINS } from "./document-paper";

/**
 * The index: a narrow sheet. Clipped inside the cover when browsing, and the
 * right-hand sidebar while reading.
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

  return (
    <PaperSurface
      paperColors={null}
      paperTexture={{ type: "none", opacity: 0 }}
      textureStyle={{}}
      grains={PAPER_GRAINS}
      className={cn(
        "border-foreground/80 text-foreground shadow-lg",
        className,
      )}
      contentClassName="flex h-full flex-col"
    >
      <div className="flex items-baseline justify-between border-b border-foreground py-2 pr-4 pl-12 font-mono text-[0.68rem] uppercase tracking-widest">
        <span className="font-bold">Sumário</span>
        <span className="text-muted-foreground">{code}</span>
      </div>
      <div
        aria-hidden
        className="mx-4 mt-2 flex gap-0.5"
        title={`${done} de ${sheets.length} lidos`}
      >
        {sheets.map((s) => (
          <span
            key={s.id}
            className={cn(
              "h-1 flex-1",
              readIds.has(s.id) ? "bg-foreground" : "bg-foreground/15",
            )}
          />
        ))}
      </div>
      <nav
        aria-label="Sumário"
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-3 font-mono text-[0.78rem]"
      >
        {groups.map((g, gi) => (
          <div key={g.id ?? "_"}>
            {g.section && (
              <p className="mb-1 flex items-center gap-2 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                <span
                  aria-hidden
                  className="h-2.5 w-2.5 [clip-path:polygon(0_0,100%_0,70%_100%,0_100%)]"
                  style={{ background: g.section.color }}
                />
                {String(gi + 1).padStart(2, "0")} {g.section.title}
              </p>
            )}
            <ol>
              {g.items.map(({ sheet, index }) => {
                const current = index === currentIndex;
                return (
                  <li key={sheet.id}>
                    <button
                      type="button"
                      aria-current={current ? "true" : undefined}
                      onClick={() => onSelect(index)}
                      className={cn(
                        "flex w-full gap-2 border-b border-dashed border-foreground/15 py-1.5 text-left hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-ring",
                        current ? "font-bold" : "text-foreground/75",
                      )}
                    >
                      <span className="w-5 shrink-0 text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">{sheet.title}</span>
                      {readIds.has(sheet.id) && (
                        <span className="shrink-0">
                          <span aria-hidden>✓</span>
                          <span className="sr-only">lido</span>
                        </span>
                      )}
                    </button>
                    {current && expandCurrent && (
                      <ol className="my-1 ml-7 space-y-1 border-l border-foreground/20 pl-2 text-[0.72rem]">
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
