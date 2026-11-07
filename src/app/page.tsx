"use client";

import { ArrowRight, BookIcon, Layers, PenTool, Users } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FeaturesSection } from "@/components/features-section";
import { LandingNavbar } from "@/components/landing-navbar";
import { AuroraText } from "@/components/ui/aurora-text";
import Book, {
  BookDescription,
  BookHeader,
  BookTitle,
} from "@/components/ui/book";
import { Button } from "@/components/ui/button";
import DitherShader from "@/components/ui/dither-shader";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { TextAnimate } from "@/components/ui/text-animate";
import { TextureOverlay } from "@/components/ui/texture-overlay";
export default function Home() {
  return (
    <div className="bg-light book:bg-sepia dark:bg-dark relative background-texture rounded-xs">
      <LandingNavbar />
      <TextureOverlay texture={"grid"} className="mix-blend-overlay z-0" />

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Section indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
        >
          <span className="font-mono text-xs text-muted-foreground tracking-wider rotate-180 [writing-mode:vertical-lr]">
            01 / INTRO
          </span>
          <div className="w-px h-16 bg-border" />
        </motion.div>

        {/* Main content */}
        <div className="relative z-1 container mx-auto px-6 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Ecossistema criativo digital
              </span>
            </motion.div>
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-8xl mb-5 font-sans">
              All New <br className="block lg:hidden" />
              <AuroraText className="lg:inline-block! block">
                Blklight
              </AuroraText>
            </h1>
            {/* Main heading */}
            <h1 className="mb-8 font-sans">
              <TextAnimate
                text="Crie."
                type="fadeInUp"
                className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              />
              <TextAnimate
                text="Escreva."
                type="fadeInUp"
                delay={0.1}
                className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              />
              <TextAnimate
                text="Compartilhe."
                type="fadeInUp"
                delay={0.2}
                className="block text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blklight-500 dark:text-blklight-400"
              />
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 leading-relaxed font-mono"
            >
              Um ecossistema criativo onde voce organiza suas ideias, escreve
              artigos e compartilha conhecimento. Ferramentas de produtividade,
              escrita e uma comunidade que valoriza criatividade.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-wrap gap-3 mb-12"
            >
              {[
                { icon: PenTool, label: "Artigos & Blog" },
                { icon: Layers, label: "Ferramentas" },
                { icon: Users, label: "Comunidade" },
              ].map((item, index) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-bluesky-500 text-bluesky-600 rounded-xs font-mono text-xs uppercase tracking-wider"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group font-mono text-xs uppercase tracking-wider rounded-xs"
                >
                  Comecar agora
                  <ArrowRight className="ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="font-mono text-xs uppercase tracking-wider bg-transparent rounded-xs"
                onClick={() =>
                  document
                    .getElementById("ferramentas")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explorar
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right side decoration */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4"
        >
          <div className="w-px h-20 bg-blklight-500/50" />
          <div className="w-3 h-3 rounded-full border-2 border-blklight-500 dark:border-blklight-400" />
          <span className="font-mono text-xs text-blklight-500 dark:text-blklight-400 tracking-wider rotate-180 [writing-mode:vertical-lr]">
            scroll
          </span>
        </motion.div>
      </section>

      {/* <div className="flex flex-col items-center gap-6 p-8">
        <DitherShader
          src="https://i.imgur.com/BCY3uY6.jpg"
          gridSize={1}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#252525"
          secondaryColor="#eaeaea"
          threshold={0.35}
          className="h-96 w-full max-w-7xl object-cover "
        />
      </div>

      <FeaturesSection />

      <div className="container mx-auto py-5 no-overlay">
        <Book>
          <BookHeader>
            <BookIcon size={20} />
          </BookHeader>
          <BookTitle>Book</BookTitle>
          <BookDescription>Tap me to animate!</BookDescription>
        </Book>
      </div> */}
    </div>
  );
}
