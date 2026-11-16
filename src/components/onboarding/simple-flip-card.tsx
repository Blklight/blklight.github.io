"use client";

import { Check, RotateCw } from "lucide-react";
import { useState } from "react";
import type { Corner } from "@/components/ui/chamfer-utils";
import { useFillet } from "@/components/ui/fillet-card";
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

  const muted = selected ? "text-background/65" : "text-muted-foreground";
  const rule = selected ? "border-background/25" : "border-border";
  const statusLabel = selected ? "Selecionado" : "Clique para selecionar";

  return (
    <div className="group relative transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0">
      <div className="perspective-1000 h-115 relative">
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
          <Face corner="br" selected={selected}>
            {hoverDither && (
              <DitherSpotlight
                className={selected ? meta.accent.inverted : meta.accent.text}
              />
            )}
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
                      ? cn(meta.accent.badge, "text-dark")
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
                  <Icon
                    className={cn(
                      "size-14",
                      selected ? meta.accent.inverted : meta.accent.text,
                    )}
                    strokeWidth={1.25}
                  />
                ) : (
                  <span className="font-sans text-5xl font-bold">
                    {app.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <h3 className="font-sans text-3xl font-bold tracking-tight">
                {app.name}
              </h3>
              <p className={cn("text-sm mt-2 line-clamp-3", muted)}>
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
          </Face>

          <Face corner="bl" selected={selected} back>
            <div className="relative z-10 p-6 flex flex-col h-full pointer-events-none">
              <div className="flex items-center gap-2 mb-4">
                {Icon && (
                  <Icon
                    className={cn(
                      "size-4",
                      selected ? meta.accent.inverted : meta.accent.text,
                    )}
                    strokeWidth={1.75}
                  />
                )}
                <span className="font-sans font-bold">{app.name}</span>
                <span className={cn("ml-auto text-xs", muted)}>
                  {meta.available ? "Disponível" : "Em breve"}
                </span>
              </div>
              <p className="text-base leading-relaxed">{meta.description}</p>

              {meta.features.length > 0 && (
                <>
                  <p className={cn("text-xs mt-5 mb-2", muted)}>Recursos</p>
                  <ul className="space-y-1.5 text-sm">
                    {meta.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "mt-[0.55em] size-1 shrink-0 bg-current",
                            selected ? meta.accent.inverted : meta.accent.text,
                          )}
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
          </Face>
        </div>
      </div>
    </div>
  );
};

interface FaceProps {
  corner: Corner;
  selected: boolean;
  back?: boolean;
  children: React.ReactNode;
}

// Back face cut is mirrored (bl): flipped around Y, the physical card's br corner lands bottom-left.
const Face = ({ corner, selected, back, children }: FaceProps) => {
  const [outerRef, outerClip] = useFillet([corner], "lg", 6, 0, 2);
  const [innerRef, innerClip] = useFillet([corner], "lg", 6, 1, 2);
  return (
    <div
      ref={outerRef}
      style={{ clipPath: outerClip }}
      className={cn(
        "absolute inset-0 backface-hidden p-px transition-colors duration-200",
        back && "rotate-y-180",
        selected ? "bg-foreground" : "bg-border group-hover:bg-foreground/60",
      )}
    >
      <div
        ref={innerRef}
        style={{ clipPath: innerClip }}
        className={cn(
          "relative h-full overflow-hidden transition-colors duration-200",
          selected
            ? "bg-foreground text-background"
            : "bg-card text-foreground",
        )}
      >
        {children}
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
    className="absolute bottom-5 right-5 z-30 size-9 rounded-full flex items-center justify-center text-current/60 hover:text-current hover:bg-current/10 transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-current"
  >
    <RotateCw className="size-4" />
  </button>
);
