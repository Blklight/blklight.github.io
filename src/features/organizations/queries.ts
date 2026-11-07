import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { Organization } from "@/types/api.types";
import {
  getMyOrganizations,
  getOrganization,
  getOrganizationDocuments,
  type OrganizationDocumentsQuery,
} from "./api";

export const organizationKeys = {
  all: ["organizations"] as const,
  mine: () => [...organizationKeys.all, "mine"] as const,
  detail: (orgname: string) =>
    [...organizationKeys.all, "detail", orgname] as const,
  documents: (orgname: string, params?: OrganizationDocumentsQuery) =>
    [...organizationKeys.all, "documents", orgname, params] as const,
};

/**
 * GET /api/v1/organizations/me — organizations of the signed-in user.
 *
 * The endpoint requires a session, so `enabled` is driven by the caller and
 * must stay false until the persisted session has hydrated; otherwise the
 * request would answer 401 and the client interceptor would tear the session
 * down.
 */
export const useMyOrganizations = (enabled: boolean) =>
  useQuery({
    queryKey: organizationKeys.mine(),
    queryFn: getMyOrganizations,
    enabled,
  });

/**
 * GET /api/v1/org/:orgname — one organization by its public handle.
 *
 * `initialData` lets the server component hand over the organization it
 * already fetched for generateMetadata, so the page paints with no client
 * round-trip.
 */
export const useOrganization = (
  orgname: string,
  options?: { initialData?: Organization },
) =>
  useQuery({
    queryKey: organizationKeys.detail(orgname),
    queryFn: () => getOrganization(orgname),
    initialData: options?.initialData,
  });

/**
 * GET /api/v1/org/:orgname/documents — documents of an organization,
 * cursor-paginated.
 *
 * Same shape and cursor semantics as useFeed: `nextCursor: null` maps to
 * `undefined`, which is how TanStack Query v5 signals "no more pages".
 */
export const useOrganizationDocuments = (
  orgname: string,
  params?: OrganizationDocumentsQuery,
  options?: { enabled?: boolean },
) =>
  useInfiniteQuery({
    queryKey: organizationKeys.documents(orgname, params),
    queryFn: ({ pageParam }) =>
      getOrganizationDocuments(orgname, { ...params, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    enabled: options?.enabled ?? true,
  });
