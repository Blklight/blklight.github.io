import type { TextQuote } from "./types";

const CONTEXT = 32;

function textNodes(root: Node): Text[] {
  const walker = root.ownerDocument?.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
  );
  const nodes: Text[] = [];
  while (walker?.nextNode()) nodes.push(walker.currentNode as Text);
  return nodes;
}

function offsetOf(root: Node, node: Node, offset: number) {
  const range = root.ownerDocument?.createRange();
  if (!range) return 0;
  range.setStart(root, 0);
  range.setEnd(node, offset);
  return range.toString().length;
}

/** Quote of `range`, with some text around it to tell repeats apart. */
export function quoteFromRange(root: Node, range: Range): TextQuote | null {
  if (!root.contains(range.commonAncestorContainer)) return null;
  const exact = range.toString();
  if (!exact.trim()) return null;
  const text = root.textContent ?? "";
  const start = offsetOf(root, range.startContainer, range.startOffset);
  const end = start + exact.length;
  return {
    exact,
    prefix: text.slice(Math.max(0, start - CONTEXT), start),
    suffix: text.slice(end, end + CONTEXT),
  };
}

const sharedEnd = (a: string, b: string) => {
  let n = 0;
  while (
    n < a.length &&
    n < b.length &&
    a[a.length - 1 - n] === b[b.length - 1 - n]
  )
    n++;
  return n;
};
const sharedStart = (a: string, b: string) => {
  let n = 0;
  while (n < a.length && n < b.length && a[n] === b[n]) n++;
  return n;
};

/** Finds the quote again in `root`; the occurrence whose context matches best wins. */
export function rangeFromQuote(root: Node, quote: TextQuote): Range | null {
  const nodes = textNodes(root);
  const text = nodes.map((n) => n.data).join("");
  let best = -1;
  let bestScore = -1;
  for (
    let at = text.indexOf(quote.exact);
    at !== -1;
    at = text.indexOf(quote.exact, at + 1)
  ) {
    const score =
      sharedEnd(
        text.slice(Math.max(0, at - quote.prefix.length), at),
        quote.prefix,
      ) + sharedStart(text.slice(at + quote.exact.length), quote.suffix);
    if (score > bestScore) {
      best = at;
      bestScore = score;
    }
  }
  if (best === -1) return null;

  const locate = (offset: number, isEnd: boolean) => {
    let seen = 0;
    for (const node of nodes) {
      const next = seen + node.data.length;
      if (offset < next || (isEnd && offset === next))
        return { node, offset: offset - seen };
      seen = next;
    }
    return null;
  };
  const start = locate(best, false);
  const end = locate(best + quote.exact.length, true);
  const range = root.ownerDocument?.createRange();
  if (!start || !end || !range) return null;
  range.setStart(start.node, start.offset);
  range.setEnd(end.node, end.offset);
  return range;
}
