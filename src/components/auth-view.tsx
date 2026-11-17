"use client";

import { MotionConfig, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";
import { useAuthStore } from "@/store/useAuthStore";
import { CAPABILITIES } from "./capabilities";
import { LoginForm } from "./forms/auth/login-form";
import { OAuthButtons } from "./forms/auth/oauth-buttons";
import { RegisterForm } from "./forms/auth/register-form";
import Grainient from "./Grainient";
import { DirectionAwareTabs } from "./ui/direction-aware-tabs";
import { TextureOverlay } from "./ui/texture-overlay";

const MODES = ["login", "register"] as const;

function AuthTabs() {
  const router = useRouter();
  const mode = useSearchParams().get("mode");
  const defaultTab = mode === "register" ? 1 : 0;

  const handleLoginSuccess = () => {
    router.push(
      useAuthStore.getState().user?.onboardingComplete
        ? "/dashboard"
        : "/onboarding",
    );
  };

  const tabs = [
    {
      id: 0,
      label: "Entrar",
      content: <LoginForm onSuccess={handleLoginSuccess} />,
    },
    {
      id: 1,
      label: "Criar conta",
      content: <RegisterForm onSuccess={() => router.push("/onboarding")} />,
    },
  ];

  return (
    <DirectionAwareTabs
      className="w-full flex"
      tabs={tabs}
      defaultTab={defaultTab}
      onChange={(id) =>
        router.replace(`/auth?mode=${MODES[id]}`, { scroll: false })
      }
    />
  );
}

function BrandPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <aside className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-xs text-light">
      <div className="absolute inset-0">
        <Grainient
          color1="#9c40f7"
          color2="#2969ff"
          color3="#252525"
          timeSpeed={reduceMotion ? 0 : 0.35}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <TextureOverlay
        texture="dots"
        className="mix-blend-overlay bg-center"
        opacity={0.6}
      />

      <div className="relative z-10 flex flex-col justify-between w-full p-10 xl:p-14">
        <Link
          href="/"
          className="flex items-center gap-3 self-start rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light"
        >
          <Image src="/blklight-light.svg" alt="" width={28} height={28} />
          <span className="font-sans text-2xl font-bold tracking-tight">
            Blklight
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-lg"
        >
          <h1 className="font-sans text-5xl xl:text-6xl font-bold tracking-tight leading-[1.02] text-balance mb-6">
            Escreva. Dê forma ao papel. Publique.
          </h1>
          <p className="text-base text-light/80 leading-relaxed max-w-md mb-12">
            Um editor de documentos com identidade própria, do rascunho ao seu
            perfil público.
          </p>

          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-light/25 pt-8">
            {CAPABILITIES.map((item) => (
              <div key={item.title}>
                <dt className="text-sm font-bold mb-1">{item.title}</dt>
                <dd className="text-sm text-light/75 leading-snug">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <p className="text-xs text-light/70">
          Notas, journals e livros chegam em breve.
        </p>
      </div>
    </aside>
  );
}

/** Login and sign-up screen served at /auth (?mode=login|register). */
export function AuthView() {
  useRedirectIfAuthenticated();

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh lg:min-h-0 lg:h-[calc(100dvh-1.125rem)] flex flex-col lg:flex-row gap-2.25">
        <BrandPanel />

        <div className="flex-1 flex flex-col p-6 lg:px-12 lg:py-10">
          <Link
            href="/"
            className="lg:hidden flex items-center gap-2 mb-8 self-start rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <Image
              src="/blklight-black.svg"
              alt=""
              width={22}
              height={22}
              className="dark:invert"
            />
            <span className="font-sans text-lg font-bold tracking-tight">
              Blklight
            </span>
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            {/* Fixed-height slot: switching to the taller sign-up form must not move the tabs. */}
            <div className="w-full max-w-md mx-auto lg:min-h-[34rem]">
              <Suspense fallback={<div className="h-12 w-full" />}>
                <AuthTabs />
              </Suspense>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto mt-8">
            <OAuthButtons />
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
