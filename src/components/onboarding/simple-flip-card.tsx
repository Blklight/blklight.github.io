"use client";

import { Check, RotateCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";
import { DitherSpotlight } from "./dither-spotlight";

interface Props {
  app: PlatformApp;
  selected: boolean;
  onToggle: () => void;
  hoverDither?: boolean;
}

export const SimpleFlipCard = ({
  app,
  selected,
  onToggle,
  hoverDither = true,
}: Props) => {
  const [flipped, setFlipped] = useState(false);
  const meta = appMeta(app);
  const Icon = meta.icon;

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFlipped((f) => !f);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const face = cn(
    "absolute inset-0 backface-hidden rounded-xs border overflow-hidden transition-colors duration-200",
    selected
      ? "bg-foreground text-background border-foreground"
      : "bg-card text-foreground border-border group-hover:border-foreground/60",
  );
  const muted = selected ? "text-background/65" : "text-muted-foreground";
  const rule = selected ? "border-background/25" : "border-border";
  const statusLabel = selected ? "Selecionado" : "Clique para selecionar";

  return (
    <div className="group relative transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <div className="perspective-1000 h-88 relative">
        {/* biome-ignore lint/a11y/useSemanticElements: card 3D com conteúdo em bloco e botão interno não cabe em <button> */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label={app.name}
          onClick={onToggle}
          onKeyDown={handleKey}
          className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out cursor-pointer rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 motion-reduce:transition-none"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div className={face}>
            {hoverDither && <DitherSpotlight />}
            <div className="relative z-10 p-6 flex flex-col h-full pointer-events-none">
              <div className="flex items-start justify-between">
                <span className={cn("text-xs", muted)}>
                  {meta.tagline}
                  {!meta.available && " · Em breve"}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-6 rounded-full border flex items-center justify-center transition-colors",
                    selected
                      ? "bg-blklight-400 border-blklight-400 text-dark"
                      : "border-border",
                  )}
                >
                  {selected && <Check className="size-3.5" strokeWidth={3} />}
                </span>
              </div>

              <div className="flex-1 flex items-center">
                {app.iconUrl ? (
                  // biome-ignore lint/performance/noImgElement: iconUrl pode vir de host arbitrário da API; next/image exigiria allowlist de domínios
                  <img
                    src={app.iconUrl}
                    alt=""
                    className="size-12 object-contain"
                  />
                ) : Icon ? (
                  <Icon className="size-10" strokeWidth={1.5} />
                ) : (
                  <span className="font-sans text-5xl font-bold">
                    {app.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <h3 className="font-sans text-2xl font-bold tracking-tight">
                {app.name}
              </h3>
              <p className={cn("text-sm mt-1 line-clamp-2", muted)}>
                {meta.description}
              </p>
              <div
                className={cn(
                  "flex items-center justify-between border-t pt-3 mt-5 pr-10 text-xs",
                  rule,
                  muted,
                )}
              >
                {statusLabel}
              </div>
            </div>
            <FlipButton
              onClick={handleFlip}
              label={`Ver detalhes de ${app.name}`}
            />
          </div>

          <div className={cn(face, "rotate-y-180")}>
            <div className="relative z-10 p-6 flex flex-col h-full pointer-events-none">
              <div className="flex items-center gap-2 mb-4">
                {Icon && <Icon className="size-4" strokeWidth={1.75} />}
                <span className="font-sans font-bold">{app.name}</span>
                <span className={cn("ml-auto text-xs", muted)}>
                  {meta.available ? "Disponível" : "Em breve"}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{meta.description}</p>

              {meta.features.length > 0 && (
                <>
                  <p className={cn("text-xs mt-5 mb-2", muted)}>Recursos</p>
                  <ul className="space-y-1.5 text-sm">
                    {meta.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-[0.55em] size-1 shrink-0 bg-current"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {meta.idealFor && (
                <p className={cn("text-xs mt-auto pt-4 border-t", rule, muted)}>
                  Ideal para{" "}
                  <span
                    className={selected ? "text-background" : "text-foreground"}
                  >
                    {meta.idealFor}
                  </span>
                </p>
              )}
              <div
                className={cn(
                  "flex items-center justify-between pt-3 pr-10 text-xs",
                  !meta.idealFor && "mt-auto",
                  muted,
                )}
              >
                {statusLabel}
              </div>
            </div>
            <FlipButton onClick={handleFlip} label="Voltar à frente do card" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FlipButtonProps {
  onClick: (e: React.MouseEvent) => void;
  label: string;
}

const FlipButton = ({ onClick, label }: FlipButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    onKeyDown={(e) => e.stopPropagation()}
    aria-label={label}
    title={label}
    className="absolute bottom-3 right-3 z-30 size-9 rounded-full flex items-center justify-center text-current/60 hover:text-current hover:bg-current/10 transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-current"
  >
    <RotateCw className="size-4" />
  </button>
);
