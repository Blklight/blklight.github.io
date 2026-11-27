"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
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

const apiMessage = (cause: unknown) => {
  const body = axios.isAxiosError(cause)
    ? (cause.response?.data as ApiResponse<null> | undefined)
    : undefined;
  return body?.error?.message ?? body?.message;
};

export const ConfirmStep = ({
  username,
  apps,
  onBack,
  onLock,
  badge,
}: Props) => {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [phase, setPhase] = useState<Phase>("review");
  const describeError = (cause: unknown) =>
    apiMessage(cause) ?? t("finishError");

  const tasks: SetupTask[] = [
    {
      label: t("taskActivating", { count: apps.length }),
      run: () =>
        apiClient.post<ApiResponse<null>>("/api/v1/platform-apps/me", {
          apps: apps.map((a) => a.slug),
        }),
    },
    {
      label: t("taskProfile"),
      run: async () => {
        await apiClient.post<ApiResponse<null>>(
          "/api/v1/auth/onboarding/complete",
        );
        const currentUser = useAuthStore.getState().user;
        if (currentUser) setUser({ ...currentUser, onboardingComplete: true });
      },
    },
    {
      label: t("taskDashboard"),
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
                {t("allSet")}{" "}
                <span className="text-blklight-500 dark:text-blklight-400">
                  {username}
                </span>
                .
              </>
            ) : phase === "setup" ? (
              t("settingUp")
            ) : (
              t("badgeConfirmed")
            )}
          </h1>

          {review ? (
            <>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                {t("confirmLead", { count: apps.length })}
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
                      {t("publicProfile")}
                    </dt>
                    <dd className="mt-1 wrap-anywhere">
                      blklight.dev/{badge.handle}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-muted-foreground">
                      {t("later")}
                    </dt>
                    <dd className="mt-1">{t("laterText")}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs text-muted-foreground">
                      {t("next")}
                    </dt>
                    <dd className="mt-1">{t("nextText")}</dd>
                  </div>
                </dl>
              )}
            </>
          ) : (
            <>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
                {phase === "setup" ? t("settingUpLead") : t("redirecting")}
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
          label={t("confirm")}
          onNext={() => {
            onLock?.();
            setPhase("setup");
          }}
        />
      )}
    </div>
  );
};
