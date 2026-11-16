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
import { typeTheme } from "./card-theme";
import { CardMeta, CardTags, CardTitle, TypeTab } from "./parts";

type Props = BentoCardProps<DocumentCard>;

// Each model has its own corner signature; the id picks one of its mirrored variants.
const CORNERS = {
  cover: [
    ["tr", "bl"],
    ["tl", "br"],
  ],
  paper: [["tr"], ["br"]],
  media: [["bl"], ["tr", "bl"]],
  text: [["br"], ["tl", "br"]],
} satisfies Record<string, Corner[][]>;

const pickCorners = (model: keyof typeof CORNERS, id: string): Corner[] => {
  const variants = CORNERS[model];
  return variants[(hash(id) >>> 8) % variants.length];
};

function Shell({
  corners,
  big,
  className,
  bordered = true,
  children,
}: {
  corners: Corner[];
  big?: boolean;
  className?: string;
  bordered?: boolean;
  children: ReactNode;
}) {
  return (
    <FilletCard
      corners={corners}
      size={big ? "lg" : "md"}
      radius={4}
      rounded={2}
      bordered={bordered}
      style={{ height: "100%" }}
      className={cn(
        "group/card relative h-full overflow-hidden @container",
        className,
      )}
    >
      {children}
    </FilletCard>
  );
}

const tall = (size: Props["size"]) => size === "1x2" || size === "2x2";

/** No cover, no paper: accent wash + ordered-dither on hover. */
export function TextCard({ data, size }: Props) {
  const theme = typeTheme(data.typeName);
  const corners = pickCorners("text", data.id);
  return (
    <Shell corners={corners} big={tall(size)} className={theme.wash}>
      <DitherSpotlight radius={130} className={theme.text} />
      <TypeTab type={data.typeName} corners={corners} />
      <div className="relative h-full flex flex-col p-5 pt-12 pointer-events-none [&_a]:pointer-events-auto">
        <CardTitle
          doc={data}
          className="font-sans text-xl @xs:text-2xl leading-tight"
        />
        {data.abstract && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
            {data.abstract}
          </p>
        )}
        <CardMeta
          doc={data}
          className="mt-auto pt-4"
          muted="text-muted-foreground"
        />
      </div>
    </Shell>
  );
}

/** The author's paper: color, texture, and typeface carried into the feed. */
export function PaperCard({ data, size }: Props) {
  const design = derivePaperDesign(
    data.style ?? { typography: "sans", paperStyle: null, paperTexture: null },
  );
  const ink = design.paperColors?.text;
  const corners = pickCorners("paper", data.id);
  return (
    <Shell corners={corners} big={tall(size)}>
      <PaperSurface
        paperColors={design.paperColors}
        paperTexture={design.paperTexture}
        textureStyle={design.textureStyle}
        className="h-full border-0"
        contentClassName="h-full"
      >
        <TypeTab type={data.typeName} corners={corners} />
        <div
          className="h-full flex flex-col p-5 pt-12"
          style={{ color: ink ?? undefined }}
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
                "mt-3 text-sm leading-relaxed",
                tall(size) ? "line-clamp-8" : "line-clamp-2",
                "opacity-80",
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

/** Cover fills the cell in the type's duotone; the real colors come back on hover. */
export function CoverCard({ data, size }: Props) {
  const cover = data.coverImageUrl ?? "";
  const corners = pickCorners("cover", data.id);
  return (
    <Shell
      corners={corners}
      big={size !== "1x1"}
      bordered={false}
      className="bg-dark text-light"
    >
      {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
      <img
        src={cover}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
      />
      {/* biome-ignore lint/performance/noImgElement: same cover, duotone layer */}
      <img
        src={cover}
        alt=""
        style={{ filter: `url(#duo-${data.typeName})` }}
        className="absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 ease-out group-hover/card:opacity-0 group-hover/card:scale-105 motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent" />
      <TypeTab type={data.typeName} corners={corners} />
      <div className="relative h-full flex flex-col justify-end p-5">
        <CardTitle
          doc={data}
          className={cn(
            "font-sans leading-[1.15]",
            size === "2x2" ? "text-3xl @lg:text-4xl" : "text-2xl",
          )}
        >
          <span className="box-decoration-clone bg-dark px-1.5 py-0.5">
            {data.title}
          </span>
        </CardTitle>
        {data.abstract && size !== "1x1" && (
          <p className="mt-3 text-sm text-light/80 line-clamp-2 max-w-prose">
            {data.abstract}
          </p>
        )}
        <CardMeta doc={data} className="mt-4" muted="text-light/70" />
      </div>
    </Shell>
  );
}

/** Solid type color, cover framed inside; side by side when the cell is wide. */
export function MediaCard({ data, size }: Props) {
  const theme = typeTheme(data.typeName);
  const corners = pickCorners("media", data.id);
  return (
    <Shell
      corners={corners}
      big={tall(size)}
      bordered={false}
      className={theme.solid}
    >
      <TypeTab type={data.typeName} corners={corners} />
      <div className="h-full flex flex-col @md:flex-row gap-4 p-4 pt-10">
        <div className="relative min-h-0 flex-1 @md:flex-none @md:w-1/2 overflow-hidden rounded-xs border border-dark/80">
          {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
          <img
            src={data.coverImageUrl ?? ""}
            alt=""
            className="absolute inset-0 size-full object-cover grayscale contrast-125 transition-[filter] duration-500 group-hover/card:grayscale-0 motion-reduce:transition-none"
          />
        </div>
        <div className="flex flex-col min-w-0 @md:flex-1">
          <CardTitle doc={data} className="font-sans text-xl leading-tight" />
          {data.abstract && (
            <p className="hidden @md:block mt-2 text-sm text-dark/75 line-clamp-4">
              {data.abstract}
            </p>
          )}
          <CardMeta
            doc={data}
            className="mt-3 @md:mt-auto"
            muted="text-dark/70"
          />
        </div>
      </div>
    </Shell>
  );
}
