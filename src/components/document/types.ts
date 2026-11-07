import type { GrainSettings } from "@/features/documents/design/grains";

// Paper Texture Types
export type TextureType = "none" | "dots" | "grid";

export interface PaperTexture {
  type: TextureType;
  size: number;
  opacity: number;
  color: string | null; // null means auto (based on text color)
}

// Letterhead Style Types
export type LetterheadStyleMode = "default" | "custom";
export type HeaderMode = "preset" | "custom";
export type LetterheadBgType = "solid" | "gradient" | "image";
export type GradientDirection =
  | "to-r"
  | "to-l"
  | "to-b"
  | "to-t"
  | "to-br"
  | "to-bl"
  | "to-tr"
  | "to-tl";
export type BorderStyle = "none" | "solid" | "dashed" | "dotted" | "double";
export type TextAlignment = "left" | "center" | "right";

// Per-line text formatting
export interface LineFormat {
  bold: boolean;
  uppercase: boolean;
  size: "xs" | "sm" | "base" | "lg" | "xl";
  opacity: number; // 0-100
  italic: boolean;
  letterSpacing: "normal" | "wide" | "wider" | "widest";
}

export const DEFAULT_LINE_FORMAT: LineFormat = {
  bold: false,
  uppercase: true,
  size: "sm",
  opacity: 100,
  italic: false,
  letterSpacing: "wider",
};

export interface LetterheadStyle {
  mode: LetterheadStyleMode;
  // Background
  bgType: LetterheadBgType;
  bg: string;
  gradientFrom: string;
  gradientTo: string;
  gradientDirection: GradientDirection;
  imageUrl: string;
  imageOverlayColor: string;
  imageOverlayOpacity: number;
  // Text
  text: string;
  textAlign: TextAlignment;
  // Texture
  textureType: TextureType | "none";
  textureOpacity: number;
  // Borders
  borderStyle: BorderStyle;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  // Spacing
  paddingX: number;
  paddingY: number;
}

// Document Header/Footer Types
export interface DocumentHeader {
  enabled: boolean;
  mode: HeaderMode; // NOVO: "preset" ou "custom"
  presetId: string | null; // NOVO: ID do preset selecionado
  lines: string[];
  lineFormats: LineFormat[]; // usado apenas no modo custom
  style: LetterheadStyle; // usado apenas no modo custom
}

export interface DocumentFooter {
  enabled: boolean;
  mode: HeaderMode;
  presetId: string | null;
  lines: string[];
  lineFormats: LineFormat[];
  style: LetterheadStyle;
}

export interface DocumentSignature {
  /** The only switch. The signature itself is always automatic (signature.ts). */
  enabled: boolean;
  // Legacy fields: kept only for compatibility with saved documents and the
  // read derivation; NEVER read for display.
  label: string;
  authorName: string;
  authorId: string;
  locationCode: string;
  organization: string;
  showTimestamp: boolean;
}

// Saved Letterhead Styles
export interface SavedLetterheadStyle {
  id: string;
  name: string;
  style: LetterheadStyle;
}

// Header Preset Types
export interface HeaderPreset {
  id: string;
  name: string;
  description: string;
  header: Omit<DocumentHeader, "enabled">;
}

// Paper Style Types
export type PaperMode = "default" | "preset" | "custom";

export interface PaperStyle {
  mode: PaperMode;
  presetId: string | null;
  bg: string | null;
  text: string | null;
  grains?: string[];
  /** Per-grain light/dark overrides (see grains.ts). Absent = defaults. */
  grainSettings?: GrainSettings;
}

// Custom color interface
export interface CustomPaperColor {
  id: string;
  bg: string;
  text: string;
  name: string;
}

// Paper Colors computed type
export interface PaperColors {
  bg: string;
  text: string;
  muted: string;
  border: string;
}

// Read-time normalization of LetterheadStyle with backward compatibility for
// data saved before the rename: customBg/customText are the legacy spelling of
// bg/text. New writes always use the new names; reads accept both. Idempotent.
export function normalizeLetterheadStyle(raw: unknown): LetterheadStyle {
  const s = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  const str = (v: unknown, fallback: string): string =>
    typeof v === "string" ? v : fallback;
  const num = (v: unknown, fallback: number): number =>
    typeof v === "number" ? v : fallback;
  const bg =
    typeof s.bg === "string"
      ? s.bg
      : typeof s.customBg === "string"
        ? s.customBg
        : "#1a1a1a";
  const text =
    typeof s.text === "string"
      ? s.text
      : typeof s.customText === "string"
        ? s.customText
        : "#ffffff";
  const bgType =
    s.bgType === "gradient" || s.bgType === "image" ? s.bgType : "solid";
  const textureType =
    s.textureType === "dots" || s.textureType === "grid"
      ? s.textureType
      : "none";
  const borderStyle =
    s.borderStyle === "solid" ||
    s.borderStyle === "dashed" ||
    s.borderStyle === "dotted" ||
    s.borderStyle === "double"
      ? s.borderStyle
      : "none";
  return {
    mode: s.mode === "default" || s.mode === "custom" ? s.mode : "custom",
    bgType: bgType as LetterheadBgType,
    bg,
    gradientFrom: str(s.gradientFrom, "#FF6B35"),
    gradientTo: str(s.gradientTo, "#F7C948"),
    gradientDirection:
      s.gradientDirection === "to-r" ||
      s.gradientDirection === "to-l" ||
      s.gradientDirection === "to-b" ||
      s.gradientDirection === "to-t" ||
      s.gradientDirection === "to-br" ||
      s.gradientDirection === "to-bl" ||
      s.gradientDirection === "to-tr" ||
      s.gradientDirection === "to-tl"
        ? s.gradientDirection
        : "to-r",
    imageUrl: str(s.imageUrl, ""),
    imageOverlayColor: str(s.imageOverlayColor, "#000000"),
    imageOverlayOpacity: num(s.imageOverlayOpacity, 0.4),
    text,
    textAlign:
      s.textAlign === "left" || s.textAlign === "right"
        ? s.textAlign
        : "center",
    textureType: textureType as TextureType | "none",
    textureOpacity: num(s.textureOpacity, 0.1),
    borderStyle: borderStyle as BorderStyle,
    borderWidth: num(s.borderWidth, 0),
    borderColor: str(s.borderColor, "#000000"),
    borderRadius: num(s.borderRadius, 0),
    paddingX: num(s.paddingX, 24),
    paddingY: num(s.paddingY, 16),
  };
}
