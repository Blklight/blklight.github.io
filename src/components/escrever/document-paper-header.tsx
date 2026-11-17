"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { Palette, Redo, Undo } from "lucide-react";
import type { ReactNode } from "react";
import type { PaperColors } from "@/components/document/types";
import { typeTheme } from "@/components/feed/cards/card-theme";
import { cn } from "@/lib/utils";
import type { DocumentStatus } from "@/types/api.types";

const STATUS_LABEL: Record<DocumentStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

export interface DocumentPaperHeaderProps {
  editor: Editor;
  paperColors: PaperColors | null;
  status: DocumentStatus;
  type: string;
  typeLabel: string;
  onOpenTemplates?: () => void;
  designTrigger?: ReactNode;
}

const ACTION =
  "flex items-center gap-1.5 h-8 px-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-current [&_svg]:size-3.5";

/** Bar glued to the top of the paper; it sticks under the navbar while writing. */
export function DocumentPaperHeader({
  editor,
  paperColors,
  status,
  type,
  typeLabel,
  onOpenTemplates,
  designTrigger,
}: DocumentPaperHeaderProps) {
  const history = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      undo: e.can().undo(),
      redo: e.can().redo(),
    }),
  });
  const border = paperColors?.border || "hsl(var(--border))";

  return (
    <div
      className="sticky top-12 lg:top-[3.6rem] z-30 flex items-center gap-2 px-3 py-1.5 border-x border-t bg-background transition-colors duration-300"
      style={{
        borderColor: border,
        backgroundColor: paperColors?.bg || undefined,
        color: paperColors?.text || undefined,
      }}
    >
      <span
        className={cn(
          "px-2 py-0.5 rounded-xs font-mono text-xs uppercase tracking-wider",
          typeTheme(type).solid,
        )}
      >
        {typeLabel}
      </span>
      <span
        className={cn(
          "font-mono text-xs uppercase tracking-wider",
          status === "published" ? "font-bold" : "opacity-60",
        )}
      >
        {STATUS_LABEL[status]}
      </span>

      <span aria-hidden className="mx-1 h-4 w-px bg-current opacity-20" />
      <button
        type="button"
        aria-label="Desfazer"
        title="Desfazer"
        disabled={!history.undo}
        onClick={() => editor.chain().focus().undo().run()}
        className={ACTION}
      >
        <Undo />
      </button>
      <button
        type="button"
        aria-label="Refazer"
        title="Refazer"
        disabled={!history.redo}
        onClick={() => editor.chain().focus().redo().run()}
        className={ACTION}
      >
        <Redo />
      </button>

      <div className="ml-auto flex items-center gap-1">
        {onOpenTemplates && (
          <button type="button" onClick={onOpenTemplates} className={ACTION}>
            <Palette />
            Temas
          </button>
        )}
        {designTrigger}
      </div>
    </div>
  );
}
