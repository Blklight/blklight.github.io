"use client";

import {
  BookOpen,
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Shield,
  Sun,
  UserRound,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  displayName: string;
  username?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
  onSignOut: () => void | Promise<void>;
}

const HOLD_MS = 1200;

const THEMES = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "book", label: "Livro", icon: BookOpen },
  { value: "system", label: "Sistema", icon: Monitor },
] as const;

/**
 * Account menu: the trigger card grows into the panel (shared layout), with
 * theme, shortcuts and a hold-to-confirm sign out.
 */
export const ProfileMenu = ({
  displayName,
  username,
  avatarUrl,
  isAdmin = false,
  onSignOut,
}: Props) => {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initial = (displayName || "?").trim().charAt(0).toUpperCase();

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const first = () =>
      panelRef.current
        ?.querySelector<HTMLElement>("[data-pm-item]")
        ?.focus({ preventScroll: true });
    const id = requestAnimationFrame(first);
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("[data-pm-item]") ?? [],
    );
    const i = items.indexOf(document.activeElement as HTMLElement);
    const next = e.key === "ArrowDown" ? i + 1 : i - 1;
    items[(next + items.length) % items.length]?.focus();
    e.preventDefault();
  };

  const go = (href: string) => () => {
    close(false);
    router.push(href);
  };

  const card = (
    <>
      <Avatar className="size-7 rounded-xs after:rounded-xs">
        <AvatarImage src={avatarUrl} alt="" className="rounded-xs" />
        <AvatarFallback className="rounded-xs bg-foreground text-background font-sans text-xs font-bold">
          {initial}
        </AvatarFallback>
      </Avatar>
      <span className="hidden min-w-0 text-left sm:block">
        <span className="block max-w-32 truncate text-sm leading-tight">
          {displayName}
        </span>
        {username && (
          <span className="block max-w-32 truncate font-mono text-[0.65rem] leading-tight text-muted-foreground">
            @{username}
          </span>
        )}
      </span>
    </>
  );

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 40 };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Menu da conta de ${displayName}`}
        className="flex h-10 items-center rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer"
      >
        {open ? (
          <span className="invisible flex items-center gap-2 px-1.5">
            {card}
            <ChevronsUpDown className="size-3.5" />
          </span>
        ) : (
          <motion.span
            layoutId="profile-card"
            transition={spring}
            className="flex items-center gap-2 rounded-xs border border-transparent px-1.5 py-1 hover:border-border hover:bg-muted/60"
          >
            {card}
            <ChevronsUpDown className="size-3.5 text-muted-foreground" />
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            layoutId="profile-card"
            transition={spring}
            role="menu"
            aria-label="Conta"
            onKeyDown={onPanelKey}
            className="absolute right-0 top-0 z-[120] w-72 overflow-hidden rounded-xs border border-foreground bg-popover text-popover-foreground background-texture"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.15 }}
            >
              <div className="flex items-center gap-3 border-b border-border p-3">
                <Avatar className="size-10 rounded-xs after:rounded-xs">
                  <AvatarImage src={avatarUrl} alt="" className="rounded-xs" />
                  <AvatarFallback className="rounded-xs bg-foreground text-background font-sans text-sm font-bold">
                    {initial}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{displayName}</p>
                  {username && (
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      @{username}
                    </p>
                  )}
                </div>
              </div>

              <ThemeSwitch />

              <div className="border-t border-border p-1">
                <Item icon={<LayoutDashboard />} onSelect={go("/dashboard")}>
                  Dashboard
                </Item>
                {username && (
                  <Item icon={<UserRound />} onSelect={go(`/${username}`)}>
                    Meu perfil
                  </Item>
                )}
                <Item icon={<Settings />} onSelect={go("/conta")}>
                  Conta
                </Item>
                {isAdmin && (
                  <Item icon={<Shield />} onSelect={go("/admin")}>
                    Administração
                  </Item>
                )}
              </div>

              <div className="border-t border-border p-1">
                <HoldToSignOut onConfirm={onSignOut} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ROW =
  "relative flex w-full items-center gap-2.5 overflow-hidden rounded-xs px-2.5 py-2 text-left text-sm outline-none cursor-pointer hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06] [&_svg]:size-4 [&_svg]:shrink-0";

const Item = ({
  icon,
  onSelect,
  children,
}: {
  icon: ReactNode;
  onSelect: () => void;
  children: ReactNode;
}) => (
  <button
    type="button"
    role="menuitem"
    data-pm-item
    onClick={onSelect}
    className={ROW}
  >
    {icon}
    {children}
  </button>
);

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2.5">
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Tema
      </span>
      <div
        role="radiogroup"
        aria-label="Tema"
        className="flex rounded-xs border border-border p-0.5"
      >
        {THEMES.map(({ value, label, icon: Icon }) => {
          const active = theme === value;
          return (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={active}
              aria-label={label}
              title={label}
              data-pm-item
              onClick={() => setTheme(value)}
              className={cn(
                "relative flex size-7 items-center justify-center rounded-[2px] outline-none cursor-pointer focus-visible:outline-2 focus-visible:outline-foreground",
                active
                  ? "text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="profile-theme"
                  className="absolute inset-0 rounded-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 600, damping: 40 }}
                />
              )}
              <Icon className="relative size-3.5" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

/** Sign out only after holding (pointer or Enter/Space) for HOLD_MS. */
const HoldToSignOut = ({
  onConfirm,
}: {
  onConfirm: () => void | Promise<void>;
}) => {
  const [progress, setProgress] = useState(0);
  const [hint, setHint] = useState(false);
  const raf = useRef(0);
  const start = useRef(0);

  const stop = () => {
    cancelAnimationFrame(raf.current);
    if (start.current && progress < 1) setHint(true);
    start.current = 0;
    setProgress(0);
  };

  const begin = () => {
    if (start.current) return;
    setHint(false);
    start.current = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start.current) / HOLD_MS);
      setProgress(p);
      if (p >= 1) {
        start.current = 0;
        void onConfirm();
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <button
      type="button"
      role="menuitem"
      data-pm-item
      onPointerDown={begin}
      onPointerUp={stop}
      onPointerLeave={stop}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !e.repeat) {
          e.preventDefault();
          begin();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" || e.key === " ") stop();
      }}
      aria-label="Sair: segure para confirmar"
      className={cn(ROW, "select-none text-destructive")}
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 bg-destructive"
        style={{ width: `${progress * 100}%` }}
      />
      <span
        className="relative flex items-center gap-2.5"
        style={progress > 0.5 ? { color: "var(--background)" } : undefined}
      >
        <LogOut />
        {hint ? "Continue segurando…" : "Segure para sair"}
      </span>
    </button>
  );
};
