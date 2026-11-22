"use client";

import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import { type ReactNode, useState } from "react";
import { FLAT } from "@/components/onboarding/simple-flip-card";
import { cn } from "@/lib/utils";
import { initials } from "./classic-badge";

/** Tilt plus click/keyboard flip shared by the poster badges. Each face fills the card. */
export const BadgeFlip = ({
  front,
  back,
  className,
  faceClassName,
}: {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /** Classes for both faces: shape, background, border. */
  faceClassName?: string;
}) => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((f) => !f);
  const face = (isBack: boolean, children: ReactNode) => (
    <div
      inert={isBack !== flipped}
      className={cn(
        "absolute inset-0 overflow-hidden backface-hidden",
        isBack && "rotate-y-180",
        isBack !== flipped && "pointer-events-none",
        faceClassName,
      )}
    >
      {children}
    </div>
  );

  return (
    <div className={cn("w-72 max-w-full", className)}>
      <Tilt maxTilt={6} perspective={1000} style={FLAT}>
        <TiltContent className="perspective-1000 relative h-[28rem]">
          {/* biome-ignore lint/a11y/useSemanticElements: both faces hold block content, which a <button> can't contain */}
          <div
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            aria-label={
              flipped
                ? "Virar crachá para a frente"
                : "Virar crachá para o verso"
            }
            className="relative block size-full cursor-pointer preserve-3d transition-transform duration-500 ease-out outline-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            {face(false, front)}
            {face(true, back)}
          </div>
        </TiltContent>
      </Tilt>
    </div>
  );
};

/** Member photo, or initials on a solid block when there is none. */
export const Portrait = ({
  name,
  avatarUrl,
  className,
  fallbackClassName,
}: {
  name: string;
  avatarUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}) =>
  avatarUrl ? (
    // biome-ignore lint/performance/noImgElement: avatar can come from any OAuth host, not in next/image remotePatterns
    <img
      src={avatarUrl}
      alt=""
      className={cn("object-cover grayscale contrast-125", className)}
    />
  ) : (
    <span
      className={cn(
        "flex items-center justify-center font-sans font-black",
        className,
        fallbackClassName,
      )}
    >
      {initials(name)}
    </span>
  );

export const statusLabel = (status?: string) =>
  status === "draft" ? "Em montagem" : "Ativo";
