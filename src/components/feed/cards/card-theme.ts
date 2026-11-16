import type { DocumentType } from "@/types/api.types";

interface TypeTheme {
  label: string;
  /** Accent text on neutral surfaces (light and dark). */
  text: string;
  /** Solid accent surface with readable dark text. */
  solid: string;
  /** Low-alpha accent wash for text-only cards. */
  wash: string;
  /** sRGB 0..1 of the accent, for the SVG duotone filter. */
  rgb: [number, number, number];
}

export const TYPE_THEME: Record<DocumentType, TypeTheme> = {
  article: {
    label: "Artigo",
    text: "text-blklight-500 dark:text-blklight-400",
    solid: "bg-blklight-400 text-dark",
    wash: "bg-blklight-500/10 dark:bg-blklight-400/10",
    rgb: [0.416, 0.302, 1],
  },
  tutorial: {
    label: "Tutorial",
    text: "text-orange-500 dark:text-orange-400",
    solid: "bg-orange-400 text-dark",
    wash: "bg-orange-500/10 dark:bg-orange-400/10",
    rgb: [1, 0.427, 0],
  },
  project: {
    label: "Projeto",
    text: "text-magenta-500 dark:text-magenta-400",
    solid: "bg-magenta-400 text-dark",
    wash: "bg-magenta-500/10 dark:bg-magenta-400/10",
    rgb: [1, 0.161, 1],
  },
  contract: {
    label: "Contrato",
    text: "text-crimson-500 dark:text-crimson-400",
    solid: "bg-crimson-400 text-dark",
    wash: "bg-crimson-500/10 dark:bg-crimson-400/10",
    rgb: [0.922, 0.118, 0.196],
  },
  note: {
    label: "Nota",
    text: "text-bluesky-500 dark:text-bluesky-400",
    solid: "bg-bluesky-400 text-dark",
    wash: "bg-bluesky-500/10 dark:bg-bluesky-400/10",
    rgb: [0.157, 0.675, 1],
  },
};

export const typeTheme = (type: string): TypeTheme =>
  TYPE_THEME[type as DocumentType] ?? TYPE_THEME.article;
