/**
 * The dossier is laid out at real size and scaled down as one piece when the
 * screen is narrower. The sheet is narrower than the article page, but keeps
 * its padding and type sizes.
 */
export const SHEET_W = 600;
/** Spine side of the sheet: close to the fold. */
export const PANEL_PAD_X = 16;
/** Inset of the content laid on the open cover's back. */
export const COVER_PAD_X = 40;
/** Small gap right of the sheet, so a section ear sits against its document. */
export const PANEL_GAP_R = 14;
export const PANEL_W = PANEL_PAD_X + SHEET_W + PANEL_GAP_R;
export const EAR_W = 44;
/**
 * Section ear: a title strip over the sheet's right padding (tucked under the
 * pile unless current), then the number outside the board.
 */
export const TAB_TEXT_W = 40;
export const TAB_NUM_W = 34;
/** Room right of the folder for its ears. */
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

/**
 * Stacking order inside the folder, bottom to top. The `dossier-tuck` and
 * `dossier-unturn` keyframes in dossier.css repeat `turned` (60) and 0.
 */
export const LAYER = {
  board: 1,
  earUnder: 5,
  /** Top sheet of the pile; each sheet below it is one less. */
  pile: 20,
  earActive: 25,
  nav: 30,
  cover: 50,
  /** Section ears turned with the pile, just under the turned sheets. */
  earTurned: 59,
  /** Turned sheets, one more per sheet. */
  turned: 60,
} as const;
