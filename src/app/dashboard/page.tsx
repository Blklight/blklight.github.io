"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, FileText, PenLine } from "lucide-react";
import Link from "next/link";
import { typeTheme } from "@/components/feed/cards/card-theme";
import { Navbar } from "@/components/navbar";
import { appMeta } from "@/components/onboarding/app-meta";
import { DitherSpotlight } from "@/components/onboarding/dither-spotlight";
import { RequireAuth } from "@/components/require-auth";
import { buttonVariants } from "@/components/ui/button";
import type { Corner } from "@/components/ui/chamfer-utils";
import { FilletCard } from "@/components/ui/fillet-card";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { getPublicFeed } from "@/features/documents/api";
import { useMyDocuments } from "@/features/documents/queries";
import { useCurrentProfile } from "@/features/profile/queries";
import { apiClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type {
  ApiResponse,
  DocumentStatus,
  DocumentSummary,
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

const SHORT_DATE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
});
const TODAY = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const CTA = "group font-mono text-xs uppercase tracking-wider rounded-xs";
const APP_CORNERS: Corner[][] = [["br"], ["tr"], ["bl"], ["tl"]];

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="font-sans text-xl font-bold tracking-tight pb-2 mb-4 border-b-2 border-foreground"
    >
      {children}
    </h2>
  );
}

