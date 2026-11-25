/**
 * The dossier is laid out at real size and scaled down as one piece when the
 * screen is narrower. The sheet is narrower than the article page, but keeps
 * its padding and type sizes.
 */
export const SHEET_W = 600;
export const PANEL_PAD_X = 40;
export const PANEL_W = SHEET_W + PANEL_PAD_X * 2;
export const EAR_W = 44;
/** How far the active bookmark reaches into the sheet's margin. */
export const MARK_OVERLAP = PANEL_PAD_X + 24;
/** Room to the right of the folder for the active bookmark's label. */
export const MARK_W = 176;
export const SPREAD_W = EAR_W + PANEL_W * 2 + MARK_W;
export const SHEET_TOP = 40;
export const SHEET_BOTTOM = 64;

/** Vertical slot of ear `i` out of `total`, as percentages of the board height. */
export function earSlot(i: number, total: number) {
  const top = 4;
  const span = 92;
  const size = Math.min(14, span / Math.max(total, 1));
  return { top: `${top + i * size}%`, height: `${size - 0.8}%` };
}
