import {
  BookOpen,
  Code,
  type LucideIcon,
  PenTool,
  StickyNote,
} from "lucide-react";
import type { PlatformApp } from "@/types/api.types";

// shortcut: Portuguese copy lives here until the API seed carries tagline, category and PT descriptions.
const META: Record<
  string,
  { icon: LucideIcon; tagline: string; description: string }
> = {
  publisher: {
    icon: PenTool,
    tagline: "Escrita",
    description: "Escreva e publique artigos, tutoriais e livros.",
  },
  reader: {
    icon: BookOpen,
    tagline: "Leitura",
    description: "Destaque, anote e organize o que você lê.",
  },
  "dev-tools": {
    icon: Code,
    tagline: "Código",
    description: "Notas de código, exercícios e tutoriais técnicos.",
  },
  canvas: {
    icon: StickyNote,
    tagline: "Ideias",
    description: "Um quadro de post-its para capturar e conectar ideias.",
  },
};

export function appMeta(app: PlatformApp) {
  const meta = META[app.slug];
  return {
    icon: meta?.icon ?? null,
    tagline: meta?.tagline ?? app.tagline ?? app.category ?? "",
    description: meta?.description ?? app.description ?? "",
  };
}
