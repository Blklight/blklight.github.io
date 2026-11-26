import { describe, expect, it } from "vitest";
import { quoteFromRange, rangeFromQuote } from "@/features/notes/anchor";

function body(html: string) {
  const root = document.createElement("div");
  root.innerHTML = html;
  document.body.append(root);
  return root;
}

function select(root: Node, text: string, nth = 0) {
  const full = root.textContent ?? "";
  let at = -1;
  for (let i = 0; i <= nth; i++) at = full.indexOf(text, at + 1);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  let seen = 0;
  let started = false;
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const next = seen + node.data.length;
    if (!started && at < next) {
      range.setStart(node, at - seen);
      started = true;
    }
    if (started && at + text.length <= next) {
      range.setEnd(node, at + text.length - seen);
      break;
    }
    seen = next;
  }
  return range;
}

describe("text quote anchors", () => {
  it("round-trips a passage that spans elements", () => {
    const root = body(
      "<p>Antes de <strong>qualquer código</strong>, vale entender.</p>",
    );
    const quote = quoteFromRange(root, select(root, "qualquer código, vale"));
    if (!quote) throw new Error("no quote");
    expect(quote.exact).toBe("qualquer código, vale");
    expect(rangeFromQuote(root, quote)?.toString()).toBe(
      "qualquer código, vale",
    );
  });

  it("tells repeated text apart by its context", () => {
    const root = body("<p>o estado muda. Depois, o estado volta.</p>");
    const quote = quoteFromRange(root, select(root, "o estado", 1));
    if (!quote) throw new Error("no quote");
    const range = rangeFromQuote(root, quote);
    if (!range) throw new Error("no range");
    expect(range.toString()).toBe("o estado");
    const before = document.createRange();
    before.setStart(root, 0);
    before.setEnd(range.startContainer, range.startOffset);
    expect(before.toString()).toBe("o estado muda. Depois, ");
  });

  it("returns null when the text is gone or the selection is blank", () => {
    const root = body("<p>texto</p>");
    expect(
      rangeFromQuote(root, { exact: "sumiu", prefix: "", suffix: "" }),
    ).toBeNull();
    const collapsed = document.createRange();
    collapsed.setStart(root, 0);
    expect(quoteFromRange(root, collapsed)).toBeNull();
  });
});
