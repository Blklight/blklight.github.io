"use client";

import { hash } from "@/components/bento/bento-layout";
import { cn } from "@/lib/utils";
import { typeTheme } from "./card-theme";
import { type CardProps, pickCorners, Shell, tall } from "./feed-cards";
import { CardMeta, CardTitle, formatDate, TypeTab } from "./parts";

/** A photo print: framed, slightly turned, caption in serif under the picture. */
export function PolaroidCard({ data, size }: CardProps) {
  const theme = typeTheme(data.typeName);
  const corners = pickCorners("polaroid", data.id);
  const card = "polaroid";
  const tilt = ((hash(data.id) >>> 4) % 5) - 2;
  return (
    <Shell
      card={card}
      corners={corners}
      big={tall(size)}
      className={theme.wash}
    >
      <TypeTab type={data.typeName} corners={corners} />
      <div className="h-full flex flex-col items-center p-5 pt-11">
        <figure
          style={{ rotate: `${tilt}deg` }}
          className="w-full max-w-72 bg-light p-2.5 pb-3 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.45)] transition-[rotate] duration-500 ease-out group-hover/card:rotate-0 motion-reduce:transition-none"
        >
          <div
            className={cn(
              "relative overflow-hidden bg-dark",
              tall(size) ? "aspect-[4/5]" : "aspect-[4/3]",
            )}
          >
            {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
            <img
              src={data.coverImageUrl ?? ""}
              alt=""
              className="absolute inset-0 size-full object-cover sepia-[0.35] contrast-110 transition-[filter] duration-500 group-hover/card:sepia-0"
            />
          </div>
          <figcaption className="pt-2.5 text-dark">
            <CardTitle
              doc={data}
              className="font-serif italic font-bold text-lg leading-snug line-clamp-2"
            />
          </figcaption>
        </figure>
        <CardMeta
          doc={data}
          className="mt-auto pt-3 w-full"
          muted="text-muted-foreground"
        />
      </div>
    </Shell>
  );
}

// Perforated edge: solid content box plus a ring of holes in the padding.
const STAMP_MASK =
  "conic-gradient(#000 0 0) content-box, radial-gradient(5px, #0000 98%, #000) -6px -6px / 12px 12px round";

/** A postage stamp on an envelope in the type color. */
export function StampCard({ data, size }: CardProps) {
  const theme = typeTheme(data.typeName);
  const corners = pickCorners("stamp", data.id);
  const card = "stamp";
  const wide = size === "2x1" || size === "2x2";
  return (
    <Shell
      card={card}
      corners={corners}
      big={size !== "1x1"}
      bordered={false}
      className={theme.solid}
    >
      <TypeTab type={data.typeName} corners={corners} />
      <div
        className={cn(
          "h-full flex gap-5 p-5 pt-11",
          wide ? "flex-row items-center" : "flex-col",
        )}
      >
        <div
          style={{ mask: STAMP_MASK, WebkitMask: STAMP_MASK }}
          className={cn(
            "relative shrink-0 bg-light p-3 transition-transform duration-500 ease-out group-hover/card:-rotate-2 motion-reduce:transition-none",
            wide ? "h-full aspect-[3/4]" : "min-h-0 flex-1",
          )}
        >
          <div className="relative size-full overflow-hidden">
            {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
            <img
              src={data.coverImageUrl ?? ""}
              alt=""
              style={{ filter: `url(#duo-${data.typeName})` }}
              className="absolute inset-0 size-full object-cover"
            />
            <span className="absolute bottom-1 right-1.5 font-mono text-[0.7rem] font-bold text-light mix-blend-difference">
              {formatDate(data.publishedAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <CardTitle
            doc={data}
            className="font-sans text-xl @xs:text-2xl leading-tight line-clamp-3"
          />
          {wide && data.abstract && (
            <p className="mt-2 text-sm text-dark/75 line-clamp-3">
              {data.abstract}
            </p>
          )}
          <CardMeta doc={data} className="mt-auto pt-3" muted="text-dark/70" />
        </div>
      </div>
    </Shell>
  );
}

/** Newspaper headline: ink surface, the title set huge in the type color. */
export function HeadlineCard({ data, size }: CardProps) {
  const theme = typeTheme(data.typeName);
  const corners = pickCorners("headline", data.id);
  const card = "headline";
  return (
    <Shell
      card={card}
      corners={corners}
      big={size !== "1x1"}
      bordered={false}
      className="bg-dark text-light"
    >
      <TypeTab type={data.typeName} corners={corners} />
      <div className="h-full flex flex-col p-5 pt-12">
        <CardTitle
          doc={data}
          className={cn(
            "font-sans font-black uppercase tracking-tighter leading-[0.9] line-clamp-4",
            size === "1x1" ? "text-3xl" : "text-4xl @md:text-5xl",
            theme.onDark,
          )}
        />
        {data.abstract && size !== "1x1" && (
          <p className="mt-4 text-sm text-light/70 line-clamp-3 max-w-prose">
            {data.abstract}
          </p>
        )}
        <CardMeta doc={data} className="mt-auto pt-4" muted="text-light/60" />
      </div>
    </Shell>
  );
}

/** Library catalog card: ruled sepia stock, fields typed in mono. */
export function CatalogCard({ data }: CardProps) {
  const theme = typeTheme(data.typeName);
  const corners = pickCorners("catalog", data.id);
  const card = "catalog";
  const number = String(hash(data.id) % 10000).padStart(4, "0");
  const author = data.author.displayName || data.author.username;
  return (
    <Shell card={card} corners={corners} className="bg-sepia text-dark">
      <div
        aria-hidden
        className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_1.6rem,rgb(40_172_255/0.35)_1.6rem,rgb(40_172_255/0.35)_calc(1.6rem+1px))] bg-[position:0_2.6rem]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-10 w-px bg-crimson-500/50"
      />
      <TypeTab type={data.typeName} corners={corners} />
      <div className="relative h-full flex flex-col pl-14 pr-5 pt-10 pb-4 font-mono text-xs">
        <p className="text-dark/60 uppercase tracking-wider">
          Ficha nº {number}
        </p>
        <dl className="mt-3 grid grid-cols-[4.5rem_1fr] gap-x-2 gap-y-1.5 leading-[1.6rem]">
          <dt className="text-dark/55 uppercase">Título</dt>
          <dd className="min-w-0">
            <CardTitle
              doc={data}
              className="font-serif text-base leading-[1.6rem] line-clamp-2"
            />
          </dd>
          <dt className="text-dark/55 uppercase">Autor</dt>
          <dd className="truncate">{author}</dd>
          <dt className="text-dark/55 uppercase">Tipo</dt>
          <dd className="flex items-center gap-1.5 font-bold">
            <span
              aria-hidden
              className={cn("size-2.5 border border-dark/40", theme.solid)}
            />
            {theme.label}
          </dd>
          <dt className="text-dark/55 uppercase">Data</dt>
          <dd>{formatDate(data.publishedAt)}</dd>
        </dl>
      </div>
    </Shell>
  );
}
