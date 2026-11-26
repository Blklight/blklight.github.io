export const DEPTH = 6;

export type SheetMotion = "tuck" | "untuck" | "unturn";

export interface SheetPose {
  top: boolean;
  /** Face down on the cover's back (the notes are showing). */
  turned: boolean;
  /** Distance from the top of its pile (the turned pile counts from its own top). */
  depth: number;
  motion?: SheetMotion;
}

/**
 * Where sheet `i` sits when `index` is current and `from` was the previous
 * index; `index === count` is the notes page. Returns null when the sheet is
 * not drawn (too deep in a pile).
 */
export function sheetPose(
  i: number,
  index: number,
  from: number,
  count: number,
): SheetPose | null {
  const o = i - index;
  const notes = index === count;
  const turned = notes && o < 0;
  const top = o === 0;
  const motion: SheetMotion | undefined =
    !notes && o === -1 && from === index - 1
      ? "tuck"
      : top && from === index + 1 && from < count
        ? "untuck"
        : !notes && from === count && o >= 0
          ? "unturn"
          : undefined;
  const drawn = turned ? o >= -DEPTH : o >= 0 && o < DEPTH;
  if (!drawn && motion !== "tuck") return null;
  return { top, turned, depth: turned ? -o - 1 : Math.max(0, o), motion };
}
