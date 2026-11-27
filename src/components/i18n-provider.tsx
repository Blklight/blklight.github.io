"use client";
import { NextIntlClientProvider } from "next-intl";
import { useSyncExternalStore } from "react";
import enUs from "@/i18n/messages/en-us.json";
import ptBr from "@/i18n/messages/pt-br.json";
import { useLanguageStore } from "@/store/useLanguageStore";

const MESSAGES = { "pt-br": ptBr, "en-us": enUs };

const subscribe = (cb: () => void) =>
  useLanguageStore.persist.onFinishHydration(cb);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const stored = useLanguageStore((s) => s.language);
  // Pre-render is always pt-br; use the persisted choice only once hydrated, so the first client render matches the HTML.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => useLanguageStore.persist.hasHydrated(),
    () => false,
  );
  const locale = hydrated ? stored : "pt-br";
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={MESSAGES[locale]}
      timeZone="America/Sao_Paulo"
    >
      {children}
    </NextIntlClientProvider>
  );
}
