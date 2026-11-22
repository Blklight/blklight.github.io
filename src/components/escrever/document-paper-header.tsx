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
  onOpenTemplates?: () => void;
  designTrigger?: ReactNode;
}

const ACTION =
  "flex items-center gap-1.5 h-8 px-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-current [&_svg]:size-4";

const Divider = () => (
  <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-current opacity-20" />
);

/**
 * Bar glued to the top of the paper; it sticks under the navbar while writing.
 * Type and status are folder tabs on top of it; the bar holds the font and the
 * text blocks (media goes through the "+" on an empty line).
 */
export function DocumentPaperHeader({
  editor,
  typography,
  onTypographyChange,
  paperColors,
  status,
  type,
  typeLabel,
  onOpenTemplates,
  designTrigger,
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
  const tab =
    "-mb-px px-3 pt-1.5 pb-1 rounded-t-xs border-x border-t font-mono text-xs uppercase tracking-wider";

  return (
    <div className="sticky top-12 lg:top-[3.6rem] z-30">
      <div className="flex items-end gap-1 px-3">
        <span
          className={cn(tab, typeTheme(type).solid)}
          style={{ borderColor: border }}
        >
          {typeLabel}
        </span>
        <span
          className={cn(
            tab,
            "bg-background",
            status === "published" ? "font-bold" : "opacity-80",
          )}
          style={{
            borderColor: border,
            backgroundColor: paperColors?.bg || undefined,
            color: paperColors?.text || undefined,
          }}
        >
          {STATUS_LABEL[status]}
        </span>
      </div>
      <div
        role="toolbar"
        aria-label="Formatação"
        className="flex items-center gap-0.5 overflow-x-auto px-2 py-1.5 border-x border-t bg-background shadow-[0_6px_16px_-10px_rgb(0_0_0/0.35)] transition-colors duration-300"
        style={{
          borderColor: border,
          backgroundColor: paperColors?.bg || undefined,
          color: paperColors?.text || undefined,
        }}
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
        <Divider />
        <button
          type="button"
          aria-label="Desfazer"
          title="Desfazer"
          disabled={!state.undo}
          onClick={() => editor.chain().focus().undo().run()}
          className={ACTION}
        >
          <Undo />
        </button>
        <button
          type="button"
          aria-label="Refazer"
          title="Refazer"
          disabled={!state.redo}
          onClick={() => editor.chain().focus().redo().run()}
          className={ACTION}
        >
          <Redo />
        </button>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          {onOpenTemplates && (
            <button type="button" onClick={onOpenTemplates} className={ACTION}>
              Temas
            </button>
          )}
          {designTrigger}
        </div>
      </div>
    </div>
  );
}
