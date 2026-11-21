"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/badge";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, PlatformApp } from "@/types/api.types";
import { AppTile } from "./app-tile";
import { BADGE_LAYOUT, BadgeStage } from "./badge-stage";
import { SetupProgress, type SetupTask } from "./setup-progress";
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
      <div className={BADGE_LAYOUT}>
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
                Confira seu crachá ao lado; os apps ficam no verso.{" "}
                {apps.length === 1
                  ? "Este app vai aparecer no seu menu e no seu dashboard."
                  : `Estes ${apps.length} apps vão aparecer no seu menu e no seu dashboard.`}{" "}
                Dá para mudar depois.
              </p>
              <ul className="grid max-w-2xl grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
                {apps.map((app) => (
                  <li key={app.id}>
                    <AppTile app={app} selected />
                  </li>
                ))}
              </ul>
              {badge && (
                <dl className="mt-10 grid max-w-2xl gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
                  <div>
                    <dt className="font-mono text-xs text-muted-foreground">
                      Perfil público
                    </dt>
                    <dd className="mt-1 wrap-anywhere">
                      blklight.dev/{badge.handle}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-muted-foreground">
                      Depois
                    </dt>
                    <dd className="mt-1">
                      Troque apps e foto quando quiser, na sua conta.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-muted-foreground">
                      Em seguida
                    </dt>
                    <dd className="mt-1">
                      Seu dashboard, com os apps e os textos recentes.
                    </dd>
                  </div>
                </dl>
              )}
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

        {badge && (
          <BadgeStage>
            <Badge
              status={phase === "confirmed" ? "confirmed" : "draft"}
              data={{
                name: username,
                handle: badge.handle,
                avatarUrl: badge.avatarUrl,
                memberSince: badge.memberSince,
                memberId: badge.memberId,
                apps,
              }}
            />
          </BadgeStage>
        )}
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
