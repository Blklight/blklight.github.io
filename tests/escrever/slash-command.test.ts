import { describe, expect, it } from "vitest";
import { filterGroups } from "@/components/escrever/slash-command";

describe("slash command filter", () => {
  it("matches labels ignoring case and accents", () => {
    const labels = filterGroups("TITULO").flatMap((g) =>
      g.blocks.map((b) => b.label),
    );
    expect(labels).toEqual(["Título 1", "Título 2", "Título 3"]);
  });

  it("matches a whole group by its name", () => {
    expect(
      filterGroups("midia").flatMap((g) => g.blocks.map((b) => b.label)),
    ).toEqual(["Imagem"]);
  });
});
