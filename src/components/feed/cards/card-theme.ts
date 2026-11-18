import {
  BookOpen,
  FileSignature,
  Hammer,
  type LucideIcon,
  Newspaper,
  StickyNote,
} from "lucide-react";
import type { DocumentType } from "@/types/api.types";

interface TypeTheme {
  label: string;
  /** Non-color cue: the type stays identifiable when its ink is off. */
  icon: LucideIcon;
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
    icon: Newspaper,
    label: "Artigo",
    text: "text-cyber-yellow-700 dark:text-cyber-yellow-400",
    solid: "bg-cyber-yellow-400 text-dark",
    wash: "bg-cyber-yellow-50 dark:bg-cyber-yellow-400/10",
    onDark: "text-cyber-yellow-400",
    rgb: [0.992, 0.973, 0],
  },
  tutorial: {
    icon: BookOpen,
    label: "Tutorial",
    text: "text-orange-500 dark:text-orange-400",
    solid: "bg-orange-400 text-dark",
    wash: "bg-orange-50 dark:bg-orange-400/10",
    onDark: "text-orange-400",
    rgb: [1, 0.427, 0],
  },
  project: {
    icon: Hammer,
    label: "Projeto",
    text: "text-magenta-500 dark:text-magenta-400",
    solid: "bg-magenta-400 text-dark",
    wash: "bg-magenta-50 dark:bg-magenta-400/10",
    onDark: "text-magenta-400",
    rgb: [1, 0.161, 1],
  },
  contract: {
    icon: FileSignature,
    label: "Contrato",
    text: "text-crimson-500 dark:text-crimson-400",
    solid: "bg-crimson-400 text-dark",
    wash: "bg-crimson-500/10 dark:bg-crimson-400/10",
    onDark: "text-crimson-400",
    rgb: [0.922, 0.118, 0.196],
  },
  note: {
    icon: StickyNote,
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

export interface Surface {
  id: string;
  /** Solid surface with dark ink on top. */
  solid: string;
  /** Pale tint for text-first cards. */
  wash: string;
  /** Accent text on light surfaces. */
  text: string;
  /** Accent text on ink surfaces. */
  onDark: string;
  /** sRGB 0..1, for the SVG duotone filter. */
  rgb: [number, number, number];
}

/**
 * Card surfaces, independent of the document type: the type keeps its color on
 * the tab, the card body can wear any of these.
 */
export const SURFACES: Surface[] = [
  {
    id: "ultravioleta",
    solid: "bg-blklight-300 text-dark",
    wash: "bg-blklight-50 dark:bg-blklight-400/10",
    text: "text-blklight-600 dark:text-blklight-300",
    onDark: "text-blklight-300",
    rgb: [0.416, 0.302, 1],
  },
  {
    id: "ceu",
    solid: "bg-bluesky-300 text-dark",
    wash: "bg-bluesky-50 dark:bg-bluesky-400/10",
    text: "text-bluesky-600 dark:text-bluesky-300",
    onDark: "text-bluesky-300",
    rgb: [0.157, 0.675, 1],
  },
  {
    id: "amarelo",
    solid: "bg-cyber-yellow-400 text-dark",
    wash: "bg-cyber-yellow-50 dark:bg-cyber-yellow-400/10",
    text: "text-cyber-yellow-700 dark:text-cyber-yellow-300",
    onDark: "text-cyber-yellow-400",
    rgb: [0.992, 0.973, 0],
  },
  {
    id: "laranja",
    solid: "bg-orange-400 text-dark",
    wash: "bg-orange-50 dark:bg-orange-400/10",
    text: "text-orange-600 dark:text-orange-300",
    onDark: "text-orange-400",
    rgb: [1, 0.427, 0],
  },
  {
    id: "magenta",
    solid: "bg-magenta-300 text-dark",
    wash: "bg-magenta-50 dark:bg-magenta-400/10",
    text: "text-magenta-600 dark:text-magenta-300",
    onDark: "text-magenta-400",
    rgb: [1, 0.161, 1],
  },
  {
    id: "carmim",
    solid: "bg-crimson-300 text-dark",
    wash: "bg-crimson-50 dark:bg-crimson-400/10",
    text: "text-crimson-600 dark:text-crimson-300",
    onDark: "text-crimson-400",
    rgb: [0.922, 0.118, 0.196],
  },
  {
    id: "esmeralda",
    solid: "bg-emerald-300 text-dark",
    wash: "bg-emerald-50 dark:bg-emerald-400/10",
    text: "text-emerald-700 dark:text-emerald-300",
    onDark: "text-emerald-300",
    rgb: [0.204, 0.827, 0.6],
  },
  {
    id: "lima",
    solid: "bg-lime-300 text-dark",
    wash: "bg-lime-50 dark:bg-lime-400/10",
    text: "text-lime-700 dark:text-lime-300",
    onDark: "text-lime-300",
    rgb: [0.745, 0.949, 0.392],
  },
  {
    id: "sepia",
    solid: "bg-sepia text-dark",
    wash: "bg-sepia/60 dark:bg-sepia/10",
    text: "text-dark/70 dark:text-sepia",
    onDark: "text-sepia",
    rgb: [0.984, 0.941, 0.851],
  },
];

export const surfaceFor = (seed: number): Surface =>
  SURFACES[seed % SURFACES.length];
