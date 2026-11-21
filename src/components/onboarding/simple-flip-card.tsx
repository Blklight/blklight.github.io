"use client";

import { ScrollFade } from "@animate-ui/react/primitives/effects/scroll-fade";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import { Check, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ChamferButton } from "@/components/ui/chamfer-button";
import type { Corner } from "@/components/ui/chamfer-utils";
import { useFillet } from "@/components/ui/fillet-card";
import { cn } from "@/lib/utils";
import type { PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";
import { CornerBrackets } from "./corner-brackets";

interface Props {
  app: PlatformApp;
  selected?: boolean;
  onToggle?: () => void;
  /** "display" shows the cover only: no flip, no selection. */
  mode?: "select" | "display";
}

/**
 * App ficha, after the Tally cards: colored stock with grain, registration
 * marks around the label and the name, and an ink bar that turns the card
 * over to what the app does.
 */
export const SimpleFlipCard = ({
  app,
  selected = false,
  onToggle,
  mode = "select",
}: Props) => {
  const [flipped, setFlipped] = useState(false);
  const meta = appMeta(app);
  const locked = !meta.available;
  const display = mode === "display";

  const flip = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFlipped((f) => !f);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!locked) onToggle?.();
    }
  };

  const cover = (
    <>
      {locked && <LockedVeil />}
      <div className="relative flex items-center justify-between gap-2">
        <span className="px-2 py-1 text-xs uppercase">{meta.tagline}</span>
        {locked ? <SoonStamp /> : <SelectMark selected={selected} />}
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
    </>
  );

  if (display) {
    return (
      <Tilt maxTilt={8} perspective={1000} className="group relative">
        <TiltContent className="relative h-72">
          <FichaFace corner="br" paper={meta.accent.paper} selected={selected}>
            {cover}
          </FichaFace>
        </TiltContent>
      </Tilt>
    );
  }

  return (
    <Tilt maxTilt={8} perspective={1000} className="group relative">
      <TiltContent className="perspective-1000 h-96 relative">
        {/* biome-ignore lint/a11y/useSemanticElements: card 3D com conteúdo em bloco e botão interno não cabe em <button> */}
        <div
          role="button"
          tabIndex={0}
          aria-pressed={locked ? undefined : selected}
          aria-disabled={locked || undefined}
          aria-label={app.name}
          onClick={locked ? undefined : onToggle}
          onKeyDown={handleKey}
          className={cn(
            "relative w-full h-full preserve-3d transition-transform duration-500 ease-out rounded-[1.25rem] outline-none focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-4 motion-reduce:transition-none",
            !locked && "cursor-pointer",
          )}
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <FichaFace
            corner="br"
            paper={meta.accent.paper}
            selected={selected}
            hidden={flipped}
          >
            {cover}

            <div className="flex-1" />

            <ChamferButton
              onClick={flip}
              onKeyDown={(e) => e.stopPropagation()}
              aria-label={`Sobre o ${app.name}`}
              corner="br"
              className="mt-6 w-full bg-dark text-light hover:bg-dark/85"
            >
              Sobre o app ↻
            </ChamferButton>
          </FichaFace>

          <FichaFace
            corner="bl"
            paper={meta.accent.paper}
            selected={selected}
            back
            hidden={!flipped}
          >
            {locked && <LockedVeil />}
            <div className="relative flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={flip}
                onKeyDown={(e) => e.stopPropagation()}
                className="pointer-events-auto -ml-1 inline-flex items-center gap-1 rounded-xs px-1 py-1 text-sm hover:bg-dark/10 outline-none focus-visible:outline-2 focus-visible:outline-current cursor-pointer"
              >
                <ChevronLeft aria-hidden className="size-4" />
                Voltar
              </button>
              <span className="text-xs uppercase opacity-70">
                {locked ? "Em breve" : "Disponível"}
              </span>
            </div>

            <div className="relative mt-4 flex min-h-0 flex-1 flex-col">
              <CornerBrackets size="size-3" className="opacity-80" />
              <ScrollFade
                size={24}
                shrink={0}
                className="pointer-events-auto min-h-0 flex-1 p-4 scrollbar-none"
              >
                <p className="text-base leading-relaxed">{meta.description}</p>
                {meta.features.length > 0 && (
                  <p className="mt-4 text-sm leading-relaxed opacity-80">
                    {joinPt(meta.features)}.
                  </p>
                )}
              </ScrollFade>
            </div>
            {meta.idealFor && (
              <p className="pt-5 text-xs">
                <span className="opacity-70">Ideal para </span>
                {meta.idealFor}
              </p>
            )}
            <div className="relative mt-3 flex items-center justify-between text-xs">
              <span className="opacity-70">
                {locked
                  ? "Ainda não dá para ativar"
                  : selected
                    ? "Selecionado"
                    : "Clique para selecionar"}
              </span>
              {locked ? <SoonStamp /> : <SelectMark selected={selected} />}
            </div>
          </FichaFace>
        </div>
      </TiltContent>
    </Tilt>
  );
};

// "A", "B", "C" -> "A, b e c": the features read as one sentence.
const joinPt = (items: string[]) => {
  const [first = "", ...rest] = items;
  const tail = rest.map((item) => item.charAt(0).toLowerCase() + item.slice(1));
  return tail.length === 0
    ? first
    : `${[first, ...tail.slice(0, -1)].join(", ")} e ${tail.at(-1)}`;
};

// Hatched, washed-out stock: reads as "not yet" before the label does.
const LockedVeil = () => (
  <span
    aria-hidden
    className="absolute inset-0 bg-light/45 bg-[repeating-linear-gradient(135deg,transparent_0_9px,rgb(0_0_0/0.07)_9px_11px)]"
  />
);

const SoonStamp = () => (
  <span className="-rotate-6 border-2 border-dark px-1.5 py-0.5 font-mono text-[0.7rem] font-semibold uppercase tracking-wider">
    Em breve
  </span>
);

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

interface FichaFaceProps {
  corner: Corner;
  paper: string;
  selected?: boolean;
  back?: boolean;
  // Face turned away: some browsers still hit-test it through backface-visibility in nested 3D.
  hidden?: boolean;
  size?: "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

// Back face cut is mirrored (bl): flipped around Y, the physical card's br corner lands bottom-left.
export const FichaFace = ({
  corner,
  paper,
  selected = false,
  back,
  hidden,
  size = "lg",
  className,
  children,
}: FichaFaceProps) => {
  const [outerRef, outerClip] = useFillet([corner], size, 6, 0, 20);
  const [innerRef, innerClip] = useFillet([corner], size, 6, 3, 17);
  return (
    <div
      ref={outerRef}
      inert={hidden}
      style={{ clipPath: outerClip }}
      className={cn(
        "absolute inset-0 backface-hidden p-[3px] transition-colors duration-200",
        back && "rotate-y-180",
        hidden && "pointer-events-none",
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
        <div
          className={cn(
            "relative h-full flex flex-col p-6 pointer-events-none [&_button]:pointer-events-auto",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
