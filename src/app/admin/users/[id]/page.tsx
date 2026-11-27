"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useLayoutEffect, useState } from "react";
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
  const t = useTranslations("admin");
  const locale = useLocale();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isPending, isError, refetch } = useAdminUserDetail(
    id as string,
  );
  const updateRole = useUpdateUserRole();

  const [pendingRole, setPendingRole] = useState<"user" | "admin" | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setConfirmOpen(false);
    };
  }, []);

  // ajuste 4: hook reativo, não getState()
  const currentUserId = useAuthStore((s) => s.user?.id);
  const isSelf = data?.user.id === currentUserId;
  const selfDemotionBlocked = !!isSelf && pendingRole === "user";

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
        {t("crumbUserDetail")}
      </div>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          {t("loadingUser")}
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {t("userError")}
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
                {t("deleted")}
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
                  {t("selfDemotion")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* sessões de dados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DataCard title={t("cardUser")}>
              <Row k="id" v={data.user.id} />
              <Row k="email" v={data.user.email} />
              <Row
                k={t("emailVerified")}
                v={data.user.emailVerified ? t("yes") : t("no")}
              />
              <Row
                k="onboarding"
                v={data.user.onboardingComplete ? t("complete") : t("pending")}
              />
              <Row
                k={t("createdOn")}
                v={new Date(data.user.createdAt).toLocaleDateString(locale)}
              />
              {data.user.deletedAt && (
                <Row
                  k={t("deletedOn")}
                  v={new Date(data.user.deletedAt).toLocaleDateString(locale)}
                />
              )}
            </DataCard>

            <DataCard title={t("cardProfile")}>
              {data.profile ? (
                <>
                  <Row k="displayName" v={data.profile.displayName ?? "—"} />
                  <Row k="bio" v={data.profile.bio ?? "—"} />
                  <Row
                    k={t("private")}
                    v={data.profile.isPrivate ? t("yes") : t("no")}
                  />
                </>
              ) : (
                <Row k={t("noProfile")} v="—" />
              )}
            </DataCard>

            <DataCard title={t("cardApps")}>
              {data.apps.length > 0 ? (
                data.apps.map((a) => <Row key={a.slug} k={a.slug} v={a.name} />)
              ) : (
                <Row k={t("noApp")} v="—" />
              )}
            </DataCard>

            <DataCard title={t("statServers")}>
              {data.servers.length > 0 ? (
                data.servers.map((s) => (
                  <Row key={`${s.name}-${s.role}`} k={s.name} v={s.role} />
                ))
              ) : (
                <Row k={t("noServer")} v="—" />
              )}
            </DataCard>

            <DataCard title="workspace">
              {data.workspace ? (
                <>
                  <Row k={t("name")} v={data.workspace.name} />
                  <Row k={t("type")} v={data.workspace.type} />
                </>
              ) : (
                <Row k={t("noWorkspace")} v="—" />
              )}
            </DataCard>

            <DataCard title={t("cardSignature")}>
              {data.signature ? (
                <>
                  <Row
                    k="userHash"
                    v={`${data.signature.userHash.slice(0, 16)}…`}
                  />
                  <Row
                    k={t("createdOnFem")}
                    v={new Date(data.signature.createdAt).toLocaleDateString(
                      locale,
                    )}
                  />
                </>
              ) : (
                <Row k={t("noSignature")} v="—" />
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
                <AlertDialogTitle>{t("changeRole")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.rich("confirmRole", {
                    user: data.user.username,
                    role: pendingRole ?? "",
                    b: (chunks) => <span className="font-bold">{chunks}</span>,
                  })}
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
                  {t("cancel")}
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
                  {updateRole.isPending ? t("saving") : t("confirm")}
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
