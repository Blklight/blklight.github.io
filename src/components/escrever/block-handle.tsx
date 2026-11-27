"use client";

import { NodeSelection } from "@tiptap/pm/state";
import type { Editor } from "@tiptap/react";
import { Copy, CopyPlus, GripVertical, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TEXT_BLOCKS } from "./editor-toolbar";

interface Hovered {
  /** Position before the top-level block. */
  pos: number;
  top: number;
}

const ITEM =
  "flex w-full items-center gap-3 rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-secondary focus-visible:bg-secondary [&_svg]:size-4 [&_svg]:text-muted-foreground";

/**
 * Grip on the left of the hovered block. Drag it to move the block; click it
 * for a menu: turn into, duplicate, copy, delete. Rendered inside the editor
 * wrapper (position: relative), like the "+".
 */
export function BlockHandle({ editor }: { editor: Editor }) {
  const t = useTranslations("blocks");
  const [hovered, setHovered] = useState<Hovered | null>(null);
  const [menu, setMenu] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dom = editor.view.dom;
    const wrapper = dom.closest<HTMLElement>(".editor-wrapper");
    if (!wrapper) return;
    const onMove = (event: MouseEvent) => {
      if (menu || rootRef.current?.contains(event.target as Node)) return;
      const box = dom.getBoundingClientRect();
      const found = editor.view.posAtCoords({
        left: box.left + 8,
        top: event.clientY,
      });
      if (!found) return;
      const $pos = editor.state.doc.resolve(found.pos);
      if ($pos.depth < 1) return;
      const pos = $pos.before(1);
      const node = editor.state.doc.nodeAt(pos);
      const el = editor.view.nodeDOM(pos);
      // Empty lines belong to the "+".
      if (!node || node.content.size === 0 || !(el instanceof HTMLElement)) {
        setHovered(null);
        return;
      }
      const parent = wrapper.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const lineHeight =
        Number.parseFloat(getComputedStyle(el).lineHeight) || 24;
      setHovered({
        pos,
        top: rect.top - parent.top + Math.min(rect.height, lineHeight) / 2,
      });
    };
    const onLeave = (event: MouseEvent) => {
      if (menu || rootRef.current?.contains(event.relatedTarget as Node))
        return;
      setHovered(null);
    };
    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, [editor, menu]);

  useEffect(() => {
    if (!menu) return;
    const close = (event: Event) => {
      if (
        event instanceof KeyboardEvent
          ? event.key === "Escape"
          : !rootRef.current?.contains(event.target as Node)
      )
        setMenu(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [menu]);

  if (!hovered || !editor.isEditable) return null;
  const node = editor.state.doc.nodeAt(hovered.pos);
  if (!node) return null;

  const selectBlock = () =>
    editor.view.dispatch(
      editor.state.tr.setSelection(
        NodeSelection.create(editor.state.doc, hovered.pos),
      ),
    );

  const done = () => {
    setMenu(false);
    setHovered(null);
  };

  return (
    <div
      ref={rootRef}
      className="absolute z-20 -left-9 hidden md:block"
      style={{ top: hovered.top }}
    >
      <button
        type="button"
        draggable
        aria-label={t("handleLabel")}
        aria-expanded={menu}
        title={t("handleHint")}
        onMouseDown={(event) => event.stopPropagation()}
        onClick={() => setMenu((value) => !value)}
        onDragStart={(event) => {
          selectBlock();
          const slice = editor.state.selection.content();
          editor.view.dragging = { slice, move: true };
          const el = editor.view.nodeDOM(hovered.pos);
          if (el instanceof HTMLElement)
            event.dataTransfer.setDragImage(el, 0, 0);
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", node.textContent);
        }}
        onDragEnd={done}
        className={cn(
          "-translate-y-1/2 inline-flex h-7 w-5 cursor-grab items-center justify-center rounded-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-foreground active:cursor-grabbing",
          menu && "bg-secondary text-foreground",
        )}
      >
        <GripVertical className="size-4" />
      </button>

      {menu && (
        <div
          role="menu"
          aria-label={t("options")}
          className="absolute top-4 left-0 z-30 w-56 rounded-md border-2 border-foreground bg-popover p-1.5 text-popover-foreground shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)]"
        >
          <p className="px-2 pb-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {t("turnInto")}
          </p>
          {TEXT_BLOCKS.map((block) => (
            <button
              key={block.id}
              type="button"
              role="menuitem"
              className={ITEM}
              onClick={() => {
                editor.commands.setTextSelection(hovered.pos + 1);
                block.run(editor);
                done();
              }}
            >
              {block.icon}
              {t(`items.${block.id}`)}
            </button>
          ))}
          <span aria-hidden className="my-1 block h-px bg-border" />
          <button
            type="button"
            role="menuitem"
            className={ITEM}
            onClick={() => {
              editor
                .chain()
                .insertContentAt(hovered.pos + node.nodeSize, node.toJSON())
                .focus()
                .run();
              done();
            }}
          >
            <CopyPlus />
            {t("duplicate")}
          </button>
          <button
            type="button"
            role="menuitem"
            className={ITEM}
            onClick={() => {
              void navigator.clipboard?.writeText(node.textContent);
              done();
            }}
          >
            <Copy />
            {t("copyText")}
          </button>
          <button
            type="button"
            role="menuitem"
            className={cn(ITEM, "text-destructive [&_svg]:text-destructive")}
            onClick={() => {
              editor
                .chain()
                .deleteRange({
                  from: hovered.pos,
                  to: hovered.pos + node.nodeSize,
                })
                .focus()
                .run();
              done();
            }}
          >
            <Trash2 />
            {t("delete")}
          </button>
        </div>
      )}
    </div>
  );
}
