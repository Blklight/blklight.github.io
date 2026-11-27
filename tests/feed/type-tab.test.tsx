import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypeInkContext, TypeTab } from "@/components/feed/cards/parts";
import { renderWithIntl as render } from "../utils/render";

describe("TypeTab", () => {
  it("stays neutral when the feed is not filtered", () => {
    render(<TypeTab type="tutorial" />);
    const tab = screen.getByText("Tutorial");
    expect(tab).toHaveClass("bg-dark");
    expect(tab).not.toHaveClass("bg-orange-400");
  });

  it("wears the type ink when the feed is filtered to that type", () => {
    render(
      <TypeInkContext value={true}>
        <TypeTab type="tutorial" />
      </TypeInkContext>,
    );
    expect(screen.getByText("Tutorial")).toHaveClass("bg-orange-400");
  });

  it("uses the requested neutral tone on dark cards", () => {
    render(<TypeTab type="project" tone="paper" />);
    expect(screen.getByText("Projeto")).toHaveClass("bg-light");
  });
});
