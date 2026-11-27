import { getRequestConfig } from "next-intl/server";
import messages from "./messages/pt-br.json";

// Server always renders the default locale: reading a cookie here would make every route dynamic under cacheComponents. The client switches after hydration (I18nProvider).
export default getRequestConfig(async () => ({
  locale: "pt-br",
  messages,
  timeZone: "America/Sao_Paulo",
}));
