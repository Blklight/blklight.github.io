"use client";

import type React from "react";
import {
  type LetterheadTextContext,
  resolveLetterheadLines,
} from "@/features/documents/design/letterhead-text";
import { DEFAULT_LETTERHEAD_STYLE } from "./constants";
import { FOOTER_PRESET_COMPONENTS } from "./footer-presets";
import { HEADER_PRESET_COMPONENTS } from "./header-presets";
import { lineFormatToStyle } from "./line-format-style";
import type {
  DocumentFooter,
  DocumentHeader,
  GradientDirection,
  LetterheadStyle,
  LineFormat,
} from "./types";
import { normalizeLetterheadStyle } from "./types";

const GRADIENT_DIR_MAP: Record<GradientDirection, string> = {
  "to-r": "to right",
  "to-l": "to left",
  "to-b": "to bottom",
  "to-t": "to top",
  "to-br": "to bottom right",
  "to-bl": "to bottom left",
  "to-tr": "to top right",
  "to-tl": "to top left",
};

function getLetterheadContainerStyle(
  style: LetterheadStyle,
): React.CSSProperties {
  const base: React.CSSProperties = {
    color: style.text,
    textAlign: style.textAlign,
    padding: `${style.paddingY}px ${style.paddingX}px`,
    borderRadius: style.borderRadius,
  };

  if (style.borderStyle !== "none") {
    base.borderStyle = style.borderStyle;
    base.borderWidth = style.borderWidth;
    base.borderColor = style.borderColor;
  }

  if (style.bgType === "gradient") {
    const dir = GRADIENT_DIR_MAP[style.gradientDirection] || "to right";
    base.background = `linear-gradient(${dir}, ${style.gradientFrom}, ${style.gradientTo})`;
  } else if (style.bgType === "image" && style.imageUrl) {
    base.backgroundImage = `url(${style.imageUrl})`;
    base.backgroundSize = "cover";
    base.backgroundPosition = "center";
  } else {
    base.backgroundColor = style.bg;
  }

  return base;
}

interface LetterheadTextureOverlayProps {
  textureType: string;
  textureOpacity: number;
}

function LetterheadTextureOverlay({
  textureType,
  textureOpacity,
}: LetterheadTextureOverlayProps) {
  if (textureType === "none") return null;

  const textureStyles: Record<string, React.CSSProperties> = {
    dots: {
      backgroundImage:
        "radial-gradient(circle, currentColor 1px, transparent 1px)",
      backgroundSize: "16px 16px",
    },
    grid: {
      backgroundImage:
        "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
      backgroundSize: "16px 16px",
    },
  };

  const style = textureStyles[textureType];
  if (!style) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: textureOpacity }}
    >
      <div className="w-full h-full" style={style} />
    </div>
  );
}

// --- Document Header (with preset support) ---

export interface DocumentHeaderRendererProps {
  header: DocumentHeader;
  onLinesChange?: (lines: string[]) => void;
  editable?: boolean;
  className?: string;
  /**
   * Data for the text markers ({{publicador}}, {{autor}}, {{org}}). When
   * present (and not editable), lines are resolved on display; the saved
   * lines keep the markers. Absent = lines rendered as saved.
   */
  textContext?: LetterheadTextContext | null;
}

export function DocumentHeaderRenderer({
  header,
  onLinesChange,
  editable,
  className,
  textContext,
}: DocumentHeaderRendererProps) {
  const lines = editable
    ? header.lines
    : resolveLetterheadLines(header.lines, textContext);

  // Se for modo preset, renderiza o componente do preset
  if (header.mode === "preset" && header.presetId) {
    const PresetComponent = HEADER_PRESET_COMPONENTS[header.presetId];
    if (PresetComponent) {
      return (
        <PresetComponent
          lines={lines}
          lineFormats={header.lineFormats}
          onLinesChange={onLinesChange}
          editable={editable}
          className={className}
        />
      );
    }
  }

  // Fallback: modo custom usa o HeaderLetterheadRenderer original
  return (
    <HeaderLetterheadRenderer
      lines={lines}
      lineFormats={header.lineFormats}
      style={header.style}
      className={className}
    />
  );
}

// --- Header Letterhead (custom mode) ---

