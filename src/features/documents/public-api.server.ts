import { cacheLife, cacheTag } from "next/cache";
import type {
  ApiResponse,
  DocumentFull,
  ProfilePublic,
} from "@/types/api.types";

/**
 * Server-side fetch for the public read route GET /api/v1/documents/:username/:slug.
 *
 * This intentionally does NOT use `apiClient`: that instance imports
 * `useAuthStore`, which initializes zustand `persist` against `localStorage`
 * (unavailable on the server). Native `fetch` is the only server-safe option
 * here and is the sole exception to the "always use apiClient" rule, which
 * exists for the client (bearer-token) context.
 *
 * The route is public: the backend treats `jwtVerify` as optional and returns
 * `likes.likedByMe: null` for anonymous readers, so no Authorization header is
 * sent (there is no session on the server to forward).
 *
 * `"use cache"` with the `minutes` profile dedupes the call shared by
 * `generateMetadata` and the page and keeps repeat reads fast; an edit shows up
 * within about a minute. A 404 result (`null`) is cached too.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchPublicDocument(
  username: string,
  slug: string,
): Promise<DocumentFull | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`doc:${username}/${slug}`);

  const url = `${API_BASE_URL}/api/v1/documents/${encodeURIComponent(username)}/${encodeURIComponent(slug)}`;

  const response = await fetch(url);

  // 404 covers: missing doc, non-published doc, and deleted user/doc — the
  // backend collapses all of them into "Document not found".
  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(
      `Failed to load document "${username}/${slug}": ${response.status} ${response.statusText}`,
    );
  }

  const body = (await response.json()) as ApiResponse<DocumentFull>;
  return body.data;
}

export const getPublicDocument = fetchPublicDocument;

// =============================================================================
// PROFILE ROUTES
//
// Same server-safe rationale as the document fetch above: no apiClient, no
// Authorization header (the session lives in localStorage, unreachable from a
// Server Component) and the same `"use cache"` profile.
// =============================================================================

/**
 * GET /api/v1/profiles/:username.
 *
 * Returns null on 404, which the backend returns when the user or profile does
 * not exist or was soft-deleted. A private profile is NOT a 404: it resolves
 * 200 with the redacted shape (bio/socialLinks null, createdAt epoched), so
 * "private" must be read from the payload, never from a missing field.
 */
async function fetchPublicProfile(
  username: string,
): Promise<ProfilePublic | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`profile:${username}`);

  const url = `${API_BASE_URL}/api/v1/profiles/${encodeURIComponent(username)}`;

  const response = await fetch(url);

  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(
      `Failed to load profile "${username}": ${response.status} ${response.statusText}`,
    );
  }

  const body = (await response.json()) as ApiResponse<ProfilePublic>;
  return body.data;
}

export const getPublicProfile = fetchPublicProfile;
