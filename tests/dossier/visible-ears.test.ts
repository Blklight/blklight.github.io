import { describe, expect, it } from "vitest";
import { visibleEars } from "@/components/dossier/dossier-tabs";

describe("visibleEars", () => {
  it("shows every ear up to eight sections", () => {
    expect(visibleEars(8, 5)).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("past eight, shows the next divider in each of four positions", () => {
    expect(visibleEars(10, -1)).toEqual([0, 1, 2, 3]);
    expect(visibleEars(10, 2)).toEqual([4, 5, 2, 3]);
    expect(visibleEars(10, 9)).toEqual([0, 9, 2, 3]);
  });
});
