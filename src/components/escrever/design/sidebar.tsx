"use client";

import {
  FileText,
  Grid3X3,
  Image,
  Palette,
  PenTool,
  SeparatorHorizontal,
  Sparkles,
  Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type DesignTab =
  | "colors"
  | "texture"
  | "grain"
  | "font"
  | "cover"
  | "letterhead"
  | "footer"
  | "signature";

interface TabItem {
  id: DesignTab;
  label: string;
  icon: React.ReactNode;
}

export const DESIGN_TABS: TabItem[] = [
  { id: "colors", label: "Cores", icon: <Palette className="w-4 h-4" /> },
  { id: "texture", label: "Textura", icon: <Grid3X3 className="w-4 h-4" /> },
  {
    id: "grain",
    label: "Granulação",
    icon: <Sparkles className="w-4 h-4" />,
  },
  { id: "font", label: "Fonte", icon: <Type className="w-4 h-4" /> },
  { id: "cover", label: "Capa", icon: <Image className="w-4 h-4" /> },
  {
    id: "letterhead",
    label: "Cabeçalho",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "footer",
    label: "Rodapé",
    icon: <SeparatorHorizontal className="w-4 h-4" />,
  },
  {
    id: "signature",
    label: "Assinatura",
    icon: <PenTool className="w-4 h-4" />,
  },
];

export function DesignSidebar({
  activeTab,
  onTabChange,
}: {
  activeTab: DesignTab;
  onTabChange: (tab: DesignTab) => void;
}) {
  return (
    <nav
      aria-label="Seções do design"
      className="w-48 shrink-0 flex flex-col gap-1"
    >
      {DESIGN_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          aria-current={activeTab === tab.id ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-sm rounded-md transition-colors text-left outline-none focus-visible:ring-2 focus-visible:ring-foreground",
            activeTab === tab.id
              ? "bg-foreground text-background"
              : "text-foreground/70 hover:text-foreground hover:bg-secondary",
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
