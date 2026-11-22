"use client";

import { useState } from "react";
import { SPAN } from "@/components/bento/bento-layout";
import { DuotoneDefs } from "@/components/feed/cards/duotone-defs";
import { LAB_CARDS } from "@/components/feed/cards/models";
import { TypeInkContext } from "@/components/feed/cards/parts";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import type { DocumentCard, Typography } from "@/types/api.types";

const base = (
  id: string,
  fields: Partial<DocumentCard>,
): DocumentCard => ({
  id,
  title: "Sobre escrever devagar",
  abstract: "Um texto pede tempo antes de pedir leitores.",
  coverImageUrl: "/blklight-seo.jpg",
  slug: id,
  typeName: "article",
  publishedAt: "2026-11-20T12:00:00.000Z",
  author: { username: "marina", displayName: "Marina Alves", avatarUrl: null },
  authorship: { publicIdentifier: "PLT-A1B2C3" },
  likesCount: 12,
  category: { id: "c1", name: "Ensaios", slug: "ensaios" },
  tags: [
    { id: "t1", name: "escrita", slug: "escrita" },
    { id: "t2", name: "processo", slug: "processo" },
  ],
  organization: null,
  style: { typography: "sans", paperStyle: null, paperTexture: null },
  ...fields,
});

/** One fixture per size slot, so each cell shows a different case. */
const FIXTURES: DocumentCard[] = [
  base("lab-a", {}),
  base("lab-b", {
    typeName: "tutorial",
    title: "Como montar um timbre que aguenta qualquer papel",
    abstract:
      "Cabeçalho, rodapé e assinatura: as três peças que fazem um texto parecer documento. Este tutorial monta cada uma, testa no claro e no escuro e mostra onde a tipografia do autor entra.",
    coverImageUrl: "/badges/holo-bg.jpg",
    likesCount: 248,
    style: {
      typography: "sans",
      paperStyle: { bg: "#f4ecd8" },
      paperTexture: { type: "dots", size: 18, opacity: 0.2 },
    },
  }),
  base("lab-c", {
    typeName: "project",
    title: "Blklight",
    abstract: null,
    likesCount: 3,
    category: null,
    tags: [],
    style: {
      typography: "sans",
      paperStyle: { bg: "#1d1d1d" },
      paperTexture: { type: "grid", size: 24, opacity: 0.15 },
    },
  }),
  base("lab-d", {
    title: "Um título bem comprido para ver como o card se comporta quando o texto não cabe em três linhas",
    abstract:
      "Descrição longa de propósito, para conferir os cortes de linha em cada tamanho de célula e garantir que nada vaza da moldura.",
    coverImageUrl: "/avatar.png",
  }),
];

const TYPOGRAPHIES: Typography[] = ["sans", "serif", "mono"];

/** Lab: every card model in every size it supports, with test documents. */
export default function CardsLabPage() {
  const [typography, setTypography] = useState<Typography>("sans");
  const [ink, setInk] = useState(false);
  const docs = FIXTURES.map((doc) => ({
    ...doc,
    style: { ...(doc.style ?? { paperStyle: null, paperTexture: null }), typography },
  }));

  return (
    <div className="px-6 py-10 md:px-10">
      <DuotoneDefs />
      <h1 className="font-sans text-4xl font-bold tracking-tight">Cards</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Cada modelo nos tamanhos que suporta. Para criar um novo, copie{" "}
        <code className="font-mono text-sm">
          src/components/feed/cards/models/_template.tsx
        </code>{" "}
        e registre em <code className="font-mono text-sm">models/index.ts</code>.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <fieldset className="flex items-center gap-2">
          <legend className="sr-only">Tipografia do autor</legend>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Tipografia
          </span>
          {TYPOGRAPHIES.map((id) => (
            <Button
              key={id}
              size="sm"
              variant={typography === id ? "default" : "outline"}
              aria-pressed={typography === id}
              onClick={() => setTypography(id)}
              className={`font-${id}`}
            >
              {id}
            </Button>
          ))}
        </fieldset>
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
          <Switch checked={ink} onCheckedChange={setInk} />
          Tinta do tipo
        </label>
      </div>

      <TypeInkContext value={ink}>
        {LAB_CARDS.map((card) => {
          const Card = card.component;
          return (
            <section key={card.id} className="mt-12">
              <h2 className="mb-6 flex items-baseline gap-3 border-b border-border pb-2 font-sans text-xl font-bold tracking-tight">
                {card.label}
                <span className="font-mono text-xs font-normal uppercase tracking-wider text-muted-foreground">
                  {card.inFeed ? "no feed" : "só no lab"} · {card.sizes.join(" ")}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-dense auto-rows-[15rem] gap-4">
                {card.sizes.map((size, i) => (
                  <div key={size} className={SPAN[size]}>
                    <Card data={docs[i % docs.length]} size={size} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </TypeInkContext>
    </div>
  );
}
