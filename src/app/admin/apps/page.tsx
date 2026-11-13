"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { useAdminApps, useCreatePlatformApp } from "@/features/admin/queries";
import {
  type CreatePlatformAppFormData,
  createPlatformAppSchema,
} from "@/types/form.schemas";

export default function AdminAppsPage() {
  const { data: apps, isPending, isError, refetch } = useAdminApps();
  const createApp = useCreatePlatformApp();

  const [search, setSearch] = useState("");
  const [accessMode, setAccessMode] = useState<"open" | "beta" | "all">("all");
  const [isActive, setIsActive] = useState<"true" | "false" | "all">("all");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setCreateDialogOpen(false);
    };
  }, []);

  const createForm = useForm<CreatePlatformAppFormData>({
    resolver: zodResolver(createPlatformAppSchema),
    defaultValues: {
      slug: "",
      name: "",
      accessMode: "open",
      description: "",
      iconUrl: "",
      tagline: "",
      category: "",
    },
  });

  const filteredApps =
    apps?.filter((app) => {
      const q = search.trim().toLowerCase();
      if (
        q &&
        ![app.name, app.slug, app.category ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q)
      ) {
        return false;
      }
      if (accessMode !== "all" && app.accessMode !== accessMode) {
        return false;
      }
      if (isActive !== "all" && String(app.isActive) !== isActive) {
        return false;
      }
      return true;
    }) ?? [];

  const onCreateSubmit = createForm.handleSubmit(async (values) => {
    const payload: CreatePlatformAppFormData = {
      slug: values.slug,
      name: values.name,
      description: values.description,
      accessMode: values.accessMode,
      iconUrl: values.iconUrl,
      tagline: values.tagline,
      category: values.category,
    };
    await createApp.mutateAsync(payload);
    setCreateDialogOpen(false);
    createForm.reset({ accessMode: "open" });
  });

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative p-5 z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />

      <div className="flex items-center justify-between mb-8">
        <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground">
          admin / apps
        </div>
        <div className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground">
          {isPending ? "[ carregando... ]" : `[ ${apps?.length ?? 0} apps ]`}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase leading-[0.95]">
          Apps
          <span className="inline-block border-b-2 border-ink pb-1">.</span>
        </h1>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger
            render={
              <Button
                variant="default"
                className="rounded-none border hairline"
              />
            }
          >
            [ novo app ]
          </DialogTrigger>
          <DialogContent className="max-w-2xl rounded-none border hairline shadow-none bg-transparent">
            <DialogHeader>
              <DialogTitle className="text-xs uppercase tracking-widest text-muted-foreground">
                criar app
              </DialogTitle>
              <DialogDescription className="text-xs uppercase tracking-widest text-muted-foreground">
                preencha os campos abaixo. slug deve ser único e kebab-case.
              </DialogDescription>
            </DialogHeader>
            <Form {...createForm}>
              <form onSubmit={onCreateSubmit} className="grid gap-4 py-4">
                <FormField
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest text-muted-foreground">
                        slug
                      </FormLabel>
                      <FormControl
                        render={
                          <Input
                            {...field}
                            placeholder="meu-app"
                            className="rounded-none border hairline bg-transparent"
                          />
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
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
                            placeholder="Meu App"
                            className="rounded-none border hairline bg-transparent"
                          />
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
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
                            placeholder="Descrição do app"
                            className="rounded-none border hairline bg-transparent"
                          />
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
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
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
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
                            placeholder="https://exemplo.com/icon.png"
                            className="rounded-none border hairline bg-transparent"
                          />
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
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
                            placeholder="Uma frase curta"
                            className="rounded-none border hairline bg-transparent"
                          />
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={
                    createForm.control as unknown as import("react-hook-form").Control<CreatePlatformAppFormData>
                  }
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
                            placeholder="produtividade, desenvolvimento, etc"
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
                    onClick={() => setCreateDialogOpen(false)}
                  >
                    cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={createApp.isPending}
                    className="rounded-none border hairline"
                  >
                    {createApp.isPending ? "[ criando... ]" : "[ criar ]"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* filtros client-side */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="buscar por nome, slug ou categoria"
          className="max-w-xs rounded-none border hairline bg-transparent"
        />
        <Select
          items={{ all: "todos", open: "open", beta: "beta" }}
          value={accessMode}
          onValueChange={(v) => setAccessMode(v as "open" | "beta" | "all")}
        >
          <SelectTrigger className="rounded-none border hairline">
            <SelectValue placeholder="access mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">todos</SelectItem>
            <SelectItem value="open">open</SelectItem>
            <SelectItem value="beta">beta</SelectItem>
          </SelectContent>
        </Select>
        <Select
          items={{ all: "todos", true: "ativos", false: "inativos" }}
          value={isActive}
          onValueChange={(v) => setIsActive(v as "true" | "false" | "all")}
        >
          <SelectTrigger className="rounded-none border hairline">
            <SelectValue placeholder="status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">todos</SelectItem>
            <SelectItem value="true">ativos</SelectItem>
            <SelectItem value="false">inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
          [ carregando apps... ]
        </div>
      )}

      {isError && (
        <div className="border hairline p-8 max-w-md">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6">
            {"// falha ao carregar apps"}
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

      {filteredApps.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App</TableHead>
              <TableHead>Access Mode</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Criado em</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApps.map((app) => (
              <TableRow
                key={app.id}
                className="cursor-pointer"
                onClick={() => {
                  window.location.href = `/admin/apps/${app.id}`;
                }}
              >
                <TableCell>
                  <div className="font-bold">{app.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {app.slug}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={app.accessMode === "beta" ? "default" : "outline"}
                    className="rounded-none border hairline"
                  >
                    {app.accessMode}
                  </Badge>
                </TableCell>
                <TableCell>{app.category ?? "—"}</TableCell>
                <TableCell>
                  <Badge
                    variant={app.isActive ? "default" : "destructive"}
                    className="rounded-none border hairline"
                  >
                    {app.isActive ? "sim" : "não"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(app.createdAt).toLocaleDateString("pt-BR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {filteredApps.length === 0 && !isPending && !isError && (
        <div className="text-xs uppercase tracking-widest text-muted-foreground">
          [ nenhum app encontrado ]
        </div>
      )}
    </section>
  );
}
