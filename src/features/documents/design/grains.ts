/**
 * Grain registry for paper background effect.
 *
 * Grain ("grão") is different from "texture" (paperTexture: dots/grid/none).
 * Each grain is an optional visual effect painted by one pseudo-element slot
 * of the paper container (see `.paper-grain-*` in globals.css and
 * PaperSurface). Grains in different slots can be on at the same time.
 * Stored as `paperStyle.grains?: string[]` (ids, never class names).
 * Absent/empty = no grain. Unknown ids are ignored on render.
 * Ids are persisted: never rename them.
 *
 * Optional per-document tuning lives in `paperStyle.grainSettings`
 * (see GrainSettings / normalizeGrainSettings). Isomorphic module: used by
 * the store (client) and by PaperSurface (also Server Components).
 */
export type PaperGrainSlot = "before" | "after";

export type PaperTone = "light" | "dark";

/** Blend modes accepted in grainSettings (anything else is ignored). */
export const GRAIN_BLEND_MODES = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "soft-light",
  "hard-light",
  "darken",
  "lighten",
  "luminosity",
  "color-burn",
] as const;

export type GrainBlendMode = (typeof GRAIN_BLEND_MODES)[number];

export interface GrainToneSettings {
  blend?: GrainBlendMode;
  /** 0..1 */
  opacity?: number;
}

/** Per-grain overrides, keyed by grain id. Free jsonb, validated on read. */
export type GrainSettings = Record<
  string,
  { light?: GrainToneSettings; dark?: GrainToneSettings }
>;

export interface PaperGrainVariant {
  /** Uniform tone color (CSS color with alpha). */
  tone: string;
  blend: GrainBlendMode;
  opacity: number;
}

export interface PaperGrain {
  id: string;
  name: string;
  description: string;
  className: string;
  /** Pseudo-element of the paper container that paints this grain. */
  slot: PaperGrainSlot;
  /**
   * Light/dark paper variants. Initial values mirror globals.css
   * (`${cssVarPrefix}-{light,dark}-{tone,blend,opacity}` in :root).
   * Grains with variants get `data-paper-tone` and per-document overrides
   * from PaperSurface.
   */
  variants?: {
    cssVarPrefix: `--${string}`;
    light: PaperGrainVariant;
    dark: PaperGrainVariant;
  };
}

export const PAPER_GRAINS: PaperGrain[] = [
  {
    id: "background-texture",
    name: "Grão 1",
    description: "Ruído sutil sobre o papel",
    className: "paper-grain-noise",
    slot: "before",
  },
  {
    id: "texture-item",
    name: "Grão 2",
    description: "Ruído com tom uniforme, claro ou escuro conforme o papel",
    className: "paper-grain-overlay",
    slot: "after",
    variants: {
      cssVarPrefix: "--paper-grain-overlay",
      light: { tone: "rgba(0, 0, 0, 0.06)", blend: "normal", opacity: 0.5 },
      // Provisório.
      dark: { tone: "rgba(255, 255, 255, 0.1)", blend: "screen", opacity: 0.3 },
    },
  },
];

const GRAIN_MAP = new Map<string, PaperGrain>(
  PAPER_GRAINS.map((grain) => [grain.id, grain]),
);

export function getGrain(id: string): PaperGrain | undefined {
  return GRAIN_MAP.get(id);
}

/**
 * Convert list of grain ids to the paper container classes.
 * Returns the classes of each known grain (no duplicates, one grain per slot)
 * plus "isolate" (own stacking context, so the grain pseudo-elements stay
 * inside the paper), or "" when no known grain is present — so a document
 * without grain renders exactly as before. Unknown ids are ignored.
 */
export function getGrainClasses(grains?: string[] | null): string {
  if (!Array.isArray(grains) || grains.length === 0) return "";
  const classes: string[] = [];
  const usedSlots = new Set<PaperGrainSlot>();
  for (const id of grains) {
    if (typeof id !== "string") continue;
    const grain = GRAIN_MAP.get(id);
    if (!grain || usedSlots.has(grain.slot)) continue;
    usedSlots.add(grain.slot);
    classes.push(grain.className);
  }
  if (classes.length === 0) return "";
  classes.push("isolate");
  return classes.join(" ");
}

export function isBlendMode(value: unknown): value is GrainBlendMode {
  return (
    typeof value === "string" &&
    (GRAIN_BLEND_MODES as readonly string[]).includes(value)
  );
}

function normalizeTone(raw: unknown): GrainToneSettings | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const blend: unknown = Reflect.get(raw, "blend");
  const opacity: unknown = Reflect.get(raw, "opacity");
  const out: GrainToneSettings = {};
  if (isBlendMode(blend)) out.blend = blend;
  if (typeof opacity === "number" && Number.isFinite(opacity)) {
    out.opacity = Math.min(1, Math.max(0, opacity));
  }
  return out.blend !== undefined || out.opacity !== undefined ? out : undefined;
}

/**
 * Validate free jsonb into GrainSettings: keeps only light/dark objects with
 * an allowed blend and/or a finite opacity (clamped to 0..1). Drops empty
 * entries. Returns undefined when nothing valid remains. Idempotent.
 */
export function normalizeGrainSettings(
  raw: unknown,
): GrainSettings | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const out: GrainSettings = {};
  for (const [id, value] of Object.entries(raw)) {
    if (!value || typeof value !== "object") continue;
    const light = normalizeTone(Reflect.get(value, "light"));
    const dark = normalizeTone(Reflect.get(value, "dark"));
    if (!light && !dark) continue;
    out[id] = {
      ...(light ? { light } : {}),
      ...(dark ? { dark } : {}),
    };
  }
  return Object.keys(out).length > 0 ? out : undefined;
}
