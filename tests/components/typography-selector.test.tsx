import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Activity } from "react";
import { describe, expect, it } from "vitest";
import { FONT_OPTIONS } from "@/components/document/constants";
import { MarqueeText, TypographySelector } from "@/components/escrever/toolbar";

function Page({ mode }: { mode: "visible" | "hidden" }) {
  return (
    <Activity mode={mode}>
      <TypographySelector value={FONT_OPTIONS[0].id} onChange={() => {}} />
    </Activity>
  );
}

describe("TypographySelector", () => {
  it("closes the menu when the page is hidden by Activity", async () => {
    const { rerender } = render(<Page mode="visible" />);
    const trigger = () => screen.getByRole("button", { expanded: true });

    await userEvent.click(screen.getByRole("button"));
    expect(trigger()).toBeInTheDocument();

    rerender(<Page mode="hidden" />);
    rerender(<Page mode="visible" />);

    expect(
      screen.getByRole("button", {
        name: FONT_OPTIONS[0].name,
        expanded: false,
      }),
    ).toBeInTheDocument();
  });
});

describe("MarqueeText", () => {
  const sizes = (scroll: number, client: number) => {
    Object.defineProperty(HTMLElement.prototype, "scrollWidth", {
      configurable: true,
      get: () => scroll,
    });
    Object.defineProperty(HTMLElement.prototype, "clientWidth", {
      configurable: true,
      get: () => client,
    });
  };

  it("stays still when the text fits", () => {
    sizes(80, 100);
    render(<MarqueeText text="Inter" />);
    expect(screen.getByText("Inter")).not.toHaveClass(
      "animate-marquee-pingpong",
    );
  });

  it("slides back and forth when the text overflows", () => {
    sizes(180, 100);
    render(<MarqueeText text="Uma fonte com nome bem comprido" />);
    const text = screen.getByText("Uma fonte com nome bem comprido");
    expect(text).toHaveClass("animate-marquee-pingpong");
    expect(text.style.getPropertyValue("--shift")).toBe("-80px");
  });
});
