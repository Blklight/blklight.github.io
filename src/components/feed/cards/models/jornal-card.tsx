"use client";

import { cn } from "@/lib/utils";
import { typeTheme } from "../card-theme";
import { CardMeta, CardTitle, cardFont, formatDate } from "../parts";
import { type CardProps, Shell, tall } from "../shell";

const GRID =
  "linear-gradient(rgb(29 29 29 / 0.14) 1px, transparent 1px) 0 0 / 20px 20px, linear-gradient(90deg, rgb(29 29 29 / 0.14) 1px, transparent 1px) 0 0 / 20px 20px";
const CHECKER =
  "repeating-conic-gradient(#1d1d1d 0 25%, transparent 0 50%) 0 0 / 10px 10px";

/** Newspaper front page: ruled masthead, graph-paper body, title in an ink block. */
export function JornalCard({ data, size }: CardProps) {
  return (
    <Shell
      card="jornal"
      shape={{ kind: "flat" }}
      hover="misreg"
      className="bg-[#ece9e2] text-dark"
    >
      <div className="h-full flex flex-col p-5">
        <div className="flex items-center justify-between gap-3 border-y border-dark py-1 font-mono text-[0.65rem] uppercase tracking-wider">
          <span className="truncate">
            {typeTheme(data.typeName).label} ·{" "}
            {data.category?.name ?? "Blklight"}
          </span>
          <span className="shrink-0">{formatDate(data.publishedAt)}</span>
        </div>
        {tall(size) && (
          <p
            aria-hidden
            className="mt-2 text-center font-serif text-2xl font-bold italic tracking-tight @md:text-3xl"
          >
            Diário de {data.author.displayName || data.author.username}
          </p>
        )}
        <div
          className="relative mt-3 flex-1 min-h-0 border border-dark p-3 flex flex-col justify-center"
          style={{ background: GRID }}
        >
          <CardTitle
            doc={data}
            className={cn(
              "font-normal leading-[1.3] tracking-tight line-clamp-3",
              size === "2x2"
                ? "text-4xl"
                : size === "1x1"
                  ? "text-xl"
                  : "text-2xl",
              cardFont(data),
            )}
          >
            <span className="box-decoration-clone bg-dark px-2 text-light">
              {data.title}
            </span>
          </CardTitle>
        </div>
        {data.abstract && tall(size) && (
          <p
            className={cn(
              "mt-3 text-xs leading-relaxed",
              tall(size) ? "line-clamp-5" : "line-clamp-2",
              cardFont(data),
            )}
          >
            {data.abstract}
          </p>
        )}
        <CardMeta doc={data} className="mt-3" muted="text-dark/70" />
        <div
          aria-hidden
          className="mt-3 h-2.5 shrink-0"
          style={{ background: CHECKER }}
        />
      </div>
    </Shell>
  );
}
