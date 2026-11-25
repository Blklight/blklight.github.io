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

/** The same paper, header and footer as a published document with the default design. */
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
      className={cn("text-foreground", className)}
      contentClassName={cn("flex h-full flex-col", contentClassName)}
    >
      <HeaderBlklight
        lines={resolveLetterheadLines(BLKLIGHT_HEADER_LINES, context)}
      />
      {children}
      <FooterBlklight
        lines={resolveLetterheadLines(BLKLIGHT_FOOTER_LINES, context)}
        className="mt-auto"
      />
    </PaperSurface>
  );
}
