/**
 * The dossier is laid out at real size and scaled down as one piece when the
 * screen is narrower. The sheet is narrower than the article page, but keeps
 * its padding and type sizes.
 */
export const SHEET_W = 600;
export const PANEL_PAD_X = 40;
export const PANEL_W = SHEET_W + PANEL_PAD_X * 2;
export const EAR_W = 44;
/** Room right of the folder: an ear, plus the active one sliding out. */
const RIGHT_W = EAR_W + 8;
export const SPREAD_W = EAR_W + PANEL_W * 2 + RIGHT_W;
export const SHEET_TOP = 40;
export const SHEET_BOTTOM = 64;

/** Vertical slot of ear `i` out of `total`, as percentages of the board height. */
export function earSlot(i: number, total: number) {
  const top = 4;
  const span = 92;
  const size = Math.min(18, span / Math.max(total, 1));
  return { top: `${top + i * size}%`, height: `${size - 0.8}%` };
}
