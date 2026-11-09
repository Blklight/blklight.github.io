import { apiClient, unwrap } from "@/lib/api-client";
import type {
  ApiResponse,
  FeedResult,
  MyOrganization,
  Organization,
} from "@/types/api.types";

/**
 * Query params accepted by GET /api/v1/org/:orgname/documents.
 *
 * Same keyset cursor as the public feed, so the pagination semantics are
 * identical.
 */
export interface OrganizationDocumentsQuery {
  cursor?: string;
  limit?: number;
}

/**
 * GET /api/v1/organizations/me — organizations the signed-in user belongs to.
 *
 * Requires a session: the backend answers 401 for an anonymous caller.
 */
export const getMyOrganizations = (): Promise<MyOrganization[]> =>
  apiClient
    .get<ApiResponse<MyOrganization[]>>("/api/v1/organizations/me")
    .then(unwrap);

/**
 * GET /api/v1/org/:orgname — one organization by its public handle.
 *
 * Auth is optional: a public organization resolves 200 for anonymous
 * readers. A private organization the viewer may not see answers 404, so the
 * caller must treat "not found" as the only signal it has.
 */
export const getOrganization = (orgname: string): Promise<Organization> =>
  apiClient
    .get<ApiResponse<Organization>>(
      `/api/v1/org/${encodeURIComponent(orgname)}`,
    )
    .then(unwrap);

/**
 * GET /api/v1/org/:orgname/documents — documents published under an
 * organization.
 *
 * The response has the same `{ items, nextCursor, total }` shape as the
 * public feed, so the items are plain DocumentCard and render with
 * DocumentFeedCard.
 */
export const getOrganizationDocuments = (
  orgname: string,
  params?: OrganizationDocumentsQuery,
): Promise<FeedResult> =>
  apiClient
    .get<ApiResponse<FeedResult>>(
      `/api/v1/org/${encodeURIComponent(orgname)}/documents`,
      { params },
    )
    .then(unwrap);
