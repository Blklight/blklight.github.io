import type { CSSProperties } from "react";
import type { PaperColors } from "./types";

export function getPaperProseStyle(
  paperColors: PaperColors | null,
): CSSProperties | undefined {
  if (!paperColors) return undefined;

  return {
    color: paperColors.text,
    "--tw-prose-body": paperColors.text,
    "--tw-prose-headings": paperColors.text,
    "--tw-prose-lead": paperColors.muted,
    "--tw-prose-links": paperColors.text,
    "--tw-prose-bold": paperColors.text,
    "--tw-prose-counters": paperColors.muted,
    "--tw-prose-bullets": paperColors.muted,
    "--tw-prose-hr": `${paperColors.text}33`,
    "--tw-prose-quotes": paperColors.muted,
    "--tw-prose-quote-borders": paperColors.border,
    "--tw-prose-captions": paperColors.muted,
    "--tw-prose-code": paperColors.text,
    "--tw-prose-pre-code": paperColors.text,
    "--tw-prose-pre-bg": `${paperColors.text}1a`,
    "--tw-prose-th-borders": paperColors.border,
    "--tw-prose-td-borders": paperColors.border,
  } as CSSProperties;
}
