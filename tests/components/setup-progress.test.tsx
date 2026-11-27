import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SetupProgress } from "@/components/onboarding/setup-progress";
import { renderWithIntl as render } from "../utils/render";

describe("SetupProgress", () => {
  it("resumes from the failed row without re-running finished ones", async () => {
    const first = vi.fn().mockResolvedValue(undefined);
    const second = vi
      .fn()
      .mockRejectedValueOnce(new Error("boom"))
      .mockResolvedValue(undefined);
    const onDone = vi.fn();

    render(
      <SetupProgress
        tasks={[
          { label: "Um", run: first },
          { label: "Dois", run: second },
        ]}
        onDone={onDone}
        describeError={() => "Falhou aqui"}
      />,
    );

    expect(
      await screen.findByRole("alert", {}, { timeout: 3000 }),
    ).toHaveTextContent("Falhou aqui");
    expect(onDone).not.toHaveBeenCalled();

    await userEvent.click(
      screen.getByRole("button", { name: /tentar de novo/i }),
    );
    await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1), {
      timeout: 3000,
    });
    expect(first).toHaveBeenCalledTimes(1);
    expect(second).toHaveBeenCalledTimes(2);
  });
});
