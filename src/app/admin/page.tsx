"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useAdminOverview } from "@/features/admin/queries";

export default function AdminOverviewPage() {
  const { data, isPending, isError, refetch } = useAdminOverview();

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="flex items-center justify-between mb-8">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
          admin / overview
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
        Visão geral
        <span className="inline-block border-b-2 border-ink pb-1">.</span>
      </h1>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          [ carregando métricas... ]
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"// falha ao carregar métricas"}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-xs uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors"
          >
            [ tentar novamente ]
          </button>
        </div>
      )}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link href="/admin/users" className="block">
            <StatCard label="usuários" value={data.users.total} />
          </Link>
          <StatCard label="admins" value={data.users.admins} />
          <Link href="/admin/chat" className="block">
            <StatCard label="servidores" value={data.chat.servers} />
          </Link>
          <StatCard
            label="membros pendentes"
            value={data.chat.pendingMembers}
          />
          <Link href="/admin/apps" className="block">
            <StatCard label="apps ativos" value={data.apps.active} />
          </Link>
        </div>
      )}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="rounded-none border hairline shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-4xl md:text-5xl font-black leading-none">
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
