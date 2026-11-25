import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Dossier } from "@/components/dossier/dossier";
import { ARTICLES_BY_ID, TRAIL_REACT } from "@/features/dossier/mock";
import { trailToDossier } from "@/features/dossier/trail-adapter";

const data = trailToDossier(TRAIL_REACT, ARTICLES_BY_ID);

// jsdom has no element scrolling; the index scrolls its current row into view.
Element.prototype.scrollTo ??= () => {};

function setup() {
  render(
    <Dossier
      cover={data.cover}
      sections={data.sections}
      sheets={data.sheets}
      readIds={new Set()}
      renderCard={(s, ctx) => <h3 id={ctx.titleId}>{s.title}</h3>}
      renderDocument={(_, parts) => <div>{parts.title}</div>}
      renderNotes={() => <p>Notas</p>}
      getBody={() => Promise.resolve("")}
    />,
  );
  fireEvent.click(screen.getByRole("button", { name: /abrir dossiê/i }));
}

const page = () => screen.getByText(/^(Doc\. \d+ de \d+|Anotações)$/);
const coverEars = () => screen.getAllByRole("button", { name: "TRL-004" });

describe("Dossier navigation", () => {
  it("opens on the first document", () => {
    setup();
    expect(page()).toHaveTextContent("Doc. 01 de 12");
  });

  it("jumps to a section's first document from its ear", () => {
    setup();
    const ear = screen.getByRole("button", { name: "02 Estado e efeitos" });
    fireEvent.click(ear);
    expect(page()).toHaveTextContent("Doc. 05 de 12");
    expect(ear).toHaveAttribute("aria-current", "true");
  });

  it("pages with the arrow keys", () => {
    setup();
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(page()).toHaveTextContent("Doc. 02 de 12");
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(page()).toHaveTextContent("Doc. 01 de 12");
  });

  it("marks the current document in the index", () => {
    setup();
    const index = screen.getByRole("navigation", { name: "Sumário" });
    fireEvent.click(within(index).getByRole("button", { name: /^3\./ }));
    expect(page()).toHaveTextContent("Doc. 03 de 12");
    expect(within(index).getByRole("button", { name: /^3\./ })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("from the notes, the cover ear turns the pile back, then closes", () => {
    setup();
    fireEvent.click(coverEars()[0]);
    expect(page()).toHaveTextContent("Anotações");
    fireEvent.click(coverEars().at(-1) as HTMLElement);
    expect(page()).toHaveTextContent("Doc. 01 de 12");
    fireEvent.click(coverEars().at(-1) as HTMLElement);
    expect(
      screen.getByRole("button", { name: /abrir dossiê/i }),
    ).toBeInTheDocument();
  });
});
