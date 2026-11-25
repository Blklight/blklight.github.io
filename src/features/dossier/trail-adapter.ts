import type {
  Article,
  DossierCoverData,
  DossierSection,
  DossierSheetData,
  Trail,
  TrailStatus,
} from "./types";

export interface TrailSheet {
  article: Article;
  intro?: string;
  order: number;
}

export interface TrailDossier {
  cover: DossierCoverData;
  sections: DossierSection[];
  sheets: DossierSheetData<TrailSheet>[];
}

export const TRAIL_STATUS_LABEL: Record<TrailStatus, string> = {
  draft: "Rascunho",
  active: "Em curso",
  completed: "Concluída",
  locked: "Bloqueada",
};

/** Articles are referenced, never copied: two trails share the same Article object. */
export function trailToDossier(
  trail: Trail,
  articles: ReadonlyMap<string, Article>,
): TrailDossier {
  const sheets = [...trail.items]
    .sort((a, b) => a.order - b.order)
    .flatMap((item) => {
      const article = articles.get(item.articleId);
      if (!article) return [];
      return [
        {
          id: article.id,
          slug: article.slug,
          title: article.title,
          sectionId: item.sectionId,
          headings: article.headings,
          data: { article, intro: item.intro, order: item.order },
        },
      ];
    });

  return {
    cover: {
      code: trail.code,
      title: trail.title,
      statusLabel: TRAIL_STATUS_LABEL[trail.status],
      subtitle: `Trilha · ${sheets.length} documentos`,
    },
    sections: trail.sections.map(({ id, title, color }) => ({
      id,
      title,
      color,
    })),
    sheets,
  };
}
