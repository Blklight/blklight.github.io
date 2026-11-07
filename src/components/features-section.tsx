"use client";

import {
  BookOpen,
  Layout,
  ListTodo,
  PenTool,
  Target,
  Users,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { TextureOverlay } from "./ui/texture-overlay";

const features = [
  {
    icon: PenTool,
    title: "Escreva Artigos",
    description:
      "Publique seus pensamentos, tutoriais e conhecimento. Editor minimalista focado no conteudo.",
    number: "01",
  },
  {
    icon: BookOpen,
    title: "Diario Pessoal",
    description:
      "Registre pensamentos, reflexoes e momentos. Seu espaco privado de escrita.",
    number: "02",
  },
  {
    icon: Layout,
    title: "Ferramentas",
    description:
      "Habit trackers, mood trackers, listas e templates para organizar sua vida.",
    number: "03",
  },
  {
    icon: ListTodo,
    title: "Produtividade",
    description:
      "Tarefas, metas e planejadores para manter o foco no que importa.",
    number: "04",
  },
  {
    icon: Users,
    title: "Comunidade",
    description:
      "Conecte-se com outros criativos. Descubra e compartilhe conhecimento.",
    number: "05",
  },
  {
    icon: Target,
    title: "Metas",
    description:
      "Acompanhe seu progresso com visualizacoes claras e motivadoras.",
    number: "06",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-background border border-border/50 p-8 h-full hover:border-dark hover:bg-cyber-yellow-500 transition-colors duration-300 font-mono shadow-sm rounded-xs">
        <TextureOverlay
          texture="dots"
          opacity={0.5}
          className="bg-center mix-blend-multiply"
        />
        {/* Number */}
        <span className="font-mono text-xs text-muted-foreground tracking-wider mb-6 block">
          {feature.number}
        </span>

        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center mb-6">
          <feature.icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold mb-3 tracking-tight">
          {feature.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {feature.description}
        </p>

        {/* Hover accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blklight-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 relative z-1">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-xs text-muted-foreground tracking-wider">
              02 / RECURSOS
            </span>
            <div className="flex-1 h-px bg-border max-w-20" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight max-w-2xl">
            Um ecossistema <span className="hand-underline">completo</span>
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            Ferramentas de produtividade, escrita e uma comunidade que valoriza
            criatividade e conhecimento.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
