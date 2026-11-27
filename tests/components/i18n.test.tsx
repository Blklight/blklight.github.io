import { act, render, screen } from "@testing-library/react";
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
