"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, PlatformApp } from "@/types/api.types";

interface Props {
  username: string;
  apps: PlatformApp[];
  onBack: () => void;
}

export const ConfirmStep = ({ username, apps, onBack }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  // convite sutil: 1 slot "add" enquanto a seleção for modesta (<8)
  const showAddSlot = apps.length < 8;

  const completeMutation = useMutation({
    mutationFn: async () => {
      await apiClient.post<ApiResponse<null>>("/api/v1/platform-apps/me", {
        apps: apps.map((a) => a.slug),
      });
      await apiClient.post<ApiResponse<null>>(
        "/api/v1/auth/onboarding/complete",
      );
    },
    onSuccess: () => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, onboardingComplete: true });
      }
      router.push("/dashboard");
    },
    onError: (cause) => {
      const body = axios.isAxiosError(cause)
        ? (cause.response?.data as ApiResponse<null> | undefined)
        : undefined;
      setError(
        body?.error?.message ??
          body?.message ??
          "Erro ao concluir onboarding. Tente novamente.",
      );
    },
  });

  return (
    <div className="flex-1 flex flex-col px-6 md:px-20 py-12 animate-fade-in">
      {/* HERO */}
      <div className="mb-12 max-w-3xl">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
          [ 04 ] finalizado
        </div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 leading-[0.9]">
          Tudo pronto.
        </h1>
        <p className="text-[11px] md:text-xs uppercase tracking-widest leading-relaxed text-foreground/70 max-w-xl">
          seu workspace está configurado,{" "}
          <span className="font-bold text-foreground">{username}</span>. as
          ferramentas abaixo já estão ativas e sincronizadas no seu ambiente de
          execução.
        </p>
      </div>

      {/* SUMMARY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12">
        {apps.map((a, i) => (
          <div
            key={a.id}
            style={{ animationDelay: `${i * 60}ms` }}
            className="border border-ink p-5 md:p-6 flex flex-col justify-between aspect-[3/4] bg-background text-ink shadow-pop-bl"
          >
            <div className="flex justify-between items-start gap-2">
              <span className="text-[9px] tracking-widest uppercase text-muted-foreground">
                {"// "}
                {a.category}
              </span>
              <span className="text-sm leading-none">
                <span className="sr-only">ativo</span>
                <span aria-hidden="true">[ ✓ ]</span>
              </span>
            </div>

            <div className="my-6 flex justify-center text-4xl md:text-5xl font-light leading-none select-none">
              {a.iconUrl ? (
                // biome-ignore lint/performance/noImgElement: iconUrl pode vir de host arbitrário da API; next/image exigiria allowlist de domínios
                <img
                  src={a.iconUrl}
                  alt=""
                  className="h-12 w-12 object-contain"
                />
              ) : (
                a.name.charAt(0).toUpperCase()
              )}
            </div>

            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs md:text-sm mb-1">
                {a.name}
              </h3>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tight leading-snug line-clamp-2">
                {a.tagline}
              </p>
            </div>
          </div>
        ))}

        {showAddSlot && (
          <button
            type="button"
            onClick={onBack}
            className="border border-dashed border-ink/20 aspect-[3/4] flex items-center justify-center text-[10px] uppercase tracking-widest text-muted-foreground/60 hover:text-foreground hover:border-ink/50 transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
            aria-label="adicionar mais apps"
          >
            [ + adicionar outro ]
          </button>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <button
          type="button"
          onClick={onBack}
          disabled={completeMutation.isPending}
          className="px-6 md:px-8 py-4 border hairline text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-surface transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          [ ← voltar e ajustar ]
        </button>
        <button
          type="button"
          onClick={() => completeMutation.mutate()}
          disabled={completeMutation.isPending || apps.length === 0}
          className="px-8 md:px-10 py-4 bg-ink text-background text-[11px] uppercase tracking-[0.2em] font-bold hover:shadow-pop-br [--shadow-pop-color:hsl(var(--ink))] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {completeMutation.isPending
            ? "[ ativando... ]"
            : "[ entrar no workspace ]"}
        </button>
      </div>

      {error && (
        <p className="mt-6 text-xs uppercase tracking-widest text-destructive">
          {"// "}
          {error}
        </p>
      )}
    </div>
  );
};
