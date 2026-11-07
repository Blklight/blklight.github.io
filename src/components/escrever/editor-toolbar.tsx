"use client";

import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
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
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import React, { useCallback } from "react";
import { ToolbarButton, ToolbarDivider } from "./toolbar";

export interface EditorToolbarProps {
  editor: Editor | null;
  onShowLinkModal: () => void;
}

export function EditorToolbar({ editor, onShowLinkModal }: EditorToolbarProps) {
  const addImage = useCallback(() => {
    const url = window.prompt("URL da imagem:");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="editor-toolbar background-texture">
      <div className="container mx-auto px-6 max-w-full overflow-hidden">
        <div className="flex items-center justify-start md:justify-center py-2 w-full overflow-x-auto">
          <div className="flex items-center gap-1 flex-nowrap shrink-0">
            {/* Undo/Redo */}
            <ToolbarButton
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              title="Desfazer"
            >
              <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              title="Refazer"
            >
              <Redo className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Headings */}
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor?.isActive("heading", { level: 1 }) ?? false}
              title="Titulo 1"
            >
              <Heading1 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor?.isActive("heading", { level: 2 }) ?? false}
              title="Titulo 2"
            >
              <Heading2 className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor?.isActive("heading", { level: 3 }) ?? false}
              title="Titulo 3"
            >
              <Heading3 className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Text Formatting */}
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              isActive={editor?.isActive("bold") ?? false}
              title="Negrito"
            >
              <Bold className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              isActive={editor?.isActive("italic") ?? false}
              title="Italico"
            >
              <Italic className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              isActive={editor?.isActive("strike") ?? false}
              title="Riscado"
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              isActive={editor?.isActive("highlight") ?? false}
              title="Destacar"
            >
              <Highlighter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleCode().run()}
              isActive={editor?.isActive("code") ?? false}
              title="Codigo"
            >
              <Code className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Alignment */}
            <ToolbarButton
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              isActive={editor?.isActive({ textAlign: "left" }) ?? false}
              title="Alinhar a esquerda"
            >
              <AlignLeft className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              isActive={editor?.isActive({ textAlign: "center" }) ?? false}
              title="Centralizar"
            >
              <AlignCenter className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              isActive={editor?.isActive({ textAlign: "right" }) ?? false}
              title="Alinhar a direita"
            >
              <AlignRight className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              isActive={editor?.isActive("bulletList") ?? false}
              title="Lista"
            >
              <List className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              isActive={editor?.isActive("orderedList") ?? false}
              title="Lista numerada"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              isActive={editor?.isActive("blockquote") ?? false}
              title="Citacao"
            >
              <Quote className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Media */}
            <ToolbarButton
              onClick={onShowLinkModal}
              isActive={editor?.isActive("link") ?? false}
              title="Link"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={addImage} title="Imagem">
              <ImageIcon className="w-4 h-4" />
            </ToolbarButton>

            <ToolbarDivider />

            {/* Horizontal Rule */}
            <ToolbarButton
              onClick={() => editor?.chain().focus().setHorizontalRule().run()}
              title="Linha horizontal"
            >
              <Minus className="w-4 h-4" />
            </ToolbarButton>
          </div>
        </div>
      </div>
    </div>
  );
}
