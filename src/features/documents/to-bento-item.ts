import { type BentoItem, hash } from "@/components/bento/bento-layout";
import type { DocumentCard } from "@/types/api.types";

export type FeedCardType =
  | "text"
  | "paper"
  | "cover"
  | "media"
  | "polaroid"
  | "stamp"
  | "headline"
  | "catalog";

// Model pools, walked in turn by toBentoItems; "cover" appears twice to weigh it.
const WITH_COVER: FeedCardType[] = [
  "cover",
  "polaroid",
  "media",
  "cover",
  "stamp",
];
const PLAIN: FeedCardType[] = ["text", "headline", "catalog"];

const asRecord = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : {};

/** True when the author changed the paper (color or texture) from the default. */
export function hasCustomPaper(style: DocumentCard["style"]): boolean {
  if (!style) return false;
  const bg = asRecord(style.paperStyle).bg;
  const texture = asRecord(style.paperTexture).type;
  return (
    (typeof bg === "string" && bg.length > 0) ||
    texture === "dots" ||
    texture === "grid"
  );
}

/** Model for a single document, by hash (the feed uses toBentoItems instead). */
export function feedCardType(doc: DocumentCard): FeedCardType {
  // The author's own paper always wins: it is their identity, not ours.
  if (!doc.coverImageUrl && hasCustomPaper(doc.style)) return "paper";
  const pool = doc.coverImageUrl ? WITH_COVER : PLAIN;
  return pool[(hash(doc.id) >>> 16) % pool.length];
}

export const toBentoItem = (
  doc: DocumentCard,
): BentoItem<FeedCardType, DocumentCard> => ({
  id: doc.id,
  type: feedCardType(doc),
  data: doc,
});

/**
 * Whole list, in feed order. Each pool is walked in turn (offset by the first
 * document's hash), so a page shows every model before repeating one.
 * Appending pages never changes the models already on screen.
 */
export function toBentoItems(
  docs: DocumentCard[],
): BentoItem<FeedCardType, DocumentCard>[] {
  const seed = docs.length > 0 ? hash(docs[0].id) >>> 16 : 0;
  let cover = seed;
  let plain = seed;
  return docs.map((doc) => {
    let type: FeedCardType;
    if (doc.coverImageUrl) type = WITH_COVER[cover++ % WITH_COVER.length];
    else if (hasCustomPaper(doc.style)) type = "paper";
    else type = PLAIN[plain++ % PLAIN.length];
    return { id: doc.id, type, data: doc };
  });
}
