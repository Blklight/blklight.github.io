import { act, render, screen } from "@testing-library/react";
import { createTranslator } from "next-intl";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthLinks } from "@/components/auth-links";
import { I18nProvider } from "@/components/i18n-provider";
import enUs from "@/i18n/messages/en-us.json";
import ptBr from "@/i18n/messages/pt-br.json";
import { useLanguageStore } from "@/store/useLanguageStore";

const keys = (o: object, prefix = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === "object" ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );

describe("i18n", () => {
  beforeEach(() => useLanguageStore.setState({ language: "pt-br" }));

  it("has the same keys in every locale", () => {
    expect(keys(enUs).sort()).toEqual(keys(ptBr).sort());
  });

  it("parses every message in both locales", () => {
    const invalid: string[] = [];
    for (const [locale, messages] of [
      ["pt-br", ptBr],
      ["en-us", enUs],
    ] as const) {
      const t = createTranslator({
        locale,
        messages,
        onError: (error) => {
          if (error.code === "INVALID_MESSAGE") invalid.push(error.message);
        },
      });
      for (const key of keys(messages)) t(key as never);
    }
    expect(invalid).toEqual([]);
  });

  it("formats ICU messages, keeping literal letterhead markers", () => {
    const t = createTranslator({ locale: "en-us", messages: enUs });
    expect(t("letterhead.publisherHint")).toContain("{{publicador}}");
    expect(t("onboarding.selectedCount", { count: 2 })).toBe("2 apps selected");
    const pt = createTranslator({ locale: "pt-br", messages: ptBr });
    expect(pt("onboarding.selectedCount", { count: 1 })).toBe(
      "1 app selecionado",
    );
  });

  it("switches shell text when the language changes", () => {
    render(
      <I18nProvider>
        <AuthLinks />
      </I18nProvider>,
    );
    expect(screen.getByRole("link", { name: "Entrar" })).toBeInTheDocument();
    act(() => useLanguageStore.getState().setLanguage("en-us"));
    expect(screen.getByRole("link", { name: "Sign in" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Create account" }),
    ).toBeInTheDocument();
  });
});
