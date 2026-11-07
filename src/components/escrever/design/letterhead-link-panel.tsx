"use client";

import { Link2, Link2Off } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DesignContext } from "./layout";
import { LetterheadSectionPanel } from "./letterhead-section-panel";

interface LetterheadLinkPanelProps {
  design: DesignContext["design"];
  focusedSection: "header" | "footer";
}

// Panel-level control that encompasses BOTH letterhead sections. It owns the
// header/footer style linkage toggle and, while linked, renders a single
// shared style editor plus the two independent text sections side by side.
// When unlinked it falls back to the full per-section editor.
export function LetterheadLinkPanel({
  design,
  focusedSection,
}: LetterheadLinkPanelProps) {
  const linked = design.headerFooterLinked;
  const toggleLabel = "Usar o mesmo estilo para cabeçalho e rodapé";

  return (
    <div className="flex flex-col gap-6">
      {/* Linkage toggle (lives at the panel level, outside the sections) */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {linked ? (
            <Link2 className="w-4 h-4 text-foreground/40" />
          ) : (
            <Link2Off className="w-4 h-4 text-foreground/40" />
          )}
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
            {toggleLabel}
          </span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={linked}
          aria-label={toggleLabel}
          title={toggleLabel}
          onClick={() => design.setHeaderFooterLinked(!linked)}
          className={cn(
            "w-10 h-5 rounded-full transition-colors relative shrink-0",
            linked ? "bg-foreground" : "bg-foreground/20",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform",
              linked ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
      </div>

      {linked ? (
        <>
          {/* One shared style editor — bound to the focused section; the store
              mirror keeps the other side in sync (presetId/mode/style only). */}
          <LetterheadSectionPanel
            design={design}
            kind={focusedSection}
            variant="style"
          />

          {/* Both text sections remain visually separate, always. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <LetterheadSectionPanel
              design={design}
              kind="header"
              variant="text"
            />
            <LetterheadSectionPanel
              design={design}
              kind="footer"
              variant="text"
            />
          </div>
        </>
      ) : (
        <LetterheadSectionPanel design={design} kind={focusedSection} />
      )}
    </div>
  );
}
