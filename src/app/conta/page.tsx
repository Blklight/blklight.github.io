"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { logout } from "@/lib/session";
import { useAuthStore } from "@/store/useAuthStore";

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrador",
  user: "Usuário",
};

function Account() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  if (!user) return null;

  const rows: Array<[string, string]> = [
    ["Usuário", `@${user.username}`],
    ["E-mail", user.email],
    ["Papel", ROLE_LABEL[user.role] ?? user.role],
    ["Onboarding", user.onboardingComplete ? "Concluído" : "Pendente"],
    ["Sessão", "Ativa neste navegador"],
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-12 animate-fade-in">
      <h1 className="font-sans text-4xl font-bold tracking-tight mb-2">
        Conta
      </h1>
      <p className="text-muted-foreground mb-10">
        Dados da sua conta e da sessão atual.
      </p>

      <dl className="border-y border-border divide-y divide-border">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[8rem_1fr] gap-4 py-3 text-sm"
          >
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="truncate">{value}</dd>
          </div>
        ))}
      </dl>

      <Button
        variant="outline"
        className="mt-8 rounded-xs"
        onClick={async () => {
          await logout();
          router.replace("/");
        }}
      >
        <LogOut className="size-4" />
        Sair desta conta
      </Button>
    </div>
  );
}

export default function AccountPage() {
  return (
    <RequireAuth>
      <Navbar />
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative z-0 min-h-[calc(100dvh-4.125rem)]">
        <TextureOverlay texture="grid" className="mix-blend-overlay" />
        <div className="relative z-10">
          <Account />
        </div>
      </section>
    </RequireAuth>
  );
}
