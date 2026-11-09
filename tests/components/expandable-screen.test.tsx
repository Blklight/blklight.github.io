import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Activity } from "react";
import { describe, expect, it } from "vitest";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";

function Screen({ mode }: { mode: "visible" | "hidden" }) {
  return (
    <Activity mode={mode}>
      <ExpandableScreen>
        <ExpandableScreenTrigger>
          <button type="button">Login</button>
        </ExpandableScreenTrigger>
        <ExpandableScreenContent>
          <p>painel</p>
        </ExpandableScreenContent>
      </ExpandableScreen>
    </Activity>
  );
}

describe("ExpandableScreen", () => {
  it("closes and unlocks scroll when hidden by Activity", async () => {
    const { rerender } = render(<Screen mode="visible" />);

    await userEvent.click(screen.getByRole("button", { name: "Login" }));
    expect(screen.getByText("painel")).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<Screen mode="hidden" />);
    expect(document.body.style.overflow).toBe("unset");

    rerender(<Screen mode="visible" />);
    await waitFor(() =>
      expect(screen.queryByText("painel")).not.toBeInTheDocument(),
    );
    expect(document.body.style.overflow).toBe("unset");
  });
});
