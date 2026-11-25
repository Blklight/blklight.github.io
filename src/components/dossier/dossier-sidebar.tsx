import type {
  DossierSection,
  DossierSheetData,
} from "@/features/dossier/types";
import { cn } from "@/lib/utils";

export function DossierSidebar({
  sections,
  sheets,
  currentIndex,
  readIds,
  onSelect,
}: {
  sections: DossierSection[];
  sheets: DossierSheetData[];
  currentIndex: number;
  readIds: ReadonlySet<string>;
  onSelect: (index: number) => void;
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

  return (
    <nav aria-label="Sumário" className="space-y-6 font-mono text-sm">
      {groups.map((g) => (
        <div key={g.id ?? "_"}>
          {g.section && (
            <p
              className="mb-2 border-l-2 pl-2 text-[0.7rem] uppercase tracking-widest text-muted-foreground"
              style={{ borderColor: g.section.color }}
            >
              {g.section.title}
            </p>
          )}
          <ol className="space-y-1">
            {g.items.map(({ sheet, index }) => {
              const current = index === currentIndex;
              return (
                <li key={sheet.id}>
                  <button
                    type="button"
                    aria-current={current ? "page" : undefined}
                    onClick={() => onSelect(index)}
                    className={cn(
                      "flex w-full justify-between gap-2 py-1 text-left hover:underline focus-visible:outline-2 focus-visible:outline-ring",
                      current ? "font-bold" : "text-muted-foreground",
                    )}
                  >
                    <span>{sheet.title}</span>
                    {readIds.has(sheet.id) && (
                      <span className="shrink-0">
                        <span aria-hidden>✓</span>
                        <span className="sr-only">lido</span>
                      </span>
                    )}
                  </button>
                  {current && (
                    <ol className="mt-1 mb-2 space-y-1 border-l border-foreground/15 pl-3 text-xs">
                      {sheet.headings.map((h) => (
                        <li key={h.id} className={cn(h.level === 3 && "pl-3")}>
                          <a href={`#${h.id}`} className="hover:underline">
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
  );
}
