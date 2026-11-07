import type React from "react";
import type { LineFormat } from "./types";

/**
 * Inline style of one letterhead line from its LineFormat.
 * Shared by the custom-mode renderers (letterhead-renderer.tsx) and the
 * presets that honor lineFormats (Blklight). Values unchanged from the
 * original maps in letterhead-renderer.tsx. Isomorphic (no "use client").
 */
export const SIZE_MAP: Record<string, string> = {
  xs: "10px",
  sm: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
};

export const SPACING_MAP: Record<string, string> = {
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

export function lineFormatToStyle(
  fmt: LineFormat,
  index: number,
): React.CSSProperties {
  return {
    fontWeight: fmt.bold ? 700 : 400,
    textTransform: fmt.uppercase ? "uppercase" : "none",
    fontSize: SIZE_MAP[fmt.size] || "14px",
    opacity: fmt.opacity / 100,
    fontStyle: fmt.italic ? "italic" : "normal",
    letterSpacing: SPACING_MAP[fmt.letterSpacing] || "0.05em",
    marginTop: index > 0 ? "4px" : 0,
  };
}
