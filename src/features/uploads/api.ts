import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { apiClient, unwrap } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api.types";

export type UploadPurpose = "editor" | "avatar";

export type UploadErrorCode =
  | "tooLarge"
  | "unsupported"
  | "rateLimited"
  | "unavailable"
  | "failed";

/** Rejection of uploadImage; `code` picks the `upload.<code>` message. */
export class UploadError extends Error {
  constructor(readonly code: UploadErrorCode) {
    super(code);
    this.name = "UploadError";
  }
}

export interface UploadToastMessages {
  loading: string;
  success: string;
  error: (code: UploadErrorCode) => string;
}

/** Toast copy for one kind of upload, in the active locale. */
export function useUploadToast(
  kind: "photo" | "cover" | "image",
): UploadToastMessages {
  const t = useTranslations("upload");
  return {
    loading: t(`${kind}.loading`),
    success: t(`${kind}.success`),
    error: (code) => t(code),
  };
}

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
    throw new UploadError("tooLarge");
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
    throw new UploadError(uploadErrorCode(error));
  }
}

function uploadErrorCode(error: unknown): UploadErrorCode {
  const status = isAxiosError(error) ? error.response?.status : undefined;
  if (status === 413) return "tooLarge";
  if (status === 400) return "unsupported";
  if (status === 429) return "rateLimited";
  if (status === 503) return "unavailable";
  return "failed";
}

/**
 * uploadImage with a loading/success/error toast. Resolves to null on failure
 * (the toast already told the user), so callers only handle the happy path.
 */
export async function uploadWithToast(
  file: File,
  purpose: UploadPurpose,
  messages: UploadToastMessages,
): Promise<UploadedImage | null> {
  const upload = uploadImage(file, purpose);
  toast.promise(upload, {
    loading: messages.loading,
    success: messages.success,
    error: (error: unknown) =>
      messages.error(error instanceof UploadError ? error.code : "failed"),
  });
  try {
    return await upload;
  } catch {
    return null;
  }
}
