"use client";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { GithubLogo, GoogleLogo } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/use-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const loginSchema = z.object({
  login: z.string().min(6).max(50),
  password: z.string().min(8),
});

export const LoginForm = ({
  children,
  isDrawer = false,
  shouldOpenSheet,
}: {
  children?: React.ReactNode;
  isDrawer?: boolean;
  shouldOpenSheet?: (value: boolean) => void;
}) => {
  const { setUser } = useStore() as any;
  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const closeSheet = () => shouldOpenSheet && shouldOpenSheet(false);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    if (isDrawer) closeSheet();
  };
  return (
    <>
      <div
        className={cn(
          "grid gap-5 mx-auto",
          isDrawer ? "w-full" : "lg:w-80 w-96"
        )}
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight mb-2">Login</h1>
          <p>Acessar sua conta</p>
        </div>
        {children}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="login"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder="Username ou E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full mt-2" type="submit">
              Acessar
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="relative flex gap-1 text-xs items-center uppercase">
            <div className="w-full h-[1px] bg-grey-medium"></div>
            <span className="whitespace-nowrap px-2 text-muted-foreground">
              Ou continue com
            </span>
            <div className="w-full h-[1px] bg-grey-medium"></div>
          </div>
        </div>
        <div className="flex gap-2 justify-center">
          <Button type="button" variant={"secondary"}>
            <GoogleLogo className="h-4 w-4" weight="bold" />
          </Button>
          <Button type="button" variant={"secondary"}>
            <GithubLogo className="h-4 w-4" weight="bold" />
          </Button>
        </div>
        {isDrawer && (
          <div className="mx-auto">
            {" "}
            <Button variant={"link"} asChild>
              <Link href={"/register"}>Não possui uma conta? Criar conta</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
