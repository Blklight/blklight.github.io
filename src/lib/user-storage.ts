import { useAuthStore } from "@/store/useAuthStore";

const BASE_KEYS = [
  "blklight-document-draft",
  "blklight-document-design-draft",
  "blklight-document-design",
  "blklight-design-templates",
  "blklight-paper-colors",
  "blklight-letterhead-styles",
  "blklight-banner-styles",
] as const;

const LEGACY_KEYS = [
  "blklight-document-draft",
  "blklight-document-design-draft",
  "blklight-document-design",
  "blklight-design-templates",
  "blklight-paper-colors",
  "blklight-letterhead-styles",
  "blklight-banner-styles",
] as const;

export function currentUserId(): string | null {
  return useAuthStore.getState().user?.id ?? null;
}

export function userScopedKey(base: string, userId = currentUserId()): string {
  return userId ? `${base}:${userId}` : base;
}

export function documentDraftKey(userId = currentUserId()): string {
  return userScopedKey("blklight-document-draft", userId);
}

export function documentDesignKey(
  documentId?: string,
  userId = currentUserId(),
): string {
  if (!documentId)
    return userScopedKey("blklight-document-design-draft", userId);
  return `blklight-document-design:${userId ?? "anonymous"}:${documentId}`;
}

export function clearUserScopedStorage(userId: string | null) {
  if (!userId || typeof localStorage === "undefined") return;

  for (const base of BASE_KEYS) {
    localStorage.removeItem(`${base}:${userId}`);
  }

  const documentPrefix = `blklight-document-design:${userId}:`;
  for (let i = localStorage.length - 1; i >= 0; i -= 1) {
    const key = localStorage.key(i);
    if (key?.startsWith(documentPrefix)) localStorage.removeItem(key);
  }
}

export function clearLegacyUnscopedStorage() {
  if (typeof localStorage === "undefined") return;

  for (const key of LEGACY_KEYS) localStorage.removeItem(key);

  for (let i = localStorage.length - 1; i >= 0; i -= 1) {
    const key = localStorage.key(i);
    if (key?.startsWith("blklight-document-design-") && !key.includes(":")) {
      localStorage.removeItem(key);
    }
  }
}
