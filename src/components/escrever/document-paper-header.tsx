"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { Redo, Undo } from "lucide-react";
import { Fragment, type ReactNode } from "react";
import type { PaperColors } from "@/components/document/types";
import { typeTheme } from "@/components/feed/cards/card-theme";
import { cn } from "@/lib/utils";
import type { DocumentStatus } from "@/types/api.types";
import { TEXT_BLOCKS } from "./editor-toolbar";
import { TypographySelector } from "./toolbar";

const STATUS_LABEL: Record<DocumentStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

export interface DocumentPaperHeaderProps {
  editor: Editor;
  typography: "sans" | "serif" | "mono";
  onTypographyChange: (typography: "sans" | "serif" | "mono") => void;
  paperColors: PaperColors | null;
  status: DocumentStatus;
  type: string;
  typeLabel: string;
  /** Extra tabs at the right end of the tab row (side panel on narrow screens). */
  extraTabs?: ReactNode;
  /** Design mode: the text is read-only, so the formatting tools are off. */
  locked?: boolean;
}

const ACTION =
  "flex items-center gap-1.5 h-8 px-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-current [&_svg]:size-4";

/**
 * S-curve joining a raised tab to the lower middle edge. Fixed 32x44 box, so
 * the 12px drop matches the h-11 tabs and the h-8 middle exactly.
 */
const Dip = ({
  fill,
  stroke,
  flip = false,
}: {
  fill: string;
  stroke: string;
  flip?: boolean;
}) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 32 44"
    className={cn("h-11 w-8 shrink-0", flip && "-scale-x-100")}
  >
    <path d="M0 0C16 0 16 12 32 12V44H0Z" fill={fill} />
    <path d="M0 0.5C16 0.5 16 12.5 32 12.5" fill="none" stroke={stroke} />
  </svg>
);

const Divider = () => (
  <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-current opacity-20" />
);

/**
 * Bar glued to the top of the paper; it sticks under the navbar while writing.
 * Its top edge rises into a tab at each end: type and status on the left,
 * undo/redo (and the side tabs on narrow screens) on the right. The bar holds
 * the font and the text blocks (media goes through the "+" on an empty line).
 */
export function DocumentPaperHeader({
  editor,
  typography,
  onTypographyChange,
  paperColors,
  status,
  type,
  typeLabel,
  extraTabs,
  locked = false,
}: DocumentPaperHeaderProps) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      undo: e.can().undo(),
      redo: e.can().redo(),
      active: TEXT_BLOCKS.map((block) => block.isActive?.(e) ?? false),
    }),
  });
  const border = paperColors?.border || "var(--foreground)";
  const fill = paperColors?.bg || "var(--background)";
  const surface = {
    borderColor: border,
    backgroundColor: paperColors?.bg || undefined,
    color: paperColors?.text || undefined,
  };
  const chip =
    "flex h-6 items-center rounded-full px-2.5 font-mono text-[0.7rem] uppercase tracking-wider";

  return (
    <div className="sticky top-12 lg:top-[3.6rem] z-30">
      {/* Raised tabs at both ends, the edge dipping between them (one silhouette). */}
      <div className="flex items-end">
        <div
          className="flex h-11 shrink-0 items-center gap-1.5 rounded-tl-2xl border-t border-l bg-background pr-1 pl-3"
          style={surface}
        >
          <span className={cn(chip, typeTheme(type).solid)}>{typeLabel}</span>
          <span
            className={cn(
              chip,
              "border border-current/25",
              status === "published" ? "font-bold" : "opacity-80",
            )}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
        <Dip fill={fill} stroke={border} />
        <div
          className="h-8 min-w-0 flex-1 border-t bg-background"
          style={surface}
        />
        <Dip fill={fill} stroke={border} flip />
        <div
          className="flex h-11 shrink-0 items-center gap-0.5 rounded-tr-2xl border-t border-r bg-background pr-2 pl-1"
          style={surface}
        >
          {extraTabs}
          <button
            type="button"
            aria-label="Desfazer"
            title="Desfazer"
            disabled={!state.undo || locked}
            onClick={() => editor.chain().focus().undo().run()}
            className={ACTION}
          >
            <Undo />
          </button>
          <button
            type="button"
            aria-label="Refazer"
            title="Refazer"
            disabled={!state.redo || locked}
            onClick={() => editor.chain().focus().redo().run()}
            className={ACTION}
          >
            <Redo />
          </button>
        </div>
      </div>
      <div
        role="toolbar"
        aria-label="Formatação"
        inert={locked}
        className={cn(
          "flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-x border-b bg-background shadow-[0_6px_16px_-10px_rgb(0_0_0/0.35)] transition-[color,background-color,opacity] duration-300",
          locked && "*:opacity-40",
        )}
        style={surface}
      >
        <TypographySelector
          value={typography}
          onChange={(value) =>
            onTypographyChange(value as "sans" | "serif" | "mono")
          }
        />
        <Divider />
        {TEXT_BLOCKS.map((block, i) => (
          <Fragment key={block.label}>
            {i === 4 && <Divider />}
            <button
              type="button"
              title={block.label}
              aria-label={block.label}
              aria-pressed={state.active[i]}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => block.run(editor)}
              className={cn(
                ACTION,
                "px-1.5",
                state.active[i] &&
                  "bg-current/15 hover:bg-current/15 dark:hover:bg-current/15",
              )}
            >
              {block.icon}
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
