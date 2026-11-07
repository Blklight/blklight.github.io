"use client";

import { Type } from "lucide-react";
import { FONT_OPTIONS } from "@/components/document/constants";
import { cn } from "@/lib/utils";
import type { DesignContext } from "./layout";

export function FontPanel({ design }: DesignContext) {
  const { typography, setTypography } = design;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-foreground/40" />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
          Tipografia
        </span>
      </div>

      <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
        Escolha a fonte principal do documento. A alteracao afeta titulos,
        paragrafos e elementos de texto.
      </p>

      <div className="flex flex-col gap-1.5">
        {FONT_OPTIONS.map((font) => (
          <button
            key={font.id}
            type="button"
            onClick={() => setTypography(font.id as "sans" | "serif" | "mono")}
            className={cn(
              "flex items-center justify-between px-4 py-3 border rounded-xs transition-colors text-left",
              typography === font.id
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-foreground/60 hover:border-muted-foreground",
            )}
          >
            <span className={cn("text-sm", font.family)}>{font.name}</span>
            <span
              className={cn(
                "text-[10px] font-mono uppercase tracking-wider",
                typography === font.id
                  ? "text-foreground"
                  : "text-foreground/30",
              )}
            >
              {font.family.replace("font-", "")}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-2 p-4 border border-border rounded-xs">
        <p
          className={cn("text-lg font-bold tracking-tight", design.fontClass)}
          style={{ color: design.paperColors?.text || undefined }}
        >
          The quick brown fox jumps over the lazy dog
        </p>
        <p
          className={cn("text-sm mt-2", design.fontClass)}
          style={{ color: design.paperColors?.muted || undefined }}
        >
          ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
        </p>
      </div>
    </div>
  );
}
