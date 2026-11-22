import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TextCard } from "@/components/feed/cards/feed-cards";
import type { DocumentCard } from "@/types/api.types";

const doc = (typography: "sans" | "serif" | "mono"): DocumentCard => ({
  id: "doc-1",
  title: "Sobre escrever devagar",
  abstract: "Um texto pede tempo.",
  coverImageUrl: null,
  slug: "sobre-escrever",
  typeName: "article",
  publishedAt: "2026-11-20T12:00:00.000Z",
  author: { username: "marina", displayName: "Marina", avatarUrl: null },
  authorship: { publicIdentifier: "x" },
  likesCount: 3,
  category: null,
  tags: [],
  organization: null,
  style: { typography, paperStyle: null, paperTexture: null },
});

describe("card typography", () => {
  it("sets the title and abstract in the author's typeface", () => {
    render(<TextCard data={doc("serif")} size="1x1" />);
    expect(screen.getByRole("heading")).toHaveClass("font-serif");
    expect(screen.getByText("Um texto pede tempo.")).toHaveClass("font-serif");
  });

  it("falls back to sans without a style", () => {
    render(<TextCard data={{ ...doc("sans"), style: null }} size="1x1" />);
    expect(screen.getByRole("heading")).toHaveClass("font-sans");
  });
});
