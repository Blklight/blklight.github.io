"use client";

import { useEffect, useState } from "react";
import { rangeFromQuote } from "@/features/notes/anchor";
import type { Annotation } from "@/features/notes/types";

/** Bumps whenever `root`'s content changes (e.g. the body finished loading). */
export function useContentVersion(root: HTMLElement | null) {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (!root) return;
    const observer = new MutationObserver(() => setVersion((v) => v + 1));
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [root]);
  return version;
}

/**
 * Paints each anchored note over the text with the CSS Custom Highlight API,
 * so the document's HTML is never touched. Without browser support, nothing
 * is painted (the papers still work).
 */
export function useTextHighlights(
  root: HTMLElement | null,
  notes: Annotation[],
  version: number,
) {
  // biome-ignore lint/correctness/useExhaustiveDependencies: repaint when the text changes
  useEffect(() => {
    if (!root || typeof CSS === "undefined" || !("highlights" in CSS)) return;
    const colors = [...new Set(notes.map((n) => n.color ?? "currentColor"))];
    const names = colors.map((_, i) => `note-${i}`);
    colors.forEach((color, i) => {
      const ranges = notes
        .filter((n) => (n.color ?? "currentColor") === color && n.anchor)
        .map((n) => (n.anchor ? rangeFromQuote(root, n.anchor) : null))
        .filter((r): r is Range => r !== null);
      CSS.highlights.set(names[i], new Highlight(...ranges));
    });
    const style = document.createElement("style");
    style.textContent = colors
      .map(
        (color, i) =>
          `::highlight(${names[i]}){background-color:color-mix(in oklab,${color} 55%,transparent);color:inherit}`,
      )
      .join("\n");
    document.head.append(style);
    return () => {
      for (const name of names) CSS.highlights.delete(name);
      style.remove();
    };
  }, [root, notes, version]);
}
