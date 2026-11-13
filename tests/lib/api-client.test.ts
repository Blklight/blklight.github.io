import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const endSessionLocal = vi.fn();
vi.mock("@/lib/session", () => ({ endSessionLocal }));

type Handler = (config: AxiosRequestConfig) => {
  status: number;
  data?: unknown;
};

async function setup(handler: Handler) {
  vi.resetModules();
  const { default: axios, AxiosError } = await import("axios");
  const adapter = vi.fn(async (config: InternalAxiosRequestConfig) => {
    const { status, data = {} } = handler(config);
    const response = { data, status, statusText: "", headers: {}, config };
    if (status >= 400) {
      throw new AxiosError(
        "fail",
        undefined,
        config as never,
        null,
        response as never,
      );
    }
    return response;
  });
  axios.defaults.adapter = adapter;
  const { useAuthStore } = await import("@/store/useAuthStore");
  useAuthStore.getState().setSession({ id: "u1" } as never, "old-token");
  const { apiClient } = await import("@/lib/api-client");
  const calls = (url: string) =>
    adapter.mock.calls.filter(([c]) => c.url === url);
  return { apiClient, adapter, calls, useAuthStore };
}

const auth = (c: AxiosRequestConfig) =>
  (c.headers as Record<string, string> | undefined)?.Authorization;

describe("apiClient refresh", () => {
  const assign = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, "location", {
      value: { ...window.location, assign },
      configurable: true,
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("parallel 401s share one refresh and retry with the new token", async () => {
    const { apiClient, calls, useAuthStore } = await setup((c) => {
      if (c.url === "/api/v1/auth/refresh") {
        return { status: 200, data: { data: { accessToken: "new-token" } } };
      }
      return auth(c) === "Bearer new-token"
        ? { status: 200, data: { data: c.url } }
        : { status: 401 };
    });

    const results = await Promise.all(
      ["/a", "/b", "/c"].map((url) => apiClient.get(url)),
    );

    expect(results.map((r) => r.data.data)).toEqual(["/a", "/b", "/c"]);
    expect(calls("/api/v1/auth/refresh")).toHaveLength(1);
    expect(useAuthStore.getState().accessToken).toBe("new-token");
  });

  it("ends the session when the refresh itself returns 401", async () => {
    const { apiClient } = await setup(() => ({ status: 401 }));

    await expect(apiClient.get("/a")).rejects.toMatchObject({
      response: { status: 401 },
    });
    expect(endSessionLocal).toHaveBeenCalled();
    expect(assign).toHaveBeenCalledWith("/");
  });

  it("does not refresh on a 401 from login", async () => {
    const { apiClient, calls } = await setup(() => ({ status: 401 }));

    await expect(apiClient.post("/api/v1/auth/login", {})).rejects.toBeTruthy();
    expect(calls("/api/v1/auth/refresh")).toHaveLength(0);
  });
});
