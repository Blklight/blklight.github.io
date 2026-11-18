import type { ComponentType } from "react";

export type BentoSize = "1x1" | "2x1" | "1x2" | "2x2";

export interface BentoItem<T extends string = string, D = unknown> {
  /** Stable id: React key and the seed of the size draw. */
  id: string;
  type: T;
  /** Explicit size always wins. */
  size?: BentoSize;
  featured?: boolean;
  data: D;
}

export interface BentoCardProps<D> {
  data: D;
  size: BentoSize;
}

export interface BentoCardDef<D = never> {
  component: ComponentType<BentoCardProps<D>>;
  /** Weights for the deterministic draw; absent means always 1x1. */
  sizes?: Partial<Record<BentoSize, number>>;
  featuredSize?: BentoSize;
}

/** FNV-1a 32-bit with a murmur3 finalizer, so ids that differ only at the end still spread. */
export function hash(value: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

export function resolveSize(
  item: Pick<BentoItem, "id" | "size" | "featured">,
  def: Pick<BentoCardDef, "sizes" | "featuredSize">,
): BentoSize {
  if (item.size) return item.size;
  if (item.featured) return def.featuredSize ?? "2x2";
  const entries = Object.entries(def.sizes ?? {}).filter(
    ([, weight]) => (weight ?? 0) > 0,
  ) as [BentoSize, number][];
  if (entries.length === 0) return "1x1";
  const total = entries.reduce((sum, [, weight]) => sum + weight, 0);
  let pick = (hash(item.id) / 0x100000000) * total;
  for (const [size, weight] of entries) {
    if (pick < weight) return size;
    pick -= weight;
  }
  return entries[entries.length - 1][0];
}

export interface BentoPlacement {
  row: number;
  col: number;
  w: number;
  h: number;
}

const DIMS: Record<BentoSize, [number, number]> = {
  "1x1": [1, 1],
  "2x1": [2, 1],
  "1x2": [1, 2],
  "2x2": [2, 2],
};

/**
 * Same result as CSS `grid-auto-flow: dense`, computed up front so the caller
 * can render cells in visual order (DOM order = reading and focus order).
 * One column drops every span, matching SPAN below.
 */
export function packBento(sizes: BentoSize[], cols: number): BentoPlacement[] {
  const taken: boolean[][] = [];
  const free = (r: number, c: number, w: number, h: number) => {
    for (let y = r; y < r + h; y++)
      for (let x = c; x < c + w; x++) if (taken[y]?.[x]) return false;
    return true;
  };
  return sizes.map((size) => {
    const [dw, dh] = cols === 1 ? [1, 1] : DIMS[size];
    const w = Math.min(dw, cols);
    for (let row = 0; ; row++)
      for (let col = 0; col + w <= cols; col++)
        if (free(row, col, w, dh)) {
          for (let y = row; y < row + dh; y++) {
            taken[y] ??= [];
            for (let x = col; x < col + w; x++) taken[y][x] = true;
          }
          return { row, col, w, h: dh };
        }
  });
}

// Spans start at sm: so a single mobile column never overflows.
export const SPAN: Record<BentoSize, string> = {
  "1x1": "",
  "2x1": "sm:col-span-2",
  "1x2": "sm:row-span-2",
  "2x2": "sm:col-span-2 sm:row-span-2",
};
