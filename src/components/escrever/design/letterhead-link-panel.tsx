"use client";

import type { DesignContext } from "./layout";
import { LetterheadSectionPanel } from "./letterhead-section-panel";

/**
 * Header and footer editor. They always share one model or custom style
 * (edited once at the top); each side keeps its own switch and text.
 */
export function LetterheadLinkPanel({
  design,
}: {
  design: DesignContext["design"];
}) {
  return (
    <div className="flex flex-col gap-6">
      <LetterheadSectionPanel design={design} kind="header" variant="style" />
      <div className="flex flex-col gap-6 border-t border-border pt-6">
        <LetterheadSectionPanel design={design} kind="header" variant="text" />
      </div>
      <div className="flex flex-col gap-6 border-t border-border pt-6">
        <LetterheadSectionPanel design={design} kind="footer" variant="text" />
      </div>
    </div>
  );
}
