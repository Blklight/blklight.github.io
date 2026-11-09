import axios from "axios";
import { endSessionLocal } from "@/lib/session";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/api.types";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Raw axios client used exclusively for /auth/refresh (no interceptors)
const refreshClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * Extract `data` from the API envelope, failing loudly when it is missing so
 * an empty response surfaces at the call instead of as `undefined` later.
 */
export function unwrap<T>(response: { data: ApiResponse<T> }): T {
  const { data, message } = response.data;
  if (data === null || data === undefined) {
    throw new Error(message || "Empty API response");
  }
  return data;
}

let refreshPromise: Promise<string> | null = null;

let isRedirecting = false;

export function refreshAccessToken(): Promise<string> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const response = await refreshClient.post("/api/v1/auth/refresh");
    const newAccessToken = response.data?.data?.accessToken as
      | string
      | undefined;

    if (!newAccessToken) {
      throw new Error("No access token in refresh response");
    }

    const { setSession, user } = useAuthStore.getState();
    setSession(user ?? response.data?.data?.user ?? null, newAccessToken);

    return newAccessToken;
  })()
    .catch((refreshError) => {
      const status = refreshError.response?.status;

      if (status === 401) {
        endSessionLocal();
        if (typeof window !== "undefined" && !isRedirecting) {
          isRedirecting = true;
          window.location.assign("/");
        }
      }

      throw refreshError;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Never attempt refresh for these endpoints
    const skipRefreshUrls = [
      "/api/v1/auth/login",
      "/api/v1/auth/register",
      "/api/v1/auth/refresh",
      "/api/v1/auth/logout",
    ];

    const requestUrl = originalRequest?.url ?? "";

    const shouldAttemptRefresh =
      error.response?.status === 401 &&
      originalRequest &&
      originalRequest.headers?.Authorization &&
      !skipRefreshUrls.some((u) => requestUrl.includes(u)) &&
      originalRequest._retried !== true;

    if (shouldAttemptRefresh) {
      originalRequest._retried = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient.request(originalRequest);
      } catch {
        return Promise.reject(error);
      }
    }

    // Legacy behavior: 401 without Authorization header
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest.headers?.Authorization
    ) {
      endSessionLocal();
      if (typeof window !== "undefined" && !isRedirecting) {
        isRedirecting = true;
        window.location.assign("/");
      }
    }

    return Promise.reject(error);
  },
);
