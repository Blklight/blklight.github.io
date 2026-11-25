"use client";

import { NotebookPen } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { quoteFromRange, rangeFromQuote } from "@/features/notes/anchor";
import { useNotesStore } from "@/features/notes/store";
import type { Annotation } from "@/features/notes/types";
import { NotePaper } from "./note-paper";
import { useContentVersion, useTextHighlights } from "./use-text-highlights";

const GAP = 8;

function scrollToQuote(root: HTMLElement | null, note: Annotation) {
  const range = root && note.anchor ? rangeFromQuote(root, note.anchor) : null;
  if (!range) return;
  const top = range.getBoundingClientRect().top + window.scrollY - 160;
  window.scrollTo({ top, behavior: "smooth" });
}

/**
 * Notes taken while reading a document: select text to mark it (in `color`)
 * and optionally comment. Each note is a paper in the margin, level with its
 * passage and pushed down when they would overlap; on small screens they are
 * listed in a drawer from the right.
 */
export function ReadingNotes({
  root,
  scopeId,
  docId,
  color,
  label,
}: {
  root: HTMLElement | null;
  scopeId: string;
  docId: string;
  color?: string;
  label?: string;
}) {
  const all = useNotesStore((s) => s.notes);
  const add = useNotesStore((s) => s.add);
  const update = useNotesStore((s) => s.update);
  const remove = useNotesStore((s) => s.remove);
  const notes = useMemo(
    () => all.filter((n) => n.scopeId === scopeId && n.docId === docId),
    [all, scopeId, docId],
  );
  const version = useContentVersion(root);
  useTextHighlights(root, notes, version);

  const [menu, setMenu] = useState<{ x: number; y: number; range: Range }>();
  const [fresh, setFresh] = useState<string>();
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!root) return;
    const onChange = () => {
      const sel = document.getSelection();
      if (!sel || sel.isCollapsed || !root.contains(sel.anchorNode)) {
        setMenu(undefined);
        return;
      }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setMenu({
        x: rect.left + rect.width / 2,
        y: rect.top,
        range: range.cloneRange(),
      });
    };
    const hide = () => setMenu(undefined);
    document.addEventListener("selectionchange", onChange);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      document.removeEventListener("selectionchange", onChange);
      window.removeEventListener("scroll", hide);
    };
  }, [root]);

  const create = (comment: boolean) => {
    if (!root || !menu) return;
    const anchor = quoteFromRange(root, menu.range);
    if (!anchor) return;
    const note = add({ scopeId, docId, anchor, color, text: "" });
    if (comment) {
      setFresh(note.id);
      setDrawer(window.matchMedia("(max-width: 1023px)").matches);
    }
    document.getSelection()?.removeAllRanges();
    setMenu(undefined);
  };

  const columnRef = useRef<HTMLDivElement>(null);
  const papers = useRef(new Map<string, HTMLElement>());
  const [tops, setTops] = useState<Record<string, number>>({});
  const [size, setSize] = useState(0);

  useEffect(() => {
    if (!root) return;
    const observer = new ResizeObserver(() => setSize(root.offsetWidth));
    observer.observe(root);
    return () => observer.disconnect();
  }, [root]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-lay out when the text loads or reflows
  useLayoutEffect(() => {
    const column = columnRef.current;
    if (!root || !column) return;
    const base = column.getBoundingClientRect().top;
    const wanted = notes
      .map((n) => {
        const range = n.anchor ? rangeFromQuote(root, n.anchor) : null;
        return {
          id: n.id,
          want: range ? range.getBoundingClientRect().top - base : Infinity,
        };
      })
      .sort((a, b) => a.want - b.want);
    const next: Record<string, number> = {};
    let floor = 0;
    for (const { id, want } of wanted) {
      const top = Math.max(Number.isFinite(want) ? want : floor, floor);
      next[id] = top;
      floor = top + (papers.current.get(id)?.offsetHeight ?? 120) + GAP;
    }
    setTops(next);
  }, [root, notes, version, size]);

  const paper = (n: Annotation, inDrawer: boolean) => (
    <NotePaper
      key={n.id}
      note={n}
      label={label}
      autoFocus={n.id === fresh}
      onChange={(text) => update(n.id, { text })}
      onRemove={() => remove(n.id)}
      onQuoteClick={() => {
        setDrawer(false);
        scrollToQuote(root, n);
      }}
      ref={
        inDrawer
          ? undefined
          : (el) => {
              if (el) papers.current.set(n.id, el);
              else papers.current.delete(n.id);
            }
      }
      className={
        inDrawer
          ? "w-full"
          : "absolute left-0 max-w-full transition-[top] duration-300 motion-reduce:transition-none"
      }
      style={
        inDrawer
          ? undefined
          : {
              top: tops[n.id] ?? 0,
              opacity: n.id in tops ? undefined : 0,
            }
      }
    />
  );

  return (
    <>
      <div ref={columnRef} className="relative hidden h-full lg:block">
        {notes.map((n) => paper(n, false))}
      </div>

      <button
        type="button"
        onClick={() => setDrawer(true)}
        className="fixed right-4 bottom-16 z-30 flex items-center gap-2 border border-foreground bg-background px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest shadow-md lg:hidden"
      >
        <NotebookPen className="size-3.5" aria-hidden />
        Notas {notes.length > 0 && `(${notes.length})`}
      </button>
      <Sheet open={drawer} onOpenChange={setDrawer}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="gap-3 overflow-y-auto border-0 bg-transparent p-2 pt-[calc(3.5625rem+0.5rem)] shadow-none data-[side=right]:w-72 data-[side=right]:data-ending-style:translate-x-full data-[side=right]:data-starting-style:translate-x-full"
        >
          <SheetTitle className="sr-only">Notas do documento</SheetTitle>
          {notes.length === 0 && (
            <p className="bg-background p-3 font-mono text-xs uppercase tracking-widest">
              Selecione um trecho para marcar.
            </p>
          )}
          {notes.map((n) => paper(n, true))}
        </SheetContent>
      </Sheet>

      {menu && (
        <div
          role="toolbar"
          aria-label="Anotar trecho"
          className="fixed z-50 flex -translate-x-1/2 -translate-y-[calc(100%+8px)] bg-foreground font-mono text-[0.68rem] uppercase tracking-widest text-background shadow-lg"
          style={{ left: menu.x, top: menu.y }}
        >
          {(
            [
              ["Marcar", false],
              ["Comentar", true],
            ] as const
          ).map(([text, comment]) => (
            <button
              key={text}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => create(comment)}
              className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-background/15 focus-visible:outline-2 focus-visible:outline-current"
            >
              {!comment && (
                <span
                  aria-hidden
                  className="size-2.5"
                  style={{ background: color }}
                />
              )}
              {text}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
