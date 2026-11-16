"use client";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  PenLine,
  Settings,
  Shield,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useCurrentProfile } from "@/features/profile/queries";
import { logout } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";
import { AuthLinks } from "./auth-links";
import { CommandMenuTrigger } from "./command-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LINK =
  "relative h-12 inline-flex items-center text-xs font-mono uppercase tracking-wider transition-colors rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-4";

export const Navbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: profile } = useCurrentProfile(isAuthenticated);

  const displayName = profile?.displayName ?? user?.username ?? "";
  const avatarUrl = profile?.avatarUrl ?? undefined;
  const avatarInitial = (displayName || "?").trim().charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const links = [
    { href: "/feed", label: "Feed", show: true },
    { href: "/escrever", label: "Escrever", show: isAuthenticated },
  ];

  return (
    <div
      className="background-header rounded-b-xs background-texture px-1"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
      <Link
        href={isAuthenticated ? "/dashboard" : "/"}
        className="relative z-2 flex items-center gap-2 px-3 h-12 rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-4"
      >
        <Image
          src="/blklight-black.svg"
          alt=""
          width={18}
          height={18}
          className="dark:invert"
        />
        <span className="font-sans font-bold tracking-tight">Blklight</span>
      </Link>

      <nav
        aria-label="Principal"
        className="relative z-2 flex items-center gap-5"
      >
        {links
          .filter((l) => l.show)
          .map((l) => {
            const active =
              pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  LINK,
                  active
                    ? "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-blklight-500 dark:after:bg-blklight-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        <CommandMenuTrigger className="hidden md:flex ml-auto mr-4" />
      </nav>

      <div className="relative z-2 flex items-center gap-1 justify-end pr-1">
        <AnimatedThemeToggler />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex items-center gap-2 h-9 pl-1 pr-2 rounded-xs border border-transparent hover:border-border hover:bg-muted/60 data-popup-open:border-border data-popup-open:bg-muted/60 transition-colors outline-none focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer"
              aria-label={`Menu da conta de ${displayName}`}
            >
              <Avatar className="size-7 rounded-xs after:rounded-xs">
                <AvatarImage src={avatarUrl} alt="" className="rounded-xs" />
                <AvatarFallback className="rounded-xs bg-foreground text-background font-sans text-xs font-bold">
                  {avatarInitial}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:block max-w-32 truncate text-sm">
                {displayName}
              </span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xs">
              <div className="px-2 py-2">
                <p className="text-sm font-medium truncate">{displayName}</p>
                {user?.username && (
                  <p className="text-xs text-muted-foreground truncate">
                    @{user.username}
                  </p>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  <LayoutDashboard />
                  Dashboard
                </DropdownMenuItem>
                {user?.username && (
                  <DropdownMenuItem
                    onClick={() => router.push(`/${user.username}`)}
                  >
                    <UserRound />
                    Meu perfil
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => router.push("/escrever")}>
                  <PenLine />
                  Escrever
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/conta")}>
                  <Settings />
                  Conta
                </DropdownMenuItem>
                {user?.role === "admin" && (
                  <DropdownMenuItem onClick={() => router.push("/admin")}>
                    <Shield />
                    Administração
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthLinks compact />
        )}
      </div>
    </div>
  );
};
