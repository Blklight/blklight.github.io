import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProfileMenu } from "@/components/profile-menu";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

describe("ProfileMenu sign out", () => {
  it("signs out only after a full hold", async () => {
    const onSignOut = vi.fn();
    render(
      <ProfileMenu
        displayName="Marina"
        username="marina"
        onSignOut={onSignOut}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /menu da conta/i }),
    );
    const signOut = await screen.findByRole("menuitem", { name: /sair/i });

    fireEvent.pointerDown(signOut);
    await new Promise((r) => setTimeout(r, 200));
    fireEvent.pointerUp(signOut);
    expect(await screen.findByText(/continue segurando/i)).toBeInTheDocument();
    expect(onSignOut).not.toHaveBeenCalled();

    fireEvent.pointerDown(signOut);
    await waitFor(() => expect(onSignOut).toHaveBeenCalledTimes(1), {
      timeout: 2500,
    });
  });
});
