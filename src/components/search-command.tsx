"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Book,
  FileText,
  FolderIcon as FolderLibrary,
  Laptop,
  Moon,
  Palette,
  Search,
  Sun,
  Terminal,
  Globe,
  PenTool,
  GraduationCap,
  Route,
  BookOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Books,
  Folders,
  Newspaper,
  RocketLaunch,
  Sparkle,
} from "@phosphor-icons/react";
import { useStore } from "@/store/use-store";
import { is } from "date-fns/locale";

// First, let's create interfaces for our command items at the top of the file
interface CommandItemData {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  iconBg: string;
  onClick: () => void;
  keywords?: string[];
  category: string;
  id: string;
}

// Then modify the CustomCommand component to implement search filtering
export const SearchCommand = () => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const { setTheme } = useTheme();
  const commandRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const { isLogged } = useStore((state: any) => state);

  // Define all command items
  const globalItems: CommandItemData[] = [
    {
      icon: <Newspaper className="h-5 w-5" />,
      title: "Artigos",
      subtitle: "Explore todos os artigos",
      iconBg: "bg-cyber-yellow-500 text-dark border border-dark",
      onClick: () => {},
      keywords: ["articles", "artigos", "posts", "blog"],
      category: "global",
      id: "global-articles",
    },
    {
      icon: <Books className="h-5 w-5" />,
      title: "Tutoriais",
      subtitle: "Navegue por todos os tutoriais",
      iconBg: "bg-orange-500 text-dark border border-dark",
      onClick: () => {},
      keywords: ["tutorials", "tutoriais", "guides", "how-to"],
      category: "global",
      id: "global-tutorials",
    },
    {
      icon: <RocketLaunch className="h-5 w-5" />,
      title: "Projetos",
      subtitle: "Descubra todos os projetos",
      iconBg: "bg-magenta-300 text-dark border border-dark",
      onClick: () => {},
      keywords: ["projects", "projetos", "portfolio", "work"],
      category: "global",
      id: "global-projects",
    },
  ];

  const bibliotecaItems: CommandItemData[] = [
    {
      icon: <Newspaper className="h-5 w-5" />,
      title: "Meus artigos",
      subtitle: "Seus artigos pessoais",
      iconBg: "bg-blklight-500 text-light",
      onClick: () => {},
      keywords: ["my articles", "meus artigos", "personal articles"],
      category: "biblioteca",
      id: "biblioteca-articles",
    },
    {
      icon: <Books className="h-5 w-5" />,
      title: "Meus tutoriais",
      subtitle: "Seus tutoriais pessoais",
      iconBg: "bg-blklight-500 text-light",
      onClick: () => {},
      keywords: ["my tutorials", "meus tutoriais", "personal tutorials"],
      category: "biblioteca",
      id: "biblioteca-tutorials",
    },
    {
      icon: <RocketLaunch className="h-5 w-5" />,
      title: "Meus projetos",
      subtitle: "Seus projetos pessoais",
      iconBg: "bg-blklight-500 text-light",
      onClick: () => {},
      keywords: ["my projects", "meus projetos", "personal projects"],
      category: "biblioteca",
      id: "biblioteca-projects",
    },
    {
      icon: <Route className="h-5 w-5" />,
      title: "Minhas trilhas de aprendizado",
      subtitle: "Suas trilhas de aprendizado",
      iconBg: "bg-blklight-500 text-light",
      onClick: () => {},
      keywords: ["learning paths", "trilhas", "education", "courses"],
      category: "biblioteca",
      id: "biblioteca-learning-paths",
    },
    {
      icon: <Folders className="h-5 w-5" />,
      title: "Toda biblioteca",
      subtitle: "Visualize toda sua biblioteca",
      iconBg: "bg-blklight-500 text-light",
      onClick: () => {},
      keywords: ["library", "biblioteca", "all", "collection"],
      category: "biblioteca",
      id: "biblioteca-all",
    },
  ];

  const criarItems: CommandItemData[] = [
    {
      icon: <Sparkle className="h-5 w-5" />,
      title: "Novo artigo",
      subtitle: "Criar um novo artigo",
      iconBg: "bg-havelock-blue-500 text-light",
      onClick: () => {},
      keywords: ["new article", "novo artigo", "create", "write"],
      category: "criar",
      id: "criar-article",
    },
    {
      icon: <Sparkle className="h-5 w-5" />,
      title: "Novo tutorial",
      subtitle: "Criar um novo tutorial",
      iconBg: "bg-havelock-blue-500 text-light",
      onClick: () => router.push("/create"),
      keywords: ["new tutorial", "novo tutorial", "create", "write"],
      category: "criar",
      id: "criar-tutorial",
    },
    {
      icon: <Sparkle className="h-5 w-5" />,
      title: "Novo projeto",
      subtitle: "Criar um novo projeto",
      iconBg: "bg-havelock-blue-500 text-light",
      onClick: () => {},
      keywords: ["new project", "novo projeto", "create", "build"],
      category: "criar",
      id: "criar-project",
    },
  ];

  const themeItems: CommandItemData[] = [
    {
      icon: <Sun className="h-5 w-5" />,
      title: "Modo claro",
      iconBg: "text-dark-500 dark:text-light",
      onClick: () => setTheme("light"),
      keywords: ["light", "claro", "theme", "tema"],
      category: "theme",
      id: "theme-light",
    },
    {
      icon: <Moon className="h-5 w-5" />,
      title: "Modo escuro",
      iconBg: "text-dark-500 dark:text-light",
      onClick: () => setTheme("dark"),
      keywords: ["dark", "escuro", "theme", "tema"],
      category: "theme",
      id: "theme-dark",
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: "Modo livro",
      iconBg: "text-dark-500 dark:text-light",
      onClick: () => setTheme("book"),
      keywords: ["book", "livro", "theme", "tema"],
      category: "theme",
      id: "theme-book",
    },
    {
      icon: <Laptop className="h-5 w-5" />,
      title: "Sistema",
      iconBg: "text-dark-500 dark:text-light",
      onClick: () => setTheme("system"),
      keywords: ["system", "sistema", "theme", "tema"],
      category: "theme",
      id: "theme-system",
    },
  ];

  // Filter function
  const filterItems = (items: CommandItemData[], searchTerm: string) => {
    if (!searchTerm) return items;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        (item.subtitle &&
          item.subtitle.toLowerCase().includes(lowerSearchTerm)) ||
        (item.keywords &&
          item.keywords.some((keyword) =>
            keyword.toLowerCase().includes(lowerSearchTerm)
          ))
      );
    });
  };

  // Filter all sections
  const filteredGlobalItems = filterItems(globalItems, search);
  const filteredBibliotecaItems = filterItems(bibliotecaItems, search);
  const filteredCriarItems = filterItems(criarItems, search);
  const filteredThemeItems = filterItems(themeItems, search);

  // Combine all filtered items into a flat array for keyboard navigation
  const allFilteredItems = [
    ...filteredGlobalItems,
    ...filteredBibliotecaItems,
    ...filteredCriarItems,
    ...filteredThemeItems,
  ];

  // Check if we have any results
  const hasResults = allFilteredItems.length > 0;

  // Reset selected index when search changes
  React.useEffect(() => {
    setSelectedItemIndex(0);
  }, [search]);

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      // Handle arrow navigation
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedItemIndex((prev) =>
          prev < allFilteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedItemIndex((prev) =>
          prev > 0 ? prev - 1 : allFilteredItems.length - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (allFilteredItems[selectedItemIndex]) {
          runCommand(allFilteredItems[selectedItemIndex].onClick);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedItemIndex, allFilteredItems]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  // Focus the input when dialog opens
  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // Close the command dialog when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node) &&
        open
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Prevent scrolling when command dialog is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Reset search when dialog closes
  React.useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedItemIndex(0);
    }
  }, [open]);

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="relative justify-start text-sm text-muted-foreground sm:pr-12 lg:w-64 md:w-48 w-40 lg:max-w-[300px] hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        onClick={() => setOpen(true)}
      >
        <Search className="h-5 w-5" />
        <span className="hidden lg:inline-flex">Pesquisar...</span>
        <span className="inline-flex lg:hidden">Pesquisar...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-[0.45rem] hidden h-5 select-none items-center gap-1 rounded bg-havelock-blue-500 text-light px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed left-[50%] top-[50%] z-50 grid w-[calc(100%-32px)] max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-lg duration-200 rounded-md md:w-full">
            <div
              ref={commandRef}
              className="relative overflow-hidden rounded-md"
            >
              <div className="absolute inset-0 pointer-events-none" />

              {/* Search Input */}
              <div className="flex items-center border-b px-4 py-3">
                <Search className="mr-2 h-5 w-5 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Digite um comando ou pesquise..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                {search && (
                  <button
                    className="rounded-full p-1 hover:bg-accent"
                    onClick={() => setSearch("")}
                  >
                    <span className="sr-only">Limpar pesquisa</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>

              {/* Command List */}
              <div className="max-h-[60vh] overflow-y-auto p-4 ">
                {!hasResults && (
                  <div className="py-6 text-center text-sm text-muted-foreground">
                    Nenhum resultado encontrado para "{search}"
                  </div>
                )}

                {/* Global Section */}
                {filteredGlobalItems.length > 0 && (
                  <div className="mb-6">
                    <h2 className="mb-3 px-2 text-xs font-semibold text-muted-foreground">
                      Global
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {filteredGlobalItems.map((item, index) => {
                        const itemIndex = allFilteredItems.findIndex(
                          (i) => i.id === item.id
                        );
                        const isSelected = selectedItemIndex === itemIndex;

                        return (
                          <CommandItem
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            subtitle={item.subtitle}
                            iconBg={item.iconBg}
                            onClick={() => runCommand(item.onClick)}
                            isSelected={isSelected}
                            onMouseEnter={() => setSelectedItemIndex(itemIndex)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {isLogged && (
                  <>
                    {/* Biblioteca Pessoal Section */}
                    {filteredBibliotecaItems.length > 0 && (
                      <div className="mb-6">
                        <h2 className="mb-3 px-2 text-xs font-semibold text-muted-foreground">
                          Biblioteca Pessoal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {filteredBibliotecaItems.map((item) => {
                            const itemIndex = allFilteredItems.findIndex(
                              (i) => i.id === item.id
                            );
                            const isSelected = selectedItemIndex === itemIndex;

                            return (
                              <CommandItem
                                key={item.id}
                                icon={item.icon}
                                title={item.title}
                                subtitle={item.subtitle}
                                iconBg={item.iconBg}
                                onClick={() => runCommand(item.onClick)}
                                isSelected={isSelected}
                                onMouseEnter={() =>
                                  setSelectedItemIndex(itemIndex)
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Criar Conteúdo Section */}
                    {filteredCriarItems.length > 0 && (
                      <div className="mb-6">
                        <h2 className="mb-3 px-2 text-xs font-semibold text-muted-foreground">
                          Criar Conteúdo
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {filteredCriarItems.map((item) => {
                            const itemIndex = allFilteredItems.findIndex(
                              (i) => i.id === item.id
                            );
                            const isSelected = selectedItemIndex === itemIndex;

                            return (
                              <CommandItem
                                key={item.id}
                                icon={item.icon}
                                title={item.title}
                                subtitle={item.subtitle}
                                iconBg={item.iconBg}
                                onClick={() => runCommand(item.onClick)}
                                isSelected={isSelected}
                                onMouseEnter={() =>
                                  setSelectedItemIndex(itemIndex)
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Theme Section */}
                {filteredThemeItems.length > 0 && (
                  <div>
                    <h2 className="mb-3 px-2 text-xs font-semibold text-muted-foreground">
                      Tema
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-2">
                      {filteredThemeItems.map((item) => {
                        const itemIndex = allFilteredItems.findIndex(
                          (i) => i.id === item.id
                        );
                        const isSelected = selectedItemIndex === itemIndex;

                        return (
                          <CommandItem
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            subtitle={item.subtitle}
                            iconBg={item.iconBg}
                            onClick={() => runCommand(item.onClick)}
                            isSelected={isSelected}
                            onMouseEnter={() => setSelectedItemIndex(itemIndex)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t p-2 text-xs text-muted-foreground flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>Pressione</span>
                  <kbd className="rounded bg-havelock-blue-500 text-light px-1.5 font-mono">
                    ↑
                  </kbd>
                  <kbd className="rounded bg-havelock-blue-500 text-light px-1.5 font-mono">
                    ↓
                  </kbd>
                  <span>para navegar</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Pressione</span>
                  <kbd className="rounded bg-havelock-blue-500 text-light px-1.5 font-mono">
                    ESC
                  </kbd>
                  <span>para fechar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface CommandItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  iconBg: string;
  onClick: () => void;
  isSelected?: boolean;
  onMouseEnter?: () => void;
}

function CommandItem({
  icon,
  title,
  subtitle,
  iconBg,
  onClick,
  isSelected,
  onMouseEnter,
}: CommandItemProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-md p-3 text-left text-sm transition-colors w-full",
        isSelected
          ? "bg-accent text-accent-foreground"
          : "hover:bg-accent hover:text-accent-foreground"
      )}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full",
          iconBg
        )}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{title}</span>
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
    </button>
  );
}
