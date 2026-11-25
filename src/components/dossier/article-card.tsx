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
      className="h-full border-foreground/80"
      contentClassName="gap-5 p-5"
    >
      <div className="flex items-baseline justify-between font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
        <span>
          Doc. {String(index + 1).padStart(2, "0")}
          {sectionTitle && ` · ${sectionTitle}`}
        </span>
        <span>{article.readingTime} min de leitura</span>
      </div>

      <h3
        id={titleId}
        className="text-[clamp(1.5rem,2.4vh+0.6rem,2.25rem)] leading-tight font-bold tracking-tight"
      >
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

      {intro && (
        <p className="font-serif text-lg leading-snug text-muted-foreground">
          {intro}
        </p>
      )}

      <div className="h-px bg-foreground/20" />

      <div className="min-h-0 overflow-hidden">
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

      <div className="flex items-end justify-between gap-4">
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
