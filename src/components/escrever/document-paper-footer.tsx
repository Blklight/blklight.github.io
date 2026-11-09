"use client";

import { Clock } from "lucide-react";
import type { PaperColors } from "@/components/document/types";

export interface DocumentPaperFooterProps {
  wordCount: number;
  charCount: number;
  paperColors: PaperColors | null;
}

export function DocumentPaperFooter({
  wordCount,
  charCount,
  paperColors,
}: DocumentPaperFooterProps) {
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div
      className="px-8 md:px-16 py-3 flex items-center justify-between transition-colors duration-300 relative z-10"
      style={{
        borderBottom: `1px solid ${paperColors?.border || "hsl(var(--border) / 0.5)"}`,
        borderLeft: `1px solid ${paperColors?.border || "hsl(var(--border) / 0.5)"}`,
        borderRight: `1px solid ${paperColors?.border || "hsl(var(--border) / 0.5)"}`,
        backgroundColor: paperColors ? `${paperColors.bg}` : undefined,
      }}
    >
      <div
        className="flex items-center gap-4 text-[10px] font-mono tracking-wider transition-colors duration-300"
        style={{ color: paperColors?.muted || undefined }}
      >
        <span>{wordCount} palavras</span>
        <span className="hidden sm:inline">{charCount} caracteres</span>
      </div>
      <div
        className="flex items-center gap-2 text-[10px] font-mono tracking-wider transition-colors duration-300"
        style={{ color: paperColors?.muted || undefined }}
      >
        <Clock className="w-3 h-3" />
        <span>~{readingTime} min leitura</span>
      </div>
    </div>
  );
}
