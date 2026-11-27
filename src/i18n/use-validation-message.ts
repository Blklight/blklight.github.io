import { type Messages, useTranslations } from "next-intl";

type ValidationKey = keyof Messages["validation"];

/** Turns a zod message key (form.schemas.ts) into text; unknown keys (e.g. API field errors) pass through. */
export function useValidationMessage() {
  const t = useTranslations("validation");
  return (key?: string, field?: string) => {
    if (!key) return "";
    if (key === "too_short" && field === "username")
      return t("usernameTooShort");
    if (key === "too_short" && field === "password")
      return t("passwordTooShort");
    return t.has(key as ValidationKey) ? t(key as ValidationKey) : key;
  };
}
