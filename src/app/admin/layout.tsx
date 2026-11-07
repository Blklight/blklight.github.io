"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const check = () => {
      const { isAuthenticated: authed, user: current } =
        useAuthStore.getState();
      if (!authed) {
        router.replace("/");
        return;
      }
      // não-admin vai pro dashboard (não "/"), pra não parecer erro de login
      if (current?.role !== "admin") {
        router.replace("/dashboard");
      }
    };
    if (useAuthStore.persist.hasHydrated()) {
      check();
      return;
    }
    return useAuthStore.persist.onFinishHydration(check);
  }, [router]);

  // enquanto não resolve (hydration pendente ou role ainda checando),
  // renderiza nada pra evitar redirect precoce / flash
  if (!isAuthenticated || !user || user.role !== "admin") {
    return null;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
