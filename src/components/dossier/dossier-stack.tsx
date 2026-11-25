import type { ReactNode } from "react";
import type { DossierSheetData } from "@/features/dossier/types";

const BEHIND = 3;
const MAX_EDGES = 8;

/**
 * Sheets held at the top. Turned sheets swing up and over (rotateX around the
 * top edge, back face hidden); the ones below peek out as a pile.
 */
export function DossierStack<T>({
  sheets,
  index,
  renderSheet,
}: {
  sheets: DossierSheetData<T>[];
  index: number;
  renderSheet: (sheet: DossierSheetData<T>, index: number) => ReactNode;
}) {
  const remaining = sheets.length - index - 1;
  const edges = Math.min(remaining, MAX_EDGES);

  return (
    <div className="relative h-full [perspective:2400px]">
      {Array.from({ length: edges }, (_, e) => (
        <span
          // biome-ignore lint/suspicious/noArrayIndexKey: decorative edges
          key={e}
          aria-hidden
          className="absolute inset-x-[0.5%] h-full border border-foreground/30 bg-background"
          style={{
            top: `${(e + 1) * 3}px`,
            zIndex: 10 - e,
            filter: `brightness(${1 - (e + 1) * 0.04})`,
          }}
        />
      ))}
      {sheets.map((sheet, i) => {
        const o = i - index;
        if (o < -1 || o > BEHIND) return null;
        const turned = o < 0;
        return (
          <div
            key={sheet.id}
            aria-hidden={o !== 0 ? true : undefined}
            inert={o !== 0 ? true : undefined}
            className="absolute inset-0 origin-top transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(.2,.7,.2,1)] [backface-visibility:hidden] motion-reduce:transition-opacity motion-reduce:duration-200"
            style={{
              zIndex: turned ? 30 : 20 - o,
              transform: turned ? "rotateX(178deg)" : "none",
              opacity: turned ? 0 : 1,
              visibility: o > 0 ? "hidden" : undefined,
              filter: "drop-shadow(0 6px 10px rgb(0 0 0 / 0.35))",
            }}
          >
            {renderSheet(sheet, i)}
          </div>
        );
      })}
      {remaining > 0 && (
        <span className="absolute -bottom-6 right-0 font-mono text-[0.62rem] uppercase tracking-widest opacity-70">
          +{remaining} {remaining === 1 ? "folha" : "folhas"}
        </span>
      )}
    </div>
  );
}
