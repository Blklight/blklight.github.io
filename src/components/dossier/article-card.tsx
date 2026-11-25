import type { TrailSheet } from "@/features/dossier/trail-adapter";
import type { ArticleType, Stamp } from "@/features/dossier/types";
import { DossierStamp } from "./dossier-stamp";

export const ARTICLE_TYPE_LABEL: Record<ArticleType, string> = {
  lesson: "Aula",
  exercise: "Exercício",
  reference: "Referência",
  note: "Nota",
};

const MAX_HEADINGS = 5;

export function ArticleCard({
  titleId,
  sheet,
  index,
  sectionTitle,
  read,
  stamp,
  onOpen,
  onPrefetch,
}: {
  titleId: string;
  sheet: TrailSheet;
  index: number;
  sectionTitle?: string;
  read: boolean;
  stamp?: Stamp;
  onOpen: () => void;
  onPrefetch: () => void;
}) {
  const { article, intro } = sheet;
  return (
    <article className="relative flex h-full flex-col gap-6 p-8 pl-10">
      <header className="flex items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        <span>
          {String(index + 1).padStart(2, "0")}
          {sectionTitle && ` · ${sectionTitle}`}
        </span>
        <span>
          {ARTICLE_TYPE_LABEL[article.type]} · {article.readingTime} min
        </span>
      </header>

      <h3 id={titleId} className="text-3xl font-semibold tracking-tight">
        <button
          type="button"
          onClick={onOpen}
          onPointerEnter={onPrefetch}
          onFocus={onPrefetch}
          className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-4 focus-visible:after:outline-ring"
        >
          {article.title}
        </button>
      </h3>

      {intro && (
        <p className="border-l-2 border-foreground/20 pl-3 text-sm text-muted-foreground">
          {intro}
        </p>
      )}

      <ol className="space-y-1.5 border-t border-foreground/10 pt-4 font-mono text-sm">
        {article.headings
          .filter((h) => h.level === 2)
          .slice(0, MAX_HEADINGS)
          .map((h, i) => (
            <li key={h.id} className="flex gap-3">
              <span className="text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              {h.text}
            </li>
          ))}
      </ol>

      <footer className="mt-auto flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5 font-mono text-[0.7rem]">
          {article.tags?.map((tag) => (
            <li
              key={tag}
              className="bg-foreground px-1.5 py-0.5 text-background"
            >
              {tag}
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
      </footer>
    </article>
  );
}
