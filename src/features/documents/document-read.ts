import type { JSONContent } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import ImageExtension from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import {
  getAccessibleBorderColor,
  getAccessibleTextColor,
  getMutedTextColor,
} from "@/components/document/color-utils";
import { FONT_OPTIONS } from "@/components/document/constants";
import type {
  DocumentFooter,
  DocumentHeader,
  DocumentSignature,
  PaperColors,
  PaperTexture,
} from "@/components/document/types";
import { normalizeLetterheadStyle } from "@/components/document/types";
import type {
  DocumentFull,
  Typography as TypographyId,
} from "@/types/api.types";

/**
 * Server-safe (no "use client") helpers for the public read view.
 *
 * These mirror the exact extension set and design-token math used by the
 * editor (`document-editor.tsx` / `use-document-design.ts`) so a document looks
 * the same in the editor and in the public page. The shared pure primitives
 * (`color-utils`, `constants`, `types.normalizeLetterheadStyle`) are imported
 * directly; the pieces that live inside "use client" modules (the zustand
 * store's `normalizePaperStyle` and the cover defaults) cannot cross the RSC
 * boundary, so their read-side equivalents are computed here.
 */

/**
 * TipTap extensions `generateHTML` must recognize to render real document
 * content without losing formatting. Mirrors the editor's `useEditor` config:
 *  - StarterKit (v3 bundles Link): doc, paragraph, text, heading 1-3, bold,
 *    italic, strike, code, codeBlock, blockquote, bulletList, orderedList,
 *    listItem, hardBreak, horizontalRule, link
 *  - Image: image node
 *  - Highlight: highlight mark
 *  - Typography: typography marks
 *  - TextAlign: textAlign attr on heading/paragraph
 * (Placeholder is editor-only and contributes no nodes/marks.)
 */
function readExtensions() {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      link: {
        openOnClick: false,
        HTMLAttributes: {
          class:
            "underline underline-offset-4 hover:opacity-80 transition-colors",
        },
      },
    }),
    ImageExtension.configure({
      HTMLAttributes: { class: "max-w-full h-auto my-6" },
    }),
    Highlight.configure({ HTMLAttributes: { class: "bg-accent/20 px-1" } }),
    Typography,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
  ];
}

/** Render TipTap JSON content to an HTML string on the server. */
export function renderDocumentContent(content: unknown): string {
  if (!content || typeof content !== "object") return "";
  try {
    return generateHTML(content as JSONContent, readExtensions());
  } catch {
    // Malformed content should degrade to empty, not crash the page.
    return "";
  }
}

export interface ReadCoverSettings {
  position: string;
  borderRadius: number;
  height: number;
  filter: string;
}

export interface ReadDesign {
  typography: TypographyId;
  fontClass: string;
  paperColors: PaperColors | null;
  paperTexture: PaperTexture;
  textureStyle: Record<string, string | undefined>;
  header: DocumentHeader;
  footer: DocumentFooter;
  signature: DocumentSignature | null;
  coverImage: string | null;
  cover: ReadCoverSettings;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === "number" ? value : fallback;
}

function normalizeCover(raw: unknown): ReadCoverSettings {
  const c = asRecord(raw);
  const filter = c.filter;
  return {
    position: typeof c.position === "string" ? c.position : "center",
    borderRadius: asNumber(c.borderRadius, 0),
    height: asNumber(c.height, 280),
    filter: filter === "grayscale" || filter === "sepia" ? filter : "none",
  };
}

function toHeader(raw: unknown): DocumentHeader {
  const h = asRecord(raw);
  return {
    enabled: h.enabled === true,
    mode: h.mode === "preset" ? "preset" : "custom",
    presetId: asString(h.presetId),
    lines: Array.isArray(h.lines) ? (h.lines as string[]) : [],
    lineFormats: Array.isArray(h.lineFormats)
      ? (h.lineFormats as DocumentHeader["lineFormats"])
      : [],
    style: normalizeLetterheadStyle(h.style),
  };
}

function toFooter(raw: unknown): DocumentFooter {
  const f = asRecord(raw);
  return {
    enabled: f.enabled === true,
    mode: f.mode === "preset" ? "preset" : "custom",
    presetId: asString(f.presetId),
    lines: Array.isArray(f.lines) ? (f.lines as string[]) : [],
    lineFormats: Array.isArray(f.lineFormats)
      ? (f.lineFormats as DocumentFooter["lineFormats"])
      : [],
    style: normalizeLetterheadStyle(f.style),
  };
}

function toSignature(raw: unknown): DocumentSignature | null {
  if (!raw || typeof raw !== "object") return null;
  const s = asRecord(raw);
  return {
    enabled: s.enabled === true,
    label: asString(s.label) ?? "",
    authorName: asString(s.authorName) ?? "",
    authorId: asString(s.authorId) ?? "",
    locationCode: asString(s.locationCode) ?? "",
    organization: asString(s.organization) ?? "",
    showTimestamp: s.showTimestamp !== false,
  };
}

/**
 * Derive the read-view design tokens (paper colors, font, texture, letterhead,
 * signature, cover) from a DocumentFull's style. Mirrors the token math in
 * `use-document-design.ts` (paperColors / fontClass / textureStyle).
 */
export function deriveReadDesign(document: DocumentFull): ReadDesign {
  const style = document.style;

  // Paper colors: same field precedence as the store's normalizePaperStyle
  // (bg, with legacy customBg fallback; text, with legacy customText fallback).
  const ps = asRecord(style.paperStyle);
  const bg = asString(ps.bg) ?? asString(ps.customBg);
  const text = asString(ps.text) ?? asString(ps.customText);
  const paperColors: PaperColors | null = bg
    ? {
        bg,
        text: text || getAccessibleTextColor(bg),
        muted: getMutedTextColor(text || getAccessibleTextColor(bg)),
        border: getAccessibleBorderColor(bg),
      }
    : null;

  const typography: TypographyId =
    style.typography === "serif" || style.typography === "mono"
      ? style.typography
      : "sans";
  const fontClass =
    FONT_OPTIONS.find((f) => f.id === typography)?.family || "font-sans";

  const pt = asRecord(style.paperTexture);
  const paperTexture: PaperTexture = {
    type: pt.type === "dots" || pt.type === "grid" ? pt.type : "none",
    size: asNumber(pt.size, 24),
    opacity: asNumber(pt.opacity, 0.15),
    color: asString(pt.color),
  };

  // Texture overlay style (mirrors use-document-design.textureStyle).
  let textureStyle: Record<string, string | undefined> = {};
  if (paperTexture.type !== "none") {
    const color = paperTexture.color || paperColors?.text || "currentColor";
    if (paperTexture.type === "dots") {
      textureStyle = {
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: `${paperTexture.size}px ${paperTexture.size}px`,
      };
    } else {
      textureStyle = {
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
        backgroundSize: `${paperTexture.size}px ${paperTexture.size}px`,
      };
    }
  }

  return {
    typography,
    fontClass,
    paperColors,
    paperTexture,
    textureStyle,
    header: toHeader(style.documentHeader),
    footer: toFooter(style.documentFooter),
    signature: toSignature(style.documentSignature),
    coverImage: document.coverImageUrl,
    cover: normalizeCover(style.coverSettings),
  };
}

/** Cover filter CSS (mirrors preview.tsx getStaticCoverFilter). */
export function coverFilterCss(cover: ReadCoverSettings): string {
  if (cover.filter === "grayscale") return "grayscale(100%)";
  if (cover.filter === "sepia") return "sepia(100%)";
  return "none";
}
