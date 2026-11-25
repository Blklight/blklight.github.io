import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import type { TrailSheet } from "@/features/dossier/trail-adapter";
import type { ArticleType, Stamp } from "@/features/dossier/types";
import { DocumentPaper } from "./document-paper";
import { DossierStamp } from "./dossier-stamp";

export const ARTICLE_TYPE_LABEL: Record<ArticleType, string> = {
  lesson: "Aula",
  exercise: "Exercício",
  reference: "Referência",
  note: "Nota",
};

const MAX_HEADINGS = 5;

/** Shared with the reading view so the first page and the open document line up. */
export const DOC_TITLE =
  "w-full text-3xl md:text-4xl font-bold tracking-tight mb-3";
export const DOC_ABSTRACT = "text-xl mb-6 text-muted-foreground";
export const DOC_META =
  "mb-3 font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground";

/** First page of the document, truncated: letterhead, title, outline, footer. No body. */
export function ArticleCard({
  titleId,
  sheet,
  index,
  sectionTitle,
  author,
  read,
  stamp,
  onOpen,
  onPrefetch,
}: {
  titleId: string;
  sheet: TrailSheet;
  index: number;
  sectionTitle?: string;
  author: LetterheadTextContext["author"];
  read: boolean;
  stamp?: Stamp;
  onOpen: () => void;
  onPrefetch: () => void;
}) {
  const { article, intro } = sheet;
  return (
    <DocumentPaper
      context={{ author, typeLabel: ARTICLE_TYPE_LABEL[article.type] }}
      className="h-full"
      contentClassName="p-8 md:p-10"
    >
      <p className={DOC_META}>
        Doc. {String(index + 1).padStart(2, "0")}
        {sectionTitle && ` · ${sectionTitle}`} · {article.readingTime} min
      </p>
      <h3 id={titleId} className={DOC_TITLE}>
        <button
          type="button"
          onClick={onOpen}
          onPointerEnter={onPrefetch}
          onFocus={onPrefetch}
          className="text-left after:absolute after:inset-0 after:z-20 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-ring"
        >
          {article.title}
        </button>
      </h3>
      {intro && <p className={DOC_ABSTRACT}>{intro}</p>}
      <div className="mb-6 h-px bg-foreground/20" />

      <div className="min-h-0 flex-1 overflow-hidden">
        <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
          Neste documento
        </p>
        <ol className="space-y-1.5 font-mono text-sm">
          {article.headings
            .filter((h) => h.level === 2)
            .slice(0, MAX_HEADINGS)
            .map((h, i) => (
              <li
                key={h.id}
                className="flex gap-3 border-b border-dashed border-foreground/15 pb-1.5"
              >
                <span className="text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {h.text}
              </li>
            ))}
        </ol>
      </div>

      <div className="flex items-end justify-between gap-4 pt-6">
        <ul className="flex flex-wrap gap-1.5 font-mono text-[0.68rem]">
          {article.tags?.map((tag) => (
            <li
              key={tag}
              className="bg-foreground px-1.5 py-0.5 text-background"
            >
              #{tag}
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-3">
          {stamp && <DossierStamp stamp={stamp} />}
          {read && (
            <DossierStamp
              stamp={{ label: "Lido", tone: "neutral" }}
              rotate={4}
            />
          )}
        </div>
      </div>
    </DocumentPaper>
  );
}
