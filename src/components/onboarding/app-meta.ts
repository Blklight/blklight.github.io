import {
  BookOpen,
  Code,
  type LucideIcon,
  PenTool,
  StickyNote,
} from "lucide-react";
import type { PlatformApp } from "@/types/api.types";

interface Meta {
  icon: LucideIcon;
  tagline: string;
  description: string;
  features: string[];
  idealFor: string;
  /** Whether the app already has screens in this front-end. */
  available: boolean;
  /** Per-app accent: text color on light cards and on the inverted (selected) card. */
  accent: { text: string; inverted: string; badge: string };
}

const ACCENTS = {
  blklight: {
    text: "text-blklight-500 dark:text-blklight-400",
    inverted: "text-blklight-400 dark:text-blklight-500",
    badge: "bg-blklight-400 border-blklight-400",
  },
  bluesky: {
    text: "text-bluesky-500 dark:text-bluesky-400",
    inverted: "text-bluesky-400 dark:text-bluesky-500",
    badge: "bg-bluesky-400 border-bluesky-400",
  },
  orange: {
    text: "text-orange-500 dark:text-orange-400",
    inverted: "text-orange-400 dark:text-orange-500",
    badge: "bg-orange-400 border-orange-400",
  },
  magenta: {
    text: "text-magenta-500 dark:text-magenta-400",
    inverted: "text-magenta-400 dark:text-magenta-500",
    badge: "bg-magenta-400 border-magenta-400",
  },
};

// shortcut: Portuguese copy lives here until the API seed carries tagline, category and PT descriptions.
const META: Record<string, Meta> = {
  publisher: {
    icon: PenTool,
    tagline: "Escrita",
    description: "Escreva e publique artigos, tutoriais e livros.",
    features: [
      "Editor com fonte, papel e capa",
      "Papel timbrado e assinatura",
      "Publicação no feed e no perfil",
    ],
    idealFor: "ensaios, artigos e tutoriais com cara própria",
    available: true,
    accent: ACCENTS.blklight,
  },
  reader: {
    icon: BookOpen,
    tagline: "Leitura",
    description: "Destaque, anote e organize o que você lê.",
    features: ["Destaques no texto", "Anotações", "Listas de leitura"],
    idealFor: "estudar e guardar o que vale reler",
    available: false,
    accent: ACCENTS.bluesky,
  },
  "dev-tools": {
    icon: Code,
    tagline: "Código",
    description: "Notas de código, exercícios e tutoriais técnicos.",
    features: ["Notas de código", "Exercícios isolados", "Tutoriais técnicos"],
    idealFor: "quem escreve e aprende programação",
    available: false,
    accent: ACCENTS.orange,
  },
  canvas: {
    icon: StickyNote,
    tagline: "Ideias",
    description: "Um quadro de post-its para capturar e conectar ideias.",
    features: ["Post-its livres", "Conexões entre ideias", "Quadros por tema"],
    idealFor: "rascunhar antes de escrever",
    available: false,
    accent: ACCENTS.magenta,
  },
};

export function appMeta(
  app: Pick<PlatformApp, "slug" | "description"> &
    Partial<Pick<PlatformApp, "tagline" | "category">>,
) {
  const meta = META[app.slug];
  return {
    icon: meta?.icon ?? null,
    tagline: meta?.tagline ?? app.tagline ?? app.category ?? "",
    description: meta?.description ?? app.description ?? "",
    features: meta?.features ?? [],
    idealFor: meta?.idealFor ?? "",
    available: meta?.available ?? false,
    accent: meta?.accent ?? ACCENTS.blklight,
  };
}
