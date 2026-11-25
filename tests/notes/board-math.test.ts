import { describe, expect, it } from "vitest";
import {
  COLUMN_W,
  initialLayout,
  MAX_SCALE,
  ROW_H,
  toBoard,
  zoomAt,
} from "@/components/notes/board-math";

describe("board math", () => {
  it("zooms around the pointer", () => {
    const view = zoomAt({ x: 0, y: 0, scale: 1 }, 2, 100, 50);
    expect(view).toEqual({ x: -100, y: -50, scale: 2 });
    expect(toBoard(view, 100, 50)).toEqual({ x: 100, y: 50 });
  });

  it("clamps the zoom", () => {
    expect(zoomAt({ x: 0, y: 0, scale: 1.5 }, 4, 0, 0).scale).toBe(MAX_SCALE);
  });

  it("lays unplaced notes in a column per group", () => {
    const layout = initialLayout([
      { notes: [{ id: "a" }, { id: "b", board: { x: 9, y: 9 } }, { id: "c" }] },
      { notes: [{ id: "d" }] },
    ]);
    expect(layout).toEqual({
      a: { x: 0, y: 0 },
      c: { x: 0, y: ROW_H },
      d: { x: COLUMN_W, y: 0 },
    });
  });
});
