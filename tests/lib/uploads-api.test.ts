import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import {
  MAX_UPLOAD_BYTES,
  uploadImage,
  uploadWithToast,
} from "@/features/uploads/api";
import { apiClient } from "@/lib/api-client";

vi.mock("@/lib/api-client", () => ({
  apiClient: { post: vi.fn() },
  unwrap: (response: { data: { data: unknown } }) => response.data.data,
}));
vi.mock("sonner", () => ({ toast: { promise: vi.fn() } }));

const file = (bytes = 10) =>
  new File([new Uint8Array(bytes)], "photo.jpg", { type: "image/jpeg" });

/** Shape axios's isAxiosError() recognises. */
function httpError(status: number) {
  return Object.assign(new Error("fail"), {
    isAxiosError: true,
    response: { status },
  });
}

describe("uploadImage", () => {
  it("posts the file as multipart with its purpose and returns the data", async () => {
    const data = { url: "http://s3/a.webp", width: 1, height: 1, bytes: 9 };
    vi.mocked(apiClient.post).mockResolvedValue({ data: { data } });

    await expect(uploadImage(file(), "avatar")).resolves.toEqual(data);

    const [url, body, config] = vi.mocked(apiClient.post).mock.lastCall ?? [];
    expect(url).toBe("/api/v1/uploads");
    expect((body as FormData).get("file")).toBeInstanceOf(File);
    expect(config).toMatchObject({ params: { purpose: "avatar" } });
  });

  it("refuses files over 10 MB without calling the API", async () => {
    const callsBefore = vi.mocked(apiClient.post).mock.calls.length;
    await expect(
      uploadImage(file(MAX_UPLOAD_BYTES + 1), "editor"),
    ).rejects.toThrow("10 MB");
    expect(vi.mocked(apiClient.post).mock.calls.length).toBe(callsBefore);
  });

  it.each([
    [400, "Formato não suportado"],
    [413, "10 MB"],
    [429, "Muitos envios"],
    [503, "indisponível"],
    [500, "Não foi possível enviar"],
  ])("maps HTTP %i to a Portuguese message", async (status, message) => {
    vi.mocked(apiClient.post).mockImplementation(async () => {
      throw httpError(status);
    });
    await expect(uploadImage(file(), "editor")).rejects.toThrow(message);
  });
});

describe("uploadWithToast", () => {
  it("shows a toast and resolves to null on failure", async () => {
    vi.mocked(apiClient.post).mockImplementation(async () => {
      throw httpError(400);
    });
    const result = await uploadWithToast(file(), "editor", {
      loading: "Enviando…",
      success: "Enviada",
    });
    expect(result).toBeNull();
    expect(toast.promise).toHaveBeenCalledWith(
      expect.any(Promise),
      expect.objectContaining({ loading: "Enviando…", success: "Enviada" }),
    );
  });
});
