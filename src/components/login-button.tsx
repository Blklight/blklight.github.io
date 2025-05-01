"use client";
import * as React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useStore } from "@/store/use-store";
import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { Skeleton } from "./ui/skeleton";
import { LoginForm } from "@/components/forms/login-form";

export const LoginButton = () => {
  const [openSheet, setOpenSheet] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpenSheet(true)}>
        <LogIn className="w-4 h-4" />
        Login
      </Button>
      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent
          title="Login"
          className="w-[400px] sm:w-[500px] sm:max-w-[500px] max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)] xl:max-w-[500px] p-8 m-2.5 overflow-y-auto border rounded-md background-texture flex flex-col justify-center"
        >
          <SheetTitle></SheetTitle>
          <LoginForm
            isDrawer
            shouldOpenSheet={(value) => setOpenSheet(value)}
          ></LoginForm>
        </SheetContent>
      </Sheet>
    </>
  );
};
