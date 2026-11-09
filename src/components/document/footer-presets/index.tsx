"use client";

import type React from "react";
import {
  BLKLIGHT_FOOTER_LINE_FORMATS,
  BLKLIGHT_FOOTER_LINES,
  BLKLIGHT_PRESET_ID,
} from "@/features/documents/design/blklight-letterhead";
import {
  EditableText,
  type HeaderPresetMeta,
  type HeaderPresetProps,
} from "../header-presets";
import { lineFormatToStyle } from "../line-format-style";

// ── Shared types for all presets ──
export type FooterPresetProps = HeaderPresetProps;

// ── Shared layout for all footer presets ──
function FooterPresetLayout({
  style,
  lines,
  onLinesChange,
  editable,
  className,
  texture,
  textureOpacity,
}: FooterPresetProps & {
  style: React.CSSProperties;
  texture?: "dots" | "grid";
  textureOpacity?: number;
}) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 flex items-center justify-between gap-2 ${className}`}
      style={style}
    >
      {texture && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: textureOpacity }}
        >
          <div
            className="w-full h-full"
            style={
              texture === "dots"
                ? {
                    backgroundImage:
                      "radial-gradient(circle, currentColor 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }
                : {
                    backgroundImage:
                      "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }
            }
          />
        </div>
      )}
      <div
        className="relative z-10 font-mono flex-1 min-w-0 flex flex-col gap-0.5"
        style={{ textAlign: style.textAlign || "center" }}
      >
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TEXTO DO RODAPE" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-[10px] font-semibold" : "text-[9px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.7 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Blklight - rodape default do Blklight
// Derivado do antigo gov-republica, que substitui (layout do FooterPresetLayout, sem textura
// dots/grid), com cores dos tokens do tema (fundo = foreground, texto =
// background), texturas proprias (.letterhead-grain-*, em globals.css) e
// formato de cada linha vindo de lineFormats (fallback: formatos Blklight).
// ════════════════════════════════════════════════════════════════════════════
export function FooterBlklight({
  lines,
  lineFormats,
  onLinesChange,
  editable,
  className,
}: FooterPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 flex items-center justify-between gap-2 letterhead-grain-noise letterhead-grain-overlay ${className}`}
      style={{
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        padding: "8px 16px",
      }}
    >
      <div
        className="relative z-10 font-mono flex-1 min-w-0 flex flex-col"
        style={{ textAlign: "center" }}
      >
        {lines.map((line, index) => {
          const fmt =
            lineFormats?.[index] ??
            BLKLIGHT_FOOTER_LINE_FORMATS[index] ??
            BLKLIGHT_FOOTER_LINE_FORMATS[
              BLKLIGHT_FOOTER_LINE_FORMATS.length - 1
            ];
          return (
            <EditableText
              key={index}
              value={line}
              onChange={(v) => updateLine(index, v)}
              editable={editable}
              placeholder={index === 0 ? "BLKLIGHT" : "Linha secundaria"}
              className="block"
              style={lineFormatToStyle(fmt, index)}
            />
          );
        })}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Gov Militar - rodape militar com bordas e gradiente escuro
// ════════════════════════════════════════════════════════════════════════════
export function FooterGovMilitar(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      style={{
        background: "linear-gradient(to right, #1B1B2F, #3D405B)",
        color: "#a3aab8",
        padding: "8px 16px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#4b5266",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Academia - rodape institucional academico elegante
// ════════════════════════════════════════════════════════════════════════════
export function FooterAcademia(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      style={{
        backgroundColor: "#1B3A4B",
        color: "#cfc3a8",
        padding: "10px 20px",
        borderStyle: "double",
        borderWidth: 2,
        borderColor: "#8a7a55",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Corp Moderno - rodape limpo e moderno corporativo
// ════════════════════════════════════════════════════════════════════════════
export function FooterCorpModerno(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      style={{
        background: "linear-gradient(to right, #0077B6, #00B4D8)",
        color: "#e6f4fb",
        padding: "8px 20px",
        textAlign: "left",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Alerta Vermelho - rodape urgente com gradiente vermelho
// ════════════════════════════════════════════════════════════════════════════
export function FooterAlertaVermelho(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      style={{
        background: "linear-gradient(to right, #9D0208, #E85D04)",
        color: "#ffd9c8",
        padding: "8px 16px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#FF6B35",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Minimalista - rodape simples e limpo com borda sutil
// ════════════════════════════════════════════════════════════════════════════
export function FooterMinimalista(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      style={{
        backgroundColor: "#F5F5F5",
        color: "#555555",
        padding: "6px 16px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#E0E0E0",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Selo Dourado - rodape cerimonial com tons dourados
// ════════════════════════════════════════════════════════════════════════════
export function FooterSeloDourado(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      texture="dots"
      textureOpacity={0.07}
      style={{
        background: "linear-gradient(to right, #FFB4A2, #FFCDB2)",
        color: "#5D3A1A",
        padding: "10px 20px",
        borderStyle: "double",
        borderWidth: 2,
        borderColor: "#C49A6C",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Confidencial - rodape para documentos confidenciais com textura
// ════════════════════════════════════════════════════════════════════════════
export function FooterConfidencial(props: FooterPresetProps) {
  return (
    <FooterPresetLayout
      {...props}
      texture="grid"
      textureOpacity={0.05}
      style={{
        backgroundColor: "#2C2C2C",
        color: "#8f8f8f",
        padding: "8px 16px",
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#555555",
      }}
    />
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Registry: Map preset IDs to footer components
// ════════════════════════════════════════════════════════════════════════════
export const FOOTER_PRESET_COMPONENTS: Record<
  string,
  React.ComponentType<FooterPresetProps>
> = {
  // Apelido: documentos salvos com o id antigo renderizam o Blklight.
  "gov-republica": FooterBlklight,
  [BLKLIGHT_PRESET_ID]: FooterBlklight,
  "gov-militar": FooterGovMilitar,
  academia: FooterAcademia,
  "corp-moderno": FooterCorpModerno,
  "alerta-vermelho": FooterAlertaVermelho,
  minimalista: FooterMinimalista,
  "selo-dourado": FooterSeloDourado,
  confidencial: FooterConfidencial,
};

// ════════════════════════════════════════════════════════════════════════════
// Preset Metadata (for selection UI) — rodape usa uma unica linha por default
// ════════════════════════════════════════════════════════════════════════════
export const FOOTER_PRESET_LIST: HeaderPresetMeta[] = [
  {
    id: BLKLIGHT_PRESET_ID,
    name: "Blklight",
    description: "Rodape padrao do Blklight, segue o tema",
    defaultLines: BLKLIGHT_FOOTER_LINES,
    defaultLineFormats: BLKLIGHT_FOOTER_LINE_FORMATS,
  },
  {
    id: "gov-militar",
    name: "Diretiva Militar",
    description: "Estilo militar com bordas e gradiente escuro",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
  {
    id: "academia",
    name: "Academico",
    description: "Rodape institucional academico elegante",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
  {
    id: "corp-moderno",
    name: "Corporativo",
    description: "Rodape limpo e moderno corporativo",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
  {
    id: "alerta-vermelho",
    name: "Alerta Vermelho",
    description: "Rodape urgente com gradiente vermelho",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Rodape simples e limpo com borda sutil",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
  {
    id: "selo-dourado",
    name: "Selo Dourado",
    description: "Rodape cerimonial com tons dourados",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
  {
    id: "confidencial",
    name: "Confidencial",
    description: "Rodape para documentos confidenciais com textura",
    defaultLines: BLKLIGHT_FOOTER_LINES,
  },
];