function StatusChip({ status }: { status: DocumentStatus }) {
  return (
    <span
      className={cn(
        "shrink-0 px-2 py-0.5 rounded-xs font-mono text-[0.7rem] uppercase tracking-wider border",
        status === "published"
          ? "bg-foreground text-background border-foreground"
          : "border-dashed border-foreground/50 text-muted-foreground",
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/** The newest draft, big, so the next session starts where the last one ended. */
function ContinueCard({ doc }: { doc: DocumentSummary }) {
  const theme = typeTheme(doc.typeName);
  return (
    <FilletCard
      corners={["tr", "bl"]}
      size="lg"
      radius={6}
      rounded={2}
      className={cn("group/card relative overflow-hidden min-h-56", theme.wash)}
    >
      <DitherSpotlight radius={180} className={theme.text} />
      <div className="relative h-full min-h-[inherit] flex flex-col p-6 md:p-8 pointer-events-none">
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          Continuar escrevendo · {theme.label}
        </p>
        <h3 className="mt-3 font-sans text-3xl md:text-4xl font-bold tracking-tight leading-[1.05] text-balance">
          <Link
            href={`/editar/${doc.id}`}
            className="pointer-events-auto outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-current hover:underline underline-offset-4 decoration-2"
          >
            {doc.title || "Sem título"}
          </Link>
        </h3>
        {doc.abstract && (
          <p className="mt-3 max-w-2xl text-muted-foreground line-clamp-2">
            {doc.abstract}
          </p>
        )}
        <div className="mt-auto pt-6 flex items-center justify-between gap-4">
          <span className="text-xs text-muted-foreground">
            Editado em {SHORT_DATE.format(new Date(doc.updatedAt))}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
            Continuar
            <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-1" />
          </span>
        </div>
      </div>
    </FilletCard>
  );
}

function StartCard() {
  return (
    <FilletCard
      corners={["tr", "bl"]}
      size="lg"
      radius={6}
      rounded={2}
      bordered={false}
      className="relative overflow-hidden min-h-56 bg-dark text-light"
    >
      <div className="h-full min-h-[inherit] flex flex-col p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-light/60">
          Página em branco
        </p>
        <p className="mt-3 font-sans text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] text-cyber-yellow-400">
          Seu primeiro texto
          <br />
          começa aqui.
        </p>
        <Link
          href="/escrever"
          className={cn(
            buttonVariants({ size: "lg" }),
            CTA,
            "mt-auto self-start bg-light text-dark hover:bg-light/90",
          )}
        >
          Abrir o editor
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </FilletCard>
  );
}

function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const { data: profile } = useCurrentProfile(true);
  const docs = useMyDocuments({ limit: 8 });
  const apps = useQuery({
    queryKey: ["platform-apps", "me"],
    queryFn: async () =>
      (await apiClient.get<ApiResponse<MyApp[]>>("/api/v1/platform-apps/me"))
        .data.data,
  });
  const feed = useQuery({
    queryKey: ["dashboard", "feed"],
    queryFn: () => getPublicFeed({ limit: 4 }),
  });

  const name = profile?.displayName ?? user?.username ?? "";
  const draft = docs.data?.find((doc) => doc.status === "draft");
  const rest = (docs.data ?? []).filter((doc) => doc !== draft);

  return (
    <div className="px-4 md:px-8 py-10 animate-fade-in">
      <header className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground first-letter:uppercase">
            {TODAY.format(new Date())}
          </p>
          <h1 className="mt-2 font-sans text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] wrap-anywhere">
            Olá,{" "}
            <span className="text-blklight-500 dark:text-blklight-400">
              {name}
            </span>
            .
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/escrever"
            className={cn(buttonVariants({ size: "lg" }), CTA, "h-10")}
          >
            <PenLine className="size-4" />
            Novo texto
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-10">
        <div className="flex flex-col gap-10 min-w-0">
          {docs.isPending ? (
            <div className="min-h-56 rounded-xs bg-muted animate-pulse" />
          ) : draft ? (
            <ContinueCard doc={draft} />
          ) : (
            <StartCard />
          )}

          <section aria-labelledby="textos">
            <div className="flex items-baseline justify-between gap-4">
              <SectionTitle id="textos">Seus textos</SectionTitle>
            </div>
            {docs.isError ? (
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  Não foi possível carregar seus textos.
                </p>
                <button
                  type="button"
                  onClick={() => docs.refetch()}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "rounded-xs",
                  )}
                >
                  Tentar novamente
                </button>
              </div>
            ) : rest.length === 0 && !docs.isPending ? (
              <p className="flex items-center gap-3 text-sm text-muted-foreground">
                <FileText className="size-4" />
                {draft
                  ? "Nenhum outro texto por enquanto."
                  : "Você ainda não escreveu nada."}
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {rest.map((doc) => (
                  <li key={doc.id}>
                    <Link
                      href={`/editar/${doc.id}`}
                      className="group flex items-center gap-4 py-3.5 rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-9 w-1.5 shrink-0 rounded-[1px]",
                          typeTheme(doc.typeName).solid,
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-medium group-hover:underline underline-offset-4">
                          {doc.title || "Sem título"}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {typeTheme(doc.typeName).label} · editado em{" "}
                          {SHORT_DATE.format(new Date(doc.updatedAt))}
                        </span>
                      </span>
                      <StatusChip status={doc.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {user?.username && (
              <Link
                href={`/${user.username}`}
                className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Ver meu perfil público
                <ArrowRight className="size-3.5" />
              </Link>
            )}
          </section>
        </div>

        <aside className="flex flex-col gap-10 min-w-0">
          <section aria-labelledby="apps">
            <SectionTitle id="apps">Seus apps</SectionTitle>
            {apps.data && apps.data.length > 0 ? (
              <ul className="grid grid-cols-2 gap-3">
                {apps.data.map((app, i) => {
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
                        <p className="mt-auto font-sans font-bold">
                          {app.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {meta.available ? meta.tagline : "Em breve"}
                        </p>
                      </div>
                    </>
                  );
                  return (
                    <li key={app.id} className="aspect-square">
                      <FilletCard
                        corners={APP_CORNERS[i % APP_CORNERS.length]}
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

          <section aria-labelledby="do-feed">
            <SectionTitle id="do-feed">Do feed</SectionTitle>
            <ul className="flex flex-col gap-1">
              {feed.data?.items.map((doc) => (
                <li key={doc.id}>
                  <Link
                    href={`/${doc.author.username}/${doc.slug}`}
                    className="group flex items-center gap-3 py-2 rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-foreground"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-2.5 shrink-0 border border-dark/40",
                        typeTheme(doc.typeName).solid,
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate text-sm group-hover:underline underline-offset-4">
                      {doc.title}
                    </span>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {doc.author.displayName || doc.author.username}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/feed"
              className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider hover:underline underline-offset-4"
            >
              Abrir o feed
              <ArrowRight className="size-3.5" />
            </Link>
          </section>
        </aside>
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
