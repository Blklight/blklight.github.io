"use client";

import { cn } from "@/lib/utils";
import { CardTitle, cardFont, TypeTab, useFormatDate } from "../parts";
import { type CardProps, Shell, surfaceOf, tall } from "../shell";

// Folder silhouette: a tab on the left, a slanted step, the full-width body.
const FOLDER =
  "polygon(0 0, 42% 0, 50% 2.75rem, 100% 2.75rem, 100% 100%, 0 100%)";

/** File folder: the cover on top, a dark folder with a tab over it, a big count at the foot. */
export function PastaCard({ data, size }: CardProps) {
  const formatDate = useFormatDate();
  const surface = surfaceOf(data.id);
  return (
    <Shell
      card="pasta"
      shape={{ kind: "pill" }}
      className={cn("border-[6px] border-dark bg-dark", surface.solid)}
    >
      {data.coverImageUrl && (
        // biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist
        <img
          src={data.coverImageUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 top-0 h-2/3 w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
        />
      )}
      <TypeTab type={data.typeName} corners={["tl"]} tone="ink" inset />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex flex-col bg-[#1b1b1b] px-5 pb-5 pt-4 text-light",
          tall(size) ? "top-[38%]" : "top-[30%]",
        )}
        style={{ clipPath: FOLDER }}
      >
        <CardTitle
          doc={data}
          className={cn(
            "max-w-[42%] min-w-36 font-medium leading-tight",
            tall(size) ? "text-2xl line-clamp-3" : "text-lg line-clamp-2",
            cardFont(data),
          )}
        />
        {data.abstract && tall(size) && (
          <p
            className={cn(
              "mt-6 text-sm text-light/70 line-clamp-4",
              cardFont(data),
            )}
          >
            {data.abstract}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3">
          <p className="flex items-baseline gap-2">
            <span className="font-sans text-4xl font-semibold leading-none tracking-tight">
              {data.likesCount}
            </span>
            <span className="text-light/60">curtidas</span>
          </p>
          <p className="text-right text-xs leading-snug">
            <span className="block text-light/60">Publicado em</span>
            <time dateTime={data.publishedAt} className="text-sm font-medium">
              {formatDate(data.publishedAt)}
            </time>
          </p>
        </div>
      </div>
    </Shell>
  );
}
