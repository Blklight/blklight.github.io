import type React from "react";
import { getAccessibleTextColor } from "@/components/document/color-utils";
import type { PaperColors } from "@/components/document/types";
import {
  type GrainSettings,
  getGrain,
  getGrainClasses,
  normalizeGrainSettings,
  type PaperTone,
} from "@/features/documents/design/grains";
import { cn } from "@/lib/utils";

export interface PaperSurfaceProps {
  /** Root element. Defaults to "div"; the public reading page uses "article". */
  as?: "div" | "article";
  paperColors: PaperColors | null;
  paperTexture: { type: string; opacity: number };
  textureStyle: Record<string, string | undefined>;
  /** Grain ids from `paperStyle.grains` (see grains.ts). */
  grains?: string[] | null;
  /** `paperStyle.grainSettings` (validated here; invalid values ignored). */
  grainSettings?: GrainSettings | null;
  /** Extra classes for the root container. */
  className?: string;
  /** Extra classes for the content wrapper (padding lives here). */
  contentClassName?: string;
  children: React.ReactNode;
}

type SurfaceStyle = React.CSSProperties & Record<`--${string}`, string>;

const HEX_COLOR = /^#?[0-9a-f]{6}$/i;

/**
 * Paper tone from the paper color, using the existing contrast helper:
 * light text => dark paper. Null when there is no fixed paper color (Tema
 * Padrão) or the color is not #rrggbb — then CSS falls back to the site theme.
 */
function getPaperTone(paperColors: PaperColors | null): PaperTone | null {
  const bg = paperColors?.bg;
  if (!bg || !HEX_COLOR.test(bg)) return null;
  return getAccessibleTextColor(bg) === "#FFFFFF" ? "dark" : "light";
}

/**
 * Single source of the paper surface (reading page, design preview, editor).
 *
 * Layers, bottom to top:
 *   1. paper color      — backgroundColor of the root container
 *   2. dots/grid texture — absolute overlay div, z-0 (only if type !== "none")
 *   3. grains           — `::before` (`.paper-grain-noise`) and/or `::after`
 *                         (`.paper-grain-overlay`) of the root container,
 *                         z-index 5, + `isolate` (from getGrainClasses)
 *   4. content          — wrapper "relative z-10" (`children`)
 *
 * Grains with light/dark variants (registry `variants`) also get, only while
 * on: `data-paper-tone` (fixed paper color) and the per-document overrides of
 * `grainSettings` as inline CSS custom properties.
 *
 * The grain stays UNDER text, cover, signature and letterhead. Without grain
 * the rendered HTML is identical to the previous inline markup.
 *
 * No "use client": usable from Server Components.
 */
export function PaperSurface({
  as: Component = "div",
  paperColors,
  paperTexture,
  textureStyle,
  grains,
  grainSettings,
  className,
  contentClassName,
  children,
}: PaperSurfaceProps) {
  const style: SurfaceStyle = {
    backgroundColor: paperColors?.bg || undefined,
    borderColor: paperColors?.text || undefined,
  };

  let paperTone: PaperTone | null = null;
  const toneGrains = (Array.isArray(grains) ? grains : []).flatMap((id) => {
    const grain = typeof id === "string" ? getGrain(id) : undefined;
    return grain?.variants
      ? [{ id: grain.id, prefix: grain.variants.cssVarPrefix }]
      : [];
  });
  if (toneGrains.length > 0) {
    paperTone = getPaperTone(paperColors);
    const settings = normalizeGrainSettings(grainSettings);
    for (const { id, prefix } of toneGrains) {
      const overrides = settings?.[id];
      if (!overrides) continue;
      for (const tone of ["light", "dark"] as const) {
        const value = overrides[tone];
        if (value?.blend) style[`${prefix}-${tone}-blend`] = value.blend;
        if (value?.opacity !== undefined) {
          style[`${prefix}-${tone}-opacity`] = String(value.opacity);
        }
      }
    }
  }

  return (
    <Component
      className={cn(
        "border border-foreground transition-colors duration-300 relative overflow-hidden",
        getGrainClasses(grains),
        className,
      )}
      data-paper-tone={paperTone ?? undefined}
      style={style}
    >
      {paperTexture.type !== "none" && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            ...textureStyle,
            opacity: paperTexture.opacity,
          }}
        />
      )}

      {/* contentClassName first: keeps today's class order ("md:p-10 p-8 relative z-10") */}
      <div className={cn(contentClassName, "relative z-10")}>{children}</div>
    </Component>
  );
}
