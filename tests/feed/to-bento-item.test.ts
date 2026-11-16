import { describe, expect, it } from "vitest";
import {
  feedCardType,
  hasCustomPaper,
  toBentoItem,
  toBentoItems,
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
  it("uses an image model when there is a cover", () => {
    expect(["cover", "media", "stamp"]).toContain(
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

  it("uses a plain model for the default paper", () => {
    expect(
      hasCustomPaper(style({ mode: "default", bg: null }, { type: "none" })),
    ).toBe(false);
    expect(["text", "headline", "catalog"]).toContain(feedCardType(doc()));
  });

  it("shows every plain model before repeating one", () => {
    const docs = Array.from({ length: 6 }, (_, i) => doc({ id: `d-${i}` }));
    const types = toBentoItems(docs).map((item) => item.type);
    expect(new Set(types.slice(0, 3))).toEqual(
      new Set(["text", "headline", "catalog"]),
    );
  });

  it("keeps models stable when a page is appended", () => {
    const first = Array.from({ length: 5 }, (_, i) =>
      doc({ id: `p-${i}`, coverImageUrl: i % 2 ? "https://x/y.jpg" : null }),
    );
    const more = [...first, doc({ id: "p-5" }), doc({ id: "p-6" })];
    expect(toBentoItems(more).slice(0, 5)).toEqual(toBentoItems(first));
  });

  it("keeps the same model for the same document", () => {
    expect(feedCardType(doc({ id: "abc" }))).toBe(
      feedCardType(doc({ id: "abc" })),
    );
  });

  it("keys the bento item by the document id", () => {
    const item = toBentoItem(doc());
    expect(item.id).toBe("doc-1");
    expect(item.data.title).toBe("Título");
  });
});
