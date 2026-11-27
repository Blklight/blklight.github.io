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
import { useTranslations } from "next-intl";
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

const BORDER_STYLES: { id: BorderStyleType }[] = [
  { id: "none" },
  { id: "solid" },
  { id: "dashed" },
  { id: "dotted" },
  { id: "double" },
];

const GRADIENT_DIRECTIONS: {
  id: GradientDirection;
  icon: React.ReactNode;
}[] = [
  {
    id: "to-r",
    icon: <ArrowRight className="w-3.5 h-3.5" />,
  },
  {
    id: "to-l",
    icon: <ArrowLeft className="w-3.5 h-3.5" />,
  },
  { id: "to-b", icon: <ArrowDown className="w-3.5 h-3.5" /> },
  { id: "to-t", icon: <ArrowUp className="w-3.5 h-3.5" /> },
  {
    id: "to-br",
    icon: <ArrowDownRight className="w-3.5 h-3.5" />,
  },
  {
    id: "to-bl",
    icon: <ArrowDownLeft className="w-3.5 h-3.5" />,
  },
  {
    id: "to-tr",
    icon: <ArrowUpRight className="w-3.5 h-3.5" />,
  },
  {
    id: "to-tl",
    icon: <ArrowUpLeft className="w-3.5 h-3.5" />,
  },
];

const ALIGN_OPTIONS: { id: TextAlignment }[] = [
  { id: "left" },
  { id: "center" },
  { id: "right" },
];

const TEXTURE_TYPES = [
  { id: "none" as const },
  { id: "dots" as const },
  { id: "grid" as const },
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
  const tl = useTranslations("letterhead");
  return (
    <div className="flex flex-col gap-3">
      {/* Background */}
      <Section
        label={tl("bg")}
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
              className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-colors ${
                style.bgType === t
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:border-muted-foreground"
              }`}
            >
              {t === "solid" ? tl("bgSolid") : tl("bgGradient")}
            </button>
          ))}
        </div>
        {style.bgType === "solid" && (
          <ColorField
            label={tl("bgColor")}
            value={style.bg}
            onChange={(v) => onChange({ ...style, bg: v })}
          />
        )}
        {style.bgType === "gradient" && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label={tl("from")}
                value={style.gradientFrom}
                onChange={(v) => onChange({ ...style, gradientFrom: v })}
              />
              <ColorField
                label={tl("to")}
                value={style.gradientTo}
                onChange={(v) => onChange({ ...style, gradientTo: v })}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                {tl("direction")}
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
                    title={tl(`directions.${d.id}`)}
                  >
                    {d.icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                {tl("gradientPresets")}
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
                    title={tl(`gradients.${g.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Text */}
      <Section
        label={tl("text")}
        icon={<AlignCenter className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
        defaultOpen
      >
        <ColorField
          label={tl("textColor")}
          value={style.text}
          onChange={(v) => onChange({ ...style, text: v })}
        />
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
            {tl("alignment")}
          </span>
          <div className="flex gap-1">
            {ALIGN_OPTIONS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => onChange({ ...style, textAlign: a.id })}
                className={`flex-1 px-2 py-1 text-xs font-mono border rounded-xs transition-colors ${
                  style.textAlign === a.id
                    ? "border-foreground bg-secondary text-foreground"
                    : "border-border text-foreground/50 hover:border-muted-foreground"
                }`}
              >
                {tl(`align.${a.id}`)}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Texture */}
      <Section
        label={tl("texture")}
        icon={<Layers className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
      >
        <div className="flex gap-1">
          {TEXTURE_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ ...style, textureType: t.id })}
              className={`flex-1 px-2 py-1.5 text-xs font-mono uppercase tracking-wider border rounded-xs transition-colors ${
                style.textureType === t.id
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:border-muted-foreground"
              }`}
            >
              {tl(`textures.${t.id}`)}
            </button>
          ))}
        </div>
        {style.textureType !== "none" && (
          <SliderField
            label={tl("opacity")}
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
        label={tl("bordersLabel")}
        icon={<BoxSelect className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
      >
        <div className="flex flex-wrap gap-1">
          {BORDER_STYLES.map((b) => (
            <button
              key={b.id}
              type="button"
              onClick={() => onChange({ ...style, borderStyle: b.id })}
              className={`px-2 py-1 text-xs font-mono border rounded-xs transition-colors ${
                style.borderStyle === b.id
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:border-muted-foreground"
              }`}
            >
              {tl(`borders.${b.id}`)}
            </button>
          ))}
        </div>
        {style.borderStyle !== "none" && (
          <>
            <SliderField
              label={tl("thickness")}
              value={style.borderWidth}
              min={1}
              max={8}
              onChange={(v) => onChange({ ...style, borderWidth: v })}
            />
            <ColorField
              label={tl("color")}
              value={style.borderColor}
              onChange={(v) => onChange({ ...style, borderColor: v })}
            />
            <SliderField
              label={tl("radius")}
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
        label={tl("spacing")}
        icon={<Maximize className="w-3.5 h-3.5 text-muted-foreground" />}
        collapsible={collapsible}
      >
        <SliderField
          label={tl("horizontal")}
          value={style.paddingX}
          min={0}
          max={64}
          step={4}
          onChange={(v) => onChange({ ...style, paddingX: v })}
        />
        <SliderField
          label={tl("vertical")}
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
