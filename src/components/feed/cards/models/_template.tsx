"use client";

import { cn } from "@/lib/utils";
import { CardMeta, CardTitle, cardFont, TypeTab } from "../parts";
import { type CardProps, Shell, surfaceOf, tall, wide } from "../shell";

/**
 * Starting point for a new card. Copy this file to models/<name>-card.tsx,
 * rename the component and `card`, then add one line to models/index.ts.
 *
 * Contract:
 * - `data` is a DocumentCard; `size` is the bento cell: 1x1, 2x1, 1x2, 2x2.
 * - Shell is the frame: shape "flat" | "round" | "pill" | "fillet" (chamfer).
 * - CardTitle stretches its link over the whole card: keep it, and give other
 *   links `relative z-20` (AuthorLink does) so they stay clickable.
 * - Title and abstract use cardFont(data), the author's typeface. Tab, meta and
 *   decorations keep the brand fonts.
 * - surfaceOf(data.id) gives a stable color set (solid, wash, onDark, dot).
 * - Respect light and dark: use tokens (bg-card, text-foreground) or set both.
 */
export function TemplateCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  return (
    <Shell card="template" shape={{ kind: "flat" }} className={surface.wash}>
      <TypeTab type={data.typeName} />
      <div
        className={cn(
          "h-full flex gap-4 p-5 pt-12",
          wide(size) ? "flex-row" : "flex-col",
        )}
      >
        <div className="flex flex-col min-w-0 flex-1">
          <CardTitle
            doc={data}
            className={cn(
              "leading-tight",
              tall(size) ? "text-3xl" : "text-xl line-clamp-3",
              cardFont(data),
            )}
          />
          {data.abstract && (
            <p
              className={cn(
                "mt-2 text-sm text-foreground/75",
                tall(size) ? "line-clamp-6" : "line-clamp-2",
                cardFont(data),
              )}
            >
              {data.abstract}
            </p>
          )}
          <CardMeta
            doc={data}
            className="mt-auto pt-4"
            muted="text-foreground/75"
          />
        </div>
      </div>
    </Shell>
  );
}
