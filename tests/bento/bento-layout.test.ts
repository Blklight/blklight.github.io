import { describe, expect, it } from "vitest";
import { hash, resolveSize } from "@/components/bento/bento-layout";

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
