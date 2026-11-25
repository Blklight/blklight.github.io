export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export type ArticleType = "lesson" | "exercise" | "reference" | "note";

export interface Article {
  id: string;
  slug: string;
  title: string;
  type: ArticleType;
  /** Minutes. */
  readingTime: number;
  headings: Heading[];
  tags?: string[];
  /** Loaded on demand; never present in the list payload. */
  body?: string;
}

export interface TrailSection {
  id: string;
  title: string;
  color?: string;
}

export interface TrailItem {
  articleId: string;
  order: number;
  sectionId?: string;
  /** The trail's own note about the article, shown on its sheet. */
  intro?: string;
}

export type TrailStatus = "draft" | "active" | "completed" | "locked";

export interface Trail {
  id: string;
  slug: string;
  code: string;
  title: string;
  status: TrailStatus;
  sections: TrailSection[];
  items: TrailItem[];
}

export interface Stamp {
  label: string;
  tone: "ok" | "warn" | "danger" | "neutral";
}

/* The Dossier itself knows only these shapes; a trail is one adapter onto them. */

export interface DossierSection {
  id: string;
  title: string;
  color?: string;
}

export interface DossierSheetData<T = unknown> {
  id: string;
  slug: string;
  title: string;
  sectionId?: string;
  headings: Heading[];
  data: T;
}

export interface DossierCoverData {
  code: string;
  title: string;
  statusLabel: string;
  subtitle?: string;
}

export interface DossierTab {
  id: string;
  label: string;
}
