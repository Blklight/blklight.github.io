import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DesignRegion, SideTabs } from "@/components/escrever/side-panel";

describe("SideTabs", () => {
  it("marks the open panel and reports clicks", () => {
    const onToggle = vi.fn();
    render(<SideTabs open="design" onToggle={onToggle} />);
    expect(screen.getByRole("button", { name: "Design" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Temas" }));
    expect(onToggle).toHaveBeenCalledWith("themes");
  });
});

describe("DesignRegion", () => {
  it("renders only its content outside design mode", () => {
    render(
      <DesignRegion
        active={false}
        tab="cover"
        selected={false}
        onSelect={() => {}}
      >
        <p>capa</p>
      </DesignRegion>,
    );
    expect(screen.getByText("capa")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("picks its part of the document in design mode", () => {
    const onSelect = vi.fn();
    render(
      <DesignRegion active tab="signature" selected={false} onSelect={onSelect}>
        <p>assinatura</p>
      </DesignRegion>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Editar assinatura" }));
    expect(onSelect).toHaveBeenCalledWith("signature");
  });
});
