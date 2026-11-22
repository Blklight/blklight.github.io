"use client";

import { cn } from "@/lib/utils";
import { typeTheme } from "../card-theme";
import { CardMeta, CardTitle, cardFont, formatDate } from "../parts";
import { type CardProps, Shell, surfaceOf, tall } from "../shell";

// Thin column rules, like a layout grid left visible.
const COLUMNS =
  "repeating-linear-gradient(90deg, transparent 0 calc(25% - 1px), color-mix(in oklab, currentColor 14%, transparent) calc(25% - 1px) 25%)";

/** Field report: visible columns, a numbered disc, a huge title, a status bar. */
export function FieldReportCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  const theme = typeTheme(data.typeName);
  const day = new Date(data.publishedAt).getUTCDate() || 1;
  return (
    <Shell
      card="field-report"
      shape={{ kind: "flat" }}
      className="bg-card text-card-foreground"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: COLUMNS }}
      />
      <div className="relative h-full flex flex-col p-5 pb-0">
        <div className="flex items-start justify-between gap-3 font-mono text-[0.7rem] uppercase tracking-wider">
          <span>Field report</span>
          <span>[{data.category?.name ?? "Blklight"}]</span>
        </div>
        <div
          className={cn(
            "mt-4 flex gap-4 min-h-0",
            size === "2x1" ? "flex-row items-start" : "flex-col",
          )}
        >
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className={cn(
                "grid shrink-0 place-items-center rounded-full bg-foreground font-sans font-bold text-background",
                size === "1x1" ? "size-10 text-lg" : "size-16 text-3xl",
              )}
            >
              {day}
            </span>
            {size === "1x2" && (
              <span
                className={cn(
                  "ml-auto self-stretch px-1.5 py-2 font-mono text-[0.7rem] uppercase tracking-wider [writing-mode:vertical-rl]",
                  surface.solid,
                )}
              >
                {theme.label} / sinal
              </span>
            )}
          </div>
          <CardTitle
            doc={data}
            className={cn(
              "font-black tracking-tighter leading-[0.95]",
              size === "2x2"
                ? "text-5xl @lg:text-6xl line-clamp-3"
                : size === "1x1"
                  ? "text-2xl line-clamp-2"
                  : "text-3xl line-clamp-3",
              cardFont(data),
            )}
          />
        </div>
        {data.abstract && tall(size) && (
          <p
            className={cn(
              "mt-3 max-w-prose text-sm text-muted-foreground",
              tall(size) ? "line-clamp-5" : "line-clamp-2",
              cardFont(data),
            )}
          >
            {data.abstract}
          </p>
        )}
        <CardMeta
          doc={data}
          className="mt-auto pt-3 pb-3"
          muted="text-muted-foreground"
        />
        <div className="-mx-5 flex justify-between gap-2 bg-foreground px-5 py-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-background">
          <span>{theme.label}</span>
          <span aria-hidden>/</span>
          <span>{formatDate(data.publishedAt)}</span>
          <span aria-hidden>/</span>
          <span>Status: ativo</span>
        </div>
      </div>
    </Shell>
  );
}
