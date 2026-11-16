"use client";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";

export const LandingNavbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);

  return (
    <div
      className="p-2"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
      <div className="flex items-center gap-2 justify-end">
        <AnimatedThemeToggler />
        <Link
          href="/auth"
          className="flex gap-1 justify-center items-center px-4 text-foreground hover:bg-primary hover:text-primary-foreground rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground font-mono h-10"
        >
          <LogIn className="mr-1 h-4 w-4" />
          Entrar
        </Link>
      </div>
    </div>
  );
};
