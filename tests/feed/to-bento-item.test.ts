import { describe, expect, it } from "vitest";
import {
  feedCardType,
  hasCustomPaper,
  toBentoItem,
} from "@/features/documents/to-bento-item";
import type { DocumentCard } from "@/types/api.types";

const doc = (over: Partial<DocumentCard> = {}): DocumentCard => ({
  id: "doc-1",
  title: "Título",
  abstract: null,
  coverImageUrl: null,
  slug: "titulo",
  typeName: "article",
  publishedAt: "2026-11-16T00:00:00.000Z",
  author: { username: "ana", displayName: null, avatarUrl: null },
  authorship: { publicIdentifier: "x" },
  likesCount: 0,
  category: null,
  tags: [],
  organization: null,
  ...over,
});

const style = (paperStyle: unknown, paperTexture: unknown) =>
  ({ typography: "sans", paperStyle, paperTexture }) as DocumentCard["style"];

describe("feed card type", () => {
  it("uses a cover card (or media) when there is a cover", () => {
    expect(["cover", "media"]).toContain(
      feedCardType(doc({ coverImageUrl: "https://x/y.jpg" })),
    );
  });

  it("uses the paper card for a custom paper color or texture", () => {
    expect(feedCardType(doc({ style: style({ bg: "#D7CCC8" }, null) }))).toBe(
      "paper",
    );
    expect(feedCardType(doc({ style: style(null, { type: "dots" }) }))).toBe(
      "paper",
    );
  });

  it("falls back to the text card for the default paper", () => {
    expect(
      hasCustomPaper(style({ mode: "default", bg: null }, { type: "none" })),
    ).toBe(false);
    expect(feedCardType(doc())).toBe("text");
  });

  it("keys the bento item by the document id", () => {
    const item = toBentoItem(doc());
    expect(item.id).toBe("doc-1");
    expect(item.data.title).toBe("Título");
  });
});
