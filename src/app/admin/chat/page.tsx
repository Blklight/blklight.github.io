"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useAdminChatServers } from "@/features/admin/queries";

export default function AdminChatPage() {
  const { data: servers, isPending, isError, refetch } = useAdminChatServers();
  const [search, setSearch] = useState("");

  const filteredServers =
    servers?.filter((s) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return [s.name, s.slug].join(" ").toLowerCase().includes(q);
    }) ?? [];

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="flex items-center justify-between mb-8">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
          admin / chat
        </div>
        <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
          {isPending
            ? "[ carregando... ]"
            : `[ ${servers?.length ?? 0} servers ]`}
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
        Chat Servers
        <span className="inline-block border-b-2 border-ink pb-1">.</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="buscar por nome ou slug"
          className="max-w-xs rounded-none border hairline bg-transparent"
        />
      </div>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          [ carregando servers... ]
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"// falha ao carregar servers"}
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

      {filteredServers.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Server</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Membros</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServers.map((server) => (
              <TableRow key={server.id}>
                <TableCell className="font-bold">{server.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="rounded-none border hairline"
                  >
                    {server.slug}
                  </Badge>
                </TableCell>
                <TableCell>{server.memberCount}</TableCell>
                <TableCell>
                  {new Date(server.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {filteredServers.length === 0 && !isPending && !isError && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          [ nenhum server encontrado ]
        </div>
      )}
    </section>
  );
}
