"use client";

import {
  ChevronDown,
  ChevronUp,
  FileText,
  Plus,
  SeparatorHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { DEFAULT_LETTERHEAD_STYLE } from "@/components/document/constants";
import {
  FOOTER_PRESET_COMPONENTS,
  FOOTER_PRESET_LIST,
} from "@/components/document/footer-presets";
import {
  HEADER_PRESET_COMPONENTS,
  HEADER_PRESET_LIST,
} from "@/components/document/header-presets";
import {
  DocumentFooterRenderer,
  DocumentHeaderRenderer,
} from "@/components/document/letterhead-renderer";
import type {
  DocumentFooter,
  DocumentHeader,
  LineFormat,
} from "@/components/document/types";
import { normalizeLetterheadStyle } from "@/components/document/types";
import {
  BLKLIGHT_FOOTER_LINE_FORMATS,
  BLKLIGHT_FOOTER_LINES,
  BLKLIGHT_HEADER_LINE_FORMATS,
  BLKLIGHT_HEADER_LINES,
  BLKLIGHT_PRESET_ID,
} from "@/features/documents/design/blklight-letterhead";
import { cn } from "@/lib/utils";
import type { DesignContext } from "./layout";
import { LetterheadStyleEditor } from "./letterhead-style-editor";
import { LineFormatEditor } from "./line-format-editor";

// Rendering mode of the section panel:
// - "full":  complete section editor (identity, enable, mode/preset, lines,
//            style editor, preview) — the default, unchanged behavior.
// - "text":  only the section's identity, enable toggle, text lines editor
//            and preview (used by the linked header/footer view, where the
//            shared style editor lives once at panel level).
// - "style": only the mode/preset + style editor block (used as the single
//            shared style editor in the linked header/footer view).
export type LetterheadSectionVariant = "full" | "text" | "style";

interface LetterheadSectionPanelProps {
  design: DesignContext["design"];
  kind: "header" | "footer";
  variant?: LetterheadSectionVariant;
}

const defaultLineFormat = (bold: boolean): LineFormat => ({
  bold,
  uppercase: true,
  size: "sm",
  opacity: 100,
  italic: false,
  letterSpacing: "wider",
});

export function LetterheadSectionPanel({
  design,
  kind,
  variant = "full",
}: LetterheadSectionPanelProps) {
  const isFooter = kind === "footer";
  const section = isFooter ? design.documentFooter : design.documentHeader;
  const presetList = isFooter ? FOOTER_PRESET_LIST : HEADER_PRESET_LIST;
  const presetComponents = isFooter
    ? FOOTER_PRESET_COMPONENTS
    : HEADER_PRESET_COMPONENTS;
  const defaultBold = isFooter ? false : true;

  const setSection = (updates: DocumentHeader | DocumentFooter) => {
    if (isFooter) {
      design.setDocumentFooter(updates as DocumentFooter);
    } else {
      design.setDocumentHeader(updates as DocumentHeader);
    }
  };

  const mergedStyle = {
    ...DEFAULT_LETTERHEAD_STYLE,
    ...normalizeLetterheadStyle(section.style),
  };

  // The "style" variant is a pure style block and is never gated by the
  // section's enabled state (it edits the style regardless of visibility).
  const showContent = variant === "style" || section.enabled;

  const [expandedLine, setExpandedLine] = useState<number | null>(null);

  const handleCustomMode = () => {
    setSection({
      ...section,
      mode: "custom",
      ...(isFooter ? { presetId: null } : {}),
      style: { ...DEFAULT_LETTERHEAD_STYLE },
      lineFormats: section.lines.map(() => defaultLineFormat(defaultBold)),
    });
  };

  // "Restaurar padrão": back to the Blklight defaults (mode, preset, lines and
  // line formats). enabled and style are kept.
  const handleRestoreDefault = () => {
    setSection({
      ...section,
      mode: "preset",
      presetId: BLKLIGHT_PRESET_ID,
      lines: [...(isFooter ? BLKLIGHT_FOOTER_LINES : BLKLIGHT_HEADER_LINES)],
      lineFormats: (isFooter
        ? BLKLIGHT_FOOTER_LINE_FORMATS
        : BLKLIGHT_HEADER_LINE_FORMATS
      ).map((f) => ({ ...f })),
    });
  };

  const isPresetMode = section.mode === "preset";

  const updateLineFormat = (index: number, updates: Partial<LineFormat>) => {
    const newFormats = [...section.lineFormats];
    newFormats[index] = { ...newFormats[index], ...updates };
    setSection({ ...section, lineFormats: newFormats });
  };

  return (
    <div className={cn("flex flex-col", isFooter ? "gap-4" : "gap-6")}>
      {/* Section identity + enable toggle (hidden in the pure style variant) */}
      {variant !== "style" && (
        <>
          <div className="flex items-center gap-2">
            {isFooter ? (
              <SeparatorHorizontal className="w-4 h-4 text-foreground/40" />
            ) : (
              <FileText className="w-4 h-4 text-foreground/40" />
            )}
            <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
              {isFooter ? "Rodape" : "Cabecalho"}
            </span>
          </div>

          {isFooter && (
            <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
              Adicione um rodape ao documento. Escolha um modelo, personalize o
              texto, as estrelas decorativas e as cores de fundo.
            </p>
          )}

          {/* Enable toggle (independent per section, linked or not) */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-foreground/60">
              {isFooter ? "Ativar Rodape" : "Cabecalho"}
            </span>
            <button
              type="button"
              onClick={() =>
                setSection({ ...section, enabled: !section.enabled })
              }
              className={cn(
                "w-10 h-5 rounded-full transition-colors relative",
                section.enabled ? "bg-foreground" : "bg-foreground/20",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform",
                  section.enabled ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
          </div>
        </>
      )}

      {showContent && (
        <>
          {variant === "style" && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
              Estilo compartilhado (cabeçalho e rodapé)
            </span>
          )}

          {/* Mode toggle (hidden in the text-only variant) */}
          {variant !== "text" && (
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() =>
                  setSection({
                    ...section,
                    mode: "preset",
                    ...(isFooter
                      ? {
                          presetId:
                            (section as DocumentFooter).presetId ||
                            BLKLIGHT_PRESET_ID,
                        }
                      : {}),
                  })
                }
                className={cn(
                  "flex-1 px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors",
                  section.mode === "preset"
                    ? "border-foreground bg-secondary text-foreground"
                    : "border-border text-foreground/50 hover:border-muted-foreground",
                )}
              >
                Modelos
              </button>
              <button
                type="button"
                onClick={handleCustomMode}
                className={cn(
                  "flex-1 px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors",
                  section.mode === "custom"
                    ? "border-foreground bg-secondary text-foreground"
                    : "border-border text-foreground/50 hover:border-muted-foreground",
                )}
              >
                Personalizado
              </button>
            </div>
          )}

          {/* ── Preset mode ── */}
          {variant !== "text" && section.mode === "preset" && (
            <div className="grid grid-cols-2 gap-2">
              {presetList.map((preset) => {
                const PresetComponent = presetComponents[preset.id];
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() =>
                      setSection({
                        ...section,
                        presetId: preset.id,
                        lines: [...preset.defaultLines],
                        lineFormats: preset.defaultLineFormats
                          ? preset.defaultLineFormats.map((f) => ({ ...f }))
                          : section.lineFormats,
                      })
                    }
                    className={cn(
                      "border rounded-xs overflow-hidden transition-colors text-left",
                      section.presetId === preset.id
                        ? "border-foreground ring-1 ring-foreground"
                        : "border-border hover:border-muted-foreground",
                    )}
                  >
                    <div
                      className="h-14 overflow-hidden"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(0,0,0,0.015) 7px, rgba(0,0,0,0.015) 8px)",
                      }}
                    >
                      <div
                        className="scale-[0.55] origin-top-left"
                        style={{ width: "181%", height: "181%" }}
                      >
                        <PresetComponent lines={preset.defaultLines} />
                      </div>
                    </div>
                    <div className="px-2 py-1.5 border-t border-border">
                      <span className="text-[9px] font-mono uppercase tracking-wider block">
                        {preset.name}
                      </span>
                      <span className="text-[8px] font-mono text-foreground/40 mt-0.5 block">
                        {preset.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Lines editor (full & text variants) ──
              Preset mode: text fields only (no format editor, no add/remove). */}
          {variant !== "style" && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                  Linhas
                </span>
                <button
                  type="button"
                  onClick={handleRestoreDefault}
                  className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Restaurar padrão
                </button>
              </div>
              {section.lines.map((line, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: linhas posicionais, editadas por índice
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono text-foreground/30 w-4">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={line}
                      onChange={(e) => {
                        const newLines = [...section.lines];
                        newLines[index] = e.target.value;
                        setSection({ ...section, lines: newLines });
                      }}
                      placeholder={
                        isFooter
                          ? "TEXTO DO RODAPE"
                          : index === 0
                            ? "TITULO PRINCIPAL"
                            : "Linha secundaria"
                      }
                      className="flex-1 px-2 py-1 text-[10px] font-mono border border-border rounded-xs bg-transparent outline-none focus:border-foreground transition-colors uppercase tracking-wider"
                    />
                    {!isPresetMode && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedLine(expandedLine === index ? null : index)
                        }
                        className="text-foreground/30 hover:text-foreground transition-colors"
                      >
                        {expandedLine === index ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                    {!isPresetMode && section.lines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newLines = section.lines.filter(
                            (_, i) => i !== index,
                          );
                          const newFormats = section.lineFormats.filter(
                            (_, i) => i !== index,
                          );
                          setSection({
                            ...section,
                            lines: newLines.length ? newLines : [""],
                            lineFormats: newFormats.length
                              ? newFormats
                              : [defaultLineFormat(defaultBold)],
                          });
                        }}
                        className="text-foreground/30 hover:text-foreground transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Shared LineFormatEditor */}
                  {!isPresetMode && expandedLine === index && (
                    <div className="ml-5 p-2.5 border border-border rounded-xs bg-secondary/10">
                      <LineFormatEditor
                        format={
                          section.lineFormats[index] ??
                          defaultLineFormat(defaultBold)
                        }
                        onChange={(f) => updateLineFormat(index, f)}
                      />
                    </div>
                  )}
                </div>
              ))}
              <p className="text-[9px] font-mono text-foreground/30">
                {"{{publicador}} = nome do autor, ou da organização"}
              </p>
              {!isPresetMode && (
                <button
                  type="button"
                  onClick={() =>
                    setSection({
                      ...section,
                      lines: [...section.lines, ""],
                      lineFormats: [
                        ...section.lineFormats,
                        defaultLineFormat(defaultBold),
                      ],
                    })
                  }
                  className="flex items-center gap-1 text-[10px] font-mono text-foreground/40 hover:text-foreground transition-colors uppercase tracking-wider mt-1"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar linha
                </button>
              )}
            </div>
          )}

          {/* ── Shared LetterheadStyleEditor (full & style variants) ── */}
          {variant !== "text" && section.mode === "custom" && (
            <LetterheadStyleEditor
              style={mergedStyle}
              onChange={(newStyle) =>
                setSection({ ...section, style: newStyle })
              }
            />
          )}

          {/* ── Preview (full & text variants) ── */}
          {variant !== "style" && (
            <div
              className={cn(
                "border border-border rounded-xs overflow-hidden",
                isFooter ? "mt-1" : "mt-2",
              )}
            >
              {isFooter ? (
                <DocumentFooterRenderer
                  footer={{
                    ...(section as DocumentFooter),
                    style: mergedStyle,
                  }}
                  className=""
                />
              ) : (
                <DocumentHeaderRenderer
                  header={{
                    ...(section as DocumentHeader),
                    style: mergedStyle,
                  }}
                  className=""
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
