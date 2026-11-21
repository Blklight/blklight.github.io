"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useReducedMotion } from "motion/react";
import { useForm } from "react-hook-form";
import Grainient from "@/components/Grainient";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/api.types";
import {
  type OnboardingFormData,
  onboardingSchema,
} from "@/types/form.schemas";
import { MemberBadge } from "./member-badge";
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

const errorMessages: Record<string, string> = {
  required: "Campo obrigatório",
  too_short: "Use pelo menos 3 caracteres",
  too_long: "Use no máximo 30 caracteres",
  invalid_format: "Apenas letras, números e underscore",
};

const t = (key: string) => errorMessages[key] ?? key;

export const WelcomeStep = ({
  username,
  onNext,
  needsUsername = false,
  badge,
}: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const reduceMotion = useReducedMotion();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { username: "" },
  });
  const typed = form.watch("username");
  const handle = needsUsername
    ? typed || "seu_usuario"
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
        message: body?.message ?? "Não foi possível salvar o username.",
      });
    },
  });

  return (
    <div className="flex-1 flex flex-col px-6 md:px-10 pt-12">
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center pb-12">
        <div>
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.02] mb-6 wrap-anywhere">
            {needsUsername ? "Boas-vindas ao " : "Olá, "}
            <span className="text-blklight-500 dark:text-blklight-400">
              {needsUsername ? "Blklight" : username}
            </span>
            .
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-10">
            {needsUsername
              ? "Antes de começar, escolha o username do seu perfil e dos seus textos publicados. Ele já aparece no crachá ao lado."
              : "Este é o seu crachá na plataforma. Falta escolher os apps que entram nele; depois é só confirmar."}
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
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...form.register("username")}
                    id="username"
                    placeholder="seu_usuario"
                    autoComplete="username"
                    aria-invalid={!!form.formState.errors.username}
                  />
                  <InputGroupAddon align="inline-start">@</InputGroupAddon>
                </InputGroup>
                {form.formState.errors.username && (
                  <FieldError
                    errors={[
                      {
                        message: t(
                          form.formState.errors.username.message ?? "",
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
        </div>

        <aside
          aria-label="Prévia do seu crachá"
          className="relative overflow-hidden rounded-xs text-light"
        >
          <div className="absolute inset-0">
            <Grainient
              color1="#9c40f7"
              color2="#2969ff"
              color3="#252525"
              timeSpeed={reduceMotion ? 0 : 0.25}
              warpAmplitude={50}
              grainAmount={0.1}
              contrast={1.5}
              zoom={0.9}
            />
          </div>
          <div className="relative z-10 flex min-h-[32rem] items-center justify-center p-8">
            {badge ? (
              <MemberBadge
                name={username}
                handle={handle}
                avatarUrl={badge.avatarUrl}
                memberSince={badge.memberSince}
                memberId={badge.memberId}
              />
            ) : (
              <p className="font-sans text-2xl md:text-3xl font-bold tracking-tight wrap-anywhere">
                blklight.dev/{handle}
              </p>
            )}
          </div>
        </aside>
      </div>

      {needsUsername ? (
        <StepFooter
          form="username-form"
          label={mutation.isPending ? "Salvando…" : "Salvar e continuar"}
          disabled={mutation.isPending}
        />
      ) : (
        <StepFooter label="Começar" onNext={onNext} />
      )}
    </div>
  );
};
