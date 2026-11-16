"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, FileText, PenLine } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { appMeta } from "@/components/onboarding/app-meta";
import { DitherSpotlight } from "@/components/onboarding/dither-spotlight";
import { RequireAuth } from "@/components/require-auth";
import { buttonVariants } from "@/components/ui/button";
import { FilletCard } from "@/components/ui/fillet-card";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useMyDocuments } from "@/features/documents/queries";
import { useCurrentProfile } from "@/features/profile/queries";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type {
  ApiResponse,
  DocumentStatus,
  PlatformApp,
} from "@/types/api.types";

type MyApp = Pick<PlatformApp, "slug" | "name" | "description"> & {
  id: string;
};

const STATUS_LABEL: Record<DocumentStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Arquivado",
};

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});

const CTA = "group font-mono text-xs uppercase tracking-wider rounded-xs";

function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: profile } = useCurrentProfile(true);
  const docs = useMyDocuments({ limit: 5 });
  const apps = useQuery({
    queryKey: ["platform-apps", "me"],
    queryFn: async () =>
      (await apiClient.get<ApiResponse<MyApp[]>>("/api/v1/platform-apps/me"))
        .data.data,
  });

  const name = profile?.displayName ?? user?.username ?? "";

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
        <div>
          <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight wrap-anywhere">
            Olá,{" "}
            <span className="text-blklight-500 dark:text-blklight-400">
              {name}
            </span>
            .
          </h1>
          <p className="mt-3 text-muted-foreground">
            Seus textos e apps, num lugar só.
          </p>
        </div>
        <Link
          href="/escrever"
          className={cn(buttonVariants({ size: "lg" }), CTA)}
        >
          <PenLine className="size-4" />
          Novo texto
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
        <section aria-labelledby="textos">
          <div className="flex items-baseline justify-between mb-4">
            <h2 id="textos" className="font-sans text-xl font-bold">
              Seus textos
            </h2>
            {user?.username && (
              <Link
                href={`/${user.username}`}
                className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Ver perfil público
              </Link>
            )}
          </div>

          {docs.isPending ? (
            <ul className="border-y border-border divide-y divide-border">
              {[0, 1, 2].map((i) => (
                <li key={i} className="py-4">
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded-xs" />
                  <div className="mt-2 h-3 w-1/4 bg-muted animate-pulse rounded-xs" />
                </li>
              ))}
            </ul>
          ) : docs.isError ? (
            <div className="border border-border rounded-xs p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Não foi possível carregar seus textos.
              </p>
              <button
                type="button"
                onClick={() => docs.refetch()}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-xs",
                )}
              >
                Tentar novamente
              </button>
            </div>
          ) : docs.data.length === 0 ? (
            <div className="border border-dashed border-border rounded-xs p-8 flex flex-col items-start gap-4">
              <FileText
                className="size-6 text-muted-foreground"
                strokeWidth={1.5}
              />
              <div>
                <p className="font-medium">Você ainda não escreveu nada.</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Comece um rascunho; ele fica salvo até você publicar.
                </p>
              </div>
              <Link
                href="/escrever"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  CTA,
                  "bg-transparent",
                )}
              >
                Escrever o primeiro texto
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ) : (
            <ul className="border-y border-border divide-y divide-border">
              {docs.data.map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/escrever/${doc.id}`}
                    className="group flex items-center justify-between gap-4 py-4 rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate group-hover:underline underline-offset-4">
                        {doc.title || "Sem título"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {STATUS_LABEL[doc.status]} · editado em{" "}
                        {dateFormat.format(new Date(doc.updatedAt))}
                      </p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section aria-labelledby="apps">
          <h2 id="apps" className="font-sans text-xl font-bold mb-4">
            Seus apps
          </h2>
          {apps.data && apps.data.length > 0 ? (
            <ul className="grid grid-cols-2 gap-3">
              {apps.data.map((app) => {
                const meta = appMeta(app);
                const Icon = meta.icon;
                const body = (
                  <>
                    <DitherSpotlight
                      radius={110}
                      className={meta.accent.text}
                    />
                    <div className="relative z-10 h-full p-4 flex flex-col pointer-events-none">
                      {Icon && (
                        <Icon
                          className={cn("size-7", meta.accent.text)}
                          strokeWidth={1.5}
                        />
                      )}
                      <p className="mt-auto font-sans font-bold">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {meta.available ? meta.tagline : "Em breve"}
                      </p>
                    </div>
                  </>
                );
                return (
                  <li key={app.id} className="aspect-square">
                    <FilletCard
                      corners={["br"]}
                      size="md"
                      radius={4}
                      rounded={2}
                      style={{ height: "100%" }}
                      className="relative overflow-hidden"
                    >
                      {app.slug === "publisher" ? (
                        <Link
                          href="/escrever"
                          className="absolute inset-0 hover:bg-muted/40 transition-colors outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-foreground"
                        >
                          {body}
                        </Link>
                      ) : (
                        body
                      )}
                    </FilletCard>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">
              {apps.isPending ? "Carregando…" : "Nenhum app ativo."}
            </p>
          )}
        </section>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <Navbar />
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative z-0 min-h-[calc(100dvh-4.125rem)]">
        <TextureOverlay texture="grid" className="mix-blend-overlay" />
        <div className="relative z-10">
          <Dashboard />
        </div>
      </section>
    </RequireAuth>
  );
}
