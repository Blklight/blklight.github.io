import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BADGE_MODELS, Badge, type BadgeModel } from "@/components/badge";

const MEMBER = {
  name: "Marina Alves",
  handle: "marina",
  memberSince: "2026-11-20T12:00:00.000Z",
  memberId: "A1B2C3",
};

describe("badge models", () => {
  it.each(Object.keys(BADGE_MODELS) as BadgeModel[])("%s renders", (model) => {
    render(<Badge model={model} data={MEMBER} />);
    expect(screen.getAllByText(/marina/i).length).toBeGreaterThan(0);
  });
});

describe.each([
  "poster",
  "factory",
  "ops",
  "spec",
  "lab",
] as const)("%s badge", (model) => {
  it("flips to the back on click", () => {
    render(<Badge model={model} data={MEMBER} />);
    fireEvent.click(screen.getByRole("button", { name: /para o verso/ }));
    expect(
      screen.getByRole("button", { name: /para a frente/ }),
    ).toBeInTheDocument();
  });
});
