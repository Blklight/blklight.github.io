"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, PlatformApp } from "@/types/api.types";
import { MemberBadge } from "./member-badge";
import { SetupProgress, type SetupTask } from "./setup-progress";
import { SimpleFlipCard } from "./simple-flip-card";
import { StepFooter } from "./step-footer";

interface Props {
  username: string;
  apps: PlatformApp[];
  onBack: () => void;
  /** Called once setup starts: from then on the flow can't go back. */
  onLock?: () => void;
  badge?: {
    handle: string;
    avatarUrl?: string | null;
    memberSince: string;
    memberId: string;
  };
}

type Phase = "review" | "setup" | "confirmed";

// Time to see the stamp land before leaving for the dashboard.
const STAMP_HOLD_MS = 1100;

const describeError = (cause: unknown) => {
  const body = axios.isAxiosError(cause)
    ? (cause.response?.data as ApiResponse<null> | undefined)
    : undefined;
  return (
    body?.error?.message ??
    body?.message ??
    "Não foi possível concluir. Tente novamente."
  );
};

export const ConfirmStep = ({
  username,
  apps,
  onBack,
  onLock,
  badge,
}: Props) => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [phase, setPhase] = useState<Phase>("review");

  const tasks: SetupTask[] = [
    {
      label:
        apps.length === 1 ? "Ativando 1 app" : `Ativando ${apps.length} apps`,
      run: () =>
        apiClient.post<ApiResponse<null>>("/api/v1/platform-apps/me", {
          apps: apps.map((a) => a.slug),
        }),
    },
    {
      label: "Concluindo seu perfil",
      run: async () => {
        await apiClient.post<ApiResponse<null>>(
          "/api/v1/auth/onboarding/complete",
        );
        const currentUser = useAuthStore.getState().user;
        if (currentUser) setUser({ ...currentUser, onboardingComplete: true });
      },
    },
    {
      label: "Preparando o dashboard",
      run: async () => router.prefetch("/dashboard"),
    },
  ];

  const finish = () => {
    setPhase("confirmed");
    setTimeout(() => router.push("/dashboard"), STAMP_HOLD_MS);
  };

  const review = phase === "review";

  return (
    <div className="flex-1 flex flex-col px-6 md:px-10 pt-12">
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] gap-12 lg:gap-16 items-start pb-12">
        {badge && (
          <div className="mx-auto lg:mx-0 lg:sticky lg:top-8">
            <MemberBadge
              name={username}
              handle={badge.handle}
              avatarUrl={badge.avatarUrl}
              memberSince={badge.memberSince}
              memberId={badge.memberId}
              apps={apps}
              confirmed={phase === "confirmed"}
            />
          </div>
        )}

        <div className="min-w-0">
          <h1 className="font-sans text-5xl md:text-6xl font-bold tracking-tight leading-[1.02] mb-6 wrap-anywhere">
            {review ? (
              <>
                Tudo pronto,{" "}
                <span className="text-blklight-500 dark:text-blklight-400">
                  {username}
                </span>
                .
              </>
            ) : phase === "setup" ? (
              "Configurando seu espaço…"
            ) : (
              "Crachá confirmado."
            )}
          </h1>

          {review ? (
            <>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                Confira seu crachá.{" "}
                {apps.length === 1
                  ? "Este app vai aparecer no seu menu e no seu dashboard."
                  : `Estes ${apps.length} apps vão aparecer no seu menu e no seu dashboard.`}{" "}
                Dá para mudar depois.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {apps.map((app) => (
                  <li key={app.id}>
                    <SimpleFlipCard app={app} selected mode="display" />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                {phase === "setup"
                  ? "Só um instante: estamos ligando tudo para você."
                  : "Levando você para o dashboard."}
              </p>
              <SetupProgress
                tasks={tasks}
                onDone={finish}
                describeError={describeError}
              />
            </>
          )}
        </div>
      </div>

      {review && (
        <StepFooter
          onBack={onBack}
          label="Confirmar"
          onNext={() => {
            onLock?.();
            setPhase("setup");
          }}
        />
      )}
    </div>
  );
};
