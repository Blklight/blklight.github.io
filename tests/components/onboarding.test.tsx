import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AxiosError, AxiosHeaders } from "axios";
import { describe, expect, it, vi } from "vitest";
import { AppsStep } from "@/components/onboarding/apps-step";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { apiClient } from "@/lib/api-client";
import type { PlatformApp } from "@/types/api.types";

vi.mock("@/components/Grainient", () => ({ default: () => null }));
vi.mock("@/lib/api-client", () => ({ apiClient: { post: vi.fn() } }));

const app = (slug: string, name: string): PlatformApp => ({
  id: slug,
  slug,
  name,
  description: null,
  accessMode: "open",
  iconUrl: null,
  tagline: null,
  category: null,
  isActive: true,
  createdAt: "",
});

describe("WelcomeStep username", () => {
  function renderStep(onNext = vi.fn()) {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <WelcomeStep username="" onNext={onNext} needsUsername />
      </QueryClientProvider>,
    );
    return onNext;
  }

  it("validates the username before calling the API", async () => {
    renderStep();
    await userEvent.type(screen.getByLabelText("Username"), "ab");
    await userEvent.click(
      screen.getByRole("button", { name: /salvar e continuar/i }),
    );
    expect(
      await screen.findByText("Use pelo menos 3 caracteres"),
    ).toBeInTheDocument();
    expect(apiClient.post).not.toHaveBeenCalled();
  });

  it("shows the API field error and does not advance", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(
      new AxiosError("conflict", "409", undefined, undefined, {
        status: 409,
        statusText: "Conflict",
        headers: {},
        config: { headers: new AxiosHeaders() },
        data: { error: { fields: { username: "Username já em uso" } } },
      }),
    );
    const onNext = renderStep();
    await userEvent.type(screen.getByLabelText("Username"), "julian");
    await userEvent.click(
      screen.getByRole("button", { name: /salvar e continuar/i }),
    );
    expect(await screen.findByText("Username já em uso")).toBeInTheDocument();
    expect(onNext).not.toHaveBeenCalled();
  });
});

describe("AppsStep", () => {
  it("only continues after a selection and returns the chosen slugs", async () => {
    const onConfirm = vi.fn();
    render(
      <AppsStep
        apps={[app("publisher", "Publisher"), app("reader", "Reader")]}
        initial={[]}
        onConfirm={onConfirm}
        onBack={vi.fn()}
      />,
    );
    const next = screen.getByRole("button", { name: /continuar/i });
    expect(next).toBeDisabled();

    await userEvent.click(screen.getByRole("button", { name: "Publisher" }));
    expect(screen.getByRole("button", { name: "Publisher" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await userEvent.click(next);
    expect(onConfirm).toHaveBeenCalledWith(["publisher"]);
  });
});
