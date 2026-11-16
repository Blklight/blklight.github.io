import { type BentoItem, hash } from "@/components/bento/bento-layout";
import type { DocumentCard } from "@/types/api.types";

export type FeedCardType = "text" | "paper" | "cover" | "media";

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

export function feedCardType(doc: DocumentCard): FeedCardType {
  if (doc.coverImageUrl) return hash(doc.id) % 3 === 0 ? "media" : "cover";
  return hasCustomPaper(doc.style) ? "paper" : "text";
}

export const toBentoItem = (
  doc: DocumentCard,
): BentoItem<FeedCardType, DocumentCard> => ({
  id: doc.id,
  type: feedCardType(doc),
  data: doc,
});
