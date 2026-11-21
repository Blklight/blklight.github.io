"use client";

import { BADGE_MODELS, Badge, type BadgeData, type BadgeModel } from "@/components/badge";
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

const MODELS = Object.keys(BADGE_MODELS) as BadgeModel[];

/** Lab: every badge model with the same member, to compare looks. */
export default function BadgeLabPage() {
  return (
    <div className="px-6 py-10 md:px-10">
      <h1 className="font-sans text-4xl font-bold tracking-tight">Crachás</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">
        Os mesmos dados em cada modelo. Passe o mouse para o tilt (e o brilho
        no holo); clique para virar.
      </p>
      <div className="mt-10 flex flex-wrap gap-12">
        {MODELS.map((model) => (
          <figure key={model} className="flex flex-col items-center gap-4">
            <Badge model={model} data={MEMBER} />
            <figcaption className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {model}
            </figcaption>
          </figure>
        ))}
        <figure className="flex flex-col items-center gap-4">
          <Badge data={MEMBER} status="confirmed" />
          <figcaption className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            classic · confirmado
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
