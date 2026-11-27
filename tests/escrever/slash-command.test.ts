import { describe, expect, it } from "vitest";
import { filterGroups } from "@/components/escrever/slash-command";

const ids = (query: string) =>
  filterGroups(query).flatMap((g) => g.blocks.map((b) => b.id));

describe("slash command filter", () => {
  it("matches labels ignoring case and accents", () => {
    expect(ids("TITULO")).toEqual(["heading1", "heading2", "heading3"]);
  });

  it("matches a whole group by its name", () => {
    expect(ids("midia")).toEqual(["image"]);
  });

  it("matches the English names too", () => {
    expect(ids("heading")).toEqual(["heading1", "heading2", "heading3"]);
  });
});
