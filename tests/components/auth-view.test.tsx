import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthView } from "@/components/auth-view";

const replace = vi.fn();
let search = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push: vi.fn() }),
  useSearchParams: () => new URLSearchParams(search),
}));
vi.mock("@/components/Grainient", () => ({ default: () => null }));
vi.mock("@/lib/api-client", () => ({ apiClient: { post: vi.fn() } }));

function renderView() {
  return render(
    <QueryClientProvider client={new QueryClient()}>
      <AuthView />
    </QueryClientProvider>,
  );
}

describe("AuthView", () => {
  beforeEach(() => {
    replace.mockClear();
    search = "";
  });

  it("opens on the login tab by default", () => {
    renderView();
    expect(
      screen.getByRole("button", { name: "Entrar", pressed: true }),
    ).toBeInTheDocument();
    expect(screen.getByText("Bem-vindo de volta")).toBeInTheDocument();
  });

  it("opens on the register tab with ?mode=register", () => {
    search = "mode=register";
    renderView();
    expect(
      screen.getByRole("button", { name: "Criar conta", pressed: true }),
    ).toBeInTheDocument();
    expect(screen.getByText("Crie sua conta")).toBeInTheDocument();
  });

  it("writes the selected tab to the URL", async () => {
    renderView();
    await userEvent.click(
      screen.getByRole("button", { name: "Criar conta", pressed: false }),
    );
    expect(replace).toHaveBeenCalledWith("/auth?mode=register", {
      scroll: false,
    });
  });
});
