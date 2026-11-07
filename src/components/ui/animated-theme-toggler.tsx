"use client";

import { BookOpen, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/useLanguageStore";

type Theme = "light" | "dark" | "book" | "system";

const OPTIONS: { theme: Theme; label: string; Icon: typeof Sun }[] = [
  { theme: "light", label: "Claro", Icon: Sun },
  { theme: "dark", label: "Escuro", Icon: Moon },
  { theme: "book", label: "Livro", Icon: BookOpen },
  { theme: "system", label: "Sistema", Icon: Laptop },
];

export const AnimatedThemeToggler = ({ className }: { className?: string }) => {
  const { setTheme } = useTheme();
  const language = useLanguageStore((s) => s.language);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const label =
    language === "en-us"
      ? "Toggle light and dark modes"
      : "Alternar modos de luz e escuro";

  const handleChangeTheme = async (theme: Theme) => {
    if (!buttonRef.current || !document.startViewTransition) {
      setTheme(theme);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(theme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        ref={buttonRef}
        aria-label={label}
        suppressHydrationWarning
        className={cn(
          "flex h-10 w-12 cursor-pointer items-center justify-center gap-1 rounded-xs px-4 text-[#252525] outline-none hover:bg-[#252525] hover:text-[#eaeaea] dark:text-[#eaeaea] dark:hover:bg-[#eaeaea] dark:hover:text-[#252525]",
          className,
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4.5"
          aria-hidden="true"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 3l0 18" />
          <path d="M12 9l4.65 -4.65" />
          <path d="M12 14.3l7.37 -7.37" />
          <path d="M12 19.6l8.85 -8.85" />
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-auto rounded-xs border-[#252525] dark:border-[#eaeaea]"
      >
        {OPTIONS.map(({ theme, label: optionLabel, Icon }) => (
          <DropdownMenuItem
            key={theme}
            className="cursor-pointer rounded-xs"
            onClick={() => handleChangeTheme(theme)}
          >
            <Icon className="mr-1 h-4 w-4" />
            {optionLabel}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
