"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { Check, LoaderCircle, Redo, Undo } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { Fragment, type ReactNode, useEffect, useState } from "react";
import { typeTheme } from "@/components/feed/cards/card-theme";
import { cn } from "@/lib/utils";
import type { DocumentStatus } from "@/types/api.types";
import { TEXT_BLOCKS } from "./editor-toolbar";
import { TypographySelector } from "./toolbar";

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
  /** Document actions (save, publish) in the right tab; stay active in design mode. */
  actions?: ReactNode;
  /** Save state, shown as a pill in the gap between the tabs. */
  save?: { lastSaved: Date | null; isSaving: boolean };
}

const TIME = { hour: "2-digit", minute: "2-digit" } as const;

export const ACTION =
  "flex items-center gap-1.5 h-8 px-2 rounded-xs text-xs font-mono uppercase tracking-wider transition-colors hover:bg-current/10 disabled:opacity-30 disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-current [&_svg]:size-4";

/**
 * The bar is the reverse of the theme (ink on light and book, light on dark),
 * with the Blklight letterhead grain, which is built for that inverted block.
 */
const INK =
  "relative bg-foreground text-background letterhead-grain-noise letterhead-grain-overlay";

const DIP_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 56 48' preserveAspectRatio='none'><path d='M0 0C28 0 28 32 56 32V48H0Z'/></svg>",
)}")`;

/**
 * S-curve joining a raised tab to the lower middle edge: the tabs' grained
 * surface cut by a mask, so the joins match. 48px tall (32px wide below sm,
 * 56px above; the mask stretches), so the 32px drop matches the h-12 tabs and
 * the h-4 middle exactly.
 */
const Dip = ({ flip = false }: { flip?: boolean }) => (
  <div
    aria-hidden
    className={cn("h-12 w-8 shrink-0 sm:w-14", INK, flip && "-scale-x-100")}
    style={{
      maskImage: DIP_MASK,
      WebkitMaskImage: DIP_MASK,
      maskSize: "100% 100%",
      WebkitMaskSize: "100% 100%",
    }}
  />
);

/**
 * Save feedback in the empty gap between the tabs: "Salvando" (blue, spinner),
 * then "Salvo às 14:32" (ultraviolet), rising from below and fading out. The
 * 32px slot clips it, so it never spills past the dip.
 */
function SavePill({
  lastSaved,
  isSaving,
}: {
  lastSaved: Date | null;
  isSaving: boolean;
}) {
  const t = useTranslations("editor");
  const format = useFormatter();
  const [shown, setShown] = useState<"saving" | "saved" | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (isSaving) {
      setShown("saving");
      return;
    }
    if (!lastSaved) return;
    setShown("saved");
    const timer = setTimeout(() => setShown(null), 2500);
    return () => clearTimeout(timer);
  }, [isSaving, lastSaved]);

  return (
    <div
      aria-live="polite"
      className="flex h-8 items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {shown && (
          <motion.span
            key={shown}
            initial={{ y: reduce ? 0 : 28, opacity: reduce ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className={cn(
              "flex h-6 items-center gap-1.5 rounded-full px-2.5 font-mono text-[0.7rem] uppercase tracking-wider text-white shadow-[0_4px_10px_-4px_rgb(0_0_0/0.4)]",
              shown === "saving" ? "bg-bluesky-700" : "bg-blklight-500",
            )}
          >
            {shown === "saving" ? (
              <>
                <LoaderCircle aria-hidden className="size-3 animate-spin" />
                {t("savingPill")}
              </>
            ) : (
              <>
                <Check aria-hidden className="size-3" />
                {lastSaved &&
                  t("savedAt", { time: format.dateTime(lastSaved, TIME) })}
              </>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const Divider = () => (
  <span aria-hidden className="mx-1 h-4 w-px shrink-0 bg-current opacity-20" />
);

/**
 * Bar glued to the top of the paper; it sticks under the navbar while writing.
 * Its top edge rises into a tab at each end: type and status on the left; save
 * state and the document actions (plus the side tabs on narrow screens) on
 * the right. The bar holds
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
  const t = useTranslations("editor");
  const tb = useTranslations("blocks");
  const tStatus = useTranslations("documentStatus");
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
            "flex h-12 shrink-0 items-start gap-1.5 pt-2 rounded-tl-xl pr-1 pl-2.5",
            INK,
          )}
        >
          <span className={cn(chip, typeTheme(type).solid)}>{typeLabel}</span>
          <span
            className={cn(
              chip,
              // Below sm the tabs run out of room; the status shows in the publish panel.
              "hidden border border-current/25 sm:flex",
              status === "published" ? "font-bold" : "opacity-80",
            )}
          >
            {tStatus(status)}
          </span>
        </div>
        <Dip />
        <div className="flex h-12 min-w-0 flex-1 flex-col justify-end">
          {save && <SavePill {...save} />}
          <div className={cn("h-4", INK)} />
        </div>
        <Dip flip />
        <div
          className={cn(
            "flex h-12 shrink-0 items-start gap-1 pt-1.5 rounded-tr-xl pr-2.5 pl-1",
            INK,
          )}
        >
          {actions}
          {extraTabs}
        </div>
      </div>
      <div
        className={cn(
          "flex flex-wrap items-center gap-x-1 px-2 pb-1 shadow-[0_12px_24px_-10px_rgb(0_0_0/0.6)]",
          INK,
        )}
      >
        <div
          role="toolbar"
          aria-label={t("formatting")}
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
            <Fragment key={block.id}>
              {i === 4 && <Divider />}
              <button
                type="button"
                title={tb(`items.${block.id}`)}
                aria-label={tb(`items.${block.id}`)}
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
              aria-label={t("undo")}
              title={t("undo")}
              disabled={!state.undo}
              onClick={() => editor.chain().focus().undo().run()}
              className={ACTION}
            >
              <Undo />
            </button>
            <button
              type="button"
              aria-label={t("redo")}
              title={t("redo")}
              disabled={!state.redo}
              onClick={() => editor.chain().focus().redo().run()}
              className={ACTION}
            >
              <Redo />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
