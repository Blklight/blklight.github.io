import type { DocumentType } from "@/types/api.types";

/**
 * One entry per document type and the URL of its writing page; its words live
 * in the `kinds.<type>` messages. Per-type features (e.g. tutorial exercises) hang off this map.
 */
export interface DocumentKind {
  type: DocumentType;
  /** /escrever/<slug> */
  slug: string;
}

export const DOCUMENT_KINDS: DocumentKind[] = [
  {
    type: "article",
    slug: "artigo",
  },
  {
    type: "tutorial",
    slug: "tutorial",
  },
  {
    type: "project",
    slug: "projeto",
  },
  {
    type: "note",
    slug: "nota",
  },
  {
    type: "contract",
    slug: "contrato",
  },
];

export const kindBySlug = (slug: string) =>
  DOCUMENT_KINDS.find((kind) => kind.slug === slug);

export const kindByType = (type: string) =>
  DOCUMENT_KINDS.find((kind) => kind.type === type) ?? DOCUMENT_KINDS[0];
