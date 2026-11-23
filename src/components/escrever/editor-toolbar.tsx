"use client";

import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  FileCode2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Plus,
  Quote,
  Strikethrough,
} from "lucide-react";
import {
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useImageInsertStore } from "@/components/escrever/image-insert";
import { cn } from "@/lib/utils";

const PANEL =
  "flex items-center gap-0.5 rounded-md border-2 border-foreground bg-popover text-popover-foreground p-1 shadow-[0_8px_24px_-12px_rgb(0_0_0/0.45)]";

function MenuButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      // Keep the text selection: a mousedown on the button would blur the editor.
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClick}
      className={cn(
        "size-8 inline-flex items-center justify-center rounded-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground [&_svg]:size-4",
        active
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary",
      )}
    >
      {children}
    </button>
  );
}

const Divider = () => (
  <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />
);

/** Appears over selected text: inline formatting, link, and alignment. */
export function EditorBubbleMenu({
  editor,
  onShowLinkModal,
}: {
  editor: Editor;
  onShowLinkModal: () => void;
}) {
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      strike: e.isActive("strike"),
      highlight: e.isActive("highlight"),
      code: e.isActive("code"),
      link: e.isActive("link"),
      left: e.isActive({ textAlign: "left" }),
      center: e.isActive({ textAlign: "center" }),
      right: e.isActive({ textAlign: "right" }),
    }),
  });
  const run = () => editor.chain().focus();

  return (
    <BubbleMenu
      editor={editor}
      appendTo={() => document.body}
      options={{ strategy: "fixed" }}
      className={cn(PANEL, "z-[60]")}
    >
      <MenuButton
        label="Negrito"
        active={state.bold}
        onClick={() => run().toggleBold().run()}
      >
        <Bold />
      </MenuButton>
      <MenuButton
        label="Itálico"
        active={state.italic}
        onClick={() => run().toggleItalic().run()}
      >
        <Italic />
      </MenuButton>
      <MenuButton
        label="Riscado"
        active={state.strike}
        onClick={() => run().toggleStrike().run()}
      >
        <Strikethrough />
      </MenuButton>
      <MenuButton
        label="Destacar"
        active={state.highlight}
        onClick={() => run().toggleHighlight().run()}
      >
        <Highlighter />
      </MenuButton>
      <MenuButton
        label="Código"
        active={state.code}
        onClick={() => run().toggleCode().run()}
      >
        <Code />
      </MenuButton>
      <MenuButton label="Link" active={state.link} onClick={onShowLinkModal}>
        <LinkIcon />
      </MenuButton>
      <Divider />
      <MenuButton
        label="Alinhar à esquerda"
        active={state.left}
        onClick={() => run().setTextAlign("left").run()}
      >
        <AlignLeft />
      </MenuButton>
      <MenuButton
        label="Centralizar"
        active={state.center}
        onClick={() => run().setTextAlign("center").run()}
      >
        <AlignCenter />
      </MenuButton>
      <MenuButton
        label="Alinhar à direita"
        active={state.right}
        onClick={() => run().setTextAlign("right").run()}
      >
        <AlignRight />
      </MenuButton>
    </BubbleMenu>
  );
}

export interface Block {
  label: string;
  icon: ReactNode;
  run: (editor: Editor) => void;
  /** Whether the block is the current one (text blocks only). */
  isActive?: (editor: Editor) => boolean;
}

/** Text blocks: they live in the paper's top bar. */
export const TEXT_BLOCKS: Block[] = [
  {
    label: "Parágrafo",
    icon: <Pilcrow />,
    run: (e) => e.chain().focus().setParagraph().run(),
    isActive: (e) => e.isActive("paragraph"),
  },
  {
    label: "Título 1",
    icon: <Heading1 />,
    run: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (e) => e.isActive("heading", { level: 1 }),
  },
  {
    label: "Título 2",
    icon: <Heading2 />,
    run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (e) => e.isActive("heading", { level: 2 }),
  },
  {
    label: "Título 3",
    icon: <Heading3 />,
    run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (e) => e.isActive("heading", { level: 3 }),
  },
  {
    label: "Lista",
    icon: <List />,
    run: (e) => e.chain().focus().toggleBulletList().run(),
    isActive: (e) => e.isActive("bulletList"),
  },
  {
    label: "Lista numerada",
    icon: <ListOrdered />,
    run: (e) => e.chain().focus().toggleOrderedList().run(),
    isActive: (e) => e.isActive("orderedList"),
  },
  {
    label: "Citação",
    icon: <Quote />,
    run: (e) => e.chain().focus().toggleBlockquote().run(),
    isActive: (e) => e.isActive("blockquote"),
  },
  {
    label: "Bloco de código",
    icon: <FileCode2 />,
    run: (e) => e.chain().focus().toggleCodeBlock().run(),
    isActive: (e) => e.isActive("codeBlock"),
  },
];

