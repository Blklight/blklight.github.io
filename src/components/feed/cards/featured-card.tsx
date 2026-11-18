"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FilletCard } from "@/components/ui/fillet-card";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import { derivePaperDesign } from "@/features/documents/document-read";
import { cn } from "@/lib/utils";
import type { DocumentCard } from "@/types/api.types";
import { typeTheme } from "./card-theme";
import { CardMeta, CardTags, CardTitle, TypeTab } from "./parts";

function ReadCue({ type }: { type: string }) {
  return (
    <span
      aria-hidden
      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider"
    >
      Ler {typeTheme(type).label.toLowerCase()}
      <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-1" />
    </span>
  );
}

/** The TCC's "projeto do dia": a wide banner in the brand duotone. */
function CoverBanner({ doc }: { doc: DocumentCard }) {
  const cover = doc.coverImageUrl ?? "";
  return (
    <FilletCard
      corners={["tl", "br"]}
      size="xl"
      radius={6}
      rounded={2}
      bordered={false}
      className="group/card relative overflow-hidden min-h-[28rem] md:min-h-[32rem] bg-dark text-light"
    >
      {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
      <img
        src={cover}
        alt=""
        className="absolute inset-0 size-full object-cover transition-transform duration-1000 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
      />
      {/* biome-ignore lint/performance/noImgElement: same cover, brand duotone layer */}
      <img
        src={cover}
        alt=""
        style={{ filter: "url(#duo-brand)" }}
        className="absolute inset-0 size-full object-cover transition-[opacity,scale] duration-1000 ease-out group-hover/card:opacity-0 group-hover/card:scale-105 motion-reduce:transition-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/45 to-transparent" />
      <TypeTab type={doc.typeName} corners={["tl"]} tone="paper" />

      <div className="relative h-full min-h-[inherit] flex flex-col justify-end gap-4 p-6 md:p-10 max-w-3xl">
        <CardTitle
          doc={doc}
          className="font-sans text-4xl md:text-6xl leading-[1.02] tracking-tighter"
        >
          <span className="box-decoration-clone bg-dark px-2">{doc.title}</span>
        </CardTitle>
        {doc.abstract && (
          <p className="text-base md:text-lg text-light/85 leading-relaxed max-w-2xl">
            {doc.abstract}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ReadCue type={doc.typeName} />
          <CardMeta doc={doc} className="min-w-64" muted="text-light/70" />
        </div>
      </div>

      <p className="absolute bottom-6 right-8 hidden lg:flex items-center gap-2 text-sm">
        <span className="bg-dark/75 px-2 py-1 rounded-xs">Em destaque</span>
        <Image src="/blklight-light.svg" alt="" width={32} height={32} />
      </p>
    </FilletCard>
  );
}

/** No cover: the author's page on the left, the reading cue on the right. */
function PaperSpread({ doc }: { doc: DocumentCard }) {
  const design = derivePaperDesign(
    doc.style ?? { typography: "sans", paperStyle: null, paperTexture: null },
  );
  return (
    <FilletCard
      corners={["tr", "bl"]}
      size="xl"
      radius={6}
      rounded={2}
      className="group/card relative overflow-hidden grid md:grid-cols-[1.25fr_1fr] min-h-[26rem]"
    >
      <div className="relative min-h-64 overflow-hidden">
        <PaperSurface
          paperColors={design.paperColors}
          paperTexture={design.paperTexture}
          textureStyle={design.textureStyle}
          className="absolute inset-0 border-0 bg-card"
          contentClassName="h-full flex items-end p-8"
        >
          <p
            aria-hidden
            className={cn(
              doc.abstract
                ? "text-3xl lg:text-4xl leading-snug line-clamp-6"
                : "text-5xl lg:text-6xl font-bold leading-[1.02] tracking-tight line-clamp-4",
              design.fontClass,
            )}
            style={{ color: design.paperColors?.text ?? undefined }}
          >
            {doc.abstract ?? doc.title}
          </p>
        </PaperSurface>
        <TypeTab type={doc.typeName} />
      </div>

      <div className="relative flex flex-col p-6 md:p-8 bg-card">
        <p className="text-sm font-medium mb-3 text-muted-foreground">
          Em destaque
        </p>
        <CardTitle
          doc={doc}
          className="font-sans text-3xl lg:text-4xl leading-[1.08]"
        />
        <CardTags doc={doc} className="mt-4 text-muted-foreground" />
        <div className="mt-auto pt-6 flex flex-col gap-4">
          <ReadCue type={doc.typeName} />
          <CardMeta doc={doc} muted="text-muted-foreground" />
        </div>
      </div>
    </FilletCard>
  );
}

export function FeaturedCard({ doc }: { doc: DocumentCard }) {
  return doc.coverImageUrl ? (
    <CoverBanner doc={doc} />
  ) : (
    <PaperSpread doc={doc} />
  );
}
