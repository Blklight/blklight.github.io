import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { NotesBoard } from "@/components/notes/notes-board";
import { useNotesStore } from "@/features/notes/store";

const TABS = [{ id: "s1", title: "Fundamentos", color: "#58f" }];

function setup() {
  render(
    <NotesBoard
      title="Quadro"
      scopeId="trl"
      groups={[]}
      tabs={TABS}
      labelOf={(n) => n.sectionId ?? "Solta"}
      tabOf={(n) => n.sectionId ?? ""}
      onClose={() => {}}
    />,
  );
}

describe("NotesBoard", () => {
  beforeEach(() => useNotesStore.setState({ notes: [] }));

  it("files a new note under the chosen tab", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Nova nota" }));
    fireEvent.click(screen.getByRole("radio", { name: "Fundamentos" }));
    fireEvent.change(screen.getByRole("textbox", { name: "Comentário" }), {
      target: { value: "revisar" },
    });
    expect(useNotesStore.getState().notes[0]).toMatchObject({
      sectionId: "s1",
      color: "#58f",
      text: "revisar",
    });
  });

  it("discards a new note closed empty", () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: "Nova nota" }));
    expect(useNotesStore.getState().notes).toHaveLength(1);
    fireEvent.keyDown(document.activeElement ?? document.body, {
      key: "Escape",
    });
    expect(useNotesStore.getState().notes).toHaveLength(0);
  });

  it("opens a note from the keyboard", () => {
    useNotesStore.getState().add({ scopeId: "trl", text: "ver depois" });
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Abrir nota/ }), {
      detail: 0,
    });
    expect(screen.getByRole("textbox", { name: "Comentário" })).toHaveValue(
      "ver depois",
    );
  });
});
