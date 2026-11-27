"use client";

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
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import {
  type ReactNode,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import { typeKey, typeTheme } from "@/components/feed/cards/card-theme";
import { Kbd } from "@/components/ui/kbd";
import { getPublicFeed } from "@/features/documents/api";
import { kindByType } from "@/features/documents/document-kinds";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

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

/**
 * Command bar in the navbar: reads like a browser address bar (the current
 * path, e.g. /feed) and, on focus or ⌘K, turns into a search with
 * the results panel attached below. Same entries as the old ⌘K palette.
 */
export function CommandBar({ className }: { className?: string }) {
  const t = useTranslations("commandBar");
  const tAuth = useTranslations("auth");
  const tk = useTranslations("kinds");
  const router = useRouter();
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query.trim());
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const docs = useQuery({
    queryKey: ["command-menu", "feed", q],
    queryFn: () => getPublicFeed({ q, limit: 6 }),
    enabled: open && q.length >= 2,
    staleTime: 30_000,
  });

  const go = (href: string) => () => {
    close();
    router.push(href);
  };

  const navigate: Entry[] = [
    {
      id: "feed",
      title: "Feed",
      hint: t("feedHint"),
      icon: <Rss />,
      tile: TILE_INK,
      keywords: ["inicio", "home"],
      run: go("/feed"),
    },
    ...(isAuthenticated
      ? [
          {
            id: "write",
            title: t("write"),
            hint: t("writeHint"),
            icon: <PenLine />,
            tile: "bg-blklight-400 text-dark",
            keywords: ["novo", "editor", "criar"],
            run: go("/escrever"),
          },
          ...(["article", "tutorial", "project"] as const).map((type) => {
            const kind = kindByType(type);
            return {
              id: `new-${kind.slug}`,
              title: tk(`${type}.newLabel`),
              hint: tk(`${type}.description`),
              icon: <PenLine />,
              tile: typeTheme(type).solid,
              keywords: ["novo", "criar", "escrever"],
              run: go(`/escrever/${kind.slug}`),
            };
          }),
          {
            id: "dashboard",
            title: "Dashboard",
            hint: t("dashboardHint"),
            icon: <LayoutDashboard />,
            tile: TILE_INK,
            run: go("/dashboard"),
          },
          ...(user?.username
            ? [
                {
                  id: "profile",
                  title: t("myProfile"),
                  hint: `@${user.username}`,
                  icon: <UserRound />,
                  tile: TILE_INK,
                  run: go(`/${user.username}`),
                },
              ]
            : []),
          {
            id: "account",
            title: t("account"),
            hint: t("accountHint"),
            icon: <Settings />,
            tile: TILE_INK,
            keywords: ["configurações", "sair"],
            run: go("/conta"),
          },
        ]
      : [
          {
            id: "login",
            title: tAuth("signIn"),
            icon: <LogIn />,
            tile: TILE_INK,
            keywords: ["login"],
            run: go("/auth"),
          },
          {
            id: "register",
            title: tAuth("signUp"),
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
      title: t("articles"),
      hint: t("articlesHint"),
      icon: <Newspaper />,
      tile: typeTheme("article").solid,
      run: go("/feed?type=article"),
    },
    {
      id: "type-tutorial",
      title: t("tutorials"),
      hint: t("tutorialsHint"),
      icon: <BookOpen />,
      tile: typeTheme("tutorial").solid,
      run: go("/feed?type=tutorial"),
    },
    {
      id: "type-project",
      title: t("projects"),
      hint: t("projectsHint"),
      icon: <Hammer />,
      tile: typeTheme("project").solid,
      run: go("/feed?type=project"),
    },
  ];

  const theme = (value: string) => () => {
    setTheme(value);
    close();
  };
  const appearance: Entry[] = [
    {
      id: "theme-light",
      title: t("themeLight"),
      icon: <Sun />,
      tile: "bg-light text-dark",
      keywords: ["light"],
      run: theme("light"),
    },
    {
      id: "theme-dark",
      title: t("themeDark"),
      icon: <Moon />,
      tile: "bg-dark text-light",
      keywords: ["dark"],
      run: theme("dark"),
    },
    {
      id: "theme-book",
      title: t("themeBook"),
      hint: t("themeBookHint"),
      icon: <BookOpen />,
      tile: "bg-sepia text-dark",
      keywords: ["book", "sepia"],
      run: theme("book"),
    },
    {
      id: "theme-system",
      title: t("themeSystem"),
      icon: <Monitor />,
      tile: TILE_INK,
      keywords: ["system", "auto"],
      run: theme("system"),
    },
  ];

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <Command
        loop
        label={t("label")}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.preventDefault();
            close();
          }
        }}
      >
        <div
          className={cn(
            "relative flex h-8 items-center gap-2 rounded-xs border bg-background/70 px-3 transition-colors",
            open
              ? "border-foreground"
              : "border-border hover:border-foreground/60",
          )}
        >
          <Search
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <Command.Input
            ref={inputRef}
            value={query}
            onValueChange={setQuery}
            onFocus={() => setOpen(true)}
            placeholder={open ? t("placeholder") : ""}
            aria-label={t("label")}
            className="peer h-full w-full min-w-0 bg-transparent font-mono text-xs outline-none placeholder:text-muted-foreground"
          />
          {!open && !query && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-8 right-14 flex items-center truncate font-mono text-xs"
            >
              <span className="truncate">{pathname}</span>
            </span>
          )}
          <Kbd className="hidden sm:inline-flex border">
            {open ? "esc" : "⌘K"}
          </Kbd>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-x-0 top-full z-[120] mt-0.5 overflow-hidden rounded-xs border border-foreground bg-popover text-popover-foreground background-texture"
            >
              <Command.List className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain py-1">
                {!docs.data?.items.length && (
                  <Command.Empty className="px-5 py-10 text-center text-sm text-muted-foreground">
                    {t("empty", { query })}
                  </Command.Empty>
                )}

                {q.length >= 2 &&
                  (docs.isFetching || !!docs.data?.items.length) && (
                    <Group heading={t("docs")} forceMount>
                      {docs.isFetching && !docs.data && (
                        <Command.Loading>
                          <p className="px-3 py-2 text-sm text-muted-foreground">
                            {t("searching")}
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
                              {tk(`${typeKey(doc.typeName)}.label`)} ·{" "}
                              {doc.author.displayName || doc.author.username}
                            </span>
                          </span>
                          <ArrowRight className="size-4 shrink-0 opacity-0 group-data-[selected=true]/item:opacity-100" />
                        </Command.Item>
                      ))}
                    </Group>
                  )}

                <Group heading={t("goTo")}>
                  {navigate.map((entry) => (
                    <Row key={entry.id} entry={entry} />
                  ))}
                </Group>
                <Group heading={t("explore")}>
                  {explore.map((entry) => (
                    <Row key={entry.id} entry={entry} />
                  ))}
                </Group>
                <Group heading={t("appearance")}>
                  {appearance.map((entry) => (
                    <Row key={entry.id} entry={entry} />
                  ))}
                </Group>
              </Command.List>
              <div className="hidden sm:flex items-center gap-4 px-4 py-2 border-t border-border font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Kbd className="border">↑</Kbd>
                  <Kbd className="border">↓</Kbd> {t("navigate")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd className="border">↵</Kbd> {t("open")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Kbd className="border">esc</Kbd> {t("close")}
                </span>
                <span className="ml-auto flex items-center gap-1.5">
                  <SunMoon className="size-3.5" aria-hidden /> Blklight
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Command>
    </div>
  );
}
