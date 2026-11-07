import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AdminUsersQueryParams,
  CreateAppInvitePayload,
  UpdatePlatformAppPayload,
} from "@/types/api.types";
import {
  createAppInvite,
  createPlatformApp,
  getAdminApps,
  getAdminChatServers,
  getAdminOverview,
  getAdminUserDetail,
  getAdminUsers,
  getAppInvites,
  updatePlatformApp,
  updateUserRole,
} from "./api";

type AdminUsersResult = Awaited<ReturnType<typeof getAdminUsers>>;

export const adminKeys = {
  all: ["admin"] as const,
  overview: () => [...adminKeys.all, "overview"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  userList: (params: AdminUsersQueryParams) =>
    [...adminKeys.users(), params] as const,
  userDetail: (id: string) => [...adminKeys.users(), "detail", id] as const,
  apps: () => [...adminKeys.all, "apps"] as const,
  appCatalog: () => [...adminKeys.apps(), "catalog"] as const,
  appInvites: (appId: string) =>
    [...adminKeys.apps(), "invites", appId] as const,
  chatServers: () => [...adminKeys.all, "chatServers"] as const,
};

export const useAdminOverview = () =>
  useQuery({
    queryKey: adminKeys.overview(),
    queryFn: getAdminOverview,
  });

export const useAdminUsers = (params: AdminUsersQueryParams) =>
  useQuery({
    queryKey: adminKeys.userList(params),
    queryFn: () => getAdminUsers(params),
    placeholderData: (previous: AdminUsersResult | undefined) => previous,
  });

export const useAdminUserDetail = (id: string) =>
  useQuery({
    queryKey: adminKeys.userDetail(id),
    queryFn: () => getAdminUserDetail(id),
    enabled: !!id,
  });

export const useAdminApps = () =>
  useQuery({
    queryKey: adminKeys.appCatalog(),
    queryFn: getAdminApps,
  });

export const useAdminChatServers = () =>
  useQuery({
    queryKey: adminKeys.chatServers(),
    queryFn: getAdminChatServers,
  });

export const useAppInvites = (appId: string) =>
  useQuery({
    queryKey: adminKeys.appInvites(appId),
    queryFn: () => getAppInvites(appId),
    enabled: !!appId,
  });

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: "user" | "admin" }) =>
      updateUserRole(id, role),
    onSuccess: (_data, { id }) => {
      void queryClient.invalidateQueries({
        queryKey: adminKeys.userDetail(id),
      });
      void queryClient.invalidateQueries({ queryKey: adminKeys.users() });
    },
  });
};

export const useCreatePlatformApp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlatformApp,
    onSuccess: () => {
      // Duas keys distintas precisam ser invalidadas:
      // - adminKeys.appCatalog(): lista do admin (catálogo completo, incl. inativos)
      // - ["platform-apps"]: catálogo público do onboarding (só ativos),
      //   mesma rota GET /api/v1/platform-apps usada em onboarding/page.tsx
      // NÃO remover nenhuma: apontam pra rotas/dados diferentes e NÃO são
      // redundantes entre si, embora antes colidissem por coincidência de key.
      void queryClient.invalidateQueries({ queryKey: adminKeys.appCatalog() });
      void queryClient.invalidateQueries({ queryKey: ["platform-apps"] });
    },
  });
};

export const useUpdatePlatformApp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: UpdatePlatformAppPayload;
    }) => updatePlatformApp(id, body),
    onSuccess: () => {
      // Duas keys distintas precisam ser invalidadas:
      // - adminKeys.appCatalog(): lista do admin (catálogo completo, incl. inativos)
      // - ["platform-apps"]: catálogo público do onboarding (só ativos),
      //   mesma rota GET /api/v1/platform-apps usada em onboarding/page.tsx
      // NÃO remover nenhuma: apontam pra rotas/dados diferentes e NÃO são
      // redundantes entre si, embora antes colidissem por coincidência de key.
      void queryClient.invalidateQueries({ queryKey: adminKeys.appCatalog() });
      void queryClient.invalidateQueries({ queryKey: ["platform-apps"] });
    },
  });
};

export const useCreateAppInvite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      appId,
      body,
    }: {
      appId: string;
      body: CreateAppInvitePayload;
    }) => createAppInvite(appId, body),
    onSuccess: (_data, { appId }) => {
      void queryClient.invalidateQueries({
        queryKey: adminKeys.appInvites(appId),
      });
    },
  });
};
