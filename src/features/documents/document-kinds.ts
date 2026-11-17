import type { DocumentType } from "@/types/api.types";

/**
 * One entry per document type: the URL of its writing page and the words the
 * editor uses. Per-type features (e.g. tutorial exercises) hang off this map.
 */
export interface DocumentKind {
  type: DocumentType;
  /** /escrever/<slug> */
  slug: string;
  label: string;
  /** "Novo artigo", "Nova nota"… */
  newLabel: string;
  description: string;
  titlePlaceholder: string;
  abstractPlaceholder: string;
  contentPlaceholder: string;
}

export const DOCUMENT_KINDS: DocumentKind[] = [
  {
    type: "article",
    slug: "artigo",
    label: "Artigo",
    newLabel: "Novo artigo",
    description: "Ensaios, análises e opinião, com o papel que você escolher.",
    titlePlaceholder: "Título do artigo",
    abstractPlaceholder: "Resumo em uma frase",
    contentPlaceholder: "Comece a escrever…",
  },
  {
    type: "tutorial",
    slug: "tutorial",
    label: "Tutorial",
    newLabel: "Novo tutorial",
    description: "Passo a passo para ensinar algo do começo ao fim.",
    titlePlaceholder: "O que este tutorial ensina?",
    abstractPlaceholder: "Para quem é e o que a pessoa vai conseguir fazer",
    contentPlaceholder: "Comece pelo primeiro passo…",
  },
  {
    type: "project",
    slug: "projeto",
    label: "Projeto",
    newLabel: "Novo projeto",
    description:
      "Mostre algo que você construiu: processo, imagens e resultado.",
    titlePlaceholder: "Nome do projeto",
    abstractPlaceholder: "O projeto em uma frase",
    contentPlaceholder: "Conte como o projeto nasceu…",
  },
  {
    type: "note",
    slug: "nota",
    label: "Nota",
    newLabel: "Nova nota",
    description: "Um registro curto. Não aparece no feed.",
    titlePlaceholder: "Título da nota",
    abstractPlaceholder: "Resumo (opcional)",
    contentPlaceholder: "Anote…",
  },
  {
    type: "contract",
    slug: "contrato",
    label: "Contrato",
    newLabel: "Novo contrato",
    description: "Termos e acordos com assinatura. Não aparece no feed.",
    titlePlaceholder: "Título do contrato",
    abstractPlaceholder: "Partes e objeto, em uma frase",
    contentPlaceholder: "Cláusula 1…",
  },
];

export const kindBySlug = (slug: string) =>
  DOCUMENT_KINDS.find((kind) => kind.slug === slug);

export const kindByType = (type: string) =>
  DOCUMENT_KINDS.find((kind) => kind.type === type) ?? DOCUMENT_KINDS[0];
