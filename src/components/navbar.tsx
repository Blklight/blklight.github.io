"use client";
import { LayoutGrid, PenLine, Rss } from "lucide-react";
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
import { CommandBar } from "./command-menu";
import { ProfileMenu } from "./profile-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);
  const router = useRouter();
  const pathname = usePathname();

  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const { data: profile } = useCurrentProfile(isAuthenticated);

  const displayName = profile?.displayName ?? user?.username ?? "";

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const links = [
    {
      href: "/feed",
      label: "Feed",
      hint: "O que foi publicado",
      icon: Rss,
      show: true,
    },
    {
      href: "/escrever",
      label: "Escrever",
      hint: "Começar um texto",
      icon: PenLine,
      show: isAuthenticated,
    },
  ].filter((l) => l.show);
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const current = links.find((l) => isActive(l.href));

  return (
    <div
      className="background-header rounded-b-xs background-texture px-1"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
      <div className="relative z-2 flex items-center gap-1">
        <Link
          href={isAuthenticated ? "/dashboard" : "/"}
          className="flex items-center gap-2 px-3 h-12 rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-4"
        >
          <Image
            src="/blklight-black.svg"
            alt=""
            width={18}
            height={18}
            className="dark:invert"
          />
          <span className="hidden sm:inline font-sans font-bold tracking-tight">
            Blklight
          </span>
          <span className="sr-only sm:hidden">Blklight</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Navegação"
            className="flex h-8 items-center gap-1.5 rounded-xs border border-transparent px-2 text-muted-foreground hover:border-border hover:bg-muted/60 hover:text-foreground data-popup-open:border-border data-popup-open:bg-muted/60 data-popup-open:text-foreground outline-none focus-visible:outline-2 focus-visible:outline-foreground cursor-pointer"
          >
            <LayoutGrid className="size-4" />
            {current && (
              <span className="hidden md:inline font-mono text-xs uppercase tracking-wider">
                {current.label}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60 rounded-xs">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-mono text-xs uppercase tracking-wider">
                Navegação
              </DropdownMenuLabel>
              {links.map((l) => (
                <DropdownMenuItem
                  key={l.href}
                  onClick={() => router.push(l.href)}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cn(
                    "gap-3 py-2",
                    isActive(l.href) && "bg-foreground/[0.06]",
                  )}
                >
                  <l.icon />
                  <span className="flex flex-col">
                    <span>{l.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {l.hint}
                    </span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="relative z-2 hidden md:flex justify-center px-4">
        <CommandBar className="max-w-xl" />
      </div>

      <div className="relative z-2 flex items-center gap-1 justify-end pr-1">
        <AnimatedThemeToggler />
        {isAuthenticated ? (
          <ProfileMenu
            displayName={displayName}
            username={user?.username}
            avatarUrl={profile?.avatarUrl ?? undefined}
            isAdmin={user?.role === "admin"}
            onSignOut={handleLogout}
          />
        ) : (
          <AuthLinks compact />
        )}
      </div>
    </div>
  );
};
