"use client";

import type { ReactNode } from "react";
import { DigitalSignature } from "@/components/digital-signature";
import {
  DiamondStamp,
  GearStamp,
  HoloSeal,
  LabelStamp,
  type OrgStampData,
  type StampFinish,
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
const STOCKS: {
  id: string;
  label: string;
  bg: string;
  ink: string;
  finish: StampFinish;
}[] = [
  { id: "cinza", label: "cartão cinza · tinta", bg: "#dcdcd6", ink: "#4f4f4a", finish: "ink" },
  { id: "grafite", label: "grafite · relevo", bg: "#2b2b2b", ink: "#a3a39e", finish: "emboss" },
  { id: "laranja", label: "laranja · tinta clara", bg: "#ff6a13", ink: "#fff4ea", finish: "ink" },
  { id: "preto", label: "preto · relevo", bg: "#141414", ink: "#6e6e69", finish: "emboss" },
]

const SEAL_STOCKS: { label: string; bg: string; tint?: string }[] = [
  { label: "holográfico em cartão cinza", bg: "#dcdcd6" },
  { label: "laranja em grafite", bg: "#2b2b2b", tint: "#ff6a13" },
  { label: "prata em preto", bg: "#141414", tint: "#b8bcc4" },
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

/** Organization block: its stamp and a short record, kept apart from the author's signature. */
const OrgBlock = ({ stamp }: { stamp: ReactNode }) => (
  <div className="flex items-center gap-5">
    <div className="shrink-0">{stamp}</div>
    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-mono text-[0.7rem] uppercase">
      <dt className="text-muted-foreground">Org:</dt>
      <dd>{ORG.name}</dd>
      <dt className="text-muted-foreground">Ref:</dt>
      <dd>{ORG.ref}</dd>
      <dt className="text-muted-foreground">Status:</dt>
      <dd>{ORG.status}</dd>
      <dt className="text-muted-foreground">Data:</dt>
      <dd>{ORG.date.replace(/·/g, "/")}</dd>
    </dl>
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
        <div className="grid gap-4 md:grid-cols-2">
          {STOCKS.map((stock) => (
            <figure key={stock.id} className="flex flex-col gap-3">
              <div
                className="background-texture rounded-md"
                style={{ background: stock.bg, color: stock.ink }}
              >
                <div className="texture-item grid grid-cols-2 place-items-center gap-6 p-6 sm:grid-cols-3">
                  <DiamondStamp data={ORG} finish={stock.finish} rotate={-3} className="w-44" />
                  <TriangleStamp data={ORG} finish={stock.finish} className="w-44" />
                  <WaxStamp data={ORG} finish={stock.finish} rotate={-6} className="w-44" />
                  <GearStamp data={ORG} finish={stock.finish} rotate={4} className="w-44" />
                  <LabelStamp data={ORG} finish={stock.finish} className="w-44" />
                </div>
              </div>
              <Caption>{stock.label}</Caption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        title="Selo holográfico"
        hint="Folha metálica colada no papel, com o carimbo gravado nela. A forma vem dos carimbos; o oval é o selo de data. Laranja para alerta, prata para documentos internos."
      >
        <div className="flex flex-col gap-6">
          {SEAL_STOCKS.map((stock) => (
            <figure key={stock.label} className="flex flex-col gap-3">
              <div
                className="background-texture rounded-md"
                style={{ background: stock.bg }}
              >
                <div className="texture-item flex flex-wrap items-center justify-around gap-6 p-6">
                  <HoloSeal data={ORG} tint={stock.tint} shape="diamond" rotate={-4} className="w-40" />
                  <HoloSeal data={ORG} tint={stock.tint} shape="wax" rotate={5} className="w-40" />
                  <HoloSeal data={ORG} tint={stock.tint} shape="gear" rotate={-3} className="w-40" />
                  <HoloSeal data={ORG} tint={stock.tint} shape="triangle" className="w-40" />
                  <HoloSeal data={ORG} tint={stock.tint} rotate={3} className="w-40" />
                </div>
              </div>
              <Caption>{stock.label}</Caption>
            </figure>
          ))}
        </div>
      </Section>

      <Section
        title="No documento"
        hint="O carimbo da organização fica num bloco próprio, acima ou abaixo da assinatura do autor, nunca sobre ela. Troque o tema para ver no escuro."
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <figure className="flex flex-col gap-3">
            <DocumentEnd>
              <OrgBlock
                stamp={
                  <DiamondStamp data={ORG} className="w-28 text-foreground/70" />
                }
              />
              <div className="border-t border-dashed border-foreground/30 pt-6">
                <DigitalSignature {...AUTHOR} />
              </div>
            </DocumentEnd>
            <Caption>Acima · carimbo a tinta</Caption>
          </figure>

          <figure className="flex flex-col gap-3">
            <DocumentEnd>
              <DigitalSignature {...AUTHOR} />
              <div className="border-t border-dashed border-foreground/30 pt-6">
                <OrgBlock
                  stamp={<HoloSeal data={ORG} shape="diamond" className="w-28" />}
                />
              </div>
            </DocumentEnd>
            <Caption>Abaixo · selo holográfico</Caption>
          </figure>
        </div>
      </Section>
    </div>
  );
}
