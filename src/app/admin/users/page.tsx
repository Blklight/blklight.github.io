"use client";

import { useRouter } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useAdminUsers } from "@/features/admin/queries";
import type { AdminUsersQueryParams } from "@/types/api.types";

const LIMIT = 20;

export default function AdminUsersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<"user" | "admin" | "all">("all");
  const [deleted, setDeleted] = useState<"false" | "true">("false");
  const [page, setPage] = useState(1);
  const deferredSearch = useDeferredValue(search);

  const params: AdminUsersQueryParams = {
    search: deferredSearch || undefined,
    role: role === "all" ? undefined : role,
    deleted,
    page,
    limit: LIMIT,
  };
  const { data, isPending, isError, isFetching, refetch } =
    useAdminUsers(params);

  const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / LIMIT));

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="flex items-center justify-between mb-8">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
          admin / usuários
        </div>
        <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
          {isFetching
            ? "[ carregando... ]"
            : `[ ${data?.total ?? 0} usuários ]`}
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95] mb-8">
        Usuários
        <span className="inline-block border-b-2 border-ink pb-1">.</span>
      </h1>

      {/* filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="buscar por username, email ou displayName"
          className="max-w-xs rounded-none border hairline bg-transparent"
        />
        <Select
          items={{ all: "todas", user: "user", admin: "admin" }}
          value={role}
          onValueChange={(v) => {
            setRole(v as "user" | "admin" | "all");
            setPage(1);
          }}
        >
          <SelectTrigger className="rounded-none border hairline">
            <SelectValue placeholder="role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">todas</SelectItem>
            <SelectItem value="user">user</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
          </SelectContent>
        </Select>
        <Select
          items={{ false: "não deletados", true: "deletados" }}
          value={deleted}
          onValueChange={(v) => {
            setDeleted(v as "false" | "true");
            setPage(1);
          }}
        >
          <SelectTrigger className="rounded-none border hairline">
            <SelectValue placeholder="deletados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">não deletados</SelectItem>
            <SelectItem value="true">deletados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          [ carregando usuários... ]
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"// falha ao carregar usuários"}
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

      {data && data.items.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verificado</TableHead>
              <TableHead>Onboarding</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Deletado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((u) => (
              <TableRow
                key={u.id}
                className="cursor-pointer"
                onClick={() => router.push(`/admin/users/${u.id}`)}
              >
                <TableCell>
                  <div className="font-bold">{u.username}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={u.role === "admin" ? "default" : "outline"}
                    className="rounded-none border hairline"
                  >
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={u.emailVerified ? "default" : "outline"}
                    className="rounded-none border hairline"
                  >
                    {u.emailVerified ? "sim" : "não"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {u.onboardingComplete ? "completo" : "pendente"}
                </TableCell>
                <TableCell>
                  {new Date(u.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  {u.deletedAt ? (
                    <Badge
                      variant="destructive"
                      className="rounded-none border hairline"
                    >
                      deletado
                    </Badge>
                  ) : (
                    "—"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {data && data.items.length === 0 && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          [ nenhum usuário encontrado ]
        </div>
      )}

      {/* paginação truncada */}
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-disabled={page <= 1}
              onClick={(e) => {
                e.preventDefault();
                if (page > 1) setPage(page - 1);
              }}
            />
          </PaginationItem>

          {paginationItems(page, totalPages, (n) => setPage(n))}

          <PaginationItem>
            <PaginationNext
              aria-disabled={page >= totalPages}
              onClick={(e) => {
                e.preventDefault();
                if (page < totalPages) setPage(page + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}

/**
 * Ajuste 2: janela truncada de páginas.
 * ≤ 7 páginas → mostra todas. Caso contrário mostra página 1, atual±1,
 * última, com PaginationEllipsis nos gaps — sem renderizar um link por página.
 */
function paginationItems(
  page: number,
  totalPages: number,
  goTo: (n: number) => void,
) {
  const items: React.ReactNode[] = [];

  const push = (n: number, active: boolean, key: number) => {
    items.push(
      <PaginationItem key={key}>
        <PaginationLink
          isActive={active}
          onClick={(e) => {
            e.preventDefault();
            goTo(n);
          }}
        >
          {n}
        </PaginationLink>
      </PaginationItem>,
    );
  };

  const pushEllipsis = (key: number) => {
    items.push(
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>,
    );
  };

  if (totalPages <= 7) {
    for (let n = 1; n <= totalPages; n++) {
      push(n, n === page, n);
    }
    return items;
  }

  // página 1
  push(1, page === 1, 1);

  // faixa central: problema? → atual ±1
  const rangeStart = Math.max(2, page - 1);
  const rangeEnd = Math.min(totalPages - 1, page + 1);

  if (rangeStart > 2) pushEllipsis(2);
  for (let n = rangeStart; n <= rangeEnd; n++) {
    push(n, n === page, n);
  }
  if (rangeEnd < totalPages - 1) pushEllipsis(totalPages - 1);

  // última página
  push(totalPages, page === totalPages, totalPages);

  return items;
}
