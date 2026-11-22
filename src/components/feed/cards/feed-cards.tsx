"use client";

import type { ReactNode } from "react";
import { type BentoCardProps, hash } from "@/components/bento/bento-layout";
import { DitherSpotlight } from "@/components/onboarding/dither-spotlight";
import type { Corner } from "@/components/ui/chamfer-utils";
import { FilletCard } from "@/components/ui/fillet-card";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import { derivePaperDesign } from "@/features/documents/document-read";
import { cn } from "@/lib/utils";
import type { DocumentCard } from "@/types/api.types";
import { surfaceFor } from "./card-theme";
import {
  CardMeta,
  CardTags,
  CardTitle,
  cardFont,
  formatDate,
  TypeTab,
} from "./parts";

export type CardProps = BentoCardProps<DocumentCard>;

const tall = (size: CardProps["size"]) => size === "1x2" || size === "2x2";
const wide = (size: CardProps["size"]) => size === "2x1" || size === "2x2";

// Separate bit ranges of the id: size, model rotation, surface, corners.
const surfaceOf = (id: string) => surfaceFor(hash(id) >>> 12);
const pick = <T,>(id: string, options: T[]) =>
  options[(hash(id) >>> 8) % options.length];

type Shape =
  | { kind: "fillet"; corners: Corner[]; big?: boolean; bordered?: boolean }
  | { kind: "round" }
  | { kind: "pill" }
  | { kind: "flat" };

/**
 * Card frame. Models pick different shapes on purpose: chamfered (fillet),
 * rounded, very rounded, or flat with a brutalist 2px rule.
 */
