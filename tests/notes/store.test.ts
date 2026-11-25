import { beforeEach, describe, expect, it } from "vitest";
import { useNotesStore } from "@/features/notes/store";

describe("useNotesStore", () => {
  beforeEach(() => useNotesStore.setState({ notes: [] }));

  it("adds, edits, places and removes a note", () => {
    const { add, update, move, remove } = useNotesStore.getState();
    const note = add({ scopeId: "trl", docId: "a", text: "" });
    update(note.id, { text: "revisar" });
    move(note.id, 40, 80);
    expect(useNotesStore.getState().notes[0]).toMatchObject({
      text: "revisar",
      board: { x: 40, y: 80 },
    });
    remove(note.id);
    expect(useNotesStore.getState().notes).toEqual([]);
  });
});
