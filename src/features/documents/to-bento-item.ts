import { type BentoItem, hash } from "@/components/bento/bento-layout";
import type { DocumentCard } from "@/types/api.types";

export type FeedCardType =
  | "text"
  | "paper"
  | "cover"
  | "media"
  | "stamp"
  | "headline"
  | "catalog";

// Model pools: a document's model comes from its id (see feedCardType).
const WITH_COVER: FeedCardType[] = ["cover", "media", "stamp"];
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

/** Model for a single document, by hash of its id: the same everywhere it shows. */
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
 * Whole list, in feed order. Each document keeps its id-based model, so
 * filtering, searching or appending pages doesn't change it. The one exception:
 * when it would repeat the previous card of the same pool, it takes the next
 * model in that pool, so neighbours never look alike.
 */
export function toBentoItems(
  docs: DocumentCard[],
): BentoItem<FeedCardType, DocumentCard>[] {
  const last = new Map<FeedCardType[], FeedCardType>();
  return docs.map((doc) => {
    let type = feedCardType(doc);
    const pool =
      type === "paper" ? null : doc.coverImageUrl ? WITH_COVER : PLAIN;
    if (pool) {
      if (last.get(pool) === type)
        type = pool[(pool.indexOf(type) + 1) % pool.length];
      last.set(pool, type);
    }
    return { id: doc.id, type, data: doc };
  });
}
