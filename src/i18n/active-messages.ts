import { useLanguageStore } from "@/store/useLanguageStore";
import enUs from "./messages/en-us.json";
import ptBr from "./messages/pt-br.json";

const MESSAGES = { "pt-br": ptBr, "en-us": enUs };

/** Messages of the chosen language, for code outside React (stores) that names data it creates. */
export const activeMessages = () =>
  MESSAGES[useLanguageStore.getState().language] ?? ptBr;
