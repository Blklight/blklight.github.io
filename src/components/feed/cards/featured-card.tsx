"use client";

import { ArrowRight } from "lucide-react";
import { FilletCard } from "@/components/ui/fillet-card";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import { derivePaperDesign } from "@/features/documents/document-read";
import { cn } from "@/lib/utils";
import type { DocumentCard } from "@/types/api.types";
import { typeTheme } from "./card-theme";
import { CardMeta, CardTags, CardTitle, TypeTab } from "./parts";

/** Opens the feed: the newest document, wide, with its full abstract. */
export function FeaturedCard({ doc }: { doc: DocumentCard }) {
  const theme = typeTheme(doc.typeName);
  const design = derivePaperDesign(
    doc.style ?? { typography: "sans", paperStyle: null, paperTexture: null },
  );

  return (
    <FilletCard
      corners={["br"]}
      size="lg"
      radius={6}
      rounded={2}
      className={cn(
        "group/card relative overflow-hidden grid md:grid-cols-[1.25fr_1fr] min-h-[26rem]",
      )}
    >
      <div className="relative min-h-64 overflow-hidden bg-dark">
        {doc.coverImageUrl ? (
          <>
            {/* biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist */}
            <img
              src={doc.coverImageUrl}
              alt=""
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
            />
            {/* biome-ignore lint/performance/noImgElement: same cover, duotone layer */}
            <img
              src={doc.coverImageUrl}
              alt=""
              style={{ filter: `url(#duo-${doc.typeName})` }}
              className="absolute inset-0 size-full object-cover transition-[opacity,scale] duration-700 ease-out group-hover/card:opacity-0 group-hover/card:scale-105 motion-reduce:transition-none"
            />
          </>
        ) : (
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
        )}
        <TypeTab type={doc.typeName} />
      </div>

      <div className="relative flex flex-col p-6 md:p-8 bg-card">
        <p className={cn("text-sm font-medium mb-3", theme.text)}>
          Em destaque
        </p>
        <CardTitle
          doc={doc}
          className="font-sans text-3xl lg:text-4xl leading-[1.08]"
        />
        {doc.abstract && doc.coverImageUrl && (
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {doc.abstract}
          </p>
        )}
        <CardTags doc={doc} className="mt-4 text-muted-foreground" />
        <div className="mt-auto pt-6 flex flex-col gap-4">
          <span
            aria-hidden
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider"
          >
            Ler {typeTheme(doc.typeName).label.toLowerCase()}
            <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-1" />
          </span>
          <CardMeta doc={doc} muted="text-muted-foreground" />
        </div>
      </div>
    </FilletCard>
  );
}
