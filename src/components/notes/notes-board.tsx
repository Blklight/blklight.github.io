"use client";

import { Minus, Plus, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useNotesStore } from "@/features/notes/store";
import type { Annotation } from "@/features/notes/types";
import { cn } from "@/lib/utils";
import {
  type BoardView,
  fitView,
  initialLayout,
  toBoard,
  zoomAt,
} from "./board-math";
import { NOTE_MAX_H, NotePaper } from "./note-paper";
import type { NoteGroup } from "./notes-pocket";

const STEP = 16;
const CARD_W = 240;
const MIN_W = 160;
const MAX_W = 480;
const MIN_H = 96;
/** Moves under this many pixels count as a click (opens the note). */
const CLICK_SLOP = 4;
const NEUTRAL = "oklch(0.94 0.012 85)";

export interface NoteTab {
  id: string;
  title: string;
  color?: string;
}

type Drag =
  | { kind: "pan"; sx: number; sy: number; view: BoardView }
  | {
      kind: "move" | "size";
      id: string;
      sx: number;
      sy: number;
      x: number;
      y: number;
      w: number;
      h: number;
      moved: boolean;
    };

/** A paper's preview on the board: drag to move, click to open it. */
function BoardCard({ note, label }: { note: Annotation; label: string }) {
  return (
    <div className="flex h-full flex-col gap-1.5 overflow-hidden p-3 pt-2 text-left">
      <p className="truncate font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] opacity-70">
        {label}
      </p>
      {note.anchor && (
        <p className="line-clamp-4 shrink-0 border-current/40 border-l-2 pl-2 font-mono text-xs leading-snug">
          “{note.anchor.exact.trim()}”
        </p>
      )}
      {note.text && (
        <p className="min-h-0 overflow-hidden whitespace-pre-line font-mono text-[0.8rem] leading-snug">
          {note.text}
        </p>
      )}
    </div>
  );
}

/**
 * Every note of the scope spread over a board: drag the background to pan,
 * ctrl/⌘ + wheel (or pinch) to zoom, drag a paper to move it and its corner to
 * resize it (both saved). Clicking a paper opens it large in the middle;
 * "Nova nota" (or a double click) opens a new one, which can be filed under a
 * tab. Arrow keys move a focused paper.
 */
