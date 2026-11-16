"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/** Sends a hydrated, signed-in session to /dashboard or /onboarding. */
export function useRedirectIfAuthenticated() {
  const router = useRouter();

  useEffect(() => {
    const check = () => {
      const { isAuthenticated, user } = useAuthStore.getState();
      if (isAuthenticated && user) {
        router.replace(user.onboardingComplete ? "/dashboard" : "/onboarding");
      }
    };
    if (useAuthStore.persist.hasHydrated()) {
      check();
      return;
    }
    return useAuthStore.persist.onFinishHydration(check);
  }, [router]);
}
