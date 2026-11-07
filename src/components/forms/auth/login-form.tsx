"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, AuthResponse } from "@/types/api.types";
import { type LoginFormData, loginSchema } from "@/types/form.schemas";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/api/v1/auth/login",
        data,
      );
      return response.data;
    },
    onSuccess: (response) => {
      if (response.data) {
        setSession(response.data.user, response.data.accessToken);
        onSuccess?.();
      }
    },
    onError: (error: AxiosError<ApiResponse<null>>) => {
      const apiError = error.response?.data?.error;
      const message =
        apiError?.message ??
        error.response?.data?.message ??
        "Erro ao fazer login";

      if (apiError?.fields) {
        for (const [field, fieldError] of Object.entries(apiError.fields)) {
          form.setError(field as keyof LoginFormData, {
            message: fieldError,
          });
        }
      }

      form.setError("root", { message });
    },
  });

  return (
    <div className="my-5">
      <h3 className="text-2xl font-bold text-foreground mb-2 tracking-tight font-mono!">
        Bem-vindo de volta
      </h3>
      <p className="text-muted-foreground text-sm font-mono! mb-5">
        Entre para acessar suas ferramentas
      </p>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className=""
      >
        <FieldGroup className="gap-5">
          {/* Campo de Identificador (E-mail/Usuário) */}
          <Controller
            name="identifier"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>E-mail ou usuário</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="text"
                    placeholder="seu@email.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Campo de Senha */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="inline-start">
                    <Lock className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      size="icon-xs"
                      onClick={() => setShowPassword((prev) => !prev)}
                      title={showPassword ? "Ocultar senha" : "Ver senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-3.5 text-muted-foreground" />
                      ) : (
                        <Eye className="size-3.5 text-muted-foreground" />
                      )}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex items-center justify-between text-sm">
            <label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="remember"
            >
              <Controller
                name="rememberMe"
                control={form.control}
                render={({ field }) => (
                  <Checkbox
                    id="remember"
                    checked={field.value ?? false}
                    onCheckedChange={(checked) =>
                      field.onChange(checked === true)
                    }
                  />
                )}
              />
              {/* <input
                type="checkbox"
                className="w-4 h-4 border-border text-foreground focus:ring-foreground"
              /> */}
              <span className="text-muted-foreground text-xs">
                Lembrar de mim
              </span>
            </label>
            <button
              type="button"
              className="text-xs text-foreground hover:underline"
            >
              Esqueci a senha
            </button>
          </div>

          {/* Erro Global (Root) */}
          {form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} />
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full cursor-pointer"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : (
              <>
                <LogIn />
                Entrar
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground font-mono tracking-wider">
              ou
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <Button
            variant="outline"
            className="h-10 text-xs font-mono uppercase tracking-wider bg-transparent cursor-not-allowed"
            disabled
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <title>Google</title>
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="h-10 text-xs font-mono uppercase tracking-wider bg-transparent cursor-not-allowed"
            disabled
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Github</title>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </Button>
        </div>
      </div>
    </div>
  );
}
