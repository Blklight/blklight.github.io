"use client";

import * as React from "react";
import { Book, BookOpen, Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const buttonIcon = () => {
    if (!mounted) return <Sun className="h-[1.2rem] w-[1.2rem]" />; // Fallback para evitar erro de hidratação

    switch (currentTheme) {
      case "dark":
        return (
          <>
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="md:block hidden">Modo Escuro</span>
          </>
        );
      case "book":
        return (
          <>
            <BookOpen className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="md:block hidden">Modo Livro</span>
          </>
        );
      case "light":
        return (
          <>
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="md:block hidden">Modo Claro</span>
          </>
        );
      default:
        return (
          <>
            <Laptop className="h-[1.2rem] w-[1.2rem] transition-all" />
            <span className="md:block hidden">Modo Sistema</span>
          </>
        );
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" suppressHydrationWarning>
          {buttonIcon()}

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-1 h-4 w-4" /> Claro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-1 h-4 w-4" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("book")}>
          <BookOpen className="mr-1 h-4 w-4" />
          Livro
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Laptop className="mr-1 h-4 w-4" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
