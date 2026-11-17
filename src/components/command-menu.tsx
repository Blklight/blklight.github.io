"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import {
  ArrowRight,
  BookOpen,
  Hammer,
  LayoutDashboard,
  LogIn,
  Monitor,
  Moon,
  Newspaper,
  PenLine,
  Rss,
  Search,
  Settings,
  Sun,
  SunMoon,
  UserPlus,
  UserRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { type ReactNode, useDeferredValue, useEffect, useState } from "react";
import { typeTheme } from "@/components/feed/cards/card-theme";
import { useFillet } from "@/components/ui/fillet-card";
import { Kbd } from "@/components/ui/kbd";
import { getPublicFeed } from "@/features/documents/api";
import { kindByType } from "@/features/documents/document-kinds";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useCommandMenuStore } from "@/store/useCommandMenuStore";

interface Entry {
  id: string;
  title: string;
  hint?: string;
  icon: ReactNode;
  /** Icon tile colors. */
  tile: string;
  keywords?: string[];
  run: () => void;
}

const TILE_INK = "bg-foreground text-background";

function Row({ entry }: { entry: Entry }) {
  return (
    <Command.Item
      value={entry.id}
      keywords={[entry.title, ...(entry.keywords ?? [])]}
      onSelect={entry.run}
      className="group/item flex items-center gap-3 px-3 py-2 rounded-xs cursor-pointer outline-none data-[selected=true]:bg-foreground/[0.06]"
    >
      <span
        className={cn(
          "size-8 shrink-0 rounded-xs border border-dark/30 flex items-center justify-center [&_svg]:size-4",
          entry.tile,
        )}
      >
        {entry.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">
          {entry.title}
        </span>
        {entry.hint && (
          <span className="block truncate text-xs text-muted-foreground">
            {entry.hint}
          </span>
        )}
      </span>
      <ArrowRight className="size-4 shrink-0 opacity-0 -translate-x-1 transition-[opacity,translate] group-data-[selected=true]/item:opacity-100 group-data-[selected=true]/item:translate-x-0" />
    </Command.Item>
  );
}

function Group({
  heading,
  forceMount,
  children,
}: {
  heading: string;
  /** Keep remote results visible; cmdk only counts items it filtered itself. */
  forceMount?: boolean;
  children: ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      forceMount={forceMount}
      className="px-2 pb-2 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      {children}
    </Command.Group>
  );
}

/** Global ⌘K / Ctrl+K palette: navigation, feed search, and theme. */
export function CommandMenu() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const open = useCommandMenuStore((s) => s.open);
  const setOpen = useCommandMenuStore((s) => s.setOpen);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim());
  const [outerRef, outerClip] = useFillet<HTMLDivElement>(
    ["tl", "br"],
    "lg",
    6,
    0,
    2,
  );
  const [innerRef, innerClip] = useFillet<HTMLDivElement>(
    ["tl", "br"],
    "lg",
    6,
    2,
    2,
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!useCommandMenuStore.getState().open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const docs = useQuery({
    queryKey: ["command-menu", "feed", q],
    queryFn: () => getPublicFeed({ q, limit: 6 }),
    enabled: open && q.length >= 2,
    staleTime: 30_000,
  });

  const go = (href: string) => () => {
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  const navigate: Entry[] = [
    {
      id: "feed",
      title: "Feed",
      hint: "O que a comunidade publicou",
      icon: <Rss />,
      tile: TILE_INK,
      keywords: ["inicio", "home"],
      run: go("/feed"),
    },
    ...(isAuthenticated
      ? [
          {
            id: "write",
            title: "Escrever",
            hint: "Escolher o tipo de texto",
            icon: <PenLine />,
            tile: "bg-blklight-400 text-dark",
            keywords: ["novo", "editor", "criar"],
            run: go("/escrever"),
          },
          ...(["article", "tutorial", "project"] as const).map((type) => {
            const kind = kindByType(type);
            return {
              id: `new-${kind.slug}`,
              title: kind.newLabel,
              hint: kind.description,
              icon: <PenLine />,
              tile: typeTheme(type).solid,
              keywords: ["novo", "criar", "escrever"],
              run: go(`/escrever/${kind.slug}`),
            };
          }),
          {
            id: "dashboard",
            title: "Dashboard",
            hint: "Seus textos e apps",
            icon: <LayoutDashboard />,
            tile: TILE_INK,
            run: go("/dashboard"),
          },
          ...(user?.username
            ? [
                {
                  id: "profile",
                  title: "Meu perfil",
                  hint: `@${user.username}`,
                  icon: <UserRound />,
                  tile: TILE_INK,
                  run: go(`/${user.username}`),
                },
              ]
            : []),
          {
            id: "account",
            title: "Conta",
            hint: "Dados da conta e sessão",
            icon: <Settings />,
            tile: TILE_INK,
            keywords: ["configurações", "sair"],
            run: go("/conta"),
          },
        ]
      : [
          {
            id: "login",
            title: "Entrar",
            icon: <LogIn />,
            tile: TILE_INK,
            keywords: ["login"],
            run: go("/auth"),
          },
          {
            id: "register",
            title: "Criar conta",
            icon: <UserPlus />,
            tile: "bg-blklight-400 text-dark",
            keywords: ["cadastro", "registrar"],
            run: go("/auth?mode=register"),
          },
        ]),
  ];

  const explore: Entry[] = [
    {
      id: "type-article",
      title: "Artigos",
      hint: "Só artigos no feed",
      icon: <Newspaper />,
      tile: typeTheme("article").solid,
      run: go("/feed?type=article"),
    },
    {
      id: "type-tutorial",
      title: "Tutoriais",
      hint: "Só tutoriais no feed",
      icon: <BookOpen />,
      tile: typeTheme("tutorial").solid,
      run: go("/feed?type=tutorial"),
    },
    {
      id: "type-project",
      title: "Projetos",
      hint: "Só projetos no feed",
      icon: <Hammer />,
      tile: typeTheme("project").solid,
      run: go("/feed?type=project"),
    },
  ];

  const theme = (value: string) => () => {
    setTheme(value);
    setOpen(false);
  };
  const appearance: Entry[] = [
    {
      id: "theme-light",
      title: "Tema claro",
      icon: <Sun />,
      tile: "bg-light text-dark",
      keywords: ["light"],
      run: theme("light"),
    },
    {
      id: "theme-dark",
      title: "Tema escuro",
      icon: <Moon />,
      tile: "bg-dark text-light",
      keywords: ["dark"],
      run: theme("dark"),
    },
    {
      id: "theme-book",
      title: "Tema livro",
      hint: "Papel sépia para leitura longa",
      icon: <BookOpen />,
      tile: "bg-sepia text-dark",
      keywords: ["book", "sepia"],
      run: theme("book"),
    },
    {
      id: "theme-system",
      title: "Tema do sistema",
      icon: <Monitor />,
      tile: TILE_INK,
      keywords: ["system", "auto"],
      run: theme("system"),
    },
  ];

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setQuery("");
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-[150] bg-dark/40 backdrop-blur-[2px] data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          ref={outerRef}
          style={{ clipPath: outerClip }}
          className="fixed left-1/2 top-[12vh] z-[151] w-[min(40rem,calc(100%-2rem))] -translate-x-1/2 bg-foreground p-0.5 outline-none data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-2 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none"
        >
          <DialogPrimitive.Title className="sr-only">
            Menu de comandos
          </DialogPrimitive.Title>
          <div
            ref={innerRef}
            style={{ clipPath: innerClip }}
            className="bg-popover text-popover-foreground background-texture"
          >
            <Command loop label="Menu de comandos" className="flex flex-col">
              <div className="flex items-center gap-3 px-5 border-b-2 border-foreground">
                <Search
                  className="size-5 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Buscar textos ou ir para…"
                  className="h-16 w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
                />
                <Kbd className="hidden sm:inline-flex border">esc</Kbd>
              </div>

              <Command.List className="max-h-[min(60vh,28rem)] overflow-y-auto overscroll-contain py-1">
                {!docs.data?.items.length && (
                  <Command.Empty className="px-5 py-10 text-center text-sm text-muted-foreground">
                    Nada encontrado para “{query}”.
                  </Command.Empty>
                )}

                {q.length >= 2 && (
                  <Group heading="Textos" forceMount>
                    {docs.isFetching && !docs.data && (
                      <Command.Loading>
                        <p className="px-3 py-2 text-sm text-muted-foreground">
                          Buscando…
                        </p>
                      </Command.Loading>
                    )}
                    {docs.data?.items.map((doc) => (
                      <Command.Item
                        key={doc.id}
                        value={`doc-${doc.id}`}
                        forceMount
                        onSelect={go(`/${doc.author.username}/${doc.slug}`)}
                        className="group/item flex items-center gap-3 px-3 py-2 rounded-xs cursor-pointer outline-none data-[selected=true]:bg-foreground/[0.06]"
                      >
                        <span
                          className={cn(
                            "h-8 w-1.5 shrink-0 rounded-[1px]",
                            typeTheme(doc.typeName).solid,
                          )}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {doc.title}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {typeTheme(doc.typeName).label} ·{" "}
                            {doc.author.displayName || doc.author.username}
                          </span>
                        </span>
                        <ArrowRight className="size-4 shrink-0 opacity-0 group-data-[selected=true]/item:opacity-100" />
                      </Command.Item>
                    ))}
                  </Group>
                )}

                <Group heading="Ir para">
                  {navigate.map((entry) => (
                    <Row key={entry.id} entry={entry} />
                  ))}
                </Group>
                <Group heading="Explorar">
                  {explore.map((entry) => (
                    <Row key={entry.id} entry={entry} />
                  ))}
                </Group>
                <Group heading="Aparência">
                  {appearance.map((entry) => (
                    <Row key={entry.id} entry={entry} />
                  ))}
                </Group>
              </Command.List>

              <div className="hidden sm:flex items-center gap-4 px-5 py-2.5 border-t border-border font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Kbd className="border">↑</Kbd>
                  <Kbd className="border">↓</Kbd> navegar
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd className="border">↵</Kbd> abrir
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <SunMoon className="size-3.5" aria-hidden /> Blklight
                </span>
              </div>
            </Command>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** Navbar trigger; the palette itself is mounted once in the root layout. */
export function CommandMenuTrigger({ className }: { className?: string }) {
  const setOpen = useCommandMenuStore((s) => s.setOpen);
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "group flex items-center gap-2 h-8 pl-2.5 pr-1.5 rounded-xs border border-border bg-background/60 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors outline-none focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer",
        className,
      )}
    >
      <Search className="size-3.5" aria-hidden />
      <span className="text-xs">Buscar ou ir para</span>
      <Kbd className="ml-3 border">⌘K</Kbd>
    </button>
  );
}
