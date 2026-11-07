"use client";

import { Palette } from "lucide-react";
import type React from "react";
import type { PaperColors } from "@/components/document/types";

export interface DocumentPaperHeaderProps {
  paperColors: PaperColors | null;
  onOpenTemplates?: () => void;
  designTrigger?: React.ReactNode;
}

export function DocumentPaperHeader({
  paperColors,
  onOpenTemplates,
  designTrigger,
}: DocumentPaperHeaderProps) {
  return (
    <div
      className="px-4 py-2 flex items-center justify-between transition-colors duration-300 relative z-10"
      style={{
        borderTop: `1px solid ${paperColors?.border || "hsl(var(--border) / 0.5)"}`,
        borderLeft: `1px solid ${paperColors?.border || "hsl(var(--border) / 0.5)"}`,
        borderRight: `1px solid ${paperColors?.border || "hsl(var(--border) / 0.5)"}`,
        backgroundColor: paperColors ? `${paperColors.bg}` : undefined,
      }}
    >
      {/* Left: dots + label */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                paperColors?.muted || "hsl(var(--foreground) / 0.75)",
            }}
          />
          <div
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                paperColors?.muted || "hsl(var(--foreground) / 0.75)",
            }}
          />
          <div
            className="w-2 h-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor:
                paperColors?.muted || "hsl(var(--foreground) / 0.75)",
            }}
          />
        </div>
        <span
          className="font-mono text-[10px] uppercase tracking-wider transition-colors duration-300"
          style={{ color: paperColors?.muted || undefined }}
        >
          Rascunho
        </span>
      </div>

      {/* Right: theme picker + design overlay triggers */}
      <div className="flex items-center gap-1">
        {onOpenTemplates && (
          <button
            type="button"
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-xs hover:bg-black/5"
          >
            <Palette className="w-3.5 h-3.5" />
            <span className="text-[10px] font-mono uppercase tracking-wider">
              Temas
            </span>
          </button>
        )}
        {designTrigger}
      </div>
    </div>
  );
}
