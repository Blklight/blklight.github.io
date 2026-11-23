"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { Redo, Undo } from "lucide-react";
import { Fragment, type ReactNode } from "react";
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
  status: DocumentStatus;
  type: string;
  typeLabel: string;
  /** Extra tabs at the right end of the tab row (side panel on narrow screens). */
  extraTabs?: ReactNode;
  /** Design mode: the text is read-only, so the formatting tools are off. */
  locked?: boolean;
  /** Document actions (save, publish) at the end of the bar; stay active in design mode. */
  actions?: ReactNode;
  /** Save state, shown next to the status. */
  save?: { lastSaved: Date | null; isSaving: boolean; dirty: boolean };
}

const TIME = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
});

function saveLabel(save: NonNullable<DocumentPaperHeaderProps["save"]>) {
  if (save.isSaving) return "Salvando…";
  if (save.dirty) return "Não salvo";
  return save.lastSaved ? `Salvo às ${TIME.format(save.lastSaved)}` : null;
}

export const ACTION =
  "flex items-center gap-1.5 h-8 px-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors hover:bg-current/10 disabled:opacity-30 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-current [&_svg]:size-4";

/**
 * The bar is the reverse of the theme (ink on light and book, light on dark),
 * with the Blklight letterhead grain, which is built for that inverted block.
 */
const INK =
  "relative bg-foreground text-background letterhead-grain-noise letterhead-grain-overlay";

const DIP_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 48'><path d='M0 0C28 0 28 32 56 32V48H0Z'/></svg>",
)}")`;

/**
 * S-curve joining a raised tab to the lower middle edge: the tabs' grained
 * surface cut by a mask, so the joins match. Fixed 56x48 box, so the 32px
 * drop matches the h-12 tabs and the h-4 middle exactly.
 */
const Dip = ({ flip = false }: { flip?: boolean }) => (
  <div
    aria-hidden
    className={cn("h-12 w-14 shrink-0", INK, flip && "-scale-x-100")}
    style={{
      maskImage: DIP_MASK,
      WebkitMaskImage: DIP_MASK,
      maskSize: "100% 100%",
      WebkitMaskSize: "100% 100%",
    }}
  />
);

const Divider = () => (
  <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-current opacity-20" />
);

/**
 * Bar glued to the top of the paper; it sticks under the navbar while writing.
 * Its top edge rises into a tab at each end: the type on the left; status and
 * save state (plus the side tabs on narrow screens) on the right. The bar holds
 * the font and the text blocks (media goes through the "+" on an empty line).
 */
export function DocumentPaperHeader({
  editor,
  typography,
  onTypographyChange,
  status,
  type,
  typeLabel,
  extraTabs,
  locked = false,
  save,
  actions,
}: DocumentPaperHeaderProps) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      undo: e.can().undo(),
      redo: e.can().redo(),
      active: TEXT_BLOCKS.map((block) => block.isActive?.(e) ?? false),
    }),
  });
  const chip =
    "flex h-6 items-center rounded-full px-2.5 font-mono text-[0.7rem] uppercase tracking-wider";

  return (
    <div className="sticky top-12 lg:top-[3.6rem] z-30">
      {/* Raised tabs at both ends, the edge dipping between them (one silhouette). */}
      <div className="flex items-end">
        <div
          className={cn(
            "flex h-12 shrink-0 items-start pt-2 rounded-tl-3xl pr-1 pl-5",
            INK,
          )}
        >
          <span className={cn(chip, typeTheme(type).solid)}>{typeLabel}</span>
        </div>
        <Dip />
        <div className={cn("h-4 min-w-0 flex-1", INK)} />
        <Dip flip />
        <div
          className={cn(
            "flex h-12 shrink-0 items-start pt-2 gap-2 rounded-tr-3xl pr-5 pl-1",
            INK,
          )}
        >
          {save && saveLabel(save) && (
            <span
              aria-live="polite"
              className={cn(
                "hidden font-mono text-[0.7rem] uppercase tracking-wider sm:inline",
                save.dirty && !save.isSaving ? "opacity-80" : "opacity-55",
              )}
            >
              {saveLabel(save)}
            </span>
          )}
          <span
            className={cn(
              chip,
              "border border-current/25",
              status === "published" ? "font-bold" : "opacity-80",
            )}
          >
            {STATUS_LABEL[status]}
          </span>
          {extraTabs}
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-1 px-2 pb-1 shadow-[0_6px_16px_-10px_rgb(0_0_0/0.45)]",
          INK,
        )}
      >
        <div
          role="toolbar"
          aria-label="Formatação"
          inert={locked}
          className={cn(
            "relative z-1 flex min-w-0 flex-1 flex-wrap items-center gap-0.5",
            locked && "*:opacity-40",
          )}
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
                  state.active[i] && "bg-current/20 hover:bg-current/20",
                )}
              >
                {block.icon}
              </button>
            </Fragment>
          ))}
          <div className="ml-auto flex items-center gap-0.5">
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
          </div>
        </div>
        {actions && (
          <div className="relative z-1 flex items-center gap-1">
            <Divider />
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
