"use client";

import { PenLine } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { logout } from "@/lib/session";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const check = () => {
      if (!useAuthStore.getState().isAuthenticated) {
        router.replace("/");
      }
    };
    if (useAuthStore.persist.hasHydrated()) {
      check();
      return;
    }
    return useAuthStore.persist.onFinishHydration(check);
  }, [router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const meta: Array<[string, string]> = [
    ["user", `@${user.username}`],
    ["email", user.email],
    ["role", user.role],
    ["onboarding", user.onboardingComplete ? "completo" : "pendente"],
    ["sessão", "ativa"],
  ];

  return (
    <>
      <Navbar />
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
        <TextureOverlay texture={"grid"} className="mix-blend-overlay" />
        <div className="flex-1 flex items-center justify-center px-6 md:px-12 py-8">
          <div className="w-full max-w-xl animate-fade-in">
            <div className="flex items-center justify-between mb-10">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
                dashboard
              </div>
              <button
                type="button"
                onClick={async () => {
                  await logout();
                  router.replace("/");
                }}
                className="text-[10px] uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
              >
                [ sair ]
              </button>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
              logado
              <span className="inline-block border-b-2 border-ink pb-1">.</span>
            </h1>

            <aside
              className="border border-ink bg-surface p-6 shadow-pop-bl"
              aria-label="painel de sessão"
            >
              <div className="text-[14px] uppercase tracking-[0.3em] text-muted-foreground mb-4 font-bold">
                sessão
              </div>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs mb-5">
                {meta.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt className="text-muted-foreground uppercase tracking-widest text-[10px]">
                      {k}
                    </dt>
                    <dd className="font-bold uppercase truncate">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground/70">
                build v0.1
              </div>
            </aside>

            <Link
              href="/escrever"
              className="mt-6 inline-flex items-center gap-2 border border-ink bg-ink text-background px-6 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-background hover:text-ink transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
            >
              <PenLine className="w-4 h-4" />
              escrever
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
