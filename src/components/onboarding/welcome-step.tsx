"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/badge";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/api.types";
import {
  type OnboardingFormData,
  onboardingSchema,
} from "@/types/form.schemas";
import { BADGE_LAYOUT, BadgeStage } from "./badge-stage";
import { StepFooter } from "./step-footer";

interface Props {
  username: string;
  onNext: () => void;
  needsUsername?: boolean;
  badge?: {
    handle: string;
    avatarUrl?: string | null;
    memberSince: string;
    memberId: string;
  };
}

const USERNAME_ERRORS = [
  "required",
  "too_short",
  "too_long",
  "invalid_format",
] as const;

const ROADMAP = ["badge", "apps", "confirm"] as const;

export const WelcomeStep = ({
  username,
  onNext,
  needsUsername = false,
  badge,
}: Props) => {
  const t = useTranslations("onboarding");
  const usernameError = (key?: string) =>
    USERNAME_ERRORS.find((k) => k === key)
      ? t(`usernameErrors.${key as (typeof USERNAME_ERRORS)[number]}`)
      : (key ?? "");
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { username: "" },
  });
  const typed = form.watch("username");
  const handle = needsUsername
    ? typed || t("usernamePlaceholder")
    : (badge?.handle ?? username);

  const mutation = useMutation({
    mutationFn: async (data: OnboardingFormData) => {
      const response = await apiClient.post<ApiResponse<null>>(
        "/api/v1/auth/onboarding/username",
        data,
      );
      return response.data;
    },
    onSuccess: (_response, variables) => {
      const currentUser = useAuthStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, username: variables.username });
      }
      onNext();
    },
    onError: (error) => {
      const body = axios.isAxiosError(error)
        ? (error.response?.data as ApiResponse<null> | undefined)
        : undefined;
      const fields = body?.error?.fields;
      if (fields?.username) {
        form.setError("username", { message: fields.username });
        return;
      }
      form.setError("root", {
        message: body?.message ?? t("usernameSaveError"),
      });
    },
  });

  return (
    <div className="flex-1 flex flex-col px-6 md:px-10 pt-12">
      <div className={BADGE_LAYOUT}>
        <div>
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] mb-6 wrap-anywhere">
            {needsUsername ? t("welcomeTo") : t("hello")}
            <span className="text-blklight-500 dark:text-blklight-400">
              {needsUsername ? "Blklight" : username}
            </span>
            .
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            {needsUsername ? t("leadNeedsUsername") : t("lead")}
          </p>

          {needsUsername ? (
            <form
              id="username-form"
              onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
              className="max-w-md"
            >
              <Field
                data-invalid={form.formState.errors.username ? true : undefined}
              >
                <FieldLabel htmlFor="username">{t("username")}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...form.register("username")}
                    id="username"
                    placeholder={t("usernamePlaceholder")}
                    autoComplete="username"
                    aria-invalid={!!form.formState.errors.username}
                  />
                  <InputGroupAddon align="inline-start">@</InputGroupAddon>
                </InputGroup>
                {form.formState.errors.username && (
                  <FieldError
                    errors={[
                      {
                        message: usernameError(
                          form.formState.errors.username.message,
                        ),
                      },
                    ]}
                  />
                )}
              </Field>

              {form.formState.errors.root && (
                <p role="alert" className="mt-3 text-sm text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}
            </form>
          ) : null}

          <ol className="mt-12 grid max-w-xl gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {ROADMAP.map((item, i) => (
              <li key={item} className={cn(i > 0 && "text-muted-foreground")}>
                <p className="font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 font-sans text-sm font-bold">
                  {t(`roadmap.${item}.title`)}
                </p>
                <p className="mt-1 text-xs leading-relaxed">
                  {t(`roadmap.${item}.text`)}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <BadgeStage>
          {badge ? (
            <Badge
              status="draft"
              data={{
                name: username,
                handle,
                avatarUrl: badge.avatarUrl,
                memberSince: badge.memberSince,
                memberId: badge.memberId,
              }}
            />
          ) : (
            <p className="font-sans text-2xl md:text-3xl font-bold tracking-tight wrap-anywhere">
              blklight.dev/{handle}
            </p>
          )}
        </BadgeStage>
      </div>

      {needsUsername ? (
        <StepFooter
          form="username-form"
          label={mutation.isPending ? t("saving") : t("saveAndContinue")}
          disabled={mutation.isPending}
        />
      ) : (
        <StepFooter label={t("start")} onNext={onNext} />
      )}
    </div>
  );
};
