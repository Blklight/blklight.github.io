"use client";

import { Check, ChevronLeft, RotateCw } from "lucide-react";
import { useState } from "react";
import type { Corner } from "@/components/ui/chamfer-utils";
import { useFillet } from "@/components/ui/fillet-card";
import { cn } from "@/lib/utils";
import type { PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";
import { CornerBrackets } from "./corner-brackets";

interface Props {
  app: PlatformApp;
  selected: boolean;
  onToggle: () => void;
}

/**
 * App ficha, after the Tally cards: colored stock with grain, registration
 * marks around the label and the name, a pixel numeral, and an ink bar that
 * turns the card over to its list of features.
 */
export const SimpleFlipCard = ({ app, selected, onToggle }: Props) => {
  const [flipped, setFlipped] = useState(false);
  const meta = appMeta(app);
  const count = String(meta.features.length).padStart(2, "0");

  const flip = (e: React.MouseEvent) => {
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
          className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out cursor-pointer rounded-[1.25rem] outline-none focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-4 motion-reduce:transition-none"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <Face corner="br" paper={meta.accent.paper} selected={selected}>
            <div className="flex items-center justify-between gap-2">
              <span className="relative px-2 py-1 text-xs uppercase">
                <CornerBrackets size="size-2" className="opacity-70" />
                {meta.tagline}
                {!meta.available && " · em breve"}
              </span>
              <SelectMark selected={selected} />
            </div>

            <div className="relative mt-8 p-3">
              <CornerBrackets size="size-3" className="opacity-80" />
              <h3 className="font-mono text-3xl font-medium uppercase wrap-break-word">
                {app.name}
              </h3>
              <p className="mt-1 text-sm opacity-80 line-clamp-2">
                {meta.description}
              </p>
            </div>

            <p className="my-auto flex flex-col items-center gap-1 leading-none">
              <span className="font-pixel-circle text-8xl">{count}</span>
              <span className="text-sm opacity-70">
                {meta.features.length === 1 ? "recurso" : "recursos"}
              </span>
            </p>

            <InkBar onClick={flip} label={`Ver recursos de ${app.name}`}>
              Ver recursos
              <RotateCw aria-hidden className="size-3.5" />
            </InkBar>
          </Face>

          <Face corner="bl" paper={meta.accent.paper} selected={selected} back>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={flip}
                onKeyDown={(e) => e.stopPropagation()}
                className="pointer-events-auto -ml-1 inline-flex items-center gap-1 rounded-xs px-1 py-1 text-sm hover:bg-dark/10 outline-none focus-visible:outline-2 focus-visible:outline-current cursor-pointer"
              >
                <ChevronLeft aria-hidden className="size-4" />
                Capa
              </button>
              <span className="text-xs uppercase opacity-70">
                {meta.available ? "Disponível" : "Em breve"}
              </span>
            </div>

            <div className="relative mt-4 p-1.5">
              <CornerBrackets size="size-3" className="opacity-80" />
              <ul>
                {meta.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3 border-b border-dark/25 px-2.5 py-3.5 text-sm last:border-b-0"
                  >
                    <span
                      aria-hidden
                      className="size-4 shrink-0 rounded-[2px] border-2 border-dark"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {meta.idealFor && (
              <p className="mt-auto pt-6 text-xs">
                <span className="opacity-70">Ideal para </span>
                {meta.idealFor}
              </p>
            )}
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="opacity-70">
                {selected ? "Selecionado" : "Clique para selecionar"}
              </span>
              <SelectMark selected={selected} />
            </div>
          </Face>
        </div>
      </div>
    </div>
  );
};

const SelectMark = ({ selected }: { selected: boolean }) => (
  <span
    aria-hidden
    className={cn(
      "size-6 shrink-0 rounded-[3px] border-2 border-dark flex items-center justify-center",
      selected && "bg-dark text-light",
    )}
  >
    {selected && <Check className="size-3.5" strokeWidth={3} />}
  </span>
);

interface FaceProps {
  corner: Corner;
  paper: string;
  selected: boolean;
  back?: boolean;
  children: React.ReactNode;
}

// Back face cut is mirrored (bl): flipped around Y, the physical card's br corner lands bottom-left.
const Face = ({ corner, paper, selected, back, children }: FaceProps) => {
  const [outerRef, outerClip] = useFillet([corner], "lg", 6, 0, 20);
  const [innerRef, innerClip] = useFillet([corner], "lg", 6, 3, 17);
  return (
    <div
      ref={outerRef}
      style={{ clipPath: outerClip }}
      className={cn(
        "absolute inset-0 backface-hidden p-[3px] transition-colors duration-200",
        back && "rotate-y-180",
        selected ? "bg-dark" : paper,
      )}
    >
      <div
        ref={innerRef}
        style={{ clipPath: innerClip }}
        className={cn(
          "relative h-full overflow-hidden text-dark background-texture",
          paper,
        )}
      >
        <div className="relative h-full flex flex-col p-6 pointer-events-none [&_button]:pointer-events-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

interface InkBarProps {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  children: React.ReactNode;
}

const InkBar = ({ onClick, label, children }: InkBarProps) => (
  <button
    type="button"
    onClick={onClick}
    onKeyDown={(e) => e.stopPropagation()}
    aria-label={label}
    className="chamfer chamfer-br chamfer-xs mt-6 flex h-9 w-full items-center justify-center gap-2 bg-dark font-mono text-sm text-light hover:bg-dark/85 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-light cursor-pointer"
  >
    {children}
  </button>
);
