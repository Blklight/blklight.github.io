"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight, PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";

interface Props {
  username: string;
  apps: PlatformApp[];
  onBack: () => void;
}

type Destination = "/dashboard" | "/escrever";

export const ConfirmStep = ({ username, apps, onBack }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const completeMutation = useMutation({
    mutationFn: async (_destination: Destination) => {
      await apiClient.post<ApiResponse<null>>("/api/v1/platform-apps/me", {
        apps: apps.map((a) => a.slug),
      });
      await apiClient.post<ApiResponse<null>>(
        "/api/v1/auth/onboarding/complete",
      );
    },
    onSuccess: (_data, destination) => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, onboardingComplete: true });
      }
      router.push(destination);
    },
    onError: (cause) => {
      const body = axios.isAxiosError(cause)
        ? (cause.response?.data as ApiResponse<null> | undefined)
        : undefined;
      setError(
        body?.error?.message ??
          body?.message ??
          "Não foi possível concluir. Tente novamente.",
      );
    },
  });

  const pending = completeMutation.isPending;
  const finish = (destination: Destination) => {
    setError(null);
    completeMutation.mutate(destination);
  };

  return (
    <div className="flex-1 flex items-center px-6 md:px-10 py-12">
      <div className="w-full max-w-3xl animate-fade-in">
        <h1 className="font-sans text-5xl md:text-6xl font-bold tracking-tight leading-[1.02] mb-6 wrap-anywhere">
          Tudo pronto,{" "}
          <span className="text-blklight-500 dark:text-blklight-400">
            {username}
          </span>
          .
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
          {apps.length === 1
            ? "Este app vai aparecer no seu menu e no seu dashboard."
            : `Estes ${apps.length} apps vão aparecer no seu menu e no seu dashboard.`}{" "}
          Você pode mudar a seleção quando quiser.
        </p>

        <ul className="border-y border-border divide-y divide-border mb-10">
          {apps.map((app) => {
            const { icon: Icon, tagline } = appMeta(app);
            return (
              <li key={app.id} className="flex items-center gap-4 py-4">
                <span className="size-10 rounded-xs bg-foreground text-background flex items-center justify-center shrink-0">
                  {Icon ? (
                    <Icon className="size-5" strokeWidth={1.75} />
                  ) : (
                    <span className="font-sans font-bold">
                      {app.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
                <div className="min-w-0">
                  <p className="font-sans font-bold">{app.name}</p>
                  {tagline && (
                    <p className="text-sm text-muted-foreground">{tagline}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <Button
            size="lg"
            onClick={() => finish("/dashboard")}
            disabled={pending}
            className="group font-mono text-xs uppercase tracking-wider rounded-xs"
          >
            {pending ? "Concluindo…" : "Ir para o dashboard"}
            <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => finish("/escrever")}
            disabled={pending}
            className="font-mono text-xs uppercase tracking-wider rounded-xs bg-transparent"
          >
            <PenLine className="mr-2 size-4" />
            Escrever meu primeiro texto
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={onBack}
            disabled={pending}
            className="font-mono text-xs uppercase tracking-wider rounded-xs"
          >
            Ajustar apps
          </Button>
        </div>

        {error && (
          <p role="alert" className="mt-6 text-sm text-destructive">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
