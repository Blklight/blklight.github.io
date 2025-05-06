"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Books, Newspaper, RocketLaunch, Sparkle } from "@phosphor-icons/react";
import { SplitDropdownButton } from "./ui/split-dropdown-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NavUser } from "@/components/nav-user";
import { SearchCommand } from "@/components/search-command";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/use-store";
import { LoginButton } from "@/components/login-button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const NavToolbar = () => {
  const { user } = useStore((state: any) => state);
  const router = useRouter();

  const routeTools = [
    { label: "Criar artigo", value: "criar-artigo", icon: <Newspaper /> },
    { label: "Criar tutorial", value: "criar-tutorial", icon: <Books /> },
    { label: "Criar projeto", value: "criar-projeto", icon: <RocketLaunch /> },
  ];
  const [openSheet, setOpenSheet] = React.useState(false);

  return (
    <div className="flex justify-between items-center p-4 z-20 rounded-t-md">
      <SidebarTrigger />
      <SearchCommand />
      <div className="flex items-center gap-2">
        {user && (
          <SplitDropdownButton
            className="md:flex hidden"
            label="Criar"
            icon={<Sparkle className="h-4 w-4" />}
            options={routeTools}
            onClick={() => router.push("/tools")}
          />
        )}
        <ThemeToggle />
        {user && <NavUser user={user} />}
        {!user && <LoginButton />}
      </div>
    </div>
  );
};
