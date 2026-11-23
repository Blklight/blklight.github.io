"use client";

import { Extension, type Range } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import Suggestion, { type SuggestionProps } from "@tiptap/suggestion";
import { useSyncExternalStore } from "react";
import {
  type Block,
  type BlockGroup,
  INSERT_GROUPS,
  InsertMenuList,
} from "./editor-toolbar";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

/** Groups whose blocks match the typed query (accent- and case-insensitive). */
export function filterGroups(query: string): BlockGroup[] {
  const q = normalize(query.trim());
  return INSERT_GROUPS.map((group) => ({
    ...group,
    blocks: group.blocks.filter(
      (block) =>
        normalize(block.label).includes(q) ||
        normalize(group.label).includes(q),
    ),
  })).filter((group) => group.blocks.length > 0);
}

interface MenuState {
  groups: BlockGroup[];
  index: number;
  rect: DOMRect | null;
  pick: ((block: Block) => void) | null;
}

const CLOSED: MenuState = { groups: [], index: 0, rect: null, pick: null };

// The suggestion plugin lives outside React: it writes here, <SlashMenu> reads.
let state = CLOSED;
const listeners = new Set<() => void>();
const setState = (next: MenuState) => {
  state = next;
  for (const listener of listeners) listener();
};
const flat = () => state.groups.flatMap((group) => group.blocks);

const open = (props: SuggestionProps<Block>, index = 0) =>
  setState({
    groups: filterGroups(props.query),
    index,
    rect: props.clientRect?.() ?? null,
    pick: (block) => props.command(block as never),
  });

/** "/" on a line opens the insert menu; typing filters it, arrows and Enter pick. */
export const SlashCommand = Extension.create({
  name: "slashCommand",
  // Above the default keymaps, so Enter and arrows reach the menu first.
  priority: 1000,

  addProseMirrorPlugins() {
    return [
      Suggestion<Block, Block>({
        editor: this.editor,
        char: "/",
        items: ({ query }) => filterGroups(query).flatMap((g) => g.blocks),
        command: ({
          editor,
          range,
          props: block,
        }: {
          editor: Editor;
          range: Range;
          props: Block;
        }) => {
          editor.chain().focus().deleteRange(range).run();
          block.run(editor);
        },
        render: () => ({
          onStart: (props) => open(props),
          onUpdate: (props) => open(props, 0),
          onKeyDown: ({ event }) => {
            const blocks = flat();
            if (blocks.length === 0) return false;
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              const step = event.key === "ArrowDown" ? 1 : -1;
              setState({
                ...state,
                index: (state.index + step + blocks.length) % blocks.length,
              });
              return true;
            }
            if (event.key === "Enter") {
              state.pick?.(blocks[state.index]);
              return true;
            }
            if (event.key === "Escape") {
              setState(CLOSED);
              return true;
            }
            return false;
          },
          onExit: () => setState(CLOSED),
        }),
      }),
    ];
  },
});

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** Floating menu for the "/" command, placed under the caret. */
export function SlashMenu() {
  const menu = useSyncExternalStore(
    subscribe,
    () => state,
    () => CLOSED,
  );
  if (!menu.rect || !menu.pick) return null;
  const pick = menu.pick;
  const below = window.innerHeight - menu.rect.bottom > 340;
  return (
    <div
      role="listbox"
      aria-label="Inserir bloco"
      className="fixed z-50 w-56 max-h-80 overflow-y-auto rounded-md border-2 border-foreground bg-popover p-1.5 text-popover-foreground shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)]"
      style={{
        left: menu.rect.left,
        ...(below
          ? { top: menu.rect.bottom + 6 }
          : { bottom: window.innerHeight - menu.rect.top + 6 }),
      }}
    >
      <InsertMenuList
        groups={menu.groups}
        selected={flat()[menu.index]}
        onPick={pick}
      />
    </div>
  );
}
