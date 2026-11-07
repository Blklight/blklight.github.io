import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  DocumentType,
  FeedResult,
  ProfileMe,
  ProfilePublic,
} from "@/types/api.types";

/**
 * Query params accepted by GET /api/v1/profiles/:username/documents.
 * Narrower than FeedQuery: the author endpoint filters by type only, and
 * paginates with the same keyset cursor.
 */
export interface AuthorDocumentsQuery {
  cursor?: string;
  limit?: number;
  type?: DocumentType;
}

/**
 * GET /api/v1/profiles/:username — public profile.
 *
 * Auth is optional on the backend. Without a session the response is the
 * redacted shape: for a private profile the backend nulls `bio`/`socialLinks`
 * and zeroes `createdAt`, and reports `followStatus` other than "accepted".
 * With a session it resolves `isFollowing`/`followStatus`, which is what makes
 * a private profile readable for an accepted follower.
 */
export const getPublicProfile = (username: string): Promise<ProfilePublic> =>
  apiClient
    .get<ApiResponse<ProfilePublic>>(
      `/api/v1/profiles/${encodeURIComponent(username)}`,
    )
    .then((r) => r.data.data!);

/**
 * GET /api/v1/profiles/:username/documents — the author's published documents.
 * Same `{ items, nextCursor, total }` shape as the public feed, so the items
 * are plain DocumentCard and render with DocumentFeedCard. A private author the
 * viewer may not see resolves to an empty result, not a 404 — the profile
 * response is the only reliable signal for that state.
 */
export const getAuthorDocuments = (
  username: string,
  params?: AuthorDocumentsQuery,
): Promise<FeedResult> =>
  apiClient
    .get<ApiResponse<FeedResult>>(
      `/api/v1/profiles/${encodeURIComponent(username)}/documents`,
      { params },
    )
    .then((r) => r.data.data!);

export const getCurrentProfile = (): Promise<ProfileMe> =>
  apiClient
    .get<ApiResponse<ProfileMe>>("/api/v1/profiles/me")
    .then((r) => r.data.data!);
