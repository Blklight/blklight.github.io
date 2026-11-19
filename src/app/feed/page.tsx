"use client";

import { FileSearch, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { BentoGrid } from "@/components/bento/bento-grid";
import { FEED_TYPES, TYPE_THEME } from "@/components/feed/cards/card-theme";
import { DuotoneDefs } from "@/components/feed/cards/duotone-defs";
import { FeaturedCard } from "@/components/feed/cards/featured-card";
import {
  CoverCard,
  HeadlineCard,
  MediaCard,
  PaperCard,
  StampCard,
  TextCard,
} from "@/components/feed/cards/feed-cards";
import { TypeInkContext } from "@/components/feed/cards/parts";
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
  toBentoItems,
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
  media: { component: MediaCard, sizes: { "1x2": 2, "2x1": 1 } },
  stamp: { component: StampCard, sizes: { "2x1": 1, "1x2": 1 } },
  headline: { component: HeadlineCard, sizes: { "1x1": 1, "2x1": 1 } },
} as const satisfies Record<FeedCardType, unknown>;

const TYPES = FEED_TYPES.map((id) => [id, TYPE_THEME[id]] as const);

export default function FeedPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ANY_CATEGORY);
  const typeParam = useSearchParams().get("type");
  const [type, setType] = useState<DocumentType | null>(null);
  // The command menu links to /feed?type=…; follow it whenever it changes.
  useEffect(() => {
    setType(
      (FEED_TYPES as readonly string[]).includes(typeParam ?? "")
        ? (typeParam as DocumentType)
        : null,
    );
  }, [typeParam]);

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

  // The banner wants an image: first document with a cover, else the newest.
  const featured = hasActiveFilter
    ? null
    : (items.find((item) => item.coverImageUrl) ?? items[0] ?? null);
  const bentoItems = useMemo(
    () => toBentoItems(items.filter((item) => item !== featured)),
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
      <main className="w-full px-4 pb-16 md:px-8">
        <header className="pt-10 pb-8 grid gap-6 lg:grid-cols-[1fr_minmax(0,28rem)] lg:items-end">
          <div>
            <h1 className="font-sans text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Feed
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Artigos, tutoriais e projetos da comunidade, cada um com o papel e
              a tipografia que o autor escolheu.
            </p>
          </div>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por título ou resumo"
              aria-label="Buscar documentos"
              data-testid="feed-search-input"
              className="h-12 pl-12 rounded-xs border-2 border-foreground bg-card text-base"
            />
          </div>
        </header>

        {featured && !isPending && !isError && (
          <section aria-label="Em destaque" data-card-frame className="mb-10">
            <FeaturedCard doc={featured} />
          </section>
        )}

        <div className="lg:sticky lg:top-[3.6rem] z-30 -mx-4 md:-mx-8 px-4 md:px-8 py-3 mb-6 bg-background/90 backdrop-blur-sm border-y-2 border-foreground flex flex-col lg:flex-row gap-3 lg:items-center">
          <h2 className="font-sans text-2xl font-bold tracking-tight lg:mr-4">
            {hasActiveFilter ? "Resultados" : "Mais recentes"}
            {!isPending && !isError && total > 0 && (
              <span className="ml-3 align-middle font-mono text-xs font-normal text-muted-foreground">
                {items.length}/{total}
              </span>
            )}
          </h2>

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
                    "h-9 pl-2 pr-3 inline-flex items-center gap-2 rounded-xs border font-mono text-xs uppercase tracking-wider transition-colors outline-none focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2 cursor-pointer",
                    active
                      ? cn(theme.solid, "border-foreground")
                      : "border-border hover:border-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-5 inline-grid place-items-center rounded-[1px] border border-dark/40",
                      theme.solid,
                    )}
                  >
                    <theme.icon className="size-3" />
                  </span>
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
              className="w-full lg:w-60 lg:ml-auto h-9 rounded-xs"
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
            <TypeInkContext value={type !== null}>
              <BentoGrid items={bentoItems} cards={CARDS} />
            </TypeInkContext>

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

// Spans plus the card silhouettes (chamfer, pill, round, flat), so loading
// already looks like the feed it turns into.
const SKELETON_CELLS = [
  "sm:col-span-2 sm:row-span-2 chamfer chamfer-tr chamfer-lg",
  "rounded-[1.75rem]",
  "sm:row-span-2 chamfer chamfer-bl chamfer-lg",
  "rounded-none",
  "sm:col-span-2 rounded-lg",
  "chamfer chamfer-tr",
  "rounded-none",
] as const;

function FeedSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando documentos</span>
      <Skeleton className="h-[26rem] w-full mb-4 chamfer chamfer-tl chamfer-br chamfer-xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-dense auto-rows-[15rem] gap-4">
        {SKELETON_CELLS.map((cell, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: static placeholder list
          <Skeleton key={i} className={cell} />
        ))}
      </div>
    </div>
  );
}
