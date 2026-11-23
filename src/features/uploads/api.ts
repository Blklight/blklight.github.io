import { isAxiosError } from "axios";
import { toast } from "sonner";
import { apiClient, unwrap } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";

export type UploadPurpose = "editor" | "avatar";

export interface UploadedImage {
  url: string;
  width: number;
  height: number;
  bytes: number;
}

/** Same cap as the API's multipart limit: fail before sending a huge file. */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

/** Formats the API accepts (it checks the real content; this only filters the picker). */
export const IMAGE_ACCEPT =
  "image/jpeg,image/png,image/webp,image/avif,image/gif";

/**
 * POST /api/v1/uploads — the API optimizes the image (WebP, resized, no EXIF)
 * and returns its public URL, which goes into the same URL fields external
 * links (imgur etc.) use.
 */
export async function uploadImage(
  file: File,
  purpose: UploadPurpose,
): Promise<UploadedImage> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("A imagem deve ter no máximo 10 MB.");
  }
  const form = new FormData();
  form.append("file", file);
  try {
    return unwrap(
      await apiClient.post<ApiResponse<UploadedImage>>(
        "/api/v1/uploads",
        form,
        {
          params: { purpose },
          // Overrides the client's JSON default; the browser adds the boundary.
          headers: { "Content-Type": "multipart/form-data" },
        },
      ),
    );
  } catch (error) {
    throw new Error(uploadErrorMessage(error));
  }
}

function uploadErrorMessage(error: unknown): string {
  const status = isAxiosError(error) ? error.response?.status : undefined;
  if (status === 413) return "A imagem deve ter no máximo 10 MB.";
  if (status === 400)
    return "Formato não suportado. Use JPEG, PNG, WebP, AVIF ou GIF.";
  if (status === 429) return "Muitos envios seguidos. Tente em instantes.";
  if (status === 503) return "Envio de imagens indisponível no momento.";
  return "Não foi possível enviar a imagem.";
}

/**
 * uploadImage with a loading/success/error toast. Resolves to null on failure
 * (the toast already told the user), so callers only handle the happy path.
 */
export async function uploadWithToast(
  file: File,
  purpose: UploadPurpose,
  messages: { loading: string; success: string },
): Promise<UploadedImage | null> {
  const upload = uploadImage(file, purpose);
  toast.promise(upload, {
    ...messages,
    error: (error: Error) => error.message,
  });
  try {
    return await upload;
  } catch {
    return null;
  }
}
