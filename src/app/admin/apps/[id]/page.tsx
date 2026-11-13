"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import {
  useAdminApps,
  useAppInvites,
  useCreateAppInvite,
  useUpdatePlatformApp,
} from "@/features/admin/queries";
import {
  type CreateAppInviteFormData,
  createAppInviteSchema,
  type UpdatePlatformAppFormData,
  updatePlatformAppSchema,
} from "@/types/form.schemas";

export default function AdminAppDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const {
    data: apps,
    isPending: appsPending,
    isError: appsError,
    refetch: refetchApps,
  } = useAdminApps();
  const {
    data: invites,
    isPending: invitesPending,
    refetch: refetchInvites,
  } = useAppInvites(id);
  const updateApp = useUpdatePlatformApp();
  const createInvite = useCreateAppInvite();

  const app = apps?.find((a) => a.id === id);

  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setInviteDialogOpen(false);
    };
  }, []);

  const editForm = useForm<UpdatePlatformAppFormData>({
    resolver: zodResolver(updatePlatformAppSchema),
    defaultValues: {
      name: "",
      description: "",
      accessMode: "open",
      iconUrl: "",
      tagline: "",
      category: "",
      isActive: true,
    },
  });

  const inviteForm = useForm<CreateAppInviteFormData>({
    resolver: zodResolver(createAppInviteSchema),
    defaultValues: { profileId: "" },
  });

  // Populate form when app data loads
  if (
    app &&
    Object.keys(editForm.getValues()).every(
      (k) => !editForm.getValues()[k as keyof UpdatePlatformAppFormData],
    )
  ) {
    editForm.reset({
      name: app.name,
      description: app.description ?? "",
      accessMode: app.accessMode,
      iconUrl: app.iconUrl ?? "",
      tagline: app.tagline ?? "",
      category: app.category ?? "",
      isActive: app.isActive,
    });
  }

  const onEditSubmit = editForm.handleSubmit(async (values) => {
    const payload: UpdatePlatformAppFormData = {
      name: values.name,
      description: values.description,
      accessMode: values.accessMode,
      iconUrl: values.iconUrl,
      tagline: values.tagline,
      category: values.category,
      isActive: values.isActive,
    };
    await updateApp.mutateAsync({ id: id as string, body: payload });
    editForm.reset(payload);
  });

  const onInviteSubmit = inviteForm.handleSubmit(async (values) => {
    await createInvite.mutateAsync({
      appId: id as string,
      body: { profileId: values.profileId },
    });
    setInviteDialogOpen(false);
    inviteForm.reset();
    refetchInvites();
  });

  if (appsPending) {
    return (
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
        <TextureOverlay texture={"grid"} className="mix-blend-overlay" />
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          [ carregando app... ]
        </div>
      </section>
    );
  }

  if (appsError || !app) {
    return (
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
        <TextureOverlay texture={"grid"} className="mix-blend-overlay" />
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"// falha ao carregar app"}
          </p>
          <button
            type="button"
            onClick={() => refetchApps()}
            className="text-xs uppercase tracking-widest border hairline px-4 py-2 hover:bg-ink hover:text-background transition-colors"
          >
            [ tentar novamente ]
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
        admin / apps / detalhe
      </div>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight uppercase leading-[0.95]">
          {app.name}
          <span className="inline-block border-b-2 border-ink pb-1">.</span>
        </h1>
        <Badge
          variant={app.accessMode === "beta" ? "default" : "outline"}
          className="rounded-none border hairline"
        >
          {app.accessMode}
        </Badge>
        <Badge
          variant={app.isActive ? "default" : "destructive"}
          className="rounded-none border hairline"
        >
          {app.isActive ? "ativo" : "inativo"}
        </Badge>
      </div>

      {/* form de edição */}
      <Card className="rounded-none border hairline shadow-none bg-transparent mb-8 max-w-3xl">
        <CardHeader>
          <CardTitle className="text-xs uppercase tracking-widest text-muted-foreground">
            editar app
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...editForm}>
            <form onSubmit={onEditSubmit} className="grid gap-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      nome
                    </FormLabel>
                    <FormControl
                      render={
                        <Input
                          {...field}
                          className="rounded-none border hairline bg-transparent"
                        />
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      descrição
                    </FormLabel>
                    <FormControl
                      render={
                        <Input
                          {...field}
                          className="rounded-none border hairline bg-transparent"
                        />
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="accessMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      modo de acesso
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl
                        render={
                          <SelectTrigger className="rounded-none border hairline" />
                        }
                      >
                        <SelectValue placeholder="selecionar" />
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">open</SelectItem>
                        <SelectItem value="beta">beta</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="iconUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      ícone (url)
                    </FormLabel>
                    <FormControl
                      render={
                        <Input
                          {...field}
                          className="rounded-none border hairline bg-transparent"
                        />
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      tagline
                    </FormLabel>
                    <FormControl
                      render={
                        <Input
                          {...field}
                          className="rounded-none border hairline bg-transparent"
                        />
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                      categoria (livre)
                    </FormLabel>
                    <FormControl
                      render={
                        <Input
                          {...field}
                          className="rounded-none border hairline bg-transparent"
                        />
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground flex-1">
                      ativo
                    </FormLabel>
                    <FormControl
                      render={
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => field.onChange(checked)}
                          disabled={updateApp.isPending}
                        />
                      }
                    />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-2 pt-4 border-t hairline">
                <Button
                  type="submit"
                  disabled={updateApp.isPending}
                  className="rounded-none border hairline"
                >
                  {updateApp.isPending ? "[ salvando... ]" : "[ salvar ]"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* seção de convites (só para apps beta) */}
      {app.accessMode === "beta" && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold uppercase tracking-tight">
              Convites
            </h2>
            <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
              <DialogTrigger
                render={
                  <Button
                    variant="default"
                    className="rounded-none border hairline"
                    size="sm"
                  />
                }
              >
                [ convidar ]
              </DialogTrigger>
              <DialogContent className="max-w-md rounded-none border hairline shadow-none bg-transparent">
                <DialogHeader>
                  <DialogTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                    criar convite
                  </DialogTitle>
                  <DialogDescription className="text-xs uppercase tracking-widest text-muted-foreground">
                    digite o Profile ID do usuário (veja em Admin → Usuários).
                  </DialogDescription>
                </DialogHeader>
                <Form {...inviteForm}>
                  <form onSubmit={onInviteSubmit} className="grid gap-4 py-4">
                    <FormField
                      control={inviteForm.control}
                      name="profileId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                            profile id
                          </FormLabel>
                          <FormControl
                            render={
                              <Input
                                {...field}
                                placeholder="profile_abc123"
                                className="rounded-none border hairline bg-transparent"
                              />
                            }
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        className="rounded-none border hairline"
                        onClick={() => setInviteDialogOpen(false)}
                      >
                        cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={createInvite.isPending}
                        className="rounded-none border hairline"
                      >
                        {createInvite.isPending
                          ? "[ criando... ]"
                          : "[ convidar ]"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          {invitesPending && (
            <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
              [ carregando convites... ]
            </div>
          )}

          {invites && invites.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead>Decidido em</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invites.map((invite) => (
                  <TableRow key={invite.id}>
                    <TableCell>
                      <div className="font-bold">{invite.username}</div>
                      <div className="text-xs text-muted-foreground">
                        {invite.displayName ?? "—"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invite.status === "accepted"
                            ? "default"
                            : invite.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                        className="rounded-none border hairline"
                      >
                        {invite.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(invite.createdAt).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell>
                      {invite.decidedAt
                        ? new Date(invite.decidedAt).toLocaleDateString("pt-BR")
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {invites && invites.length === 0 && !invitesPending && (
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              [ nenhum convite ]
            </div>
          )}
        </>
      )}
    </section>
  );
}
