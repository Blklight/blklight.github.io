"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";
import { AuthLinks } from "./auth-links";
import { CommandMenuTrigger } from "./command-menu";

export const LandingNavbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);

  return (
    <header
      className="relative z-10 px-6 py-4"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          <Image
            src="/blklight-black.svg"
            alt=""
            width={22}
            height={22}
            className="dark:invert"
          />
          <span className="hidden sm:inline font-sans text-lg font-bold tracking-tight">
            Blklight
          </span>
          <span className="sr-only sm:hidden">Blklight</span>
        </Link>
        <div className="flex items-center gap-2">
          <CommandMenuTrigger className="hidden md:flex mr-2" />
          <AnimatedThemeToggler />
          <AuthLinks />
        </div>
      </div>
    </header>
  );
};
