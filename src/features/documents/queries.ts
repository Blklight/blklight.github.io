import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import type {
  CreateDocumentRequest,
  DocumentWithStyle,
  FeedQuery,
  MyDocumentDetail,
  UpdateDocumentRequest,
} from "@/types/api.types";
import {
  createDocument,
  getCategories,
  getMyDocumentById,
  getMyDocuments,
  getPopularTags,
  getPublicFeed,
  type MyDocumentsQueryParams,
  publishDocument,
  updateDocument,
} from "./api";

export const documentKeys = {
  all: ["documents"] as const,
  list: (params?: MyDocumentsQueryParams) =>
    [...documentKeys.all, "list", params] as const,
  feed: (params?: FeedQuery) => [...documentKeys.all, "feed", params] as const,
  detail: (id: string) => [...documentKeys.all, "detail", id] as const,
  categories: () => [...documentKeys.all, "categories"] as const,
  tags: () => [...documentKeys.all, "tags"] as const,
};

export const useMyDocuments = (params?: MyDocumentsQueryParams) =>
  useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => getMyDocuments(params),
  });

/**
 * GET /api/v1/documents — public feed with cursor-based pagination.
 *
 * Filters belong in `params` and therefore in the queryKey: changing a filter
 * mounts a different infinite query, which starts again from a null cursor
 * instead of trying to resume a cursor that was minted for another result set.
 * getNextPageParam maps the API's `nextCursor: null` to `undefined`, which is
 * how TanStack Query v5 signals "no more pages" (hasNextPage === false).
 */
export const useFeed = (params?: FeedQuery) =>
  useInfiniteQuery({
    queryKey: documentKeys.feed(params),
    queryFn: ({ pageParam }) => getPublicFeed({ ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

/**
 * GET /api/v1/documents/:id (auth, owner). The queryKey is the canonical
 * documentKeys.detail(id), so mutations that write the same key share this
 * cache entry.
 */
export const useMyDocument = (id: string) =>
  useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => getMyDocumentById(id),
  });

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateDocumentRequest) => createDocument(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: documentKeys.list(),
      });
    },
  });
};

/**
 * Merge a PATCH/POST response into the cached MyDocumentDetail without
 * dropping fields the response does not carry. POST/PATCH/publish only return
 * DocumentWithStyle (no category/tags), so we keep whatever the GET detail
 * query had cached. Mutations that replace the whole object would wipe
 * category/tags on the first autosave.
 */
function mergeDocumentDetail(
  cached: MyDocumentDetail | undefined,
  incoming: DocumentWithStyle,
): MyDocumentDetail {
  return {
    ...(cached ?? (incoming as MyDocumentDetail)),
    ...incoming,
    category: cached?.category ?? null,
    tags: cached?.tags ?? [],
  };
}

export const useUpdateDocument = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateDocumentRequest) => updateDocument(id, body),
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: documentKeys.list(),
      });
      void queryClient.setQueryData<MyDocumentDetail>(
        documentKeys.detail(id),
        (old) => mergeDocumentDetail(old, data),
      );
    },
  });
};

export const usePublishDocument = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetId?: string) => publishDocument(targetId ?? id ?? ""),
    onSuccess: (data, targetId) => {
      void queryClient.invalidateQueries({
        queryKey: documentKeys.list(),
      });
      void queryClient.setQueryData<MyDocumentDetail>(
        documentKeys.detail(targetId ?? id ?? ""),
        (old) => mergeDocumentDetail(old, data),
      );
    },
  });
};

export const useCategories = () =>
  useQuery({
    queryKey: documentKeys.categories(),
    queryFn: getCategories,
  });

export const usePopularTags = (limit = 20) =>
  useQuery({
    queryKey: documentKeys.tags(),
    queryFn: () => getPopularTags(limit),
  });

/**
 * Orchestrated save: when `id` is provided the mutation updates the existing
 * document; otherwise it creates a new one. `id` is optional so the same hook
 * drives both the create and the edit flows. `onSuccess` receives the
 * DocumentWithStyle returned by the API.
 */
export const useSaveDocument = (id?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: CreateDocumentRequest | UpdateDocumentRequest) => {
      if (id) {
        return updateDocument(id, body as UpdateDocumentRequest);
      }
      return createDocument(body as CreateDocumentRequest);
    },
    onSuccess: (data) => {
      void queryClient.invalidateQueries({
        queryKey: documentKeys.list(),
      });
      if (id) {
        void queryClient.setQueryData<MyDocumentDetail>(
          documentKeys.detail(id),
          (old) => mergeDocumentDetail(old, data),
        );
      }
    },
  });
};
