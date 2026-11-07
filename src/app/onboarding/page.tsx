"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import * as React from "react";
import { AppsStep } from "@/components/onboarding/apps-step";
import { ConfirmStep } from "@/components/onboarding/confirm-step";
import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { WelcomeStep } from "@/components/onboarding/welcome-step";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  OnboardingStatusData,
  PlatformApp,
} from "@/types/api.types";

export type Step = "welcome" | "apps" | "done";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<Step>("welcome");
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

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />
      <OnboardingShell step={step}>
        {statusQuery.isPending && (
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
              [ carregando sessão... ]
            </div>
          </div>
        )}
        {statusQuery.isError && (
          <div className="flex-1 flex items-center justify-center px-6 py-16">
            <div className="border hairline p-8 max-w-md w-full">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                {"// falha ao carregar status do onboarding"}
                {statusQuery.error instanceof Error &&
                  statusQuery.error.message !== "" &&
                  ` // ${statusQuery.error.message}`}
              </p>
              <button
                type="button"
                onClick={() => statusQuery.refetch()}
                className="text-xs uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
              >
                [ tentar novamente ]
              </button>
            </div>
          </div>
        )}
        {statusQuery.data && step === "welcome" && displayName && (
          <WelcomeStep
            username={displayName}
            totalApps={appsQuery.data?.length ?? 0}
            onNext={() => setStep("apps")}
            needsUsername={statusQuery.data.step === "username"}
          />
        )}
        {statusQuery.data && step === "apps" && (
          <>
            {appsQuery.isPending && (
              <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
                  [ carregando catálogo... ]
                </div>
              </div>
            )}
            {appsQuery.isError && (
              <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="border hairline p-8 max-w-md w-full">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
                    {"// falha ao carregar catálogo de apps"}
                  </p>
                  <button
                    type="button"
                    onClick={() => appsQuery.refetch()}
                    className="text-xs uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                  >
                    [ tentar novamente ]
                  </button>
                </div>
              </div>
            )}
            {appsQuery.data && (
              <AppsStep
                apps={appsQuery.data}
                initial={selected}
                onConfirm={(slugs) => {
                  setSelected(slugs);
                  setStep("done");
                }}
              />
            )}
          </>
        )}
        {statusQuery.data && step === "done" && (
          <ConfirmStep
            username={displayName ?? ""}
            apps={(appsQuery.data ?? []).filter((a) =>
              selected.includes(a.slug),
            )}
            onBack={() => setStep("apps")}
          />
        )}
      </OnboardingShell>
    </section>
  );
}
