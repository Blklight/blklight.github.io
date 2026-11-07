"use client";

import { useMemo, useState } from "react";
import {
  calculateContrastRatio,
  getAccessibleTextColor,
  getWCAGLevel,
} from "@/components/document/color-utils";
import { PAPER_THEME_PRESETS } from "@/components/document/constants";
import { cn } from "@/lib/utils";
import type { DesignContext } from "./layout";

export function ColorsPanel({ design, presets }: DesignContext) {
  const { paperStyle, setPaperStyle, paperColors, fontClass } = design;
  const { savedColors, handleSaveColor, handleDeleteColor } = presets;

  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [customBgInput, setCustomBgInput] = useState("#FFFFFF");
  const [customTextInput, setCustomTextInput] = useState("#1A1A1A");
  const [customName, setCustomName] = useState("");

  const customContrast = useMemo(
    () => calculateContrastRatio(customBgInput, customTextInput),
    [customBgInput, customTextInput],
  );
  const wcagInfo = getWCAGLevel(customContrast);

  const handleApplyCustom = () => {
    setPaperStyle({
      mode: "custom",
      presetId: null,
      bg: customBgInput,
      text: customTextInput,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <PaletteIcon />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
          Cores do Papel
        </span>
      </div>

      <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
        Escolha o esquema de cores do documento. As cores sao aplicadas ao fundo
        do papel, texto principal e elementos decorativos.
      </p>

      {/* Mode selector */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
          Modo de Cor
        </span>
        <div className="grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => {
              setPaperStyle({
                mode: "default",
                presetId: null,
                bg: null,
                text: null,
                grains: paperStyle.grains,
              });
              setShowCustomPicker(false);
            }}
            className={cn(
              "px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors",
              paperStyle.mode === "default"
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-foreground/50 hover:border-muted-foreground",
            )}
          >
            Tema Padrao
          </button>
          <button
            type="button"
            onClick={() => {
              setPaperStyle({
                mode: "preset",
                presetId: null,
                bg: null,
                text: null,
                grains: paperStyle.grains,
              });
              setShowCustomPicker(false);
            }}
            className={cn(
              "px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors",
              paperStyle.mode === "preset"
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-foreground/50 hover:border-muted-foreground",
            )}
          >
            Predefinidas
          </button>
          <button
            type="button"
            onClick={() => {
              setPaperStyle({
                mode: "custom",
                presetId: null,
                bg: null,
                text: null,
                grains: paperStyle.grains,
              });
              setShowCustomPicker(true);
            }}
            className={cn(
              "px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-xs transition-colors",
              paperStyle.mode === "custom"
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-foreground/50 hover:border-muted-foreground",
            )}
          >
            Personalizada
          </button>
        </div>
      </div>

      {/* Presets */}
      {paperStyle.mode === "preset" && (
        <div className="grid grid-cols-4 gap-1.5">
          {PAPER_THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() =>
                setPaperStyle({
                  mode: "preset",
                  presetId: preset.id,
                  bg: preset.bg,
                  text: getAccessibleTextColor(preset.bg),
                  grains: paperStyle.grains,
                })
              }
              className={cn(
                "flex flex-col items-center gap-1.5 px-2 py-3 border rounded-xs transition-colors",
                paperStyle.presetId === preset.id
                  ? "border-foreground ring-1 ring-foreground"
                  : "border-border hover:border-muted-foreground",
              )}
            >
              <div
                className="w-6 h-6 rounded-xs border border-foreground/10"
                style={{ backgroundColor: preset.bg }}
              />
              <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/60">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Saved colors */}
      {savedColors.length > 0 &&
        (paperStyle.mode === "preset" || paperStyle.mode === "custom") && (
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
              Cores Salvas
            </span>
            <div className="flex flex-col gap-1">
              {savedColors.map((color) => (
                <div
                  key={color.id}
                  className="flex items-center gap-2 px-2 py-1.5 border border-border rounded-xs"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setPaperStyle({
                        mode: "custom",
                        presetId: null,
                        bg: color.bg,
                        text: color.text,
                        grains: paperStyle.grains,
                      })
                    }
                    className="flex items-center gap-2 flex-1 text-left"
                  >
                    <div
                      className="w-5 h-5 rounded-xs border border-foreground/10 shrink-0"
                      style={{ backgroundColor: color.bg }}
                    />
                    <span className="text-[10px] font-mono text-foreground/60">
                      {color.name}
                    </span>
                    <span className="text-[8px] font-mono text-foreground/30 ml-auto">
                      {color.bg}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteColor(color.id)}
                    className="text-foreground/30 hover:text-foreground transition-colors"
                  >
                    <XIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Custom color picker */}
      {showCustomPicker && (
        <div className="flex flex-col gap-3 p-3 border border-border rounded-xs bg-secondary/10">
          <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/30">
            Personalizar Cores
          </span>

          {/* Background color */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-foreground/40">
              Cor de fundo
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customBgInput}
                onChange={(e) => {
                  setCustomBgInput(e.target.value);
                  setCustomTextInput(getAccessibleTextColor(e.target.value));
                }}
                className="w-8 h-8 border border-border rounded-xs cursor-pointer"
              />
              <input
                type="text"
                value={customBgInput}
                onChange={(e) => setCustomBgInput(e.target.value)}
                className="flex-1 px-2 py-1 text-[10px] font-mono border border-border rounded-xs bg-transparent outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>

          {/* Text color */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-foreground/40">
              Cor do texto
            </span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customTextInput}
                onChange={(e) => setCustomTextInput(e.target.value)}
                className="w-8 h-8 border border-border rounded-xs cursor-pointer"
              />
              <input
                type="text"
                value={customTextInput}
                onChange={(e) => setCustomTextInput(e.target.value)}
                className="flex-1 px-2 py-1 text-[10px] font-mono border border-border rounded-xs bg-transparent outline-none focus:border-foreground transition-colors"
              />
            </div>
          </div>

          {/* WCAG contrast */}
          <div
            className="flex items-center gap-2 px-2 py-1.5 border rounded-xs"
            style={{
              borderColor: wcagInfo.color,
              backgroundColor: `${wcagInfo.color}15`,
            }}
          >
            <span
              className="text-[10px] font-mono font-bold uppercase px-1 py-0.5 rounded-xs"
              style={{
                backgroundColor: wcagInfo.color,
                color: "#FFFFFF",
              }}
            >
              {wcagInfo.level}
            </span>
            <span
              className="text-[9px] font-mono"
              style={{ color: wcagInfo.color }}
            >
              {customContrast.toFixed(2)}:1
            </span>
            <span className="text-[8px] font-mono text-foreground/40 ml-auto">
              {customContrast < 4.5
                ? "Contraste insuficiente"
                : "Contraste adequado"}
            </span>
          </div>

          {/* Preview block */}
          <div
            className="p-3 border rounded-xs"
            style={{
              backgroundColor: customBgInput,
              borderColor: customTextInput,
            }}
          >
            <p className="text-xs font-mono" style={{ color: customTextInput }}>
              Preview: {customBgInput} / {customTextInput}
            </p>
          </div>

          {/* Save name + button */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Nome da cor"
              className="flex-1 px-2 py-1 text-[10px] font-mono border border-border rounded-xs bg-transparent outline-none focus:border-foreground transition-colors"
            />
            <button
              type="button"
              disabled={!customName.trim()}
              onClick={() => {
                handleSaveColor({
                  id: `${Date.now()}`,
                  bg: customBgInput,
                  text: customTextInput,
                  name: customName.trim(),
                });
                setCustomName("");
              }}
              className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-foreground/30 rounded-xs hover:bg-secondary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Salvar
            </button>
          </div>

          {/* Apply button */}
          <button
            type="button"
            disabled={customContrast < 3}
            onClick={handleApplyCustom}
            className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border border-foreground rounded-xs bg-secondary text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Aplicar cor
          </button>
        </div>
      )}

      {/* Current preview */}
      <div className="mt-2 border border-border rounded-xs overflow-hidden">
        <div
          className="h-20 flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: paperColors?.bg || undefined,
          }}
        >
          <span
            className={cn("text-sm font-bold tracking-tight", fontClass)}
            style={{ color: paperColors?.text || undefined }}
          >
            {paperColors
              ? `${paperColors.bg} / ${paperColors.text}`
              : "Tema Padrao"}
          </span>
        </div>
      </div>
    </div>
  );
}

function PaletteIcon() {
  return (
    <svg
      className="w-4 h-4 text-foreground/40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx={13.5} cy={6.5} r={0.5} fill="currentColor" />
      <circle cx={17.5} cy={10.5} r={0.5} fill="currentColor" />
      <circle cx={8.5} cy={7.5} r={0.5} fill="currentColor" />
      <circle cx={6.5} cy={12.5} r={0.5} fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.4-.15-.78-.41-1.07-.26-.29-.41-.67-.41-1.07 0-.83.67-1.5 1.5-1.5H17c3.31 0 6-2.69 6-6 0-5.5-4.5-10-11-10z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="w-3 h-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
