"use client";

import { FileSearch, Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { BentoGrid } from "@/components/bento/bento-grid";
import { TYPE_THEME } from "@/components/feed/cards/card-theme";
import { DuotoneDefs } from "@/components/feed/cards/duotone-defs";
import { FeaturedCard } from "@/components/feed/cards/featured-card";
import {
  CoverCard,
  MediaCard,
  PaperCard,
  TextCard,
} from "@/components/feed/cards/feed-cards";
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
import {
  type FeedCardType,
  toBentoItem,
} from "@/features/documents/to-bento-item";
import { cn } from "@/lib/utils";
import type { DocumentType, FeedQuery } from "@/types/api.types";

// Cursor pagination is only exercisable while the feed holds more documents
// than one page, so this starts small and can be raised as the corpus grows.
const PAGE_SIZE = 12;
const ANY_CATEGORY = "__any__";

const CARDS = {
  text: { component: TextCard },
  paper: { component: PaperCard, sizes: { "1x1": 2, "1x2": 1 } },
  cover: {
    component: CoverCard,
    sizes: { "2x1": 1, "1x2": 1 },
    featuredSize: "2x2",
  },
  media: { component: MediaCard, sizes: { "1x1": 3, "1x2": 1 } },
} as const satisfies Record<FeedCardType, unknown>;

const TYPES = Object.entries(TYPE_THEME) as [
  DocumentType,
  (typeof TYPE_THEME)[DocumentType],
][];

export default function FeedPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ANY_CATEGORY);
  const [type, setType] = useState<DocumentType | null>(null);

  // Keeps typing responsive: the input stays controlled by `search` while the
  // feed query follows the deferred value, matching the admin list pattern.
  const deferredSearch = useDeferredValue(search);

  const params = useMemo<FeedQuery>(
    () => ({
      q: deferredSearch.trim() || undefined,
      category: category === ANY_CATEGORY ? undefined : category,
      type: type ?? undefined,
      limit: PAGE_SIZE,
    }),
    [deferredSearch, category, type],
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
    deferredSearch.trim().length > 0 ||
    category !== ANY_CATEGORY ||
    type !== null;

  const featured = hasActiveFilter ? null : (items[0] ?? null);
  const bentoItems = useMemo(
    () => (featured ? items.slice(1) : items).map(toBentoItem),
    [items, featured],
  );

  function clearFilters() {
    setSearch("");
    setCategory(ANY_CATEGORY);
    setType(null);
  }

  return (
    <>
      <Navbar />

      <DuotoneDefs />
      <main className="mx-auto w-full max-w-7xl px-4 pb-16 md:px-6">
        <header className="pt-12 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight">
              Feed
            </h1>
            <p className="mt-2 text-muted-foreground">
              O que a comunidade publicou, do mais recente ao mais antigo.
            </p>
          </div>
          {!isPending && !isError && total > 0 && (
            <p className="font-mono text-xs text-muted-foreground">
              {items.length} de {total}{" "}
              {total === 1 ? "documento" : "documentos"}
            </p>
          )}
        </header>

        <div className="lg:sticky lg:top-[3.6rem] z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-3 mb-8 bg-background/90 backdrop-blur-sm border-y border-border flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="relative flex-1 lg:max-w-sm">
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
              className="pl-9 rounded-xs"
            />
          </div>

          <fieldset className="flex flex-wrap gap-1.5 border-0 p-0 m-0 min-w-0">
            <legend className="sr-only">Filtrar por tipo</legend>
            {TYPES.map(([id, theme]) => {
              const active = type === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setType(active ? null : id)}
                  className={cn(
                    "h-8 px-3 rounded-xs border font-mono text-xs uppercase tracking-wider transition-colors outline-none focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 cursor-pointer",
                    active
                      ? cn(theme.solid, "border-transparent")
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/50",
                  )}
                >
                  {theme.label}
                </button>
              );
            })}
          </fieldset>

          <Select
            items={categoryItems}
            value={category}
            onValueChange={(value) => setCategory(value ?? ANY_CATEGORY)}
          >
            <SelectTrigger
              className="w-full lg:w-56 lg:ml-auto rounded-xs"
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
            {featured && (
              <section aria-label="Em destaque" className="mb-4">
                <FeaturedCard doc={featured} />
              </section>
            )}

            <BentoGrid items={bentoItems} cards={CARDS} />

            <div className="mt-10 flex flex-col items-center gap-2">
              {hasNextPage ? (
                <Button
                  variant="outline"
                  className="rounded-xs font-mono text-xs uppercase tracking-wider"
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

const SKELETON_SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "sm:row-span-2",
  "",
  "sm:col-span-2",
  "",
  "",
] as const;

function FeedSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando documentos</span>
      <Skeleton className="h-[26rem] w-full rounded-xs mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense auto-rows-[15rem] gap-4">
        {SKELETON_SPANS.map((span, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
          <Skeleton key={i} className={cn("rounded-xs", span)} />
        ))}
      </div>
    </div>
  );
}
