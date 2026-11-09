import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginForm } from "@/components/forms/auth/login-form";
import { apiClient } from "@/lib/api-client";

vi.mock("@/lib/api-client", () => ({ apiClient: { post: vi.fn() } }));

function renderForm() {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <LoginForm />
    </QueryClientProvider>,
  );
}

describe("LoginForm remember me", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.mocked(apiClient.post).mockResolvedValue({
      data: { data: { user: { id: "u1" }, accessToken: "t" } },
    });
  });

  it("remembers the identifier after login and restores it", async () => {
    const { unmount } = renderForm();

    await userEvent.type(screen.getByLabelText("E-mail ou usuário"), "julian");
    await userEvent.type(screen.getByLabelText("Senha"), "secret");
    await userEvent.click(screen.getByRole("checkbox"));
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() =>
      expect(localStorage.getItem("blklight-remembered-identifier")).toBe(
        "julian",
      ),
    );
    unmount();

    renderForm();
    await waitFor(() =>
      expect(screen.getByLabelText("E-mail ou usuário")).toHaveValue("julian"),
    );
    expect(screen.getByLabelText("Senha")).toHaveValue("");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("forgets the identifier when logging in without remember me", async () => {
    localStorage.setItem("blklight-remembered-identifier", "old");
    renderForm();

    await userEvent.type(screen.getByLabelText("Senha"), "secret");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() =>
      expect(localStorage.getItem("blklight-remembered-identifier")).toBeNull(),
    );
  });
});
