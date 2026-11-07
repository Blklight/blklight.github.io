import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { ProfilePublic } from "@/types/api.types";
import {
  type AuthorDocumentsQuery,
  getAuthorDocuments,
  getCurrentProfile,
  getPublicProfile,
} from "./api";

export const profileKeys = {
  all: ["profile"] as const,
  me: () => [...profileKeys.all, "me"] as const,
  public: (username: string) =>
    [...profileKeys.all, "public", username] as const,
  documents: (username: string, params?: AuthorDocumentsQuery) =>
    [...profileKeys.all, "documents", username, params] as const,
};

/**
 * GET /api/v1/profiles/me — the signed-in user's own profile.
 * `enabled` is driven by the caller so the request waits for session
 * hydration before firing.
 */
export const useCurrentProfile = (enabled: boolean) =>
  useQuery({
    queryKey: profileKeys.me(),
    queryFn: getCurrentProfile,
    enabled,
  });

/**
 * GET /api/v1/profiles/:username — a public profile.
 *
 * `initialData` lets the server component hand over the profile it already
 * fetched for generateMetadata, so a public profile paints with no client
 * round-trip. `staleTime: 0` is deliberate: the server has no session, so for
 * a private profile the server copy is the redacted one and this must
 * revalidate with the Bearer token to reveal the accepted-follower view.
 */
export const useProfile = (
  username: string,
  options?: { initialData?: ProfilePublic },
) =>
  useQuery({
    queryKey: profileKeys.public(username),
    queryFn: () => getPublicProfile(username),
    initialData: options?.initialData,
    staleTime: 0,
  });

/**
 * GET /api/v1/profiles/:username/documents — the author's published documents,
 * cursor-paginated. Same shape and cursor semantics as useFeed, so the
 * nextCursor: null -> undefined mapping is identical; only the path differs.
 *
 * `enabled` lets the caller hold the query back while the privacy state is
 * still being resolved: a private author must not be requested as if visible.
 */
export const useAuthorDocuments = (
  username: string,
  params?: AuthorDocumentsQuery,
  options?: { enabled?: boolean },
) =>
  useInfiniteQuery({
    queryKey: profileKeys.documents(username, params),
    queryFn: ({ pageParam }) =>
      getAuthorDocuments(username, { ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: options?.enabled ?? true,
  });
