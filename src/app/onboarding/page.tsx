"use client";

import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import * as React from "react";
import { AppsStep } from "@/components/onboarding/apps-step";
import { ConfirmStep } from "@/components/onboarding/confirm-step";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { Button } from "@/components/ui/button";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  OnboardingStatusData,
  PlatformApp,
} from "@/types/api.types";

export type Step = "welcome" | "apps" | "done";

const ORDER: Step[] = ["welcome", "apps", "done"];

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  // Direction (1 forward, -1 back) travels with the step so the exit and enter slide the same way.
  const [[step, direction], setNav] = React.useState<[Step, number]>([
    "welcome",
    1,
  ]);
  const setStep = (next: Step) =>
    setNav(([current]) => [
      next,
      ORDER.indexOf(next) >= ORDER.indexOf(current) ? 1 : -1,
    ]);
  const offset = reduceMotion ? 0 : 16;
  // Setup has started: the API calls are running, so no going back to edit.
  const [locked, setLocked] = React.useState(false);
  // Slugs of the apps picked in the catalog step. The API activates apps by
  // slug, so the selection is stored (and resolved) with that same key.
  const [selected, setSelected] = React.useState<string[]>([]);

  const statusQuery = useQuery({
    queryKey: ["onboarding-status"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<OnboardingStatusData>>(
        "/api/v1/auth/onboarding/status",
      );
      return response.data.data;
    },
  });

  const appsQuery = useQuery({
    queryKey: ["platform-apps"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<PlatformApp[]>>(
        "/api/v1/platform-apps",
      );
      return response.data.data;
    },
  });

  React.useEffect(() => {
    if (statusQuery.data?.step === "complete") {
      router.replace("/dashboard");
    }
  }, [statusQuery.data?.step, router]);

  const displayName =
    statusQuery.data?.profile.displayName ??
    statusQuery.data?.profile.username ??
    statusQuery.data?.user.username;

  const status = statusQuery.data;
  const badge = status && {
    handle: status.profile.username ?? status.user.username,
    avatarUrl: status.profile.avatarUrl,
    memberSince: status.user.createdAt,
    memberId: status.user.id.replace(/-/g, "").slice(0, 6).toUpperCase(),
  };

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />
      <OnboardingShell step={step} onStepClick={locked ? undefined : setStep}>
        {statusQuery.isPending && (
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <p className="text-sm text-muted-foreground animate-pulse">
              {t("loadingAccount")}
            </p>
          </div>
        )}
        {statusQuery.isError && (
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="border border-border rounded-xs p-8 max-w-md w-full">
              <p className="text-sm text-muted-foreground mb-6">
                {t("loadError")}
              </p>
              <Button variant="outline" onClick={() => statusQuery.refetch()}>
                {tc("retry")}
              </Button>
            </div>
          </div>
        )}
        {statusQuery.data && (
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * offset }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: -d * offset }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="flex-1 flex flex-col"
            >
              {step === "welcome" && displayName && (
                <WelcomeStep
                  username={displayName}
                  onNext={() => setStep("apps")}
                  needsUsername={statusQuery.data.step === "username"}
                  badge={badge ?? undefined}
                />
              )}
              {step === "apps" && (
                <>
                  {appsQuery.isPending && (
                    <div className="flex-1 flex items-center justify-center px-6 py-16">
                      <p className="text-sm text-muted-foreground animate-pulse">
                        {t("loadingApps")}
                      </p>
                    </div>
                  )}
                  {appsQuery.isError && (
                    <div className="flex-1 flex items-center justify-center px-6 py-16">
                      <div className="border border-border rounded-xs p-8 max-w-md w-full">
                        <p className="text-sm text-muted-foreground mb-6">
                          {t("appsError")}
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => appsQuery.refetch()}
                        >
                          {tc("retry")}
                        </Button>
                      </div>
                    </div>
                  )}
                  {appsQuery.data && (
                    <AppsStep
                      apps={appsQuery.data}
                      initial={selected}
                      onBack={() => setStep("welcome")}
                      onConfirm={(slugs) => {
                        setSelected(slugs);
                        setStep("done");
                      }}
                    />
                  )}
                </>
              )}
              {step === "done" && (
                <ConfirmStep
                  username={displayName ?? ""}
                  apps={(appsQuery.data ?? []).filter((a) =>
                    selected.includes(a.slug),
                  )}
                  onBack={() => setStep("apps")}
                  onLock={() => setLocked(true)}
                  badge={badge ?? undefined}
                />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </OnboardingShell>
    </section>
  );
}