/** Media and special elements: the "+" on an empty line inserts these. */
export const MEDIA_BLOCKS: Block[] = [
  {
    label: "Imagem",
    icon: <ImageIcon />,
    run: (e) => useImageInsertStore.getState().open(e),
  },
  {
    label: "Linha",
    icon: <Minus />,
    run: (e) => e.chain().focus().setHorizontalRule().run(),
  },
];

export interface BlockGroup {
  label: string;
  blocks: Block[];
}

const byLabel = (label: string) =>
  [...TEXT_BLOCKS, ...MEDIA_BLOCKS].find(
    (block) => block.label === label,
  ) as Block;

/** Everything that can be inserted, grouped: shared by "/" and the "+". */
export const INSERT_GROUPS: BlockGroup[] = [
  {
    label: "Texto",
    blocks: ["Parágrafo", "Título 1", "Título 2", "Título 3"].map(byLabel),
  },
  { label: "Listas", blocks: ["Lista", "Lista numerada"].map(byLabel) },
  {
    label: "Blocos",
    blocks: ["Citação", "Bloco de código", "Linha"].map(byLabel),
  },
  { label: "Mídia", blocks: ["Imagem"].map(byLabel) },
];

/** Grouped block list (the "+" panel and the "/" menu). */
export function InsertMenuList({
  groups,
  selected,
  onPick,
}: {
  groups: BlockGroup[];
  /** Highlighted block (keyboard navigation in the "/" menu). */
  selected?: Block;
  onPick: (block: Block) => void;
}) {
  if (groups.length === 0) {
    return (
      <p className="px-2 py-1.5 text-sm text-muted-foreground">
        Nenhum bloco encontrado
      </p>
    );
  }
  return (
    <div className="flex flex-col">
      {groups.map((group) => (
        <div
          key={group.label}
          className="flex flex-col py-1 first:pt-0 last:pb-0"
        >
          <p className="px-2 pb-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            {group.label}
          </p>
          {group.blocks.map((block) => (
            <button
              key={block.label}
              type="button"
              aria-current={selected === block ? "true" : undefined}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => onPick(block)}
              className={cn(
                "flex items-center gap-3 rounded-sm px-2 py-1.5 text-left text-sm outline-none hover:bg-secondary focus-visible:bg-secondary [&_svg]:size-4 [&_svg]:text-muted-foreground",
                selected === block && "bg-secondary",
              )}
            >
              {block.icon}
              {block.label}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * "+" on an empty line: opens the grouped insert menu (same as typing "/"). Rendered inside the
 * editor wrapper (position: relative) and placed from the line's coordinates,
 * so it scrolls with the text instead of floating over the viewport.
 */
export function EditorBlockMenu({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  // Open upward when the line is too close to the bottom of the screen.
  const [upward, setUpward] = useState(false);
  const [spot, setSpot] = useState<{ top: number; left: number } | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const line = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      const { empty, $from } = e.state.selection;
      const blank =
        e.isEditable &&
        empty &&
        $from.parent.type.name === "paragraph" &&
        $from.parent.content.size === 0;
      return blank ? $from.pos : null;
    },
  });

  useLayoutEffect(() => {
    const place = () => {
      const box = anchorRef.current?.offsetParent?.getBoundingClientRect();
      if (line === null || !box) {
        setSpot(null);
        return;
      }
      const coords = editor.view.coordsAtPos(line);
      setSpot({
        top: coords.top - box.top + (coords.bottom - coords.top) / 2,
        left: coords.left - box.left,
      });
    };
    place();
    // Layout can shift without a transaction (fonts, images, design changes).
    const observer = new ResizeObserver(place);
    observer.observe(editor.view.dom);
    window.addEventListener("resize", place);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [editor, line]);

  useEffect(() => {
    if (line === null) setOpen(false);
  }, [line]);

  return (
    // Zero-size anchor on the line's start: opening the panel never moves the "+".
    <div
      ref={anchorRef}
      className="absolute z-20 size-0"
      style={{
        top: spot?.top ?? 0,
        left: spot?.left ?? 0,
        visibility: spot === null ? "hidden" : "visible",
      }}
    >
      <button
        type="button"
        aria-label="Inserir bloco"
        title="Inserir bloco (ou digite /)"
        aria-expanded={open}
        onMouseDown={(event) => event.preventDefault()}
        onClick={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setUpward(window.innerHeight - rect.bottom < 360);
          setOpen((value) => !value);
        }}
        className={cn(
          "absolute right-2 top-0 -translate-y-1/2 size-7 inline-flex items-center justify-center rounded-xs border-2 border-foreground bg-background text-foreground transition-[background-color,color] hover:bg-foreground hover:text-background outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
          open && "bg-foreground text-background",
        )}
      >
        <Plus className="size-4" />
      </button>
      {open && (
        <div
          className={cn(
            PANEL,
            "absolute -left-9 flex-col items-stretch w-56 max-h-80 overflow-y-auto p-1.5 gap-0",
            upward ? "bottom-5" : "top-5",
          )}
        >
          <InsertMenuList
            groups={INSERT_GROUPS}
            onPick={(block) => {
              block.run(editor);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
