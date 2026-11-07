import { cache } from "react";
import type { ApiResponse, Organization } from "@/types/api.types";

/**
 * Server-side fetch for the public organization route GET /api/v1/org/:orgname.
 *
 * Same server-safe rationale as `features/documents/public-api.server.ts`: this
 * intentionally does NOT use `apiClient` (that instance imports
 * `useAuthStore`, whose zustand `persist` needs `localStorage`), sends no
 * Authorization header (the session lives in the browser) and uses
 * `cache: "no-store"` so the page stays a live SSR render. The React `cache`
 * wrapper dedupes the request shared by `generateMetadata` and the page.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchPublicOrganization(
  orgname: string,
): Promise<Organization | null> {
  const url = `${API_BASE_URL}/api/v1/org/${encodeURIComponent(orgname)}`;

  const response = await fetch(url, { cache: "no-store" });

  // A missing organization and a private one the viewer may not see both
  // collapse into 404, so the caller can only treat it as "not found".
  if (response.status === 404) return null;

  if (!response.ok) {
    throw new Error(
      `Failed to load organization "${orgname}": ${response.status} ${response.statusText}`,
    );
  }

  const body = (await response.json()) as ApiResponse<Organization>;
  return body.data;
}

export const getPublicOrganization = cache(fetchPublicOrganization);