export interface HeaderLetterheadRendererProps {
  lines: string[];
  lineFormats: LineFormat[];
  style: LetterheadStyle;
  className?: string;
}

export function HeaderLetterheadRenderer({
  lines,
  lineFormats,
  style,
  className,
}: HeaderLetterheadRendererProps) {
  const mergedStyle = {
    ...DEFAULT_LETTERHEAD_STYLE,
    ...normalizeLetterheadStyle(style),
  };
  const defaultFormat: LineFormat = {
    bold: true,
    uppercase: true,
    size: "sm",
    opacity: 100,
    italic: false,
    letterSpacing: "wider",
  };

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden transition-all duration-300"
        style={getLetterheadContainerStyle(mergedStyle)}
      >
        {/* Image overlay */}
        {mergedStyle.bgType === "image" && mergedStyle.imageUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: mergedStyle.imageOverlayColor,
              opacity: mergedStyle.imageOverlayOpacity,
            }}
          />
        )}

        {/* Texture overlay */}
        <LetterheadTextureOverlay
          textureType={mergedStyle.textureType}
          textureOpacity={mergedStyle.textureOpacity}
        />

        {/* Text content */}
        <div className="relative z-10">
          {lines.map((line, index) => {
            const fmt = lineFormats[index] || defaultFormat;
            return (
              <p
                key={index}
                className="font-mono"
                style={lineFormatToStyle(fmt, index)}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- Document Footer (with preset support) ---

export interface DocumentFooterRendererProps {
  footer: DocumentFooter;
  onLinesChange?: (lines: string[]) => void;
  editable?: boolean;
  className?: string;
  /** Same as DocumentHeaderRendererProps.textContext. */
  textContext?: LetterheadTextContext | null;
}

export function DocumentFooterRenderer({
  footer,
  onLinesChange,
  editable,
  className,
  textContext,
}: DocumentFooterRendererProps) {
  const lines = editable
    ? footer.lines
    : resolveLetterheadLines(footer.lines, textContext);

  // Se for modo preset, renderiza o componente do preset (adaptado ao rodape)
  if (footer.mode === "preset" && footer.presetId) {
    const PresetComponent = FOOTER_PRESET_COMPONENTS[footer.presetId];
    if (PresetComponent) {
      return (
        <PresetComponent
          lines={lines}
          lineFormats={footer.lineFormats}
          onLinesChange={onLinesChange}
          editable={editable}
          className={className}
        />
      );
    }
  }

  // Fallback: modo custom usa o FooterLetterheadRenderer original
  return (
    <FooterLetterheadRenderer
      lines={lines}
      lineFormats={footer.lineFormats}
      style={footer.style}
      className={className}
    />
  );
}

// --- Footer Letterhead ---

export interface FooterLetterheadRendererProps {
  lines: string[];
  lineFormats?: LineFormat[];
  style: LetterheadStyle;
  className?: string;
}

export function FooterLetterheadRenderer({
  lines,
  lineFormats = [],
  style,
  className,
}: FooterLetterheadRendererProps) {
  const mergedStyle = {
    ...DEFAULT_LETTERHEAD_STYLE,
    ...normalizeLetterheadStyle(style),
  };
  const defaultFormat: LineFormat = {
    bold: false,
    uppercase: true,
    size: "sm",
    opacity: 100,
    italic: false,
    letterSpacing: "wider",
  };

  return (
    <div className={className}>
      <div
        className="relative overflow-hidden flex items-center justify-between gap-3 transition-all duration-300"
        style={getLetterheadContainerStyle(mergedStyle)}
      >
        {/* Image overlay */}
        {mergedStyle.bgType === "image" && mergedStyle.imageUrl && (
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: mergedStyle.imageOverlayColor,
              opacity: mergedStyle.imageOverlayOpacity,
            }}
          />
        )}

        {/* Texture overlay */}
        <LetterheadTextureOverlay
          textureType={mergedStyle.textureType}
          textureOpacity={mergedStyle.textureOpacity}
        />

        <div className="flex-1 min-w-0 relative z-10">
          {lines.map((line, index) => {
            const fmt = lineFormats[index] || defaultFormat;
            return (
              <p
                key={index}
                className="font-mono"
                style={lineFormatToStyle(fmt, index)}
              >
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
