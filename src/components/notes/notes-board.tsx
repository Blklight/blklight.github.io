"use client";

import { Minus, Plus, X } from "lucide-react";
import {
  type PointerEvent as ReactPointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNotesStore } from "@/features/notes/store";
import type { Annotation } from "@/features/notes/types";
import { type BoardView, initialLayout, toBoard, zoomAt } from "./board-math";
import { NotePaper } from "./note-paper";
import type { NoteGroup } from "./notes-pocket";

const STEP = 16;

type Drag =
  | { kind: "pan"; sx: number; sy: number; view: BoardView }
  | { kind: "note"; id: string; sx: number; sy: number; x: number; y: number };

/**
 * Every note of the scope spread over a board: drag the background to pan,
 * ctrl/⌘ + wheel (or pinch) to zoom, drag a paper to move it (saved), double
 * click an empty spot for a loose note. Arrow keys move a focused paper.
 */
export function NotesBoard({
  title,
  scopeId,
  groups,
  onClose,
}: {
  title: string;
  scopeId: string;
  groups: NoteGroup[];
  onClose: () => void;
}) {
  const add = useNotesStore((s) => s.add);
  const update = useNotesStore((s) => s.update);
  const remove = useNotesStore((s) => s.remove);
  const move = useNotesStore((s) => s.move);
  const [view, setView] = useState<BoardView>({ x: 48, y: 48, scale: 1 });
  const [live, setLive] = useState<{ id: string; x: number; y: number }>();
  const [fresh, setFresh] = useState<string>();
  const drag = useRef<Drag | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const notes = groups.flatMap((g) =>
    g.notes.map((n) => ({ note: n, label: g.label })),
  );
  const layout = useMemo(
    () => initialLayout(groups.filter((g) => g.notes.length > 0)),
    [groups],
  );
  const at = (n: Annotation) =>
    live?.id === n.id ? live : (n.board ?? layout[n.id] ?? { x: 0, y: 0 });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

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

  const zoomBy = (factor: number) => {
    const rect = boardRef.current?.getBoundingClientRect();
    setView((v) =>
      zoomAt(v, factor, (rect?.width ?? 0) / 2, (rect?.height ?? 0) / 2),
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col bg-background/75 backdrop-blur-[3px]"
    >
      <div className="flex items-center justify-between gap-4 border-foreground/20 border-b px-4 py-2 font-mono text-[0.68rem] uppercase tracking-widest">
        <span className="font-bold">{title}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Diminuir zoom"
            onClick={() => zoomBy(1 / 1.2)}
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
            onClick={() => zoomBy(1.2)}
            className="p-1.5 hover:bg-foreground/10"
          >
            <Plus className="size-3.5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => {
              const rect = boardRef.current?.getBoundingClientRect();
              const p = toBoard(
                view,
                (rect?.width ?? 0) / 2 - 120,
                (rect?.height ?? 0) / 2 - 60,
              );
              setFresh(add({ scopeId, text: "", board: p }).id);
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
          if (d.kind === "pan")
            setView({ ...d.view, x: d.view.x + dx, y: d.view.y + dy });
          else
            setLive({
              id: d.id,
              x: d.x + dx / view.scale,
              y: d.y + dy / view.scale,
            });
        }}
        onPointerUp={() => {
          const d = drag.current;
          drag.current = null;
          if (d?.kind === "note" && live) move(live.id, live.x, live.y);
          setLive(undefined);
        }}
        onDoubleClick={(e) => {
          if (e.target !== e.currentTarget) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const p = toBoard(view, e.clientX - rect.left, e.clientY - rect.top);
          setFresh(add({ scopeId, text: "", board: p }).id);
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        >
          {notes.map(({ note, label }) => {
            const p = at(note);
            const grab = (e: ReactPointerEvent) => {
              if (
                (e.target as HTMLElement).closest(
                  "textarea, button:not([data-grip])",
                )
              )
                return;
              e.stopPropagation();
              drag.current = {
                kind: "note",
                id: note.id,
                sx: e.clientX,
                sy: e.clientY,
                x: p.x,
                y: p.y,
              };
              boardRef.current?.setPointerCapture(e.pointerId);
            };
            return (
              <div
                key={note.id}
                className="absolute cursor-move"
                style={{
                  left: p.x,
                  top: p.y,
                  zIndex: live?.id === note.id ? 10 : undefined,
                }}
                onPointerDown={grab}
              >
                <button
                  type="button"
                  data-grip
                  aria-label={`Mover nota ${label} (setas)`}
                  onKeyDown={(e) => {
                    const delta = {
                      ArrowLeft: [-STEP, 0],
                      ArrowRight: [STEP, 0],
                      ArrowUp: [0, -STEP],
                      ArrowDown: [0, STEP],
                    }[e.key];
                    if (!delta) return;
                    e.preventDefault();
                    move(note.id, p.x + delta[0], p.y + delta[1]);
                  }}
                  className="absolute -top-3 left-1/2 z-10 h-3 w-12 -translate-x-1/2 cursor-move rounded-full bg-foreground/30 hover:bg-foreground/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                />
                <NotePaper
                  note={note}
                  label={label}
                  autoFocus={note.id === fresh}
                  onChange={(text) => update(note.id, { text })}
                  onRemove={() => remove(note.id)}
                  className="rotate-[-0.5deg]"
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
    </div>
  );
}
