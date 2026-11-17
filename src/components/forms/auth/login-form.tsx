"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail } from "lucide-react";
import { useEffect, useState } from "react";
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

const REMEMBER_ME_KEY = "blklight-remember-me";
const REMEMBERED_IDENTIFIER_KEY = "blklight-remembered-identifier";

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

  useEffect(() => {
    try {
      if (localStorage.getItem(REMEMBER_ME_KEY) === "true") {
        form.setValue("rememberMe", true);
      }
      const identifier = localStorage.getItem(REMEMBERED_IDENTIFIER_KEY);
      if (identifier) form.setValue("identifier", identifier);
    } catch {}
  }, [form]);

  const mutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/api/v1/auth/login",
        data,
      );
      return response.data;
    },
    onSuccess: (response, data) => {
      try {
        if (data.rememberMe) {
          localStorage.setItem(REMEMBERED_IDENTIFIER_KEY, data.identifier);
        } else {
          localStorage.removeItem(REMEMBERED_IDENTIFIER_KEY);
        }
      } catch {}
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
    <div className="mt-6">
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
        <FieldGroup className="gap-4">
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
                    autoComplete="username"
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
                    autoComplete="current-password"
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
                    onCheckedChange={(checked) => {
                      field.onChange(checked === true);
                      try {
                        localStorage.setItem(
                          REMEMBER_ME_KEY,
                          String(checked === true),
                        );
                      } catch {}
                    }}
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
    </div>
  );
}
