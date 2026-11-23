"use client";

import { Clock } from "lucide-react";

export interface DocumentPaperFooterProps {
  wordCount: number;
  charCount: number;
}

/** Status bar under the paper: same inverted, grained surface as the top bar. */
export function DocumentPaperFooter({
  wordCount,
  charCount,
}: DocumentPaperFooterProps) {
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="relative flex items-center justify-between gap-4 rounded-b-xl bg-foreground px-5 py-2 font-mono text-[0.7rem] uppercase tracking-wider text-background letterhead-grain-noise letterhead-grain-overlay shadow-[0_18px_36px_-20px_rgb(0_0_0/0.5)]">
      <div className="relative z-1 flex items-center gap-4 opacity-80">
        <span>{wordCount} palavras</span>
        <span className="hidden sm:inline">{charCount} caracteres</span>
      </div>
      <div className="relative z-1 flex items-center gap-2 opacity-80">
        <Clock aria-hidden className="size-3" />
        <span>~{readingTime} min de leitura</span>
      </div>
    </div>
  );
}
