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
}

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
  },
  reader: {
    icon: BookOpen,
    tagline: "Leitura",
    description: "Destaque, anote e organize o que você lê.",
    features: ["Destaques no texto", "Anotações", "Listas de leitura"],
    idealFor: "estudar e guardar o que vale reler",
    available: false,
  },
  "dev-tools": {
    icon: Code,
    tagline: "Código",
    description: "Notas de código, exercícios e tutoriais técnicos.",
    features: ["Notas de código", "Exercícios isolados", "Tutoriais técnicos"],
    idealFor: "quem escreve e aprende programação",
    available: false,
  },
  canvas: {
    icon: StickyNote,
    tagline: "Ideias",
    description: "Um quadro de post-its para capturar e conectar ideias.",
    features: ["Post-its livres", "Conexões entre ideias", "Quadros por tema"],
    idealFor: "rascunhar antes de escrever",
    available: false,
  },
};

export function appMeta(app: PlatformApp) {
  const meta = META[app.slug];
  return {
    icon: meta?.icon ?? null,
    tagline: meta?.tagline ?? app.tagline ?? app.category ?? "",
    description: meta?.description ?? app.description ?? "",
    features: meta?.features ?? [],
    idealFor: meta?.idealFor ?? "",
    available: meta?.available ?? false,
  };
}
