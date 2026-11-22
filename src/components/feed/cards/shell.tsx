"use client";

import type { ReactNode } from "react";
import { type BentoCardProps, hash } from "@/components/bento/bento-layout";
import type { Corner } from "@/components/ui/chamfer-utils";
import { FilletCard } from "@/components/ui/fillet-card";
import { cn } from "@/lib/utils";
import type { DocumentCard } from "@/types/api.types";
import { surfaceFor } from "./card-theme";

export type CardProps = BentoCardProps<DocumentCard>;

export const tall = (size: CardProps["size"]) =>
  size === "1x2" || size === "2x2";
export const wide = (size: CardProps["size"]) =>
  size === "2x1" || size === "2x2";

// Separate bit ranges of the id: size, model rotation, surface, corners.
export const surfaceOf = (id: string) => surfaceFor(hash(id) >>> 12);
export const pick = <T,>(id: string, options: T[]) =>
  options[(hash(id) >>> 8) % options.length];

export type Shape =
  | { kind: "fillet"; corners: Corner[]; big?: boolean; bordered?: boolean }
  | { kind: "round" }
  | { kind: "pill" }
  | { kind: "flat" };

/**
 * Card frame. Models pick different shapes on purpose: chamfered (fillet),
 * rounded, very rounded, or flat with a brutalist 2px rule.
 */
export function Shell({
  card,
  shape,
  hover,
  className,
  children,
}: {
  card: string;
  shape: Shape;
  /** Shared hover effect from globals.css, on top of the model's own. */
  hover?: "pop" | "misreg";
  className?: string;
  children: ReactNode;
}) {
  const base = "group/card relative h-full overflow-hidden @container";
  if (shape.kind === "fillet") {
    return (
      <FilletCard
        data-card={card}
        data-hover={hover}
        corners={shape.corners}
        size={shape.big ? "lg" : "md"}
        radius={4}
        rounded={2}
        bordered={shape.bordered ?? true}
        style={{ height: "100%" }}
        className={cn(base, className)}
      >
        {children}
      </FilletCard>
    );
  }
  return (
    <div
      data-card={card}
      data-hover={hover}
      className={cn(
        base,
        shape.kind === "round" && "rounded-lg",
        shape.kind === "pill" && "rounded-[1.75rem]",
        shape.kind === "flat" && "rounded-none border-2 border-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Tab side follows the shape: away from a cut top-left corner. */
export const tabCorners = (shape: Shape): Corner[] =>
  shape.kind === "fillet" ? shape.corners : [];
