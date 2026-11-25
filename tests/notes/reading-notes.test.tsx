import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { ReadingNotes } from "@/components/notes/reading-notes";
import { useNotesStore } from "@/features/notes/store";

// jsdom has no layout: ranges measure as empty boxes.
Range.prototype.getBoundingClientRect ??= () => new DOMRect();

describe("ReadingNotes", () => {
  beforeEach(() => useNotesStore.setState({ notes: [] }));

  it("marks the selected passage and shows it as a paper", () => {
    const root = document.createElement("div");
    root.innerHTML = "<p>Leia com calma e rode cada exemplo.</p>";
    document.body.append(root);
    render(
      <ReadingNotes
        root={root}
        scopeId="trl"
        docId="doc"
        color="#58f"
        label="Doc. 01"
      />,
    );

    const text = root.querySelector("p")?.firstChild as Text;
    const range = document.createRange();
    range.setStart(text, 0);
    range.setEnd(text, 14);
    act(() => {
      const sel = document.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      document.dispatchEvent(new Event("selectionchange"));
    });

    fireEvent.click(screen.getByRole("button", { name: /marcar/i }));
    const [note] = useNotesStore.getState().notes;
    expect(note).toMatchObject({ docId: "doc", color: "#58f", text: "" });
    expect(note.anchor?.exact).toBe("Leia com calma");
    expect(
      screen.getAllByRole("article", { name: "Nota: Leia com calma" }).length,
    ).toBeGreaterThan(0);
  });
});
