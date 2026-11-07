"use client";

import {
  AlignCenter,
  ArrowDown,
  ArrowDownLeft,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpLeft,
  ArrowUpRight,
  BoxSelect,
  Layers,
  Maximize,
  Palette,
} from "lucide-react";
import { GRADIENT_PRESETS } from "@/components/document/constants";
import { Section } from "@/components/document/section";
import type {
  BorderStyle as BorderStyleType,
  GradientDirection,
  LetterheadBgType,
  LetterheadStyle,
  TextAlignment,
} from "@/components/document/types";
import { ColorField } from "./color-field";
import { SliderField } from "./slider-field";

const BORDER_STYLES: { id: BorderStyleType; label: string }[] = [
  { id: "none", label: "Nenhuma" },
  { id: "solid", label: "Solida" },
  { id: "dashed", label: "Tracejada" },
  { id: "dotted", label: "Pontilhada" },
  { id: "double", label: "Dupla" },
];

const GRADIENT_DIRECTIONS: {
  id: GradientDirection;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "to-r",
    label: "Direita",
    icon: <ArrowRight className="w-3.5 h-3.5" />,
  },
  {
    id: "to-l",
    label: "Esquerda",
    icon: <ArrowLeft className="w-3.5 h-3.5" />,
  },
  { id: "to-b", label: "Baixo", icon: <ArrowDown className="w-3.5 h-3.5" /> },
  { id: "to-t", label: "Cima", icon: <ArrowUp className="w-3.5 h-3.5" /> },
  {
    id: "to-br",
    label: "Diag. ↘",
    icon: <ArrowDownRight className="w-3.5 h-3.5" />,
  },
  {
    id: "to-bl",
    label: "Diag. ↙",
    icon: <ArrowDownLeft className="w-3.5 h-3.5" />,
  },
  {
    id: "to-tr",
    label: "Diag. ↗",
    icon: <ArrowUpRight className="w-3.5 h-3.5" />,
  },
  {
    id: "to-tl",
    label: "Diag. ↖",
    icon: <ArrowUpLeft className="w-3.5 h-3.5" />,
  },
];

const ALIGN_OPTIONS: { id: TextAlignment; label: string }[] = [
  { id: "left", label: "Esquerda" },
  { id: "center", label: "Centro" },
  { id: "right", label: "Direita" },
];

const TEXTURE_TYPES = [
  { id: "none" as const, label: "Nenhuma" },
  { id: "dots" as const, label: "Pontos" },
  { id: "grid" as const, label: "Grade" },
];

export function LetterheadStyleEditor({
  style,
  onChange,
  collapsible = false,
}: {
  style: LetterheadStyle;
  onChange: (s: LetterheadStyle) => void;
  collapsible?: boolean;
}) {
  return (
    <div className="flex flex-col gap-3">
      {/* Background */}
      <Section
        label="Fundo"
        icon={<Palette className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
        defaultOpen
      >
        <div className="flex gap-1">
          {(["solid", "gradient"] as LetterheadBgType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onChange({ ...style, bgType: t })}
              className={`flex-1 px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors ${
                style.bgType === t
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:border-muted-foreground"
              }`}
            >
              {t === "solid" ? "Solido" : "Gradiente"}
            </button>
          ))}
        </div>
        {style.bgType === "solid" && (
          <ColorField
            label="Cor de fundo"
            value={style.bg}
            onChange={(v) => onChange({ ...style, bg: v })}
          />
        )}
        {style.bgType === "gradient" && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label="De"
                value={style.gradientFrom}
                onChange={(v) => onChange({ ...style, gradientFrom: v })}
              />
              <ColorField
                label="Para"
                value={style.gradientTo}
                onChange={(v) => onChange({ ...style, gradientTo: v })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                Direcao
              </span>
              <div className="grid grid-cols-4 gap-1">
                {GRADIENT_DIRECTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() =>
                      onChange({ ...style, gradientDirection: d.id })
                    }
                    className={`flex items-center justify-center py-1.5 border rounded-xs transition-colors ${
                      style.gradientDirection === d.id
                        ? "border-foreground bg-secondary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    title={d.label}
                  >
                    {d.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                Presets
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {GRADIENT_PRESETS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() =>
                      onChange({
                        ...style,
                        gradientFrom: g.from,
                        gradientTo: g.to,
                      })
                    }
                    className="aspect-[2/1] rounded-xs border border-border hover:border-foreground transition-colors"
                    style={{
                      background: `linear-gradient(to right, ${g.from}, ${g.to})`,
                    }}
                    title={g.name}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Text */}
      <Section
        label="Texto"
        icon={<AlignCenter className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
        defaultOpen
      >
        <ColorField
          label="Cor do texto"
          value={style.text}
          onChange={(v) => onChange({ ...style, text: v })}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
            Alinhamento
          </span>
          <div className="flex gap-1">
            {ALIGN_OPTIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onChange({ ...style, textAlign: a.id })}
                className={`flex-1 px-2 py-1 text-[10px] font-mono border rounded-xs transition-colors ${
                  style.textAlign === a.id
                    ? "border-foreground bg-secondary text-foreground"
                    : "border-border text-foreground/50 hover:border-muted-foreground"
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Texture */}
      <Section
        label="Textura"
        icon={<Layers className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
      >
        <div className="flex gap-1">
          {TEXTURE_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ ...style, textureType: t.id })}
              className={`flex-1 px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors ${
                style.textureType === t.id
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:border-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {style.textureType !== "none" && (
          <SliderField
            label="Opacidade"
            value={Math.round(style.textureOpacity * 100)}
            min={0}
            max={50}
            unit="%"
            onChange={(v) => onChange({ ...style, textureOpacity: v / 100 })}
          />
        )}
      </Section>

      {/* Borders */}
      <Section
        label="Bordas"
        icon={<BoxSelect className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
      >
        <div className="flex flex-wrap gap-1">
          {BORDER_STYLES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onChange({ ...style, borderStyle: b.id })}
              className={`px-2 py-1 text-[10px] font-mono border rounded-xs transition-colors ${
                style.borderStyle === b.id
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:border-muted-foreground"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
        {style.borderStyle !== "none" && (
          <>
            <SliderField
              label="Espessura"
              value={style.borderWidth}
              min={1}
              max={8}
              onChange={(v) => onChange({ ...style, borderWidth: v })}
            />
            <ColorField
              label="Cor"
              value={style.borderColor}
              onChange={(v) => onChange({ ...style, borderColor: v })}
            />
            <SliderField
              label="Raio"
              value={style.borderRadius}
              min={0}
              max={24}
              onChange={(v) => onChange({ ...style, borderRadius: v })}
            />
          </>
        )}
      </Section>

      {/* Spacing */}
      <Section
        label="Espacamento"
        icon={<Maximize className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
      >
        <SliderField
          label="Horizontal"
          value={style.paddingX}
          min={0}
          max={64}
          step={4}
          onChange={(v) => onChange({ ...style, paddingX: v })}
        />
        <SliderField
          label="Vertical"
          value={style.paddingY}
          min={0}
          max={48}
          step={4}
          onChange={(v) => onChange({ ...style, paddingY: v })}
        />
      </Section>
    </div>
  );
}
