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

// What the section panel shows (header and footer always share one look):
// - "style": model or custom style, once for both sides.
// - "text":  one side's on/off switch and its text lines.
export type LetterheadSectionVariant = "text" | "style";

interface LetterheadSectionPanelProps {
  design: DesignContext["design"];
  kind: "header" | "footer";
  variant: LetterheadSectionVariant;
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
  variant,
}: LetterheadSectionPanelProps) {
  const isFooter = kind === "footer";
  const section = isFooter ? design.documentFooter : design.documentHeader;
  const presetList = isFooter ? FOOTER_PRESET_LIST : HEADER_PRESET_LIST;
  const presetComponents = isFooter
    ? FOOTER_PRESET_COMPONENTS
    : HEADER_PRESET_COMPONENTS;
  const defaultBold = !isFooter;

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
    <div className="flex flex-col gap-4">
      {variant === "text" && (
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            {isFooter ? (
              <SeparatorHorizontal className="size-4 text-foreground/60" />
            ) : (
              <FileText className="size-4 text-foreground/60" />
            )}
            {isFooter ? "Rodapé" : "Cabeçalho"}
          </span>
          <PanelSwitch
            checked={section.enabled}
            label={isFooter ? "Mostrar rodapé" : "Mostrar cabeçalho"}
            onChange={(enabled) => setSection({ ...section, enabled })}
          />
        </div>
      )}

      {showContent && (
        <>
          {variant === "style" && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wider">
                Modelo
              </p>
              <p className="mt-1 text-xs text-foreground/60">
                Cabeçalho e rodapé usam sempre o mesmo modelo.
              </p>
            </div>
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
                  "flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-colors",
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
                  "flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-colors",
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
            <div className="grid grid-cols-1 gap-2">
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
                      className="h-16 overflow-hidden"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 7px, rgba(0,0,0,0.015) 7px, rgba(0,0,0,0.015) 8px)",
                      }}
                    >
                      <div
                        className="scale-[0.6] origin-top-left"
                        style={{ width: "166.67%", height: "166.67%" }}
                      >
                        <PresetComponent lines={preset.defaultLines} />
                      </div>
                    </div>
                    <div className="px-2 py-1.5 border-t border-border">
                      <span className="text-xs font-mono uppercase tracking-wider block">
                        {preset.name}
                      </span>
                      <span className="text-xs text-foreground/60 mt-0.5 block">
                        {preset.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Lines editor (text variant) ──
              Preset mode: text fields only (no format editor, no add/remove). */}
          {variant !== "style" && (
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  Linhas
                </span>
                <button
                  type="button"
                  onClick={handleRestoreDefault}
                  className="text-xs font-mono uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors underline underline-offset-2"
                >
                  Restaurar padrão
                </button>
              </div>
              {section.lines.map((line, index) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: linhas posicionais, editadas por índice
                <div key={index} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-mono text-foreground/60 w-4">
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
                      className="flex-1 px-2 py-1 text-xs font-mono border border-border rounded-xs bg-transparent outline-none focus:border-foreground transition-colors uppercase tracking-wider"
                    />
                    {!isPresetMode && (
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedLine(expandedLine === index ? null : index)
                        }
                        className="text-foreground/60 hover:text-foreground transition-colors"
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
                        className="text-foreground/60 hover:text-foreground transition-colors"
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
              <p className="text-xs font-mono text-foreground/60">
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
                  className="flex items-center gap-1 text-xs font-mono text-foreground/60 hover:text-foreground transition-colors uppercase tracking-wider mt-1"
                >
                  <Plus className="w-3 h-3" />
                  Adicionar linha
                </button>
              )}
            </div>
          )}

          {/* ── Shared LetterheadStyleEditor (style variant) ── */}
          {variant !== "text" && section.mode === "custom" && (
            <LetterheadStyleEditor
              style={mergedStyle}
              onChange={(newStyle) =>
                setSection({ ...section, style: newStyle })
              }
            />
          )}
        </>
      )}
    </div>
  );
}

/** On/off switch: hairline track, ink knob that slides right when on. */
function PanelSwitch({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-5 w-9 shrink-0 rounded-full border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
        checked
          ? "border-foreground bg-foreground/10"
          : "border-foreground/30 bg-transparent",
      )}
    >
      <span
        className={cn(
          "absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full transition-[left,background-color]",
          checked
            ? "left-[calc(100%-1rem)] bg-foreground"
            : "left-0.5 bg-foreground/35",
        )}
      />
    </button>
  );
}
