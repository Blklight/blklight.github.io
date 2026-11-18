"use client";

import { MotionConfig } from "motion/react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";
import { BentoCell } from "./bento-cell";
import {
  type BentoCardDef,
  type BentoItem,
  fitSize,
  packBento,
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

// Must match the grid-cols-* breakpoints below (Tailwind sm, lg, xl, 2xl).
const COLUMN_QUERIES: [string, number][] = [
  ["(min-width: 96rem)", 5],
  ["(min-width: 80rem)", 4],
  ["(min-width: 64rem)", 3],
  ["(min-width: 40rem)", 2],
];

function subscribe(onChange: () => void) {
  const lists = COLUMN_QUERIES.map(([query]) => window.matchMedia(query));
  for (const list of lists) list.addEventListener("change", onChange);
  return () => {
    for (const list of lists) list.removeEventListener("change", onChange);
  };
}

const columns = () =>
  COLUMN_QUERIES.find(([query]) => window.matchMedia(query).matches)?.[1] ?? 1;

/** 0 on the server: no placement, CSS dense packing lays the grid out. */
const useColumns = () => useSyncExternalStore(subscribe, columns, () => 0);

/**
 * Layout only. Sizes come from resolveSize; cells are packed like
 * grid-flow-dense but rendered in visual order, so Tab and screen readers
 * follow what the eye sees.
 */
export function BentoGrid<T extends string>({
  items,
  cards,
  className,
  animate = true,
}: Props<T>) {
  const cols = useColumns();
  const cells = items.flatMap((item) => {
    const def = cards[item.type];
    if (!def) {
      console.warn(`BentoGrid: no card registered for "${item.type}"`);
      return [];
    }
    const size = resolveSize(item, def);
    return [{ item, def, size: cols ? fitSize(size, def, cols) : size }];
  });
  const placed = cols
    ? packBento(
        cells.map((cell) => cell.size),
        cols,
      )
    : null;
  const order = cells.map((_, i) => i);
  if (placed)
    order.sort(
      (a, b) => placed[a].row - placed[b].row || placed[a].col - placed[b].col,
    );

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-dense auto-rows-[var(--bento-row,15rem)] gap-4",
          className,
        )}
      >
        {order.map((i, index) => {
          const { item, def, size } = cells[i];
          const at = placed?.[i];
          const Card = def.component;
          return (
            <BentoCell
              key={item.id}
              index={index}
              animate={animate}
              className={at ? undefined : SPAN[size]}
              style={
                at && {
                  gridColumn: `${at.col + 1} / span ${at.w}`,
                  gridRow: `${at.row + 1} / span ${at.h}`,
                }
              }
            >
              <Card data={item.data} size={size} />
            </BentoCell>
          );
        })}
      </div>
    </MotionConfig>
  );
}
