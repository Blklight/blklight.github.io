import { describe, expect, it } from "vitest";
import { renderDocumentContent } from "@/features/documents/document-read";

const doc = (...content: unknown[]) => ({ type: "doc", content });
const text = (value: string, marks?: unknown[]) => ({
  type: "text",
  text: value,
  ...(marks ? { marks } : {}),
});

describe("renderDocumentContent", () => {
  it("renders headings and paragraphs", () => {
    const html = renderDocumentContent(
      doc(
        { type: "heading", attrs: { level: 2 }, content: [text("Título")] },
        { type: "paragraph", content: [text("Corpo")] },
      ),
    );

    expect(html).toContain("<h2");
    expect(html).toContain("Título");
    expect(html).toMatch(/<p[^>]*>Corpo<\/p>/);
  });

  it("drops javascript: links", () => {
    const html = renderDocumentContent(
      doc({
        type: "paragraph",
        content: [
          text("clique", [
            { type: "link", attrs: { href: "javascript:alert(1)" } },
          ]),
        ],
      }),
    );

    expect(html).toContain("clique");
    expect(html.toLowerCase()).not.toContain("javascript:");
  });

  it("escapes HTML typed as text", () => {
    const html = renderDocumentContent(
      doc({
        type: "paragraph",
        content: [text('<script>alert(1)</script><img src=x onerror="x">')],
      }),
    );

    expect(html).not.toContain("<script");
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;script&gt;");
  });

  it("ignores unknown nodes and returns empty for non-objects", () => {
    expect(renderDocumentContent(null)).toBe("");
    expect(renderDocumentContent("<b>x</b>")).toBe("");
    expect(
      renderDocumentContent(doc({ type: "iframe", attrs: { src: "x" } })),
    ).not.toContain("<iframe");
  });
});
