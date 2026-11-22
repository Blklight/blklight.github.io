"use client";

import { HoloSeal } from "@/components/stamps/org-stamps";
import { cn } from "@/lib/utils";
import { typeTheme } from "../card-theme";
import { CardMeta, CardTitle, cardFont } from "../parts";
import { type CardProps, Shell, tall, wide } from "../shell";
import { documentStamp } from "./postal-card";

/** The flap pressed into the stock: a dark groove with a light lip under it. */
const Flap = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    className={cn("absolute inset-x-0 top-0 w-full", className)}
  >
    {[
      { y: 0.6, stroke: "rgb(255 255 255 / 0.12)" },
      { y: 0, stroke: "rgb(0 0 0 / 0.6)" },
    ].map(({ y, stroke }) => (
      <path
        key={stroke}
        d={`M0 ${y} L46 ${92 + y} Q50 ${98 + y} 54 ${92 + y} L100 ${y}`}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    ))}
  </svg>
);

/** Envelope: charcoal stock, the flap pressed in, sealed with a foil Blklight diamond. */
export function EnvelopeCard({ data, size }: CardProps) {
  const stamp = documentStamp(data);
  const big = wide(size) || tall(size);
  return (
    <Shell
      card="envelope"
      shape={{ kind: "round" }}
      className="background-texture bg-[#2b2b2b] text-[#d6d3cf]"
    >
      <div className="texture-item relative size-full">
        <Flap className={tall(size) ? "h-[46%]" : "h-[34%]"} />
        <HoloSeal
          data={stamp}
          shape="diamond"
          tint={data.organization ? undefined : "#b8bcc4"}
          className={cn(
            "absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
            tall(size) ? "top-[46%] w-32" : "top-[34%] w-20",
          )}
        />
        <p className="absolute top-4 left-5 font-mono text-[0.6rem] uppercase tracking-wider opacity-60">
          {typeTheme(data.typeName).label}
        </p>
        {big && (
          <p className="absolute top-4 right-5 font-mono text-[0.6rem] uppercase tracking-wider opacity-60">
            Nº {stamp.ref}
          </p>
        )}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <CardTitle
            doc={data}
            className={cn(
              "font-medium leading-tight text-[#eceae6]",
              big ? "text-2xl line-clamp-3" : "text-lg line-clamp-2",
              cardFont(data),
            )}
          />
          <CardMeta doc={data} muted="opacity-60" />
        </div>
      </div>
    </Shell>
  );
}
