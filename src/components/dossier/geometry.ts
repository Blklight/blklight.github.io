/**
 * The dossier is laid out at real size and scaled down as one piece when the
 * screen is narrower. Real size = a sheet exactly as wide as the public
 * article paper (max-w-3xl minus md:px-6 = 720px).
 */
export const SHEET_W = 720;
export const PANEL_PAD_X = 40;
export const PANEL_W = SHEET_W + PANEL_PAD_X * 2;
export const EAR_W = 44;
export const SPREAD_W = PANEL_W * 2 + EAR_W * 2;
export const SHEET_TOP = 40;
export const SHEET_BOTTOM = 64;

/** Vertical slot of ear `i` out of `total`, as percentages of the board height. */
export function earSlot(i: number, total: number) {
  const top = 4;
  const span = 92;
  const size = Math.min(14, span / Math.max(total, 1));
  return { top: `${top + i * size}%`, height: `${size - 0.8}%` };
}
