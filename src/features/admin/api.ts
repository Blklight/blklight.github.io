import { apiClient, unwrap } from "@/lib/api-client";
import type {
  AdminChatServer,
  AdminOverview,
  AdminPaginatedResult,
  AdminUser,
  AdminUserDetail,
  AdminUsersQueryParams,
  ApiResponse,
  AppInvite,
  AppInviteWithProfile,
  CreateAppInvitePayload,
  CreatePlatformAppPayload,
  PlatformApp,
  UpdatePlatformAppPayload,
  UpdateUserRoleResult,
} from "@/types/api.types";

export const getAdminOverview = (): Promise<AdminOverview> =>
  apiClient
    .get<ApiResponse<AdminOverview>>("/api/v1/admin/overview")
    .then(unwrap);

export const getAdminUsers = (
  params: AdminUsersQueryParams,
): Promise<AdminPaginatedResult<AdminUser>> =>
  apiClient
    .get<ApiResponse<AdminPaginatedResult<AdminUser>>>("/api/v1/admin/users", {
      params,
    })
    .then(unwrap);

export const getAdminUserDetail = (id: string): Promise<AdminUserDetail> =>
  apiClient
    .get<ApiResponse<AdminUserDetail>>(`/api/v1/admin/users/${id}`)
    .then(unwrap);

export const updateUserRole = (
  id: string,
  role: "user" | "admin",
): Promise<UpdateUserRoleResult> =>
  apiClient
    .patch<ApiResponse<UpdateUserRoleResult>>(
      `/api/v1/admin/users/${id}/role`,
      {
        role,
      },
    )
    .then(unwrap);

export const getAdminApps = (): Promise<PlatformApp[]> =>
  apiClient
    .get<ApiResponse<PlatformApp[]>>("/api/v1/admin/platform-apps")
    .then(unwrap);

export const createPlatformApp = (
  body: CreatePlatformAppPayload,
): Promise<PlatformApp> =>
  apiClient
    .post<ApiResponse<PlatformApp>>("/api/v1/platform-apps", body)
    .then(unwrap);

export const updatePlatformApp = (
  id: string,
  body: UpdatePlatformAppPayload,
): Promise<PlatformApp> =>
  apiClient
    .patch<ApiResponse<PlatformApp>>(`/api/v1/platform-apps/${id}`, body)
    .then(unwrap);

export const createAppInvite = (
  appId: string,
  body: CreateAppInvitePayload,
): Promise<AppInvite> =>
  apiClient
    .post<ApiResponse<AppInvite>>(
      `/api/v1/platform-apps/${appId}/invites`,
      body,
    )
    .then(unwrap);

export const getAppInvites = (appId: string): Promise<AppInviteWithProfile[]> =>
  apiClient
    .get<ApiResponse<AppInviteWithProfile[]>>(
      `/api/v1/platform-apps/${appId}/invites`,
    )
    .then(unwrap);

export const getAdminChatServers = (): Promise<AdminChatServer[]> =>
  apiClient
    .get<ApiResponse<AdminChatServer[]>>("/api/v1/chat/servers/all")
    .then(unwrap);
