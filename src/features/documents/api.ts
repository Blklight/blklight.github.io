import { apiClient, unwrap } from "@/lib/api-client";
import type {
  ApiResponse,
  Category,
  CreateDocumentRequest,
  DocumentSummary,
  DocumentWithStyle,
  FeedQuery,
  FeedResult,
  MyDocumentDetail,
  Tag,
  UpdateDocumentRequest,
} from "@/types/api.types";

export interface MyDocumentsQueryParams {
  limit?: number;
  offset?: number;
}

/**
 * GET /api/v1/documents — public feed, cursor-paginated.
 * Auth is optional on the backend: anonymous callers get every published
 * document except the ones authored by a private profile, while an accepted
 * follower of a private author still receives them. Because apiClient forwards
 * the session Bearer token when one exists, the same call is session-aware
 * without any extra wiring.
 */
export const getPublicFeed = (params: FeedQuery): Promise<FeedResult> =>
  apiClient
    .get<ApiResponse<FeedResult>>("/api/v1/documents", { params })
    .then(unwrap);

export const getMyDocuments = (
  params?: MyDocumentsQueryParams,
): Promise<DocumentSummary[]> =>
  apiClient
    .get<ApiResponse<DocumentSummary[]>>("/api/v1/documents/me", { params })
    .then(unwrap);

export const getMyDocumentById = (id: string): Promise<MyDocumentDetail> =>
  apiClient
    .get<ApiResponse<MyDocumentDetail>>(`/api/v1/documents/${id}`)
    .then(unwrap);

export const createDocument = (
  body: CreateDocumentRequest,
): Promise<DocumentWithStyle> =>
  apiClient
    .post<ApiResponse<DocumentWithStyle>>("/api/v1/documents", body)
    .then(unwrap);

export const updateDocument = (
  id: string,
  body: UpdateDocumentRequest,
): Promise<DocumentWithStyle> =>
  apiClient
    .patch<ApiResponse<DocumentWithStyle>>(`/api/v1/documents/${id}`, body)
    .then(unwrap);

export const publishDocument = (id: string): Promise<DocumentWithStyle> =>
  apiClient
    .patch<ApiResponse<DocumentWithStyle>>(`/api/v1/documents/${id}/publish`)
    .then(unwrap);

export const getCategories = (): Promise<Category[]> =>
  apiClient.get<ApiResponse<Category[]>>("/api/v1/categories").then(unwrap);

export const getPopularTags = (limit = 20): Promise<Tag[]> =>
  apiClient
    .get<ApiResponse<Tag[]>>("/api/v1/tags/popular", {
      params: { limit },
    })
    .then(unwrap);
