"use client";

import { X } from "lucide-react";
import type { CSSProperties, Ref } from "react";
import type { Annotation } from "@/features/notes/types";
import { cn } from "@/lib/utils";

/** A paper is never taller than the index card (the reading sidebar). */
export const NOTE_MAX_H = "calc(100dvh - 3.5625rem - 1.5rem)";

const NEUTRAL = "oklch(0.94 0.012 85)";

/** One note as a slip of paper in its tab's color: the quote, then the comment. */
export function NotePaper({
  note,
  label,
  autoFocus,
  onChange,
  onRemove,
  onQuoteClick,
  lost,
  ref,
  className,
  style,
}: {
  note: Annotation;
  /** Small caption on top (e.g. the document). */
  label?: string;
  autoFocus?: boolean;
  onChange: (text: string) => void;
  onRemove: () => void;
  onQuoteClick?: () => void;
  /** The quoted passage is no longer in the document. */
  lost?: boolean;
  ref?: Ref<HTMLElement>;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      ref={ref}
      aria-label={note.anchor ? `Nota: ${note.anchor.exact}` : "Nota"}
      className={cn(
        "background-texture flex w-60 flex-col overflow-y-auto p-3 pt-2 text-[oklch(0.18_0_0)] shadow-[2px_4px_10px_rgb(0_0_0/0.25)] [scrollbar-width:thin]",
        className,
      )}
      style={{
        backgroundColor: note.color ?? NEUTRAL,
        maxHeight: NOTE_MAX_H,
        ...style,
      }}
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] opacity-70">
        <span className="truncate">{label ?? "Nota"}</span>
        <button
          type="button"
          aria-label="Apagar nota"
          onClick={onRemove}
          className="-mr-1 p-1 hover:opacity-100 focus-visible:outline-2 focus-visible:outline-current"
        >
          <X className="size-3" aria-hidden />
        </button>
      </div>
      {note.anchor && (
        <button
          type="button"
          onClick={onQuoteClick}
          className="mt-1 line-clamp-4 border-current/40 border-l-2 pl-2 text-left font-mono text-xs leading-snug hover:border-current"
        >
          “{note.anchor.exact.trim()}”
        </button>
      )}
      {lost && (
        <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest opacity-70">
          Trecho não encontrado no texto
        </p>
      )}
      <textarea
        aria-label="Comentário"
        autoFocus={autoFocus}
        defaultValue={note.text}
        placeholder="Comentar…"
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 min-h-8 w-full resize-none bg-transparent font-mono text-[0.8rem] leading-snug outline-none [field-sizing:content] placeholder:text-current/45"
      />
    </article>
  );
}
