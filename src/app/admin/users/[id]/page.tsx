"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import {
  useAdminUserDetail,
  useUpdateUserRole,
} from "@/features/admin/queries";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminUserDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isPending, isError, refetch } = useAdminUserDetail(
    id as string,
  );
  const updateRole = useUpdateUserRole();

  const [pendingRole, setPendingRole] = useState<"user" | "admin" | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // ajuste 4: hook reativo, não getState()
  const currentUserId = useAuthStore((s) => s.user?.id);
  const isSelf = data?.user.id === currentUserId;
  const selfDemotionBlocked = !!isSelf && pendingRole === "user";

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
        admin / usuários / detalhe
      </div>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          [ carregando usuário... ]
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"// falha ao carregar usuário"}
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
        <>
          {/* cabeçalho */}
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-[0.95]">
              {data.user.username}
              <span className="inline-block border-b-2 border-ink pb-1">.</span>
            </h1>
            <Badge
              variant={data.user.role === "admin" ? "default" : "outline"}
              className="rounded-none border hairline"
            >
              {data.user.role}
            </Badge>
            {data.user.deletedAt && (
              <Badge
                variant="destructive"
                className="rounded-none border hairline"
              >
                deletado
              </Badge>
            )}
          </div>

          {/* troca de role */}
          <Card className="rounded-none border hairline shadow-none bg-transparent mb-8 max-w-md">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                role
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={data.user.role}
                onValueChange={(v) => {
                  const next = v as "user" | "admin";
                  setPendingRole(next);
                  // bloqueio de auto-rebaixamento: não abre dialog quando isSelf && 'user'
                  if (isSelf && next === "user") {
                    setConfirmOpen(false);
                    return;
                  }
                  setConfirmOpen(true);
                }}
              >
                <SelectTrigger className="rounded-none border hairline">
                  <SelectValue placeholder="role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="user">user</SelectItem>
                </SelectContent>
              </Select>

              {selfDemotionBlocked && (
                <p className="mt-2 text-xs uppercase tracking-widest text-destructive">
                  {
                    "// você é o admin logado — não é possível se auto-rebaixar."
                  }
                </p>
              )}
            </CardContent>
          </Card>

          {/* sessões de dados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataCard title="usuário">
              <Row k="id" v={data.user.id} />
              <Row k="email" v={data.user.email} />
              <Row
                k="email verificado"
                v={data.user.emailVerified ? "sim" : "não"}
              />
              <Row
                k="onboarding"
                v={data.user.onboardingComplete ? "completo" : "pendente"}
              />
              <Row
                k="criado em"
                v={new Date(data.user.createdAt).toLocaleDateString("pt-BR")}
              />
              {data.user.deletedAt && (
                <Row
                  k="deletado em"
                  v={new Date(data.user.deletedAt).toLocaleDateString("pt-BR")}
                />
              )}
            </DataCard>

            <DataCard title="perfil">
              {data.profile ? (
                <>
                  <Row k="displayName" v={data.profile.displayName ?? "—"} />
                  <Row k="bio" v={data.profile.bio ?? "—"} />
                  <Row k="privado" v={data.profile.isPrivate ? "sim" : "não"} />
                </>
              ) : (
                <Row k="sem perfil" v="—" />
              )}
            </DataCard>

            <DataCard title="apps ativados">
              {data.apps.length > 0 ? (
                data.apps.map((a) => <Row key={a.slug} k={a.slug} v={a.name} />)
              ) : (
                <Row k="nenhum app" v="—" />
              )}
            </DataCard>

            <DataCard title="servidores">
              {data.servers.length > 0 ? (
                data.servers.map((s) => (
                  <Row key={`${s.name}-${s.role}`} k={s.name} v={s.role} />
                ))
              ) : (
                <Row k="nenhum servidor" v="—" />
              )}
            </DataCard>

            <DataCard title="workspace">
              {data.workspace ? (
                <>
                  <Row k="nome" v={data.workspace.name} />
                  <Row k="tipo" v={data.workspace.type} />
                </>
              ) : (
                <Row k="sem workspace" v="—" />
              )}
            </DataCard>

            <DataCard title="assinatura">
              {data.signature ? (
                <>
                  <Row
                    k="userHash"
                    v={`${data.signature.userHash.slice(0, 16)}…`}
                  />
                  <Row
                    k="criada em"
                    v={new Date(data.signature.createdAt).toLocaleDateString(
                      "pt-BR",
                    )}
                  />
                </>
              ) : (
                <Row k="sem assinatura" v="—" />
              )}
            </DataCard>
          </div>

          {/* AlertDialog de confirmação (padrão delete-template-dialog) */}
          <AlertDialog
            open={confirmOpen}
            onOpenChange={(open) => {
              if (!open) setConfirmOpen(false);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Alterar role</AlertDialogTitle>
                <AlertDialogDescription>
                  Confirmar troca de role de {data.user.username} para{" "}
                  <span className="font-bold">{pendingRole}</span>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => {
                    setConfirmOpen(false);
                    setPendingRole(null);
                  }}
                  disabled={updateRole.isPending}
                >
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    if (pendingRole) {
                      updateRole.mutate(
                        { id: id as string, role: pendingRole },
                        {
                          // { message: 'Role unchanged' } cai aqui como sucesso normal
                          onSettled: () => {
                            setConfirmOpen(false);
                            setPendingRole(null);
                          },
                        },
                      );
                    }
                  }}
                  disabled={updateRole.isPending}
                >
                  {updateRole.isPending ? "[ salvando... ]" : "Confirmar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </section>
  );
}

function DataCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-none border hairline shadow-none bg-transparent">
      <CardHeader>
        <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs">
          {children}
        </dl>
      </CardContent>
    </Card>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-muted-foreground uppercase tracking-widest text-[10px]">
        {k}
      </dt>
      <dd className="font-bold uppercase truncate">{v}</dd>
    </>
  );
}
