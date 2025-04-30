"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { IconSidebar } from "@/components/icon-sidebar";
import { NavToolbar } from "@/components/nav-toolbar";

export const LayoutBase = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const withoutLayout = ["/auth", "/auth/login", "/login", "/register"];

  if (withoutLayout.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="w-full flex md:flex-row flex-col min-h-svh">
        <IconSidebar />
        <div className="bg-background shadow-lg rounded-md border flex-1 md:my-2.5 mb-2.5 md:mr-2.5 background-texture">
          <NavToolbar />
          <div className="pt-2.5 mb-5 px-4">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};
