import { describe, expect, it } from "vitest";
import {
  fitSize,
  hash,
  packBento,
  resolveSize,
} from "@/components/bento/bento-layout";

describe("resolveSize", () => {
  const def = { sizes: { "1x1": 3, "1x2": 1 } };

  it("returns the same size for the same id", () => {
    expect(resolveSize({ id: "doc-a" }, def)).toBe(
      resolveSize({ id: "doc-a" }, def),
    );
  });

  it("lets an explicit size win over featured and weights", () => {
    expect(resolveSize({ id: "x", size: "2x1", featured: true }, def)).toBe(
      "2x1",
    );
  });

  it("uses featuredSize, defaulting to 2x2", () => {
    expect(resolveSize({ id: "x", featured: true }, def)).toBe("2x2");
    expect(
      resolveSize({ id: "x", featured: true }, { ...def, featuredSize: "2x1" }),
    ).toBe("2x1");
  });

  it("falls back to 1x1 without weights", () => {
    expect(resolveSize({ id: "x" }, {})).toBe("1x1");
  });

  it("roughly follows the weights over many ids", () => {
    let tall = 0;
    for (let i = 0; i < 1000; i++) {
      if (resolveSize({ id: `doc-${i}` }, def) === "1x2") tall++;
    }
    expect(tall).toBeGreaterThan(180);
    expect(tall).toBeLessThan(320);
  });

  it("hashes to an unsigned 32-bit integer", () => {
    const h = hash("blklight");
    expect(Number.isInteger(h)).toBe(true);
    expect(h).toBeGreaterThanOrEqual(0);
    expect(h).toBeLessThan(2 ** 32);
  });
});

describe("packBento", () => {
  it("fills holes like grid-auto-flow: dense", () => {
    // 3 columns: a 2x1 leaves a hole that the later 1x1 backfills.
    expect(packBento(["1x1", "2x1", "1x1"], 3)).toEqual([
      { row: 0, col: 0, w: 1, h: 1 },
      { row: 0, col: 1, w: 2, h: 1 },
      { row: 1, col: 0, w: 1, h: 1 },
    ]);
    expect(packBento(["2x1", "2x1", "1x1"], 3)).toEqual([
      { row: 0, col: 0, w: 2, h: 1 },
      { row: 1, col: 0, w: 2, h: 1 },
      { row: 0, col: 2, w: 1, h: 1 },
    ]);
  });

  it("never overlaps cells", () => {
    const sizes = Array.from(
      { length: 60 },
      (_, i) => (["1x1", "2x1", "1x2", "2x2"] as const)[hash(`s${i}`) % 4],
    );
    for (const cols of [2, 3, 4, 5]) {
      const seen = new Set<string>();
      for (const p of packBento(sizes, cols))
        for (let y = p.row; y < p.row + p.h; y++)
          for (let x = p.col; x < p.col + p.w; x++) {
            expect(x).toBeLessThan(cols);
            expect(seen.has(`${y},${x}`)).toBe(false);
            seen.add(`${y},${x}`);
          }
    }
  });

  it("clamps width to a single column", () => {
    expect(packBento(["1x2", "1x1"], 1)).toEqual([
      { row: 0, col: 0, w: 1, h: 2 },
      { row: 2, col: 0, w: 1, h: 1 },
    ]);
  });
});

describe("fitSize", () => {
  const tall = { sizes: { "2x1": 1, "1x2": 1 } };
  const flat = { sizes: { "1x1": 1, "2x1": 1 } };

  it("keeps the size when it fits", () => {
    expect(fitSize("2x1", tall, 3)).toBe("2x1");
    expect(fitSize("1x2", tall, 1)).toBe("1x2");
  });

  it("turns wide sizes into the card's narrow size in one column", () => {
    expect(fitSize("2x1", tall, 1)).toBe("1x2");
    expect(fitSize("2x2", tall, 1)).toBe("1x2");
    expect(fitSize("2x1", flat, 1)).toBe("1x1");
  });
});
