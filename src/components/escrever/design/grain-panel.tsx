"use client";

import { Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  GRAIN_BLEND_MODES,
  type GrainToneSettings,
  isBlendMode,
  PAPER_GRAINS,
  type PaperGrain,
  type PaperTone,
} from "@/features/documents/design/grains";
import { useAuthStore } from "@/store/useAuthStore";
import type { DesignContext } from "./layout";
import { SliderField } from "./slider-field";

const TONE_LABELS: Record<PaperTone, string> = {
  light: "Papel claro",
  dark: "Papel escuro",
};

export function GrainPanel({ design }: DesignContext) {
  const { paperStyle, setPaperStyle } = design;
  const current = paperStyle.grains ?? [];
  const isAdmin = useAuthStore((s) => s.user?.role === "admin");

  const toggleGrain = (id: string, checked: boolean) => {
    const next = checked
      ? current.includes(id)
        ? current
        : [...current, id]
      : current.filter((g) => g !== id);
    setPaperStyle({ ...paperStyle, grains: next });
  };

  const updateTone = (
    grainId: string,
    tone: PaperTone,
    patch: GrainToneSettings,
  ) => {
    const settings = paperStyle.grainSettings ?? {};
    const grainSettings = settings[grainId] ?? {};
    setPaperStyle({
      ...paperStyle,
      grainSettings: {
        ...settings,
        [grainId]: {
          ...grainSettings,
          [tone]: { ...grainSettings[tone], ...patch },
        },
      },
    });
  };

  const resetGrain = (grainId: string) => {
    const { [grainId]: _removed, ...rest } = paperStyle.grainSettings ?? {};
    setPaperStyle({ ...paperStyle, grainSettings: rest });
  };

  const renderAdvanced = (grain: PaperGrain) => {
    const variants = grain.variants;
    if (!variants) return null;
    const overrides = paperStyle.grainSettings?.[grain.id];
    return (
      <div className="flex flex-col gap-3 p-2 border border-border rounded-xs">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
            Avançado — {grain.name}
          </span>
          <button
            type="button"
            onClick={() => resetGrain(grain.id)}
            className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors underline underline-offset-2"
          >
            Restaurar padrões
          </button>
        </div>
        {(["light", "dark"] as const).map((tone) => {
          const blend = overrides?.[tone]?.blend ?? variants[tone].blend;
          const opacity = overrides?.[tone]?.opacity ?? variants[tone].opacity;
          return (
            <div key={tone} className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/60">
                {TONE_LABELS[tone]}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                  Blend
                </span>
                <Select
                  value={blend}
                  onValueChange={(value) => {
                    if (isBlendMode(value)) {
                      updateTone(grain.id, tone, { blend: value });
                    }
                  }}
                >
                  <SelectTrigger className="h-8 text-[10px] font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRAIN_BLEND_MODES.map((mode) => (
                      <SelectItem
                        key={mode}
                        value={mode}
                        className="text-[10px] font-mono"
                      >
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <SliderField
                label="Opacidade"
                value={opacity}
                onChange={(value) =>
                  updateTone(grain.id, tone, { opacity: value })
                }
                min={0}
                max={1}
                step={0.05}
                unit=""
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-foreground/40" />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
          Granulação do Papel
        </span>
      </div>

      <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
        Efeitos de grão aplicados ao fundo do papel, por baixo do conteúdo.
        Podem ser combinados.
      </p>

      <div className="flex flex-col gap-1.5">
        {PAPER_GRAINS.map((grain) => (
          <div key={grain.id} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between p-2 border border-border rounded-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/60">
                  {grain.name}
                </span>
                <span className="text-[9px] font-mono text-foreground/30">
                  {grain.description}
                </span>
              </div>
              <Switch
                checked={current.includes(grain.id)}
                onCheckedChange={(checked) => toggleGrain(grain.id, checked)}
              />
            </div>
            {isAdmin && current.includes(grain.id) && renderAdvanced(grain)}
          </div>
        ))}
      </div>
    </div>
  );
}
