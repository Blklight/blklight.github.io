import type { DocumentType } from "@/types/api.types";

interface TypeTheme {
  label: string;
  /** Accent text on neutral surfaces (light and dark). */
  text: string;
  /** Solid accent surface with readable dark text. */
  solid: string;
  /** Low-alpha accent wash for text-only cards. */
  wash: string;
  /** Accent text on a dark (ink) surface. */
  onDark: string;
  /** sRGB 0..1 of the accent, for the SVG duotone filter. */
  rgb: [number, number, number];
}

export const TYPE_THEME: Record<DocumentType, TypeTheme> = {
  article: {
    label: "Artigo",
    text: "text-cyber-yellow-700 dark:text-cyber-yellow-400",
    solid: "bg-cyber-yellow-400 text-dark",
    wash: "bg-cyber-yellow-50 dark:bg-cyber-yellow-400/10",
    onDark: "text-cyber-yellow-400",
    rgb: [0.992, 0.973, 0],
  },
  tutorial: {
    label: "Tutorial",
    text: "text-orange-500 dark:text-orange-400",
    solid: "bg-orange-400 text-dark",
    wash: "bg-orange-50 dark:bg-orange-400/10",
    onDark: "text-orange-400",
    rgb: [1, 0.427, 0],
  },
  project: {
    label: "Projeto",
    text: "text-magenta-500 dark:text-magenta-400",
    solid: "bg-magenta-400 text-dark",
    wash: "bg-magenta-50 dark:bg-magenta-400/10",
    onDark: "text-magenta-400",
    rgb: [1, 0.161, 1],
  },
  contract: {
    label: "Contrato",
    text: "text-crimson-500 dark:text-crimson-400",
    solid: "bg-crimson-400 text-dark",
    wash: "bg-crimson-500/10 dark:bg-crimson-400/10",
    onDark: "text-crimson-400",
    rgb: [0.922, 0.118, 0.196],
  },
  note: {
    label: "Nota",
    text: "text-bluesky-500 dark:text-bluesky-400",
    solid: "bg-bluesky-400 text-dark",
    wash: "bg-bluesky-500/10 dark:bg-bluesky-400/10",
    onDark: "text-bluesky-400",
    rgb: [0.157, 0.675, 1],
  },
};

/** Types the public feed exposes (TCC: artigo amarelo, tutorial laranja, projeto magenta). */
export const FEED_TYPES = ["article", "tutorial", "project"] as const;

export const typeTheme = (type: string): TypeTheme =>
  TYPE_THEME[type as DocumentType] ?? TYPE_THEME.article;
