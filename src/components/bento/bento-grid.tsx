"use client";

import { MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import { BentoCell } from "./bento-cell";
import {
  type BentoCardDef,
  type BentoItem,
  resolveSize,
  SPAN,
} from "./bento-layout";

interface Props<T extends string> {
  items: BentoItem<T>[];
  // biome-ignore lint/suspicious/noExplicitAny: each card narrows its own data; the map is heterogeneous by design
  cards: Record<T, BentoCardDef<any>>;
  className?: string;
  animate?: boolean;
}

/** Layout only: keeps the data order, sizes come from resolveSize, holes are filled by grid-flow-dense. */
export function BentoGrid<T extends string>({
  items,
  cards,
  className,
  animate = true,
}: Props<T>) {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-dense auto-rows-[var(--bento-row,15rem)] gap-4",
          className,
        )}
      >
        {items.map((item, index) => {
          const def = cards[item.type];
          if (!def) {
            if (process.env.NODE_ENV !== "production") {
              console.warn(`BentoGrid: no card registered for "${item.type}"`);
            }
            return null;
          }
          const size = resolveSize(item, def);
          const Card = def.component;
          return (
            <BentoCell
              key={item.id}
              index={index}
              animate={animate}
              className={SPAN[size]}
            >
              <Card data={item.data} size={size} />
            </BentoCell>
          );
        })}
      </div>
    </MotionConfig>
  );
}
