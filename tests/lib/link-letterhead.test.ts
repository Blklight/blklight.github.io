import { describe, expect, it } from "vitest";
import { linkLetterhead } from "@/features/documents/design/blklight-letterhead";

const side = (over: Record<string, unknown>) => ({
  enabled: true,
  mode: "preset" as const,
  presetId: "blklight",
  lines: ["a"],
  style: { bg: "#000" },
  ...over,
});

describe("linkLetterhead", () => {
  it("renders a removed model as Blklight", () => {
    const { header, footer } = linkLetterhead(
      side({ presetId: "selo-dourado" }),
      side({ presetId: "minimalista" }),
    );
    expect(header.presetId).toBe("blklight");
    expect(footer.presetId).toBe("blklight");
  });

  it("gives the footer the header's look but keeps its own text and switch", () => {
    const { footer } = linkLetterhead(
      side({ presetId: "alerta-vermelho", style: { bg: "#f00" } }),
      side({ presetId: "corp-moderno", lines: ["rodapé"], enabled: false }),
    );
    expect(footer).toMatchObject({
      presetId: "alerta-vermelho",
      style: { bg: "#f00" },
      lines: ["rodapé"],
      enabled: false,
    });
  });

  it("keeps custom mode as it is", () => {
    const { header, footer } = linkLetterhead(
      side({ mode: "custom", presetId: null, style: { bg: "#123456" } }),
      side({}),
    );
    expect(header.presetId).toBeNull();
    expect(footer).toMatchObject({ mode: "custom", style: { bg: "#123456" } });
  });
});
