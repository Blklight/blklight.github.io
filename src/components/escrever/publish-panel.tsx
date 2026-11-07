"use client";

import { Check, Loader2, Send, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useExpandableScreen } from "@/components/ui/expandable-screen";
import { useCategories, usePopularTags } from "@/features/documents/queries";
import { useMyOrganizations } from "@/features/organizations/queries";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { DocumentStatus } from "@/types/api.types";

const MAX_TAGS = 5;

interface PublishPanelProps {
  status: DocumentStatus;
  hasUnsavedChanges: boolean;
  isPublishing: boolean;
  initialCategoryId?: string | null;
  initialTags?: string[];
  /**
   * Organization the document is linked to (id) or null for "Pessoal".
   * Controlled by the editor so the same value travels with every save.
   */
  organizationId: string | null;
  onOrganizationChange: (organizationId: string | null) => void;
  onConfirm: (metadata: {
    categoryId: string;
    tags: string[];
  }) => Promise<void>;
}

export function PublishPanel({
  status,
  hasUnsavedChanges,
  isPublishing,
  initialCategoryId = null,
  initialTags,
  organizationId,
  onOrganizationChange,
  onConfirm,
}: PublishPanelProps) {
  const { collapse } = useExpandableScreen();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: popularTags } = usePopularTags(20);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  // The endpoint answers 401 without a session, so the query waits for the
  // persisted session to hydrate.
  const { data: organizations } = useMyOrganizations(isAuthenticated);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    initialCategoryId,
  );
  const [tags, setTags] = useState<string[]>(initialTags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  // The selector only makes sense for authors who belong to at least one
  // organization; everyone else keeps publishing as "Pessoal".
  const organizationOptions = useMemo(
    () => (organizations ?? []).filter((organization) => organization.id),
    [organizations],
  );
  const showOrganizationSelector = organizationOptions.length > 0;

  // The ExpandableScreen has no native Escape handling; close from here.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapse();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [collapse]);

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/^#/, "");
    if (!tag || tag.length > 30) return;
    setTags((prev) => {
      if (prev.includes(tag)) return prev;
      if (prev.length >= MAX_TAGS) {
        setError(`Limite de ${MAX_TAGS} tags por documento.`);
        return prev;
      }
      setError(null);
      return [...prev, tag];
    });
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const suggestions = useMemo(() => {
    const current = tags.map((t) => t.toLowerCase());
    return (popularTags ?? []).filter(
      (tag) => !current.includes(tag.name.toLowerCase()),
    );
  }, [popularTags, tags]);

  const handleConfirm = async () => {
    if (!selectedCategoryId) return;
    setError(null);
    try {
      await onConfirm({ categoryId: selectedCategoryId, tags });
      collapse();
    } catch {
      setError("Nao foi possivel publicar. Tente novamente.");
    }
  };

  return (
    <div
      data-testid="publish-panel"
      className="h-full flex flex-col overflow-hidden bg-background"
    >
      <header className="shrink-0 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 py-3 pr-16">
          <h1 className="text-sm font-semibold uppercase tracking-widest">
            Publicar
          </h1>
          <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/40">
            Esc para fechar
          </span>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 py-6 flex flex-col gap-10">
          {/* Status summary */}
          <section>
            <div className="rounded-none border hairline shadow-none bg-transparent p-4">
              <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-wider">
                <span className="text-foreground/50">Status</span>
                <span className="px-2 py-0.5 border border-foreground/20">
                  {status}
                </span>
                {status !== "published" && (
                  <>
                    <span className="text-foreground/40">--&gt;</span>
                    <span className="px-2 py-0.5 border border-accent text-accent">
                      publicado
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-foreground/50 mt-3 leading-relaxed">
                {status === "published"
                  ? "O artigo ja esta publicado. Confirmar atualiza a categoria, as tags e a publicacao como, sem republicar."
                  : "Ao publicar, o artigo fica visivel para outros usuarios e a assinatura de autoria e fixada ao documento."}
                {hasUnsavedChanges
                  ? " Alteracoes pendentes serao salvas automaticamente junto com a publicacao."
                  : " Nenhuma alteracao pendente."}
              </p>
            </div>
          </section>

          {/* Category */}
          <section>
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                Categoria <span className="text-accent">(obrigatoria)</span>
              </h2>
              <span className="text-[10px] font-mono text-foreground/40">
                selecione uma
              </span>
            </header>
            {categoriesLoading ? (
              <p className="text-xs text-foreground/40">Carregando...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(categories ?? []).map((category) => {
                  const selected = selectedCategoryId === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      data-testid={`publish-category-${category.slug}`}
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={cn(
                        "rounded-none border hairline shadow-none bg-transparent text-left px-4 py-3 transition-colors cursor-pointer",
                        selected ? "border-accent" : "hover:border-accent/60",
                      )}
                      aria-pressed={selected}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">
                          {category.name}
                        </span>
                        {selected && <Check className="w-4 h-4 text-accent" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          {/* Organization */}
          {showOrganizationSelector && (
            <section>
              <header className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                  Publicar como
                </h2>
                <span className="text-[10px] font-mono text-foreground/40">
                  selecione o destino
                </span>
              </header>
              <div
                data-testid="publish-org-selector"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              >
                <button
                  type="button"
                  data-testid="publish-org-personal"
                  onClick={() => onOrganizationChange(null)}
                  className={cn(
                    "rounded-none border hairline shadow-none bg-transparent text-left px-4 py-3 transition-colors cursor-pointer",
                    organizationId === null
                      ? "border-accent"
                      : "hover:border-accent/60",
                  )}
                  aria-pressed={organizationId === null}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">Pessoal</span>
                    {organizationId === null && (
                      <Check className="w-4 h-4 text-accent" />
                    )}
                  </div>
                </button>
                {organizationOptions.map((organization) => {
                  const selected = organizationId === organization.id;
                  return (
                    <button
                      key={organization.id}
                      type="button"
                      data-testid={`publish-org-${organization.orgname}`}
                      onClick={() => onOrganizationChange(organization.id)}
                      className={cn(
                        "rounded-none border hairline shadow-none bg-transparent text-left px-4 py-3 transition-colors cursor-pointer",
                        selected ? "border-accent" : "hover:border-accent/60",
                      )}
                      aria-pressed={selected}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">
                          {organization.name}
                        </span>
                        {selected && <Check className="w-4 h-4 text-accent" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Tags */}
          <section>
            <header className="mb-3 flex items-center justify-between">
              <h2 className="text-xs font-mono uppercase tracking-wider text-foreground/60">
                Tags <span className="text-foreground/40">(opcional)</span>
              </h2>
              <span className="text-[10px] font-mono text-foreground/40">
                enter para adicionar
              </span>
            </header>

            <div
              data-testid="publish-tags"
              className="rounded-none border hairline shadow-none bg-transparent p-3 flex flex-wrap gap-2 items-center"
            >
              {tags.map((tag) => (
                <span
                  key={tag}
                  data-testid={`publish-selected-tag-${tag}`}
                  className="inline-flex items-center gap-1 border border-foreground/20 px-2 py-1 text-xs font-mono"
                >
                  {tag}
                  <button
                    type="button"
                    aria-label={`Remover tag ${tag}`}
                    onClick={() => removeTag(tag)}
                    className="text-foreground/50 hover:text-foreground cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                data-testid="publish-tag-input"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput);
                  } else if (
                    e.key === "Backspace" &&
                    tagInput === "" &&
                    tags.length > 0
                  ) {
                    removeTag(tags[tags.length - 1]);
                  }
                }}
                placeholder={
                  tags.length === 0 ? "ex: tutorial, javascript..." : ""
                }
                className="flex-1 min-w-[140px] bg-transparent outline-none text-sm"
              />
            </div>

            {suggestions.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2 items-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                  Sugestoes
                </span>
                {suggestions.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => addTag(tag.name)}
                    className="rounded-none border border-foreground/15 px-2 py-1 text-[11px] font-mono text-foreground/60 hover:text-foreground hover:border-accent/60 transition-colors cursor-pointer"
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Confirm */}
          <section className="flex items-center justify-between gap-4 border-t border-foreground/10 pt-6">
            <div className="text-xs text-foreground/50">
              {selectedCategoryId
                ? status === "published"
                  ? "Pronto para atualizar"
                  : "Pronto para publicar"
                : "Selecione uma categoria para publicar"}
            </div>
            <div className="flex items-center gap-3">
              {error && (
                <p className="text-xs text-red-500" role="alert">
                  {error}
                </p>
              )}
              <Button variant="ghost" type="button" onClick={collapse}>
                Cancelar
              </Button>
              <Button
                type="button"
                data-testid="publish-confirm-button"
                onClick={() => void handleConfirm()}
                disabled={!selectedCategoryId || isPublishing}
              >
                {isPublishing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {status === "published"
                  ? "Salvar alteracoes"
                  : "Confirmar e Publicar"}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
