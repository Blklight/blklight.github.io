"use client";

import { Grid3X3 } from "lucide-react";
import { TEXTURE_PRESETS } from "@/components/document/constants";
import { cn } from "@/lib/utils";
import type { DesignContext } from "./layout";

export function TexturePanel({ design }: DesignContext) {
  const { paperTexture, setPaperTexture, paperColors, textureStyle } = design;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Grid3X3 className="w-4 h-4 text-foreground/40" />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
          Textura do Papel
        </span>
      </div>

      <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
        Adicione uma textura sutil ao fundo do documento. Disponivel nos tipos
        Bullet Journal (pontilhado) ou Quadriculado.
      </p>

      {/* Type selector */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
          Tipo de Textura
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {TEXTURE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() =>
                setPaperTexture({
                  ...paperTexture,
                  type: preset.id,
                })
              }
              className={cn(
                "flex flex-col items-center gap-1.5 px-3 py-3 border rounded-xs transition-colors",
                paperTexture.type === preset.id
                  ? "border-foreground bg-secondary text-foreground"
                  : "border-border text-foreground/50 hover:text-foreground hover:border-muted-foreground",
              )}
            >
              {preset.icon}
              <span className="text-[10px] font-mono uppercase tracking-wider">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Only show controls when texture is not "none" */}
      {paperTexture.type !== "none" && (
        <>
          {/* Size */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                Tamanho
              </span>
              <span className="text-[10px] font-mono text-foreground/40">
                {paperTexture.size}px
              </span>
            </div>
            <input
              type="range"
              min={8}
              max={48}
              step={2}
              value={paperTexture.size}
              onChange={(e) =>
                setPaperTexture({
                  ...paperTexture,
                  size: Number(e.target.value),
                })
              }
              className="w-full accent-foreground h-1"
            />
          </div>

          {/* Opacity */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                Opacidade
              </span>
              <span className="text-[10px] font-mono text-foreground/40">
                {Math.round(paperTexture.opacity * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={Math.round(paperTexture.opacity * 100)}
              onChange={(e) =>
                setPaperTexture({
                  ...paperTexture,
                  opacity: Number(e.target.value) / 100,
                })
              }
              className="w-full accent-foreground h-1"
            />
          </div>

          {/* Color */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
              Cor da Textura
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setPaperTexture({ ...paperTexture, color: null })
                }
                className={cn(
                  "px-2 py-1 text-[10px] font-mono border rounded-xs transition-colors uppercase tracking-wider",
                  paperTexture.color === null
                    ? "border-foreground bg-secondary text-foreground"
                    : "border-border text-foreground/50 hover:border-muted-foreground",
                )}
              >
                Automatica
              </button>
              <div className="flex items-center gap-1.5 flex-1">
                <input
                  type="color"
                  value={paperTexture.color || paperColors?.text || "#000000"}
                  onChange={(e) =>
                    setPaperTexture({
                      ...paperTexture,
                      color: e.target.value,
                    })
                  }
                  className="w-7 h-7 border border-border rounded-xs cursor-pointer"
                />
                <input
                  type="text"
                  value={paperTexture.color || ""}
                  onChange={(e) =>
                    setPaperTexture({
                      ...paperTexture,
                      color: e.target.value || null,
                    })
                  }
                  placeholder={paperColors?.text || "#000000"}
                  className="flex-1 px-2 py-1 text-[10px] font-mono border border-border rounded-xs bg-transparent outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-2 border border-border rounded-xs overflow-hidden">
            <div
              className="h-24 relative"
              style={{
                backgroundColor: paperColors?.bg || undefined,
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  ...textureStyle,
                  opacity: paperTexture.opacity,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[10px] font-mono uppercase tracking-wider"
                  style={{ color: paperColors?.text || undefined }}
                >
                  Textura:{" "}
                  {
                    TEXTURE_PRESETS.find((p) => p.id === paperTexture.type)
                      ?.name
                  }
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
