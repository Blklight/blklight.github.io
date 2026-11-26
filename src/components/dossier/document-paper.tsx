import type { ReactNode } from "react";
import { FooterBlklight } from "@/components/document/footer-presets";
import { HeaderBlklight } from "@/components/document/header-presets";
import {
  BLKLIGHT_FOOTER_LINES,
  BLKLIGHT_HEADER_LINES,
} from "@/features/documents/design/blklight-letterhead";
import {
  type LetterheadTextContext,
  resolveLetterheadLines,
} from "@/features/documents/design/letterhead-text";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import { cn } from "@/lib/utils";

const NO_TEXTURE = { type: "none", opacity: 0 };
export const PAPER_GRAINS = ["background-texture", "texture-item"];

/**
 * The same paper, header and footer (and spacing) as the public document page
 * with the default design; pass contentClassName="p-8 md:p-10" to match it.
 */
export function DocumentPaper({
  context,
  className,
  contentClassName,
  as,
  children,
}: {
  context: LetterheadTextContext;
  className?: string;
  contentClassName?: string;
  as?: "div" | "article";
  children: ReactNode;
}) {
  return (
    <PaperSurface
      as={as}
      paperColors={null}
      paperTexture={NO_TEXTURE}
      textureStyle={{}}
      grains={PAPER_GRAINS}
      className={cn("text-foreground dark:border-foreground/15", className)}
      contentClassName={cn("flex h-full flex-col", contentClassName)}
    >
      <HeaderBlklight
        lines={resolveLetterheadLines(BLKLIGHT_HEADER_LINES, context)}
        className="mb-4"
      />
      {children}
      <div className="mt-auto pt-4">
        <FooterBlklight
          lines={resolveLetterheadLines(BLKLIGHT_FOOTER_LINES, context)}
        />
      </div>
    </PaperSurface>
  );
}
