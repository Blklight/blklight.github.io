"use client";

import { Check } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { PlatformApp } from "@/types/api.types";

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

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!hoverDither) return;
    updateMousePos(e.clientX, e.clientY);
    const el = containerRef.current;
    if (el) el.style.setProperty("--fx-opacity", "1");
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!hoverDither) return;
    updateMousePos(e.clientX, e.clientY);
    const el = containerRef.current;
    if (el) el.style.setProperty("--fx-opacity", "1");
  };
  const handleMouseLeave = () => {
    if (!hoverDither) return;
    const el = containerRef.current;
    if (el) el.style.setProperty("--fx-opacity", "0");
  };

  const handleFlip = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if ("preventDefault" in e) e.preventDefault();
    setFlipped((f) => !f);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  const invertedClass = selected ? "is-inverted" : "";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${hoverDither ? "fx-card simple-dither" : ""} group relative text-ink ${
        selected ? "is-selected shadow-pop-bl" : "hover:shadow-pop-bl"
      }`}
    >
      <div ref={containerRef} className="perspective-1000 h-115 relative">
        {/* biome-ignore lint/a11y/useSemanticElements: card 3D com conteúdo em bloco não cabe em <button> */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label={`${selected ? "desmarcar" : "selecionar"} app ${app.name}`}
          onClick={onToggle}
          onKeyDown={handleKey}
          className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 motion-reduce:transition-none"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRENTE */}
          <div
            className={`absolute inset-0 backface-hidden border border-ink overflow-hidden flex flex-col justify-between transition-colors duration-200 ${
              selected
                ? "bg-ink text-background"
                : "bg-background text-foreground"
            }`}
          >
            {hoverDither && (
              <div
                className={`dither-layer ${invertedClass}`}
                aria-hidden="true"
              />
            )}

            <div className="relative z-10 p-6 flex flex-col justify-between h-full pointer-events-none">
              <div className="flex items-start justify-between">
                <div
                  className={`text-[10px] uppercase tracking-widest ${selected ? "text-background/60" : "text-muted-foreground"}`}
                >
                  {app.category}
                </div>
                <span
                  aria-hidden={!selected}
                  className={`border w-5 h-5 flex items-center justify-center transition-opacity ${
                    selected
                      ? "border-background opacity-100"
                      : "border-transparent opacity-0"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </span>
              </div>

              <div className="text-6xl font-bold leading-none my-6 select-none">
                {app.iconUrl ? (
                  // biome-ignore lint/performance/noImgElement: iconUrl pode vir de host arbitrário da API; next/image exigiria allowlist de domínios
                  <img
                    src={app.iconUrl}
                    alt=""
                    className="h-14 w-14 object-contain"
                  />
                ) : (
                  app.name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xl font-bold uppercase tracking-tight">
                  {app.name}
                </div>
                <div
                  className={`text-xs ${selected ? "text-background/70" : "text-muted-foreground"}`}
                >
                  {app.tagline}
                </div>
              </div>

              <div
                className={`flex items-center justify-between gap-2 border-t pt-3 mt-4 ${selected ? "border-background/40" : "border-ink/30"}`}
              >
                <div
                  className={`text-[10px] uppercase tracking-widest ${selected ? "text-background/60" : "text-muted-foreground"}`}
                >
                  {selected ? "[ selecionado ]" : "[ clique para selecionar ]"}
                </div>
                <span
                  className={`text-[10px] uppercase tracking-widest ${selected ? "text-background/50" : "text-muted-foreground/70"}`}
                >
                  {app.accessMode}
                </span>
              </div>
            </div>

            <FlipCorner onClick={handleFlip} inverted={selected} side="front" />
          </div>

          {/* VERSO */}
          <div
            className={`absolute inset-0 backface-hidden rotate-y-180 border border-ink overflow-hidden flex flex-col justify-between transition-colors duration-200 ${
              selected ? "bg-ink text-background" : "bg-surface text-foreground"
            }`}
          >
            {hoverDither && (
              <div
                className={`dither-layer ${invertedClass}`}
                aria-hidden="true"
              />
            )}

            <div className="relative z-10 p-6 flex flex-col justify-between h-full pointer-events-none">
              <div>
                <div
                  className={`text-[10px] uppercase tracking-widest mb-4 ${selected ? "text-background/60" : "text-muted-foreground"}`}
                >
                  {app.name.toLowerCase()}
                </div>
                <p className="text-sm leading-relaxed mb-5">
                  {app.description}
                </p>
              </div>

              <div
                className={`flex items-center justify-between gap-2 border-t pt-3 ${selected ? "border-background/40" : "border-ink/30"}`}
              >
                <div
                  className={`text-[10px] uppercase tracking-widest ${selected ? "text-background/60" : "text-muted-foreground"}`}
                >
                  <span>{app.accessMode}</span>
                  <span className="mx-2">·</span>
                  <span>{selected ? "[✓ ativo]" : "[ clique p/ ativar ]"}</span>
                </div>
              </div>
            </div>

            <FlipCorner onClick={handleFlip} inverted={selected} side="back" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FlipCornerProps {
  onClick: (e: React.MouseEvent) => void;
  inverted: boolean;
  side: "front" | "back";
}

const FlipCorner = ({ onClick, inverted, side }: FlipCornerProps) => {
  const positionClass =
    side === "back" ? "bottom-0 left-0" : "bottom-0 right-0";
  const justifyClass =
    side === "back" ? "items-end justify-start" : "items-end justify-end";
  const svgFlipClass = side === "back" ? "scale-x-[-1]" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={(e) => e.stopPropagation()}
      aria-label="virar card"
      title="virar"
      className={`absolute ${positionClass} w-9 h-9 flex ${justifyClass} p-1.5 z-30 group/corner focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] cursor-pointer ${
        inverted
          ? "focus-visible:outline-background"
          : "focus-visible:outline-ink"
      }`}
      style={{ pointerEvents: "auto" }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
        className={`transition-opacity ${svgFlipClass} ${
          inverted
            ? "text-background/50 group-hover/corner:text-background"
            : "text-ink/40 group-hover/corner:text-ink"
        }`}
      >
        <path d="M12 0 L12 12 L0 12 Z" fill="currentColor" />
      </svg>
    </button>
  );
};
