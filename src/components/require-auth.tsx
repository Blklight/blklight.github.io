"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface RequireAuthProps {
  children: React.ReactNode;
}

/**
 * Client-side guard for authenticated-only routes.
 *
 * Mirrors the /dashboard pattern: wait for the persisted session to hydrate
 * before deciding, and send anonymous visitors to "/" with a replace (no
 * history entry for the protected page).
 *
 * Nothing is rendered while the session is unknown or missing, so protected
 * content (e.g. the editor) never flashes for an anonymous visitor.
 */
export function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const check = () => {
      if (!useAuthStore.getState().isAuthenticated) {
        router.replace("/");
      }
    };
    if (useAuthStore.persist.hasHydrated()) {
      check();
      return;
    }
    return useAuthStore.persist.onFinishHydration(check);
  }, [router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return <>{children}</>;
}