function Shell({
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
const tabCorners = (shape: Shape): Corner[] =>
  shape.kind === "fillet" ? shape.corners : [];

/** Flat and plain: a pale surface, a heavy rule, the dither on hover. */
export function TextCard({ data }: CardProps) {
  const surface = surfaceOf(data.id);
  return (
    <Shell
      card="text"
      shape={{ kind: "flat" }}
      className={cn(surface.wash, "book:mix-blend-multiply")}
    >
      <DitherSpotlight
        radius={130}
        className={cn(surface.dot, "opacity-100 dark:opacity-30")}
      />
      <TypeTab type={data.typeName} tone="auto" />
      <div className="relative h-full flex flex-col p-5 pt-12 pointer-events-none [&_a]:pointer-events-auto">
        <CardTitle
          doc={data}
          className={cn(
            "text-xl @xs:text-2xl leading-tight line-clamp-3",
            cardFont(data),
          )}
        />
        {data.abstract && (
          <p
            className={cn(
              "mt-2 text-sm text-foreground/75 line-clamp-3",
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
    </Shell>
  );
}

/** The author's paper: color, texture, and typeface carried into the feed. */
export function PaperCard({ data, size }: CardProps) {
  const design = derivePaperDesign(
    data.style ?? { typography: "sans", paperStyle: null, paperTexture: null },
  );
  const shape: Shape = {
    kind: "fillet",
    corners: pick(data.id, [["tr"], ["br"]] as Corner[][]),
    big: tall(size),
  };
  return (
    <Shell card="paper" shape={shape} hover="misreg">
      <PaperSurface
        paperColors={design.paperColors}
        paperTexture={design.paperTexture}
        textureStyle={design.textureStyle}
        className="h-full border-0"
        contentClassName="h-full"
      >
        <TypeTab type={data.typeName} corners={tabCorners(shape)} inset />
        <div
          className="h-full flex flex-col p-6 pt-19"
          style={{ color: design.paperColors?.text ?? undefined }}
        >
          <CardTitle
            doc={data}
            className={cn(
              tall(size)
                ? "text-2xl @xs:text-3xl leading-[1.1]"
                : "text-xl @xs:text-2xl leading-[1.15] line-clamp-3",
              design.fontClass,
            )}
          />
          {data.abstract && (
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed opacity-80",
                tall(size) ? "line-clamp-8" : "line-clamp-2",
                design.fontClass,
              )}
            >
              {data.abstract}
            </p>
          )}
          {tall(size) && <CardTags doc={data} className="mt-4 opacity-80" />}
          <div
            className="mt-auto pt-3 border-t"
            style={{ borderColor: design.paperColors?.border ?? undefined }}
          >
            <CardMeta doc={data} muted="opacity-70" />
          </div>
        </div>
      </PaperSurface>
    </Shell>
  );
}

/** Rounded poster: the cover in a duotone, real colors on hover. */
export function CoverCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  const cover = data.coverImageUrl ?? "";
  return (
    <Shell
      card="cover"
      shape={{ kind: "round" }}
      className="bg-dark text-light"
    >
      {/* One scaling wrapper: the duotone filter rasterizes once, the GPU scales the layer. */}
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none">
        {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
        <img
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
        {/* biome-ignore lint/performance/noImgElement: same cover, duotone layer */}
        <img
          src={cover}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ filter: `url(#duo-${surface.id})` }}
          className="absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out group-hover/card:opacity-0 motion-reduce:transition-none"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
      <TypeTab type={data.typeName} tone="paper" inset />
      <div className="relative h-full flex flex-col justify-end p-6">
        <CardTitle
          doc={data}
          className={cn(
            "leading-[1.15]",
            cardFont(data),
            size === "2x2" ? "text-3xl @lg:text-4xl" : "text-2xl",
          )}
        >
          <span className="box-decoration-clone bg-dark px-1.5 py-0.5">
            {data.title}
          </span>
        </CardTitle>
        {data.abstract && size !== "1x1" && (
          <p
            className={cn(
              "mt-3 text-sm text-light/80 line-clamp-2 max-w-prose",
              cardFont(data),
            )}
          >
            {data.abstract}
          </p>
        )}
        <CardMeta doc={data} className="mt-4" muted="text-light/70" />
      </div>
    </Shell>
  );
}

/**
 * The allnew article card: solid surface, title, a large cover, description.
 * Tall cells stack; wide cells put the cover beside the text.
 */
export function MediaCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  const shape: Shape = {
    kind: "fillet",
    corners: pick(data.id, [["bl"], ["tr", "bl"]] as Corner[][]),
    big: true,
    bordered: false,
  };
  const side = wide(size);
  return (
    <Shell card="media" shape={shape} className={surface.solid}>
      <TypeTab type={data.typeName} corners={tabCorners(shape)} inset />
      <div
        className={cn(
          "h-full flex gap-4 p-6 pt-19",
          side ? "flex-row" : "flex-col",
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-md border-2 border-dark",
            side ? "w-1/2 shrink-0" : "order-2 flex-1 min-h-40",
          )}
        >
          {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
          <img
            src={data.coverImageUrl ?? ""}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
          />
        </div>
        <div
          className={cn(
            "flex flex-col gap-3 min-w-0",
            side ? "flex-1" : "contents",
          )}
        >
          <CardTitle
            doc={data}
            className={cn(
              "order-1 leading-tight",
              cardFont(data),
              side ? "text-xl line-clamp-2" : "text-2xl line-clamp-3",
            )}
          />
          {data.abstract && (
            <p
              className={cn(
                "order-3 text-sm text-dark",
                cardFont(data),
                side ? "line-clamp-2" : "line-clamp-3",
              )}
            >
              {data.abstract}
            </p>
          )}
          <CardMeta
            doc={data}
            className={cn("order-4", side && "mt-auto")}
            muted="text-dark"
          />
        </div>
      </div>
    </Shell>
  );
}

// Perforated edge: solid content box plus a ring of holes in the padding.
// Perforated frame laid over the image's edge: the hole pattern, minus the
// content box, leaves only a band of white paper whose holes show the image.
const STAMP_MASK =
  "radial-gradient(5px, #0000 98%, #000) -6px -6px / 12px 12px round, conic-gradient(#000 0 0) content-box";

/** A postage stamp on a flat envelope. */
export function StampCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  const side = wide(size);
  return (
    <Shell
      card="stamp"
      shape={{ kind: "flat" }}
      hover="pop"
      className={surface.solid}
    >
      <TypeTab type={data.typeName} />
      <div
        className={cn(
          "h-full flex gap-5 p-5 pt-11",
          side ? "flex-row items-stretch" : "flex-col",
        )}
      >
        {/* The date sits on the perforated edge, outside the mask, like a postmark. */}
        <div
          className={cn(
            "relative shrink-0 transition-transform duration-500 ease-out group-hover/card:-rotate-2 motion-reduce:transition-none",
            side ? "w-2/5" : "aspect-[4/3] w-full",
          )}
        >
          {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
          <img
            src={data.coverImageUrl ?? ""}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ filter: `url(#duo-${surface.id})` }}
            className="absolute inset-0 size-full object-cover"
          />
          <div
            aria-hidden
            style={{
              mask: STAMP_MASK,
              WebkitMask: STAMP_MASK,
              maskComposite: "subtract",
              WebkitMaskComposite: "source-out",
            }}
            className="absolute inset-0 bg-light p-3"
          />
          <span
            aria-hidden
            className="absolute -bottom-2 -right-2 rotate-3 border-2 border-dark bg-light px-1.5 py-0.5 font-mono text-xs font-bold text-dark"
          >
            {formatDate(data.publishedAt)}
          </span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <CardTitle
            doc={data}
            className={cn(
              "text-xl @xs:text-2xl leading-tight",
              cardFont(data),
              side ? "line-clamp-3" : "line-clamp-2",
            )}
          />
          {data.abstract && (
            <p
              className={cn(
                "mt-2 text-sm text-dark",
                cardFont(data),
                side ? "line-clamp-3" : "line-clamp-2",
              )}
            >
              {data.abstract}
            </p>
          )}
          <CardMeta doc={data} className="mt-auto pt-3" muted="text-dark" />
        </div>
      </div>
    </Shell>
  );
}

/** Newspaper headline: ink surface, very round corners, the title set huge. */
export function HeadlineCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  return (
    <Shell
      card="headline"
      hover="misreg"
      shape={{ kind: "pill" }}
      className="bg-dark text-light dark:bg-card"
    >
      <TypeTab type={data.typeName} tone="paper" inset />
      <div className="h-full flex flex-col p-6 pt-19">
        <CardTitle
          doc={data}
          className={cn(
            "font-black tracking-tight leading-[0.95] line-clamp-4",
            cardFont(data),
            size === "1x1" ? "text-3xl" : "text-4xl @md:text-5xl",
            surface.onDark,
          )}
        />
        {data.abstract && size !== "1x1" && (
          <p
            className={cn(
              "mt-4 text-sm text-light/70 line-clamp-3 max-w-prose",
              cardFont(data),
            )}
          >
            {data.abstract}
          </p>
        )}
        <CardMeta doc={data} className="mt-auto pt-4" muted="text-light/60" />
      </div>
    </Shell>
  );
}
