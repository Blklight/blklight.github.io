import type messages from "./messages/pt-br.json";
import type { Language } from "@/store/useLanguageStore";

declare module "next-intl" {
  interface AppConfig {
    Locale: Language;
    Messages: typeof messages;
  }
}
