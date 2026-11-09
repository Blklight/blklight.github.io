import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const refreshAccessToken = vi.fn(() => Promise.resolve("t"));
vi.mock("@/lib/api-client", () => ({ refreshAccessToken }));

async function load() {
  vi.resetModules();
  const { useAuthStore } = await import("@/store/useAuthStore");
  const { SessionBootstrap } = await import("@/components/session-bootstrap");
  return { useAuthStore, SessionBootstrap };
}

describe("SessionBootstrap", () => {
  beforeEach(() => {
    localStorage.clear();
    refreshAccessToken.mockClear();
  });

  it("refreshes once per load when a session is persisted", async () => {
    const { useAuthStore, SessionBootstrap } = await load();
    useAuthStore.getState().setSession({ id: "u1" } as never, "t");

    const { rerender } = render(<SessionBootstrap />);
    rerender(<SessionBootstrap />);
    render(<SessionBootstrap />);

    expect(refreshAccessToken).toHaveBeenCalledTimes(1);
  });

  it("does nothing without a session", async () => {
    const { SessionBootstrap } = await load();
    render(<SessionBootstrap />);
    expect(refreshAccessToken).not.toHaveBeenCalled();
  });
});
