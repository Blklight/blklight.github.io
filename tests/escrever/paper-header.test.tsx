import { fireEvent, screen } from "@testing-library/react";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { describe, expect, it } from "vitest";
import { DocumentPaperHeader } from "@/components/escrever/document-paper-header";
import {
  MEDIA_BLOCKS,
  TEXT_BLOCKS,
} from "@/components/escrever/editor-toolbar";
import ptBr from "@/i18n/messages/pt-br.json";
import { renderWithIntl as render } from "../utils/render";

const header = (
  editor: Editor,
  save?: { lastSaved: Date | null; isSaving: boolean },
) => (
  <DocumentPaperHeader
    editor={editor}
    typography="sans"
    onTypographyChange={() => {}}
    status="draft"
    type="article"
    typeLabel="Artigo"
    save={save}
  />
);

const setup = () => {
  const editor = new Editor({
    extensions: [StarterKit],
    content: "<h2>Título</h2><p>Texto</p>",
  });
  render(header(editor));
  return editor;
};

describe("paper header", () => {
  it("shows type and status as tabs and the text blocks in the bar", () => {
    setup();
    expect(screen.getByText("Artigo")).toBeInTheDocument();
    expect(screen.getByText("Rascunho")).toBeInTheDocument();
    for (const block of TEXT_BLOCKS) {
      expect(
        screen.getByRole("button", { name: ptBr.blocks.items[block.id] }),
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

  it("shows the save pill while saving, then the saved time", async () => {
    const editor = new Editor({ extensions: [StarterKit] });
    const { rerender } = render(
      header(editor, { lastSaved: null, isSaving: false }),
    );
    expect(screen.queryByText(/Salv/)).not.toBeInTheDocument();
    rerender(header(editor, { lastSaved: null, isSaving: true }));
    expect(screen.getByText("Salvando")).toBeInTheDocument();
    rerender(
      header(editor, {
        lastSaved: new Date(2026, 10, 22, 14, 32),
        isSaving: false,
      }),
    );
    // The saving pill exits before the saved one rises in.
    expect(await screen.findByText(/Salvo às 14:32/)).toBeInTheDocument();
  });

  it("leaves only media for the + menu", () => {
    expect(MEDIA_BLOCKS.map((b) => b.id)).toEqual(["image", "rule"]);
  });
});
