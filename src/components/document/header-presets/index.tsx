"use client";

import type React from "react";
import {
  BLKLIGHT_HEADER_LINE_FORMATS,
  BLKLIGHT_HEADER_LINES,
  BLKLIGHT_PRESET_ID,
} from "@/features/documents/design/blklight-letterhead";
import { lineFormatToStyle } from "../line-format-style";
import type { LineFormat } from "../types";

// ── Shared types for all presets ──
export interface HeaderPresetProps {
  lines: string[];
  /** Only honored by presets that support it (Blklight); others ignore it. */
  lineFormats?: LineFormat[];
  onLinesChange?: (lines: string[]) => void;
  editable?: boolean;
  className?: string;
}

// ── Editable text component ──
export function EditableText({
  value,
  onChange,
  editable,
  className,
  style,
  placeholder,
}: {
  value: string;
  onChange?: (v: string) => void;
  editable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}) {
  if (editable && onChange) {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-transparent border-none outline-none w-full placeholder:opacity-50 ${className}`}
        style={style}
      />
    );
  }
  return (
    <span className={className} style={style}>
      {value || placeholder}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Blklight - cabecalho default do Blklight
// Derivado do antigo gov-republica (layout centralizado), que substitui:
//   - cores dos tokens do tema (fundo = foreground, texto = background): bloco
//     escuro nos temas claro e livro, claro no tema escuro;
//   - texturas proprias (.letterhead-grain-noise / .letterhead-grain-overlay,
//     em globals.css);
//   - formato de cada linha vindo de lineFormats (fallback: formatos Blklight).
// ════════════════════════════════════════════════════════════════════════════
export function HeaderBlklight({
  lines,
  lineFormats,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 letterhead-grain-noise letterhead-grain-overlay ${className}`}
      style={{
        backgroundColor: "var(--foreground)",
        color: "var(--background)",
        textAlign: "center",
        padding: "16px 24px",
      }}
    >
      <div className="relative z-10 font-mono flex flex-col">
        {lines.map((line, index) => {
          const fmt =
            lineFormats?.[index] ??
            BLKLIGHT_HEADER_LINE_FORMATS[index] ??
            BLKLIGHT_HEADER_LINE_FORMATS[
              BLKLIGHT_HEADER_LINE_FORMATS.length - 1
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
// PRESET: Gov Militar - Estilo militar com bordas e gradiente escuro
// ════════════════════════════════════════════════════════════════════════════
export function HeaderGovMilitar({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(to right, #1B1B2F, #3D405B)",
        color: "#E0E0E0",
        textAlign: "center",
        padding: "20px 24px",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#5C6378",
      }}
    >
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Academia - Cabecalho institucional academico elegante
// ════════════════════════════════════════════════════════════════════════════
export function HeaderAcademia({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: "#1B3A4B",
        color: "#F0E6D3",
        textAlign: "center",
        padding: "20px 32px",
        borderStyle: "double",
        borderWidth: 4,
        borderColor: "#F0E6D3",
      }}
    >
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Corp Moderno - Cabecalho limpo e moderno corporativo
// ════════════════════════════════════════════════════════════════════════════
export function HeaderCorpModerno({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(to right, #0077B6, #00B4D8)",
        color: "#FFFFFF",
        textAlign: "left",
        padding: "16px 24px",
        borderRadius: 4,
      }}
    >
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Alerta Vermelho - Cabecalho urgente com gradiente vermelho
// ════════════════════════════════════════════════════════════════════════════
export function HeaderAlertaVermelho({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(to right, #9D0208, #E85D04)",
        color: "#FFFFFF",
        textAlign: "center",
        padding: "18px 24px",
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#FF6B35",
      }}
    >
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px] font-bold"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Minimalista - Cabecalho simples e limpo com borda sutil
// ════════════════════════════════════════════════════════════════════════════
export function HeaderMinimalista({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: "#F5F5F5",
        color: "#1A1A1A",
        textAlign: "center",
        padding: "12px 24px",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#E0E0E0",
      }}
    >
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Selo Dourado - Cabecalho cerimonial com tons dourados
// ════════════════════════════════════════════════════════════════════════════
export function HeaderSeloDourado({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background: "linear-gradient(to right, #FFB4A2, #FFCDB2)",
        color: "#5D3A1A",
        textAlign: "center",
        padding: "20px 32px",
        borderStyle: "double",
        borderWidth: 4,
        borderColor: "#C49A6C",
      }}
    >
      {/* Dots texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.08,
        }}
      />
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// PRESET: Confidencial - Cabecalho para documentos confidenciais com textura
// ════════════════════════════════════════════════════════════════════════════
export function HeaderConfidencial({
  lines,
  onLinesChange,
  editable,
  className,
}: HeaderPresetProps) {
  const updateLine = (index: number, value: string) => {
    if (onLinesChange) {
      const newLines = [...lines];
      newLines[index] = value;
      onLinesChange(newLines);
    }
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: "#2C2C2C",
        color: "#C0C0C0",
        textAlign: "center",
        padding: "18px 24px",
        borderStyle: "dashed",
        borderWidth: 2,
        borderColor: "#666666",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.06,
        }}
      />
      <div className="relative z-10 font-mono flex flex-col gap-1">
        {lines.map((line, index) => (
          <EditableText
            key={index}
            value={line}
            onChange={(v) => updateLine(index, v)}
            editable={editable}
            placeholder={index === 0 ? "TITULO PRINCIPAL" : "Linha secundaria"}
            className={`block uppercase tracking-wider ${
              index === 0 ? "text-sm font-bold" : "text-[10px]"
            }`}
            style={{ opacity: index === 0 ? 1 : 0.8 }}
          />
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Registry: Map preset IDs to components
// ════════════════════════════════════════════════════════════════════════════
export const HEADER_PRESET_COMPONENTS: Record<
  string,
  React.ComponentType<HeaderPresetProps>
> = {
  // Apelido: documentos salvos com o id antigo renderizam o Blklight.
  "gov-republica": HeaderBlklight,
  [BLKLIGHT_PRESET_ID]: HeaderBlklight,
  "gov-militar": HeaderGovMilitar,
  academia: HeaderAcademia,
  "corp-moderno": HeaderCorpModerno,
  "alerta-vermelho": HeaderAlertaVermelho,
  minimalista: HeaderMinimalista,
  "selo-dourado": HeaderSeloDourado,
  confidencial: HeaderConfidencial,
};

// ════════════════════════════════════════════════════════════════════════════
// Preset Metadata (for selection UI)
// ════════════════════════════════════════════════════════════════════════════
export interface HeaderPresetMeta {
  id: string;
  name: string;
  description: string;
  defaultLines: string[];
  /** Line formats applied when the preset is chosen (Blklight only). */
  defaultLineFormats?: LineFormat[];
}

export const HEADER_PRESET_LIST: HeaderPresetMeta[] = [
  {
    id: BLKLIGHT_PRESET_ID,
    name: "Blklight",
    description: "Cabecalho padrao do Blklight, segue o tema",
    defaultLines: BLKLIGHT_HEADER_LINES,
    defaultLineFormats: BLKLIGHT_HEADER_LINE_FORMATS,
  },
  {
    id: "gov-militar",
    name: "Diretiva Militar",
    description: "Estilo militar com bordas e gradiente escuro",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
  {
    id: "academia",
    name: "Academico",
    description: "Cabecalho institucional academico elegante",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
  {
    id: "corp-moderno",
    name: "Corporativo",
    description: "Cabecalho limpo e moderno corporativo",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
  {
    id: "alerta-vermelho",
    name: "Alerta Vermelho",
    description: "Cabecalho urgente com gradiente vermelho",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Cabecalho simples e limpo com borda sutil",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
  {
    id: "selo-dourado",
    name: "Selo Dourado",
    description: "Cabecalho cerimonial com tons dourados",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
  {
    id: "confidencial",
    name: "Confidencial",
    description: "Cabecalho para documentos confidenciais com textura",
    defaultLines: BLKLIGHT_HEADER_LINES,
  },
];
