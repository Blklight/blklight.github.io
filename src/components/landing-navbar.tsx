"use client";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";
import { AuthScreen } from "./auth-screen";

export const LandingNavbar = () => {
  const editorOverlaysOpen = useEditorOverlaysStore((s) => s.overlaysOpen);

  return (
    <div
      className="p-2"
      style={editorOverlaysOpen ? { zIndex: 40 } : undefined}
    >
      <div className="flex items-center gap-2 justify-end">
        <AnimatedThemeToggler />
        <AuthScreen triggerClassName="h-10" showGradient />
      </div>
    </div>
  );
};
