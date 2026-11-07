"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Kbd } from "../ui/kbd";

interface Props {
  username: string;
  totalApps: number;
  onNext: () => void;
  needsUsername?: boolean;
}

const errorMessages: Record<string, string> = {
  required: "Campo obrigatório",
  too_short: "Muito curto",
  too_long: "Muito longo",
  invalid_format: "Apenas letras, números e underscore",
};

const t = (key: string) => errorMessages[key] ?? key;

export const WelcomeStep = ({
  username,
  totalApps,
  onNext,
  needsUsername = false,
}: Props) => {
  const [cursor, setCursor] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: { username: "" },
  });

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
        message: body?.message ?? "Erro ao definir username",
      });
    },
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (needsUsername) return;
      if (e.key === "Enter") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", onKey);
    const blink = setInterval(() => setCursor((c) => !c), 600);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearInterval(blink);
    };
  }, [onNext, needsUsername]);

  const meta: Array<[string, string]> = [
    ["user", `@${username}`],
    ["workspace", "vazio"],
    ["apps", `0 / ${totalApps}`],
    ["status", "pronto"],
    ["sessão", "init"],
  ];

  return (
    <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8">
      <div className="w-full animate-fade-in">
        {/* topo */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Boas-vindas
          </div>
        </div>

        {/* grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 lg:gap-12 items-start">
          {/* coluna esquerda */}
          <div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
              Olá,
              <br />
              <span className="inline-block border-b-2 border-ink pb-1">
                {username}.
              </span>
            </h1>

            <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl mb-10">
              este é o{" "}
              <span className="bg-ink text-background px-1">Blklight</span> — um
              espaço modular onde você escolhe quais ferramentas e
              funcionalidades quer ter por perto. Nada vem ativado por padrão.
              Você monta o seu próprio canivete suíço.
            </p>

            {needsUsername ? (
              <form
                onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                className="max-w-md"
              >
                <Field
                  data-invalid={
                    form.formState.errors.username ? true : undefined
                  }
                >
                  <FieldLabel
                    htmlFor="username"
                    className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    escolha seu username
                  </FieldLabel>
                  <InputGroup className="mt-2">
                    <InputGroupInput
                      {...form.register("username")}
                      id="username"
                      placeholder="seu_usuario"
                      autoComplete="username"
                      aria-invalid={!!form.formState.errors.username}
                      className="border hairline bg-transparent"
                    />
                    <InputGroupAddon align="inline-start">
                      {"@"}
                    </InputGroupAddon>
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
                  <p className="mt-3 text-xs uppercase tracking-widest text-destructive">
                    {"// "}
                    {form.formState.errors.root.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="mt-6 bg-ink text-background px-8 py-3 text-xs uppercase tracking-widest font-bold border hairline hover:shadow-pop-br [--shadow-pop-color:hsl(var(--ink))] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="inline-flex items-center gap-3">
                    {mutation.isPending ? (
                      "[ definindo... ]"
                    ) : (
                      <>
                        [ definir e começar
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                        ]
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onNext}
                  className="bg-ink text-background px-8 py-3 text-xs uppercase tracking-widest font-bold border hairline hover:shadow-pop-br [--shadow-pop-color:hsl(var(--ink))] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2 group"
                >
                  <span className="inline-flex items-center gap-3">
                    [ começar
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                    ]
                  </span>
                </button>
                <a
                  href="#dica"
                  className="px-8 py-3 text-xs uppercase tracking-widest font-bold border hairline hover:shadow-pop-bl focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                >
                  [ saber mais ]
                </a>
              </div>
            )}
          </div>

          {/* coluna direita — sys-info */}
          <aside
            className="border border-ink bg-surface p-6 shadow-pop-bl"
            style={{ animationDelay: "200ms" }}
            aria-label="painel de sistema"
          >
            <div className="text-[14px] uppercase tracking-[0.3em] text-muted-foreground mb-4 font-bold">
              perfil
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs mb-5">
              {meta.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground uppercase tracking-widest text-[10px]">
                    {k}
                  </dt>
                  <dd className="font-bold uppercase truncate">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t hairline p-4 mb-4">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                próximas etapas
              </div>
              <ul className="space-y-1.5 text-xs">
                <li>{"> "}escolher ferramentas</li>
                <li>{"> "}montar workspace</li>
                <li>{"> "}começar a usar</li>
              </ul>
            </div>

            <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
              build v0.1
            </div>
          </aside>
        </div>

        {/* dica */}
        <div
          id="dica"
          className="mt-12 pt-6 border-t hairline text-[12px] uppercase tracking-[0.25em] text-muted-foreground flex items-center gap-2 p-2"
        >
          <span>dica</span>
          <span className="text-foreground/80">
            pressione{" "}
            <Kbd data-icon="inline-end" className="translate-x-0.5 border">
              ⏎
            </Kbd>{" "}
            para avançar
          </span>
          <span aria-hidden className="ml-1 text-foreground/70">
            {cursor ? "_" : " "}
          </span>
        </div>
      </div>
    </div>
  );
};
