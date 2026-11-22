"use client";

import { HoloSeal, LabelStamp } from "@/components/stamps/org-stamps";
import { cn } from "@/lib/utils";
import { typeTheme } from "../card-theme";
import { CardMeta, CardTitle, cardFont } from "../parts";
import { type CardProps, Shell, tall, wide } from "../shell";
import { documentStamp } from "./postal-card";

const KRAFT = "#cdb3a1";

/** Envelope: kraft paper with the flap drawn in, a holo seal at its tip and a postage label. */
export function EnvelopeCard({ data, size }: CardProps) {
  const stamp = documentStamp(data);
  const big = wide(size) || tall(size);
  return (
    <Shell
      card="envelope"
      shape={{ kind: "round" }}
      className="background-texture bg-[#161412]"
    >
      <div
        className="texture-item relative size-full text-[#3d3029]"
        style={{ background: KRAFT }}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 h-[45%] w-full text-current/40"
        >
          <path
            d="M0 0 L46 92 Q50 98 54 92 L100 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <HoloSeal
          data={stamp}
          rotate={-4}
          className={cn(
            "absolute top-[45%] left-1/2 z-10 -translate-x-1/2 -translate-y-1/2",
            big ? "w-32" : "w-24",
          )}
        />
        {big && (
          <LabelStamp
            data={{
              ...stamp,
              name: data.author.displayName || data.author.username,
            }}
            rotate={3}
            className="absolute top-4 right-4 w-36 bg-[#e4e0d8] text-[#3d3029] shadow-[0_6px_14px_-8px_rgb(0_0_0/0.6)]"
          />
        )}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-5">
          <CardTitle
            doc={data}
            className={cn(
              "font-medium leading-tight",
              big ? "text-2xl line-clamp-3" : "text-lg line-clamp-2",
              cardFont(data),
            )}
          />
          <div className="flex items-end justify-between gap-3">
            <CardMeta
              doc={data}
              className="min-w-0 flex-1"
              muted="opacity-70"
            />
            {big && (
              <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-wider opacity-70">
                {typeTheme(data.typeName).label} via Blklight
              </span>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
