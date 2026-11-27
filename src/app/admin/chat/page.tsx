"use client";

import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("admin");
  const locale = useLocale();
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
            ? t("loading")
            : t("serversCount", { count: servers?.length ?? 0 })}
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
        {t("chatTitle")}
        <span className="inline-block border-b-2 border-ink pb-1">.</span>
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t("chatSearch")}
          className="max-w-xs rounded-none border hairline bg-transparent"
        />
      </div>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          {t("loadingServers")}
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {t("serversError")}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-xs uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors"
          >
            {t("retry")}
          </button>
        </div>
      )}

      {filteredServers.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("colServer")}</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>{t("colMembers")}</TableHead>
              <TableHead>{t("colCreated")}</TableHead>
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
                  {new Date(server.createdAt).toLocaleDateString(locale)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {filteredServers.length === 0 && !isPending && !isError && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          {t("noServers")}
        </div>
      )}
    </section>
  );
}
