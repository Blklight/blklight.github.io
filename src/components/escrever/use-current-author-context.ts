"use client";

import { useMemo } from "react";
import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import { useCurrentProfile } from "@/features/profile/queries";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Author data of the signed-in user for display-time placeholders
 * (letterhead {{publicador}}/{{autor}} and the automatic signature).
 * displayName comes from the profile (same query/cache as the navbar);
 * username from the session. No organization: callers that know the
 * document's organization add it.
 */
export function useCurrentAuthorContext(): NonNullable<
  LetterheadTextContext["author"]
> {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const username = useAuthStore((s) => s.user?.username ?? null);
  const { data: currentProfile } = useCurrentProfile(isAuthenticated);
  const displayName = currentProfile?.displayName ?? null;
  return useMemo(() => ({ displayName, username }), [displayName, username]);
}