export function NotesBoard({
  title,
  scopeId,
  groups,
  tabs,
  labelOf,
  initialTab,
  tabOf,
  onOpenDoc,
  onClose,
}: {
  title: string;
  scopeId: string;
  /** For the first layout: a column per group. */
  groups: NoteGroup[];
  /** Tabs a loose note can be filed under. */
  tabs: NoteTab[];
  labelOf: (note: Annotation) => string;
  /** Tab whose notes show first ("" for loose notes); all when absent. */
  initialTab?: string;
  /** Tab a note is filed under ("" when loose). */
  tabOf: (note: Annotation) => string;
  /** Opens the note's document at its passage. */
  onOpenDoc?: (note: Annotation) => void;
  onClose: () => void;
}) {
  const all = useNotesStore((s) => s.notes);
  const add = useNotesStore((s) => s.add);
  const update = useNotesStore((s) => s.update);
  const remove = useNotesStore((s) => s.remove);
  const move = useNotesStore((s) => s.move);
  const resize = useNotesStore((s) => s.resize);
  const [view, setView] = useState<BoardView>({ x: 48, y: 48, scale: 1 });
  const [live, setLive] = useState<{
    id: string;
    x: number;
    y: number;
    w: number;
    h: number;
  }>();
  const [openId, setOpenId] = useState<string>();
  const drag = useRef<Drag | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const [filter, setFilter] = useState(initialTab);
  const [front, setFront] = useState<string[]>([]);
  const raise = (id: string) =>
    setFront((f) => [...f.filter((x) => x !== id), id]);
  const notes = all.filter(
    (n) =>
      n.scopeId === scopeId &&
      (filter === undefined || tabOf(n) === filter || n.id === openId),
  );
  const open = notes.find((n) => n.id === openId);
  const layout = useMemo(
    () => initialLayout(groups.filter((g) => g.notes.length > 0)),
    [groups],
  );
  const maxH = () => window.innerHeight - 80;

  const box = (n: Annotation) => {
    if (live?.id === n.id) return live;
    const p = n.board ?? layout[n.id] ?? { x: 0, y: 0 };
    return { ...p, w: n.size?.w ?? CARD_W, h: n.size?.h ?? 0 };
  };

  const close = (id: string) => {
    const note = notes.find((n) => n.id === id);
    if (note && !note.anchor && !note.text.trim()) remove(id);
    setOpenId(undefined);
  };

  const create = (sx: number, sy: number) => {
    const tab = tabs.find((t) => t.id === filter);
    setOpenId(
      add({
        scopeId,
        text: "",
        board: toBoard(view, sx, sy),
        sectionId: tab?.id,
        color: tab?.color,
      }).id,
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !openId) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, openId]);

  useEffect(() => {
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey)
        setView((v) =>
          zoomAt(
            v,
            Math.exp(-e.deltaY / 300),
            e.clientX - rect.left,
            e.clientY - rect.top,
          ),
        );
      else setView((v) => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const center = () => {
    const rect = boardRef.current?.getBoundingClientRect();
    return [(rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2] as const;
  };

  const fit = () => {
    const el = boardRef.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>("[data-note]")];
    setView(
      fitView(
        notes.map((n) => {
          const b = box(n);
          const card = cards.find((c) => c.dataset.note === n.id);
          return {
            ...b,
            w: card?.offsetWidth ?? b.w,
            h: card?.offsetHeight ?? 120,
          };
        }),
        el.clientWidth,
        el.clientHeight,
      ),
    );
  };
  // biome-ignore lint/correctness/useExhaustiveDependencies: frame the notes when the filter changes
  useEffect(() => {
    requestAnimationFrame(fit);
  }, [filter]);

  const start = (
    e: React.PointerEvent,
    kind: "move" | "size",
    note: Annotation,
    el: HTMLElement,
  ) => {
    e.stopPropagation();
    raise(note.id);
    const b = box(note);
    drag.current = {
      kind,
      id: note.id,
      sx: e.clientX,
      sy: e.clientY,
      x: b.x,
      y: b.y,
      w: el.offsetWidth,
      h: el.offsetHeight,
      moved: false,
    };
    boardRef.current?.setPointerCapture(e.pointerId);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col bg-background/75 backdrop-blur-[3px]"
    >
      <div className="flex items-center justify-between gap-4 border-foreground/20 border-b px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest">
        <div className="flex min-w-0 items-center gap-3">
          <span className="shrink-0 font-bold">{title}</span>
          <div
            role="radiogroup"
            aria-label="Filtrar por aba"
            className="flex flex-wrap gap-1 text-[0.6rem]"
          >
            {[
              { id: undefined, title: "Todas", color: undefined },
              ...tabs,
              { id: "", title: "Soltas", color: undefined },
            ].map((t) => (
              // biome-ignore lint/a11y/useSemanticElements: chips styled as tabs
              <button
                key={t.id ?? "_all"}
                type="button"
                role="radio"
                aria-checked={filter === t.id}
                onClick={() => setFilter(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2 py-0.5",
                  filter === t.id
                    ? "bg-foreground text-background"
                    : "hover:bg-foreground/10",
                )}
              >
                {t.color && (
                  <span
                    aria-hidden
                    className="size-2"
                    style={{ background: t.color }}
                  />
                )}
                {t.title}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Diminuir zoom"
            onClick={() => setView((v) => zoomAt(v, 1 / 1.2, ...center()))}
            className="p-1.5 hover:bg-foreground/10"
          >
            <Minus className="size-3.5" aria-hidden />
          </button>
          <span className="w-12 text-center tabular-nums">
            {Math.round(view.scale * 100)}%
          </span>
          <button
            type="button"
            aria-label="Aumentar zoom"
            onClick={() => setView((v) => zoomAt(v, 1.2, ...center()))}
            className="p-1.5 hover:bg-foreground/10"
          >
            <Plus className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={fit}
            className="ml-1 px-2 py-1 hover:bg-foreground/10"
          >
            Ajustar
          </button>
          <button
            type="button"
            onClick={() => {
              const [cx, cy] = center();
              create(cx - CARD_W / 2, cy - 60);
            }}
            className="ml-3 border border-foreground px-2.5 py-1 hover:bg-foreground hover:text-background"
          >
            Nova nota
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-2 flex items-center gap-2 bg-foreground px-3 py-1 text-background"
          >
            <X className="size-3.5" aria-hidden />
            Fechar <kbd className="opacity-60">Esc</kbd>
          </button>
        </div>
      </div>

      <div
        ref={boardRef}
        className="relative min-h-0 flex-1 cursor-grab touch-none overflow-hidden bg-[radial-gradient(circle,color-mix(in_oklab,currentColor_18%,transparent)_1px,transparent_1px)] active:cursor-grabbing"
        style={{
          backgroundSize: `${24 * view.scale}px ${24 * view.scale}px`,
          backgroundPosition: `${view.x}px ${view.y}px`,
        }}
        onPointerDown={(e) => {
          if (e.target !== e.currentTarget) return;
          drag.current = { kind: "pan", sx: e.clientX, sy: e.clientY, view };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d) return;
          const dx = e.clientX - d.sx;
          const dy = e.clientY - d.sy;
          if (d.kind === "pan") {
            setView({ ...d.view, x: d.view.x + dx, y: d.view.y + dy });
            return;
          }
          if (Math.abs(dx) + Math.abs(dy) > CLICK_SLOP) d.moved = true;
          if (!d.moved) return;
          const k = view.scale;
          setLive(
            d.kind === "move"
              ? { id: d.id, x: d.x + dx / k, y: d.y + dy / k, w: d.w, h: 0 }
              : {
                  id: d.id,
                  x: d.x,
                  y: d.y,
                  w: Math.min(MAX_W, Math.max(MIN_W, d.w + dx / k)),
                  h: Math.min(maxH(), Math.max(MIN_H, d.h + dy / k)),
                },
          );
        }}
        onPointerUp={() => {
          const d = drag.current;
          drag.current = null;
          if (d && d.kind !== "pan") {
            if (!d.moved && d.kind === "move") setOpenId(d.id);
            else if (live && d.kind === "move") move(live.id, live.x, live.y);
            else if (live) resize(live.id, live.w, live.h);
          }
          setLive(undefined);
        }}
        onDoubleClick={(e) => {
          if (e.target !== e.currentTarget) return;
          const rect = e.currentTarget.getBoundingClientRect();
          create(e.clientX - rect.left, e.clientY - rect.top);
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        >
          {notes.map((note) => {
            const b = box(note);
            const sized = live?.id === note.id ? live.h > 0 : !!note.size;
            return (
              <div
                key={note.id}
                className="group absolute"
                style={{
                  left: b.x,
                  top: b.y,
                  zIndex:
                    live?.id === note.id ? 999 : front.indexOf(note.id) + 1,
                }}
              >
                <button
                  type="button"
                  data-note={note.id}
                  aria-label={`Abrir nota ${labelOf(note)}`}
                  onPointerDown={(e) => start(e, "move", note, e.currentTarget)}
                  onKeyDown={(e) => {
                    const delta = {
                      ArrowLeft: [-STEP, 0],
                      ArrowRight: [STEP, 0],
                      ArrowUp: [0, -STEP],
                      ArrowDown: [0, STEP],
                    }[e.key];
                    if (!delta) return;
                    e.preventDefault();
                    move(note.id, b.x + delta[0], b.y + delta[1]);
                  }}
                  onClick={(e) => {
                    // pointer clicks open on pointerup; this is Enter/Space
                    if (e.detail === 0) setOpenId(note.id);
                  }}
                  className="background-texture block cursor-move text-[oklch(0.18_0_0)] shadow-[2px_4px_10px_rgb(0_0_0/0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  style={{
                    backgroundColor: note.color ?? NEUTRAL,
                    width: b.w,
                    height: sized ? b.h : undefined,
                    maxHeight: NOTE_MAX_H,
                  }}
                >
                  <BoardCard note={note} label={labelOf(note)} />
                </button>
                <span
                  aria-hidden
                  onPointerDown={(e) => {
                    const card = e.currentTarget
                      .previousElementSibling as HTMLElement;
                    start(e, "size", note, card);
                  }}
                  className="absolute right-0 bottom-0 size-4 cursor-se-resize opacity-0 transition-opacity group-hover:opacity-100 [background:linear-gradient(135deg,transparent_55%,rgb(0_0_0/0.35)_55%,rgb(0_0_0/0.35)_62%,transparent_62%,transparent_72%,rgb(0_0_0/0.35)_72%,rgb(0_0_0/0.35)_79%,transparent_79%)]"
                />
              </div>
            );
          })}
        </div>
        {notes.length === 0 && (
          <p className="pointer-events-none absolute inset-0 grid place-items-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Duplo clique para criar uma nota
          </p>
        )}
      </div>

      <Dialog
        open={!!open}
        onOpenChange={(o) => {
          if (!o && openId) close(openId);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="w-auto max-w-[calc(100%-2rem)] gap-3 bg-transparent p-0 ring-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">
            {open ? labelOf(open) : "Nota"}
          </DialogTitle>
          {open && (
            <>
              {!open.docId && (
                <div
                  role="radiogroup"
                  aria-label="Aba da nota"
                  className="flex flex-wrap gap-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.12em]"
                >
                  {[{ id: "", title: "Solta", color: undefined }, ...tabs].map(
                    (t) => {
                      const on = (open.sectionId ?? "") === t.id;
                      return (
                        // biome-ignore lint/a11y/useSemanticElements: chips styled as tabs
                        <button
                          key={t.id || "_"}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() =>
                            update(open.id, {
                              sectionId: t.id || undefined,
                              color: t.color,
                            })
                          }
                          className={cn(
                            "background-texture px-2.5 py-1 text-[oklch(0.18_0_0)] shadow-sm",
                            on
                              ? "outline-2 outline-offset-2 outline-[oklch(0.94_0.012_85)]"
                              : "opacity-70 hover:opacity-100",
                          )}
                          style={{ backgroundColor: t.color ?? NEUTRAL }}
                        >
                          {t.title}
                        </button>
                      );
                    },
                  )}
                </div>
              )}
              {open.docId && onOpenDoc && (
                <button
                  type="button"
                  onClick={() => onOpenDoc(open)}
                  className="self-start bg-foreground px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-widest text-background shadow-md hover:opacity-90"
                >
                  Abrir no documento →
                </button>
              )}
              <NotePaper
                key={open.id}
                note={open}
                label={labelOf(open)}
                autoFocus
                onChange={(text) => update(open.id, { text })}
                onRemove={() => {
                  remove(open.id);
                  setOpenId(undefined);
                }}
                className="min-h-64 w-[min(32rem,calc(100vw-2rem))] p-5 pt-4 text-base [&_textarea]:text-base"
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
