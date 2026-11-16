"use client";

import { Check, RotateCw } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const rafPending = useRef(false);
  const { icon: Icon, tagline, description } = appMeta(app);

  const updateMousePos = useCallback((clientX: number, clientY: number) => {
    const el = containerRef.current;
    if (!el) return;
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  const handlePointer = (e: React.MouseEvent) => {
    if (!hoverDither) return;
    updateMousePos(e.clientX, e.clientY);
    containerRef.current?.style.setProperty("--fx-opacity", "1");
  };
  const handleMouseLeave = () => {
    if (!hoverDither) return;
    containerRef.current?.style.setProperty("--fx-opacity", "0");
  };

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
      : "bg-card text-foreground border-border group-hover:border-foreground/50",
  );
  const muted = selected ? "text-background/70" : "text-muted-foreground";

  return (
    <div
      onMouseEnter={handlePointer}
      onMouseMove={handlePointer}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative",
        hoverDither && "fx-card simple-dither",
        selected && "is-selected",
      )}
    >
      <div ref={containerRef} className="perspective-1000 h-80 relative">
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
            {hoverDither && (
              <div
                className={cn("dither-layer", selected && "is-inverted")}
                aria-hidden="true"
              />
            )}
            <div className="relative z-10 p-6 flex flex-col h-full pointer-events-none">
              <div className="flex items-start justify-between">
                <span className="text-xs text-current/70">{tagline}</span>
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
              <p className={cn("text-xs mt-2 pr-10", muted)}>
                {selected ? "Selecionado" : "Clique para selecionar"}
              </p>
            </div>
            <FlipButton
              onClick={handleFlip}
              label={`Ver detalhes de ${app.name}`}
            />
          </div>

          <div className={cn(face, "rotate-y-180")}>
            <div className="relative z-10 p-6 flex flex-col h-full pointer-events-none">
              <span className={cn("text-xs mb-4", muted)}>{app.name}</span>
              <p className="text-sm leading-relaxed">{description}</p>
              <p className={cn("text-xs mt-auto pr-10", muted)}>
                {selected ? "Selecionado" : "Clique para selecionar"}
              </p>
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
