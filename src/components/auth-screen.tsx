"use client";

import { Calendar, Heart, Lightbulb, LogIn, Palette } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { LoginForm } from "./forms/auth/login-form";
import { RegisterForm } from "./forms/auth/register-form";
import Grainient from "./Grainient";
import { DirectionAwareTabs } from "./ui/direction-aware-tabs";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "./ui/expandable-screen";
import { TextureOverlay } from "./ui/texture-overlay";

const FEATURES = [
  { icon: Palette, text: "15+ ferramentas criativas" },
  { icon: Calendar, text: "Planners personalizados" },
  { icon: Heart, text: "Mood tracker diario" },
  { icon: Lightbulb, text: "Notas ilimitadas" },
];

interface AuthScreenProps {
  /** Extra classes for the "Login" trigger button (e.g. its height). */
  triggerClassName?: string;
  /** Render the animated gradient behind the branding panel. */
  showGradient?: boolean;
}

/** "Login" button that expands into the full-screen login/register panel. */
export function AuthScreen({
  triggerClassName,
  showGradient = false,
}: AuthScreenProps) {
  const router = useRouter();

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
      label: "Login",
      content: (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <LoginForm onSuccess={handleLoginSuccess} />
        </motion.div>
      ),
    },
    {
      id: 1,
      label: "Register",
      content: <RegisterForm onSuccess={() => router.push("/onboarding")} />,
    },
  ];

  return (
    <ExpandableScreen
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="0px"
    >
      <ExpandableScreenTrigger>
        <button
          type="button"
          className={cn(
            "flex gap-1 justify-center items-center px-4 hover:bg-primary dark:hover:bg-primary text-[#252525] hover:text-[#eaeaea] dark:text-[#eaeaea] dark:hover:text-[#252525] rounded-xs cursor-pointer outline-none font-mono",
            triggerClassName,
          )}
        >
          <LogIn className="mr-1 h-4 w-4" />
          Login
        </button>
      </ExpandableScreenTrigger>

      <ExpandableScreenContent className="bg-background">
        <div className="h-full flex flex-col lg:flex-row overflow-hidden">
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden background-texture">
            <TextureOverlay
              texture="dots"
              className="mix-blend-multiply bg-center"
              opacity={1}
            />
            {showGradient && (
              <div className="absolute inset-0 p-5 rounded-xl">
                <Grainient
                  color1="#9c40f7"
                  color2="#2969ff"
                  color3="#252525"
                  timeSpeed={0.5}
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
                  className="rounded-xs h-full w-full"
                />
              </div>
            )}

            <div
              className={cn(
                "relative z-10 flex flex-col p-8 lg:p-10",
                showGradient && "text-light",
              )}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xs bg-primary flex items-center justify-center">
                  <Image
                    src="/blklight-light.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="font-sans text-4xl font-bold text-foreground">
                  Blklight
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                Sua criatividade,{" "}
                <span className="text-primary hand-underline">
                  agora digital
                </span>
              </h2>

              <p className="text-muted-foreground text-lg mb-10 max-w-md">
                Todas as ferramentas que voce ama do bullet journal, agora em um
                so lugar na nuvem.
              </p>

              <div className="space-y-4">
                {FEATURES.map((feature, i) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border-2 border-dashed border-primary/30" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-2 border-dashed border-primary/20" />
            </div>
          </div>

          <div className="flex-1 lg:w-1/2 flex items-start justify-center p-6 lg:p-12 overflow-y-auto relative main-background">
            <div className="w-full max-w-sm py-4">
              <div className="lg:hidden flex items-center gap-3 mb-10">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="font-mono text-sm font-medium tracking-tight uppercase">
                  Blklight
                </span>
              </div>

              <DirectionAwareTabs className="w-full flex" tabs={tabs} />
            </div>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
