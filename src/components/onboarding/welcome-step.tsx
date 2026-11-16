"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Grainient from "@/components/Grainient";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/api.types";
import {
  type OnboardingFormData,
  onboardingSchema,
} from "@/types/form.schemas";

interface Props {
  username: string;
  onNext: () => void;
  needsUsername?: boolean;
}

const errorMessages: Record<string, string> = {
  required: "Campo obrigatório",
  too_short: "Use pelo menos 3 caracteres",
  too_long: "Use no máximo 30 caracteres",
  invalid_format: "Apenas letras, números e underscore",
};

const t = (key: string) => errorMessages[key] ?? key;

const CTA_CLASS = "group font-mono text-xs uppercase tracking-wider rounded-xs";

export const WelcomeStep = ({
  username,
  onNext,
  needsUsername = false,
}: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const reduceMotion = useReducedMotion();

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { username: "" },
  });
  const typed = form.watch("username");
  const handle = needsUsername ? typed || "seu_usuario" : username;

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

  useEffect(() => {
    if (needsUsername) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "BUTTON") return;
      if (e.key === "Enter") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, needsUsername]);

  return (
    <div className="flex-1 flex items-center px-6 md:px-10 py-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16 items-center animate-fade-in">
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
              ? "Antes de começar, escolha o username que vai aparecer no seu perfil e nos seus textos publicados."
              : "Em dois passos você escolhe as ferramentas que quer por perto e já pode começar a escrever."}
          </p>

          {needsUsername ? (
            <form
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

              <Button
                type="submit"
                size="lg"
                disabled={mutation.isPending}
                className={`${CTA_CLASS} mt-6`}
              >
                {mutation.isPending ? "Salvando…" : "Salvar e continuar"}
                <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Button size="lg" onClick={onNext} className={CTA_CLASS}>
                Começar
                <ArrowRight className="ml-3 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <p className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                ou pressione <Kbd className="border">Enter</Kbd>
              </p>
            </div>
          )}
        </div>

        <aside
          aria-label="Prévia do seu endereço público"
          className="relative overflow-hidden rounded-xs min-h-72 text-light"
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
          <div className="relative z-10 h-full min-h-72 flex flex-col justify-end p-8">
            <p className="text-sm text-light/75 mb-2">
              Seu perfil público fica em
            </p>
            <p className="font-sans text-2xl md:text-3xl font-bold tracking-tight wrap-anywhere">
              blklight.dev/{handle}
            </p>
            <p className="text-sm text-light/75 mt-4 max-w-xs">
              É onde seus textos publicados aparecem para quem te segue.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
