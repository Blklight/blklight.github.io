"use client";

import type { ReactNode } from "react";
import { DigitalSignature } from "@/components/digital-signature";
import {
  GearStamp,
  HoloSeal,
  LabelStamp,
  type OrgStampData,
  TriangleStamp,
  WaxStamp,
} from "@/components/stamps/org-stamps";

const ORG: OrgStampData = {
  name: "Estúdio Norte",
  handle: "estudionorte",
  city: "Porto Alegre",
  date: "22·11·2026",
  shortDate: "22/11/26",
  ref: "ORG-00042",
  tagline: "Design e pesquisa",
  since: "2024",
  status: "Verificada",
};

const AUTHOR = {
  signature: "Marina Alves",
  registry: "PLT-8edf2701.d29c4b90",
  dateText: "22/11/2026",
};

/** Paper stocks from the references: grey card, charcoal, signal orange. */
const STOCKS = [
  { id: "cinza", label: "cartão cinza", bg: "#dcdcd6", ink: "#55554f" },
  { id: "grafite", label: "grafite", bg: "#2b2b2b", ink: "#c9c9c4" },
  { id: "laranja", label: "laranja", bg: "#ff6a13", ink: "#fff4ea" },
];

const Section = ({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) => (
  <section className="mt-14">
    <h2 className="border-b border-border pb-2 font-sans text-xl font-bold tracking-tight">
      {title}
    </h2>
    {hint && <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{hint}</p>}
    <div className="mt-6">{children}</div>
  </section>
);

const Caption = ({ children }: { children: ReactNode }) => (
  <figcaption className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
    {children}
  </figcaption>
);

/** End of a document: the author's signature and, next to it, the organization's stamp. */
const DocumentEnd = ({ children }: { children: ReactNode }) => (
  <div className="background-texture overflow-hidden rounded-xs border border-border bg-background">
    <div className="texture-item flex flex-col gap-8 p-8">
      <div className="space-y-2" aria-hidden>
        <div className="h-2.5 w-full bg-foreground/10" />
        <div className="h-2.5 w-11/12 bg-foreground/10" />
        <div className="h-2.5 w-3/5 bg-foreground/10" />
      </div>
      {children}
    </div>
  </div>
);

/** Lab: organization signature ideas from the postal-stamp references. */
export default function SignatureLabPage() {
  return (
    <div className="px-6 py-10 md:px-10">
      <h1 className="font-sans text-4xl font-bold tracking-tight">
        Assinatura de organização
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Carimbos postais em linha fina (referências design-stamps-docs). A
        assinatura do autor continua igual; a organização entra como um carimbo
        ao lado, com nome, cidade, data e referência.
      </p>

      <Section
        title="Carimbos"
        hint="Mesma organização em cada forma e papel. A tinta vem da cor do texto, então o carimbo segue o tema do documento."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {STOCKS.map((stock) => (
            <figure key={stock.id} className="flex flex-col gap-3">
              <div
                className="background-texture rounded-md"
                style={{ background: stock.bg, color: stock.ink }}
              >
                <div className="texture-item grid grid-cols-2 place-items-center gap-6 p-6">
                  <TriangleStamp data={ORG} className="w-40" />
                  <WaxStamp data={ORG} rotate={-6} className="w-40" />
                  <GearStamp data={ORG} rotate={4} className="w-40" />
                  <LabelStamp data={ORG} className="w-40" />
                </div>
              </div>
              <Caption>{stock.label}</Caption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        title="Selo holográfico"
        hint="Adesivo com a data de publicação. Bom para destacar documentos oficiais ou verificados; o laranja é a versão de alerta."
      >
        <div className="flex flex-wrap items-center gap-10">
          <figure className="flex flex-col items-center gap-3">
            <HoloSeal data={ORG} rotate={-4} />
            <Caption>holográfico</Caption>
          </figure>
          <figure className="flex flex-col items-center gap-3">
            <HoloSeal data={ORG} tint="#ff6a13" rotate={3} />
            <Caption>laranja</Caption>
          </figure>
          <figure className="flex flex-col items-center gap-3">
            <HoloSeal data={ORG} tint="#9ca3af" />
            <Caption>prata</Caption>
          </figure>
        </div>
      </Section>

      <Section
        title="No documento"
        hint="Três jeitos de juntar com a assinatura do autor. Troque o tema para ver no escuro."
      >
        <div className="grid gap-8 lg:grid-cols-3">
          <figure className="flex flex-col gap-3">
            <DocumentEnd>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <DigitalSignature {...AUTHOR} />
                </div>
                <WaxStamp data={ORG} rotate={-8} className="w-32 shrink-0 text-foreground/70" />
              </div>
            </DocumentEnd>
            <Caption>A · lado a lado, selo de cera</Caption>
          </figure>

          <figure className="flex flex-col gap-3">
            <DocumentEnd>
              <div className="relative">
                <DigitalSignature {...AUTHOR} />
                <HoloSeal
                  data={ORG}
                  rotate={-6}
                  className="absolute -right-2 -bottom-6 w-32"
                />
              </div>
              <div className="flex items-end justify-between gap-4 pt-4">
                <LabelStamp data={ORG} className="text-foreground/70" />
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  Postado 00:00 BRT
                </p>
              </div>
            </DocumentEnd>
            <Caption>B · selo sobre a assinatura, etiqueta embaixo</Caption>
          </figure>

          <figure className="flex flex-col gap-3">
            <DocumentEnd>
              <DigitalSignature {...AUTHOR} />
              <div className="flex items-center gap-4 border-t border-dashed border-foreground/30 pt-6">
                <TriangleStamp data={ORG} className="w-28 shrink-0 text-foreground/70" />
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase">
                  <dt className="text-muted-foreground">Org:</dt>
                  <dd>{ORG.name}</dd>
                  <dt className="text-muted-foreground">Ref:</dt>
                  <dd>{ORG.ref}</dd>
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd>{ORG.status}</dd>
                </dl>
              </div>
            </DocumentEnd>
            <Caption>C · bloco próprio abaixo, com ficha</Caption>
          </figure>
        </div>
      </Section>
    </div>
  );
}
