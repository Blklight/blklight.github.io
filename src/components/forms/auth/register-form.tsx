"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { useValidationMessage } from "@/i18n/use-validation-message";
import { apiClient } from "@/lib/api-client";
import { useAuthStore } from "@/store/useAuthStore";
import type { ApiResponse, AuthResponse } from "@/types/api.types";
import { type RegisterFormData, registerSchema } from "@/types/form.schemas";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const t = useTranslations("register");
  const tAuth = useTranslations("auth");
  const errorMessage = useValidationMessage();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = form.watch("password") || "";

  const passwordRequirements = [
    {
      id: "length",
      label: t("ruleLength"),
      met: passwordValue.length >= 8,
    },
    {
      id: "uppercase",
      label: t("ruleUppercase"),
      met: /[A-Z]/.test(passwordValue),
    },
    {
      id: "number",
      label: t("ruleNumber"),
      met: /[0-9]/.test(passwordValue),
    },
    {
      id: "special",
      label: t("ruleSymbol"),
      met: /[!@#$%^&*]/.test(passwordValue),
    },
  ];

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/api/v1/auth/register",
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
        apiError?.message ?? error.response?.data?.message ?? t("error");

      if (apiError?.fields) {
        for (const [field, fieldError] of Object.entries(apiError.fields)) {
          form.setError(field as keyof RegisterFormData, {
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
        {t("title")}
      </h3>
      <p className="text-muted-foreground text-sm font-mono! mb-5">
        {t("lead")}
      </p>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))}>
        <FieldGroup className="gap-4">
          {/* E-mail */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t("email")}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder={t("emailPlaceholder")}
                  />
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.error && (
                  <FieldError
                    errors={[
                      {
                        message: errorMessage(
                          fieldState.error.message,
                          field.name,
                        ),
                      },
                    ]}
                  />
                )}
              </Field>
            )}
          />

          {/* Usuário */}
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>{t("username")}</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id={field.name}
                    placeholder={t("usernamePlaceholder")}
                  />
                  <InputGroupAddon align="inline-start">
                    <User className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.error && (
                  <FieldError
                    errors={[
                      {
                        message: errorMessage(
                          fieldState.error.message,
                          field.name,
                        ),
                      },
                    ]}
                  />
                )}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            {/* Senha */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {tAuth("password")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <InputGroupAddon align="inline-start">
                      <Lock className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        size="icon-xs"
                        onClick={() => setShowPassword((prev) => !prev)}
                        title={
                          showPassword
                            ? tAuth("hidePassword")
                            : tAuth("showPassword")
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-3.5 text-muted-foreground" />
                        ) : (
                          <Eye className="size-3.5 text-muted-foreground" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.error && (
                    <FieldError
                      errors={[
                        {
                          message: errorMessage(
                            fieldState.error.message,
                            field.name,
                          ),
                        },
                      ]}
                    />
                  )}
                </Field>
              )}
            />

            {/* Confirmar Senha */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {t("confirmPassword")}
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                    />
                    <InputGroupAddon align="inline-start">
                      <ShieldCheck className="size-4 text-muted-foreground" />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        size="icon-xs"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        title={
                          showConfirmPassword
                            ? tAuth("hidePassword")
                            : tAuth("showPassword")
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="size-3.5 text-muted-foreground" />
                        ) : (
                          <Eye className="size-3.5 text-muted-foreground" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.error && (
                    <FieldError
                      errors={[
                        {
                          message: errorMessage(
                            fieldState.error.message,
                            field.name,
                          ),
                        },
                      ]}
                    />
                  )}
                </Field>
              )}
            />
          </div>

          <ul
            aria-label={t("rules")}
            className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs -mt-1"
          >
            {passwordRequirements.map((req) => (
              <li
                key={req.id}
                className={`flex items-center gap-1.5 transition-colors ${
                  req.met ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex size-3.5 shrink-0 items-center justify-center rounded-full ${
                    req.met
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-transparent"
                  }`}
                >
                  <Check className="size-2.5 stroke-[3]" />
                </span>
                <span>{req.label}</span>
                <span className="sr-only">
                  {req.met ? t("ruleMet") : t("rulePending")}
                </span>
              </li>
            ))}
          </ul>
          {/* Erro Global */}
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
                {t("creating")}
              </>
            ) : (
              <>
                <UserPlus />
                {tAuth("signUp")}
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
      <p className="mt-3 text-xs text-muted-foreground">{t("terms")}</p>
    </div>
  );
}
