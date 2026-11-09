"use client";

import { useEffect } from "react";
import { refreshAccessToken } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";

let checked = false;

/**
 * The persisted session outlives the refresh cookie (e.g. a session cookie
 * dropped when the browser closed). Refresh once per page load so a missing
 * cookie ends the local session instead of trusting a still-valid access token.
 */
export function SessionBootstrap() {
  useEffect(() => {
    const check = () => {
      if (checked || !useAuthStore.getState().isAuthenticated) return;
      checked = true;
      refreshAccessToken().catch(() => {});
    };
    if (useAuthStore.persist.hasHydrated()) {
      check();
      return;
    }
    return useAuthStore.persist.onFinishHydration(check);
  }, []);

  return null;
}
