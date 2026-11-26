export interface BoardView {
  x: number;
  y: number;
  scale: number;
}

export const MIN_SCALE = 0.3;
export const MAX_SCALE = 2;

/** Zooms by `factor` keeping the board point under (px, py) in place. */
export function zoomAt(
  view: BoardView,
  factor: number,
  px: number,
  py: number,
): BoardView {
  const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, view.scale * factor));
  const k = scale / view.scale;
  return { scale, x: px - (px - view.x) * k, y: py - (py - view.y) * k };
}

/** Screen point (relative to the board element) to board coordinates. */
export function toBoard(view: BoardView, sx: number, sy: number) {
  return { x: (sx - view.x) / view.scale, y: (sy - view.y) / view.scale };
}

export const COLUMN_W = 280;
export const ROW_H = 220;

/** Notes never placed yet go in a column per group, in order. */
export function initialLayout(
  groups: { notes: { id: string; board?: { x: number; y: number } }[] }[],
): Record<string, { x: number; y: number }> {
  const out: Record<string, { x: number; y: number }> = {};
  groups.forEach((g, col) => {
    let row = 0;
    for (const n of g.notes) {
      if (n.board) continue;
      out[n.id] = { x: col * COLUMN_W, y: row * ROW_H };
      row++;
    }
  });
  return out;
}

/** View that frames every box in a `w`×`h` viewport, with `pad` around (never zooms past 100%). */
export function fitView(
  boxes: { x: number; y: number; w: number; h: number }[],
  w: number,
  h: number,
  pad = 48,
): BoardView {
  if (boxes.length === 0) return { x: pad, y: pad, scale: 1 };
  const left = Math.min(...boxes.map((b) => b.x));
  const top = Math.min(...boxes.map((b) => b.y));
  const right = Math.max(...boxes.map((b) => b.x + b.w));
  const bottom = Math.max(...boxes.map((b) => b.y + b.h));
  const scale = Math.max(
    MIN_SCALE,
    Math.min(1, (w - pad * 2) / (right - left), (h - pad * 2) / (bottom - top)),
  );
  return {
    scale,
    x: (w - (right - left) * scale) / 2 - left * scale,
    y: (h - (bottom - top) * scale) / 2 - top * scale,
  };
}
