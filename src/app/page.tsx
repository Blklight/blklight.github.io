"use client";

import { ArrowRight } from "lucide-react";
import { MotionConfig, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { CAPABILITIES } from "@/components/capabilities";
import {
  DocumentFooterRenderer,
  DocumentHeaderRenderer,
} from "@/components/document";
import { SignatureBlock } from "@/components/document/signature-block";
import Grainient from "@/components/Grainient";
import { LandingNavbar } from "@/components/landing-navbar";
import { SiteFooter } from "@/components/site-footer";
import { AuroraText } from "@/components/ui/aurora-text";
import { buttonVariants } from "@/components/ui/button";
import { TextAnimate } from "@/components/ui/text-animate";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import {
  defaultDesignDocumentFooter,
  defaultDesignDocumentHeader,
  defaultDesignPaperStyle,
  defaultDesignPaperTexture,
} from "@/features/documents/design/defaults";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import { useRedirectIfAuthenticated } from "@/hooks/useRedirectIfAuthenticated";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const CTA = "group font-mono text-xs uppercase tracking-wider rounded-xs px-5";

const MOCK_CONTEXT = {
  author: { displayName: "Marina Alves", username: "marina" },
  typeLabel: "Ensaio",
  authorship: { publicIdentifier: "PLT-8edf2701.d29c4b90" },
  // Fixed date: the landing is prerendered (cacheComponents).
  publishedAt: "2026-11-20T12:00:00.000Z",
};

/** A document in the default design: letterhead, text, signature, footer. */
function PaperMock() {
  return (
    <div className="relative w-full max-w-lg xl:max-w-xl rotate-[-2deg] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.55)]">
      <PaperSurface
        paperColors={null}
        paperTexture={defaultDesignPaperTexture}
        textureStyle={{}}
        grains={defaultDesignPaperStyle.grains}
        className="bg-background text-foreground"
        contentClassName="p-5 sm:p-6 xl:p-8"
      >
        <DocumentHeaderRenderer
          header={defaultDesignDocumentHeader}
          className="mb-4"
          textContext={MOCK_CONTEXT}
        />
        <p className="font-sans text-2xl xl:text-3xl font-bold tracking-tight leading-tight mb-1">
          Sobre escrever devagar
        </p>
        <p className="font-sans text-sm xl:text-base text-muted-foreground mb-4">
          Um texto pede tempo antes de pedir leitores.
        </p>
        <div className="h-px bg-foreground/20 mb-4" />
        <div className="space-y-3 font-sans text-sm xl:text-base leading-relaxed text-foreground/85">
          <p>
            Primeiro o rascunho, depois o papel, por fim o lugar onde ele vai
            morar.
          </p>
          <p className="hidden sm:block">
            Escolher a fonte e a textura é parte da escrita, não um enfeite
            posto no fim.
          </p>
        </div>
        <div className="mt-5">
          <SignatureBlock context={MOCK_CONTEXT} />
        </div>
        <DocumentFooterRenderer
          footer={defaultDesignDocumentFooter}
          className="mt-3"
          textContext={MOCK_CONTEXT}
        />
      </PaperSurface>
    </div>
  );
}

export default function Home() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const reduceMotion = useReducedMotion();
  useRedirectIfAuthenticated();

  if (isAuthenticated) return null;

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-light book:bg-sepia dark:bg-dark relative background-texture rounded-xs">
        <TextureOverlay texture="grid" className="mix-blend-overlay z-0" />
        <LandingNavbar />

        <section className="relative z-1 px-6 md:px-10 pt-10 pb-20 lg:min-h-[calc(100dvh-5.5rem)] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 xl:gap-20 items-center">
            <div>
              <p className="font-sans text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-4">
                <AuroraText>Blklight</AuroraText>
              </p>
              <h1 className="font-sans mb-8">
                <TextAnimate
                  text="Crie."
                  type="fadeInUp"
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                />
                <TextAnimate
                  text="Escreva."
                  type="fadeInUp"
                  delay={0.1}
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
                />
                <TextAnimate
                  text="Compartilhe."
                  type="fadeInUp"
                  delay={0.2}
                  className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-blklight-500 dark:text-blklight-400"
                />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASE_OUT }}
                className="text-base md:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                Um editor de documentos com identidade própria: escolha fonte,
                papel e timbre, assine e publique no seu perfil.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE_OUT }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/auth?mode=register"
                  className={cn(buttonVariants({ size: "lg" }), CTA)}
                >
                  Criar conta grátis
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/feed"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    CTA,
                    "bg-transparent",
                  )}
                >
                  Ler o feed
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT }}
              className="relative overflow-hidden rounded-xs min-h-[28rem] lg:min-h-[40rem] flex items-center justify-center p-8"
            >
              <div className="absolute inset-0">
                <Grainient
                  color1="#9c40f7"
                  color2="#2969ff"
                  color3="#252525"
                  timeSpeed={reduceMotion ? 0 : 0.25}
                  warpAmplitude={50}
                  grainAmount={0.1}
                  contrast={1.5}
                  zoom={0.9}
                />
              </div>
              <PaperMock />
            </motion.div>
          </div>
        </section>

        <section
          aria-labelledby="recursos"
          className="relative z-1 px-6 md:px-10 py-20 border-t border-border"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
            <h2
              id="recursos"
              className="font-sans text-3xl md:text-4xl font-bold tracking-tight max-w-sm"
            >
              Do rascunho ao seu perfil público.
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              {CAPABILITIES.map((item) => (
                <div key={item.title} className="border-t border-border pt-5">
                  <dt className="font-sans text-xl font-bold mb-2">
                    {item.title}
                  </dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {item.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="relative z-1 px-6 md:px-10 pb-20">
          <div className="rounded-xs bg-dark text-light px-8 py-14 md:px-14 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <h2 className="font-sans text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Seu primeiro texto começa aqui.
              </h2>
              <p className="text-light/70">
                Crie a conta, escolha seus apps e abra o editor.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/auth?mode=register"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  CTA,
                  "bg-light text-dark hover:bg-light/90",
                )}
              >
                Criar conta
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/auth"
                className="text-sm text-light/80 hover:text-light underline underline-offset-4 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
              >
                Já tenho conta
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </MotionConfig>
  );
}
