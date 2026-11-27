"use client";

import {
  FileText,
  Grid3X3,
  Image,
  Palette,
  PenTool,
  Sparkles,
  Type,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type DesignTab =
  | "colors"
  | "texture"
  | "grain"
  | "font"
  | "cover"
  | "letterhead"
  | "signature";

interface TabItem {
  /** Text in `design.tabs.<id>`. */
  id: DesignTab;
  icon: React.ReactNode;
}

export const DESIGN_TABS: TabItem[] = [
  { id: "colors", icon: <Palette className="w-4 h-4" /> },
  { id: "texture", icon: <Grid3X3 className="w-4 h-4" /> },
  {
    id: "grain",
    icon: <Sparkles className="w-4 h-4" />,
  },
  { id: "font", icon: <Type className="w-4 h-4" /> },
  { id: "cover", icon: <Image className="w-4 h-4" /> },
  {
    id: "letterhead",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "signature",
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
  const t = useTranslations("design");
  return (
    <nav
      aria-label={t("sections")}
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
          {t(`tabs.${tab.id}`)}
        </button>
      ))}
    </nav>
  );
}
