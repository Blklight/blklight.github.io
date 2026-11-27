import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { I18nProvider } from "@/components/i18n-provider";

/** `render` inside the app's I18nProvider (pt-br unless the store says otherwise). */
export function renderWithIntl(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: I18nProvider, ...options });
}
