"use client";

import { hash } from "@/components/bento/bento-layout";
import { cn } from "@/lib/utils";
import { CardMeta, CardTitle, cardFont } from "../parts";
import { type CardProps, Shell, surfaceOf, tall, wide } from "../shell";

const STEPS = [0, 1, 2, 3, 4, 5, 6];

/** Nested chevrons, as in a repeated check mark. */
const Chevrons = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
    className="size-full"
  >
    {STEPS.map((i) => (
      <polyline
        key={i}
        points={`0,${i * 13 - 6} 50,${i * 13 + 34} 100,${i * 13 - 6}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    ))}
  </svg>
);

/** Four chevron fans meeting in the middle: the north star. */
const Star = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
    className="size-full"
  >
    {STEPS.slice(0, 5).map((i) => {
      const d = 8 + i * 9;
      return (
        <g
          key={i}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        >
          <polyline
            points={`${50 - d},0 50,${50 - d} ${50 + d},0`}
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={`${50 - d},100 50,${50 + d} ${50 + d},100`}
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={`0,${50 - d} ${50 - d},50 0,${50 + d}`}
            vectorEffect="non-scaling-stroke"
          />
          <polyline
            points={`100,${50 - d} ${50 + d},50 100,${50 + d}`}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      );
    })}
  </svg>
);

/** Brand-system poster: a line-pattern panel, an ink title block, a footer bar. */
export function LinhasCard({ data, size }: CardProps) {
  const surface = surfaceOf(data.id);
  const Pattern = (hash(data.id) >>> 4) % 2 ? Star : Chevrons;
  const side = wide(size);
  return (
    <Shell
      card="linhas"
      shape={{ kind: "flat" }}
      className="bg-dark p-2 text-light"
    >
      <div className={cn("flex h-full gap-2", side ? "flex-row" : "flex-col")}>
        <div
          className={cn(
            "relative min-h-0 overflow-hidden rounded-md",
            surface.solid,
            side ? "w-1/2" : "flex-1",
          )}
        >
          <div className="absolute inset-0 text-dark transition-transform duration-700 ease-out group-hover/card:scale-110 motion-reduce:transition-none">
            <Pattern />
          </div>
        </div>
        <div className={cn("flex min-w-0 flex-col gap-2", side && "flex-1")}>
          <div className="flex flex-1 flex-col rounded-md bg-[#262626] p-4">
            <CardTitle
              doc={data}
              className={cn(
                "font-medium leading-[1.05] tracking-tight",
                tall(size) ? "text-2xl line-clamp-3" : "text-lg line-clamp-2",
                cardFont(data),
              )}
            />
            {data.abstract && (tall(size) || side) && (
              <p
                className={cn(
                  "mt-2 text-xs text-light/70 line-clamp-3",
                  cardFont(data),
                )}
              >
                {data.abstract}
              </p>
            )}
          </div>
          <CardMeta
            doc={data}
            className={cn("rounded-md px-3 py-2 text-dark", surface.solid)}
            muted="text-dark/70"
          />
        </div>
      </div>
    </Shell>
  );
}
