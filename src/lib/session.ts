import { apiClient } from "@/lib/api-client";
import { getQueryClient } from "@/lib/query-client";
import {
  clearLegacyUnscopedStorage,
  clearUserScopedStorage,
} from "@/lib/user-storage";
import { useAuthStore } from "@/store/useAuthStore";

export function endSessionLocal() {
  const userId = useAuthStore.getState().user?.id ?? null;
  clearUserScopedStorage(userId);
  clearLegacyUnscopedStorage();
  useAuthStore.getState().clearSession();
  try {
    getQueryClient().clear();
  } catch {}
}

export async function logout() {
  try {
    await apiClient.post("/api/v1/auth/logout");
  } catch {
    // best-effort: ignore network/401 errors
  }

  endSessionLocal();
}
