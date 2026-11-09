"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useCurrentProfile } from "@/features/profile/queries";
import { logout } from "@/lib/session";
import { useAuthStore } from "@/store/useAuthStore";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";
import { AuthScreen } from "./auth-screen";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const Navbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);
  const router = useRouter();

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

  return (
    <div
      className="background-header rounded-b-xs background-texture px-1"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
      <div></div>
      <div className="flex items-center gap-4">
        <Link
          href="/feed"
          className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
        >
          Feed
        </Link>
        {isAuthenticated && (
          <Link
            href="/escrever"
            className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            Escrever
          </Link>
        )}
      </div>
      <div className="flex items-center gap-2 justify-end">
        <AnimatedThemeToggler />
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full" />
              }
            >
              <Avatar>
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{avatarInitial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuGroup>
                <div className="px-2 py-1.5 text-sm font-medium">
                  {displayName}
                </div>
                {user?.role === "admin" && (
                  <DropdownMenuItem onClick={() => router.push("/admin")}>
                    Admin panel
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthScreen triggerClassName="h-12" />
        )}
      </div>
    </div>
  );
};
