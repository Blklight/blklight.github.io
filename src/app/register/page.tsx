"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

import { LoginForm } from "@/components/forms/login-form";
import { NewAccountForm } from "@/components/forms/new-account-form";

import { AnimatePresence, motion } from "motion/react";
import { AuroraText } from "@/components/magicui/aurora-text";

export default function RegisterPage() {
  const [isLogin, setIsLogin] = React.useState(false);

  return (
    <div className="w-full flex flex-row h-svh">
      <div className="flex gap-4 w-full relative bg-background background-texture shadow-md rounded-md border my-5 mx-5 overflow-hidden">
        <div className="flex flex-col lg:w-1/3 flex-1 m-8 space-y-6 lg:p-8">
          <div
            className={cn(
              "grid gap-5 lg:w-80 w-96 mx-auto ",
              isLogin ? "mb-40" : "mb-16"
            )}
          >
            <div
              className={cn(" flex gap-2 justify-between", isLogin ? "" : "")}
            >
              <Button size={"icon"} asChild>
                <Link href="/">
                  <img
                    src="/blklight-light.svg"
                    className="!max-w-none mx-auto size-6"
                    width="24"
                    height="24"
                    alt="Ultimate Mercer Logo"
                  />
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                {isLogin ? (
                  <Button variant={"ghost"} onClick={() => setIsLogin(false)}>
                    Criar conta
                  </Button>
                ) : (
                  <Button variant={"ghost"} onClick={() => setIsLogin(true)}>
                    Login
                  </Button>
                )}

                <ThemeToggle />
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? <LoginForm /> : <NewAccountForm />}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="lg:w-2/3 lg:flex hidden p-8">
          <div className="relative w-full flex self-stretch min-w-0 flex-col bg-clip-border rounded-md shadow-md min-h-80 max-h-full overflow-hidden group">
            <img
              src={"https://i.imgur.com/BCY3uY6.jpg"}
              alt="Image"
              className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-500 "
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 px-5 py-4 rounded-md flex flex-col bg-gradient-to-b from-transparent from-85% to-black/90">
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl text-light">
                All New{" "}
              </h1>
              <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
                <AuroraText
                  colors={[
                    "#6A4DFF",
                    "#28acff",
                    "#f7f7f7",
                    "#121212",
                    "#FBF0D9",
                  ]}
                >
                  Blklight
                </AuroraText>
              </h1>
              <div className="relative mt-auto flex items-center justify-between">
                <div className="flex gap-1 items-center ml-auto">
                  <h4 className="text-sm text-right text-light ">
                    <span className="bg-dark/70 px-2 rounded !py-1">
                      Projeto do dia: Nocturne Ride, por Ultimate Mercer
                    </span>
                  </h4>
                  <img
                    src="/blklight-light.svg"
                    className=" !max-w-none size-10"
                    width="40"
                    height="40"
                    alt="Ultimate Mercer Logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
