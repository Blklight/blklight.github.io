"use client";

import { FileSearch, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { DocumentFeedCard } from "@/components/feed/document-feed-card";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories, useFeed } from "@/features/documents/queries";
import type { FeedQuery } from "@/types/api.types";

// Cursor pagination is only exercisable while the feed holds more documents
// than one page, so this starts small and can be raised as the corpus grows.
const PAGE_SIZE = 3;
const ANY_CATEGORY = "__any__";

export default function FeedPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ANY_CATEGORY);

  // Keeps typing responsive: the input stays controlled by `search` while the
  // feed query follows the deferred value, matching the admin list pattern.
  const deferredSearch = useDeferredValue(search);

  const params = useMemo<FeedQuery>(
    () => ({
      q: deferredSearch.trim() || undefined,
      category: category === ANY_CATEGORY ? undefined : category,
      limit: PAGE_SIZE,
    }),
    [deferredSearch, category],
  );

  const {
    data,
    isPending,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFeed(params);
  const { data: categories } = useCategories();
  const categoryItems = useMemo(
    () => [
      { value: ANY_CATEGORY, label: "Todas as categorias" },
      ...(categories ?? []).map((item) => ({
        value: item.slug,
        label: item.name,
      })),
    ],
    [categories],
  );

  // Defensive dedupe by id. The cursor is a keyset on (sort value, id), but a
  // document published between two page requests shifts that window, and the
  // same row can then be served twice. Cursor arithmetic stays correct; only
  // the rendered list needs the guard.
  const items = useMemo(() => {
    const seen = new Set<string>();
    return (data?.pages.flatMap((page) => page.items) ?? []).filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }, [data]);

  const total = data?.pages[0]?.total ?? 0;
  const hasActiveFilter =
    deferredSearch.trim().length > 0 || category !== ANY_CATEGORY;

  function clearFilters() {
    setSearch("");
    setCategory(ANY_CATEGORY);
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-3xl px-4 py-12 md:px-6">
        <header className="mb-8 flex flex-col gap-1">
          <h1 className="text-3xl font-medium tracking-tight">Feed</h1>
          <p className="text-sm text-muted-foreground">
            Documentos publicados pela comunidade.
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título ou resumo"
              aria-label="Buscar documentos"
              data-testid="feed-search-input"
              className="pl-9"
            />
          </div>

          <Select
            items={categoryItems}
            value={category}
            onValueChange={(value) => setCategory(value ?? ANY_CATEGORY)}
          >
            <SelectTrigger
              className="w-full sm:w-56"
              aria-label="Filtrar por categoria"
            >
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY_CATEGORY}>Todas as categorias</SelectItem>
              {categories?.map((item) => (
                <SelectItem key={item.id} value={item.slug}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isPending ? (
          <FeedSkeleton />
        ) : isError ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileSearch />
              </EmptyMedia>
              <EmptyTitle>Não foi possível carregar o feed</EmptyTitle>
              <EmptyDescription>
                A requisição ao servidor falhou. Tente novamente em instantes.
              </EmptyDescription>
            </EmptyHeader>
            <Button variant="outline" onClick={() => void refetch()}>
              Tentar novamente
            </Button>
          </Empty>
        ) : items.length === 0 ? (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileSearch />
              </EmptyMedia>
              <EmptyTitle>Nenhum documento encontrado</EmptyTitle>
              <EmptyDescription>
                {hasActiveFilter
                  ? "Nenhum documento publicado corresponde a esses filtros."
                  : "Ainda não há documentos publicados."}
              </EmptyDescription>
            </EmptyHeader>
            {hasActiveFilter ? (
              <Button variant="outline" onClick={clearFilters}>
                Limpar filtros
              </Button>
            ) : null}
          </Empty>
        ) : (
          <>
            <p className="mb-4 font-mono text-xs text-muted-foreground">
              {items.length} de {total}{" "}
              {total === 1 ? "documento" : "documentos"}
            </p>

            <ul className="flex flex-col gap-4">
              {items.map((document) => (
                <li key={document.id}>
                  <DocumentFeedCard document={document} />
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-2">
              {hasNextPage ? (
                <Button
                  variant="outline"
                  onClick={() => void fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
                </Button>
              ) : (
                <p className="font-mono text-xs text-muted-foreground">
                  Você chegou ao fim do feed.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}

const SKELETON_KEYS = ["skeleton-1", "skeleton-2", "skeleton-3"] as const;

function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando documentos</span>
      {SKELETON_KEYS.map((key) => (
        <div
          key={key}
          className="flex flex-col gap-3 border border-border/60 p-6"
        >
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
