"use client";
import Image from "next/image";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";
import { AuthLinks } from "./auth-links";

export const LandingNavbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);

  return (
    <header
      className="relative z-10 px-6 py-4 flex items-center justify-between gap-4"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
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
        <AnimatedThemeToggler />
        <AuthLinks />
      </div>
    </header>
  );
};
