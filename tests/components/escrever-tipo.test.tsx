import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EscreverTipoPage from "@/app/escrever/[tipo]/page";
import { kindBySlug, kindByType } from "@/features/documents/document-kinds";

let tipo = "tutorial";
const replace = vi.fn();
const editor = vi.fn((_props: { kind: unknown }) => null);

vi.mock("next/navigation", () => ({
  useParams: () => ({ tipo }),
  useRouter: () => ({ replace }),
}));
vi.mock("@/components/require-auth", () => ({
  RequireAuth: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@/components/escrever/document-editor", () => ({
  DocumentEditor: (props: { kind: unknown }) => editor(props),
}));

describe("/escrever/[tipo]", () => {
  beforeEach(() => {
    replace.mockClear();
    editor.mockClear();
  });

  it("opens the editor for the type in the URL", () => {
    tipo = "tutorial";
    render(<EscreverTipoPage />);
    expect(editor.mock.calls[0][0].kind).toBe(kindBySlug("tutorial"));
  });

  it("sends an old /escrever/<id> link to /editar/<id>", () => {
    tipo = "abc123";
    render(<EscreverTipoPage />);
    expect(replace).toHaveBeenCalledWith("/editar/abc123");
    expect(editor).not.toHaveBeenCalled();
  });

  it("maps every type to a writing page", () => {
    expect(kindByType("project").slug).toBe("projeto");
    expect(kindByType("unknown").type).toBe("article");
  });
});
