import { fireEvent, render, screen } from "@testing-library/react";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { describe, expect, it } from "vitest";
import { DocumentPaperHeader } from "@/components/escrever/document-paper-header";
import {
  MEDIA_BLOCKS,
  TEXT_BLOCKS,
} from "@/components/escrever/editor-toolbar";

const setup = () => {
  const editor = new Editor({
    extensions: [StarterKit],
    content: "<h2>Título</h2><p>Texto</p>",
  });
  render(
    <DocumentPaperHeader
      editor={editor}
      typography="sans"
      onTypographyChange={() => {}}
      status="draft"
      type="article"
      typeLabel="Artigo"
    />,
  );
  return editor;
};

describe("paper header", () => {
  it("shows type and status as tabs and the text blocks in the bar", () => {
    setup();
    expect(screen.getByText("Artigo")).toBeInTheDocument();
    expect(screen.getByText("Rascunho")).toBeInTheDocument();
    for (const block of TEXT_BLOCKS) {
      expect(
        screen.getByRole("button", { name: block.label }),
      ).toBeInTheDocument();
    }
  });

  it("marks the current block and applies a new one", () => {
    const editor = setup();
    editor.commands.setTextSelection(2);
    expect(screen.getByRole("button", { name: "Título 2" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Citação" }));
    expect(editor.isActive("blockquote")).toBe(true);
  });

  it("leaves only media for the + menu", () => {
    expect(MEDIA_BLOCKS.map((b) => b.label)).toEqual(["Imagem", "Linha"]);
  });
});
