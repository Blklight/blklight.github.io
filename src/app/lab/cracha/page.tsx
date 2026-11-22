"use client";

import type { ReactNode } from "react";
import { Badge, type BadgeData } from "@/components/badge";
import type { PlatformApp } from "@/types/api.types";

const app = (slug: string, name: string): PlatformApp => ({
  id: slug,
  slug,
  name,
  description: null,
  accessMode: "open",
  iconUrl: null,
  tagline: null,
  category: null,
  isActive: true,
  createdAt: "",
});

const MEMBER: BadgeData = {
  name: "Marina Alves",
  handle: "marina",
  memberSince: "2026-11-20T12:00:00.000Z",
  memberId: "A1B2C3",
  apps: [app("publisher", "Publisher"), app("reader", "Reader")],
  socials: [
    { network: "github", url: "https://github.com" },
    { network: "x", url: "https://x.com" },
    { network: "linkedin", url: "https://linkedin.com" },
    { network: "instagram", url: "https://instagram.com" },
    { network: "bluesky", url: "https://bsky.app" },
  ],
};

// Test photo (public/avatar.png) for the badges that show one.
const WITH_PHOTO: BadgeData = { ...MEMBER, avatarUrl: "/avatar.png" };

// holo-card uses the photo as card art; the three tints mirror the original's color variants.
const HOLO_VARIANTS = [
  { label: "sem tinta", accent: undefined },
  { label: "frost", accent: "#38bdf8" },
  { label: "vale", accent: "#22c55e" },
  { label: "baía", accent: "#6366f1" },
];

const Item = ({ label, children }: { label: string; children: ReactNode }) => (
  <figure className="flex flex-col items-center gap-4">
    {children}
    <figcaption className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </figcaption>
  </figure>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mt-12">
    <h2 className="mb-6 border-b border-border pb-2 font-sans text-xl font-bold tracking-tight">
      {title}
    </h2>
    <div className="flex flex-wrap gap-12">{children}</div>
  </section>
);

/** Lab: every badge model with the same member, to compare looks. */
export default function BadgeLabPage() {
  return (
    <div className="px-6 py-10 md:px-10">
      <h1 className="font-sans text-4xl font-bold tracking-tight">Crachás</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Os mesmos dados em cada modelo. Passe o mouse para o tilt e o brilho;
        clique para virar. Troque o tema para ver o classic escuro.
      </p>

      <Section title="classic">
        <Item label="iniciais">
          <Badge data={MEMBER} />
        </Item>
        <Item label="com foto">
          <Badge data={WITH_PHOTO} />
        </Item>
        <Item label="confirmado">
          <Badge data={WITH_PHOTO} status="confirmed" />
        </Item>
      </Section>

      <Section title="holo">
        <Item label="com foto">
          <Badge model="holo" data={WITH_PHOTO} />
        </Item>
      </Section>

      <Section title="poster">
        <Item label="iniciais">
          <Badge model="poster" data={MEMBER} />
        </Item>
        <Item label="com foto">
          <Badge model="poster" data={WITH_PHOTO} status="draft" />
        </Item>
      </Section>

      <Section title="factory">
        <Item label="iniciais">
          <Badge model="factory" data={MEMBER} />
        </Item>
        <Item label="com foto">
          <Badge model="factory" data={WITH_PHOTO} status="draft" />
        </Item>
      </Section>

      <Section title="ops">
        <Item label="iniciais">
          <Badge model="ops" data={MEMBER} />
        </Item>
        <Item label="com foto">
          <Badge model="ops" data={WITH_PHOTO} status="draft" />
        </Item>
      </Section>

      <Section title="spec">
        <Item label="iniciais">
          <Badge model="spec" data={MEMBER} />
        </Item>
        <Item label="com foto">
          <Badge model="spec" data={WITH_PHOTO} status="draft" />
        </Item>
      </Section>

      <Section title="lab">
        <Item label="iniciais">
          <Badge model="lab" data={MEMBER} />
        </Item>
        <Item label="com foto">
          <Badge model="lab" data={WITH_PHOTO} status="draft" />
        </Item>
      </Section>

      <Section title="holo-card (heygaia)">
        {HOLO_VARIANTS.map(({ label, accent }) => (
          <Item key={label} label={label}>
            <Badge
              model="holo-card"
              data={{ ...MEMBER, avatarUrl: "/badges/holo-bg.jpg", accent }}
            />
          </Item>
        ))}
      </Section>
    </div>
  );
}
