"use client";

import { useState } from "react";
import { Badge, type BadgeData } from "@/components/badge";
import { AppTile } from "@/components/onboarding/app-tile";
import { CornerBrackets } from "@/components/onboarding/corner-brackets";
import { SimpleFlipCard } from "@/components/onboarding/simple-flip-card";
import type { ShowcaseCategory } from "@/components/showcase/types";
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

const PUBLISHER = app("publisher", "Publisher");
const READER = app("reader", "Reader");

const MEMBER: BadgeData = {
  name: "Marina Alves",
  handle: "marina",
  memberSince: "2026-11-20T12:00:00.000Z",
  memberId: "A1B2C3",
  apps: [PUBLISHER, READER],
};

function FichaDemo() {
  const [selected, setSelected] = useState(false);
  return (
    <div className="grid max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
      <SimpleFlipCard
        app={PUBLISHER}
        selected={selected}
        onToggle={() => setSelected((s) => !s)}
      />
      <SimpleFlipCard app={READER} />
    </div>
  );
}

function AppTileDemo() {
  return (
    <div className="grid max-w-md grid-cols-3 gap-3">
      <AppTile app={PUBLISHER} />
      <AppTile app={PUBLISHER} selected />
      <AppTile app={READER} />
    </div>
  );
}

function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-8">
      <Badge data={{ ...MEMBER, apps: [] }} status="draft" />
      <Badge data={MEMBER} status="confirmed" />
      <Badge data={MEMBER} />
    </div>
  );
}

function CornerBracketsDemo() {
  return (
    <div className="relative inline-block px-4 py-3 font-mono uppercase">
      <CornerBrackets size="size-3" />
      Marcas de registro
    </div>
  );
}

export const blklightCategory: ShowcaseCategory = {
  id: "blklight",
  title: "Blklight",
  items: [
    { slug: "ficha", name: "Ficha de app (flip)", demo: FichaDemo },
    { slug: "app-tile", name: "App Tile", demo: AppTileDemo },
    { slug: "member-badge", name: "Crachá (classic)", demo: BadgeDemo },
    {
      slug: "corner-brackets",
      name: "Corner Brackets",
      demo: CornerBracketsDemo,
    },
  ],
};
