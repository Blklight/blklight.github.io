"use client";

import { useLocale, useTranslations } from "next-intl";
import type { GrainSettings } from "@/features/documents/design/grains";
import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import type { SignatureContext } from "@/features/documents/design/signature";
import { cn } from "@/lib/utils";
import type { CoverImageSettings } from "./cover-image-editor";
import {
  DocumentFooterRenderer,
  DocumentHeaderRenderer,
} from "./letterhead-renderer";
import { getPaperProseStyle } from "./paper-prose-style";
import { isSignatureVisible, SignatureBlock } from "./signature-block";
import type {
  DocumentFooter,
  DocumentHeader,
  DocumentSignature,
  PaperColors,
} from "./types";

export interface PreviewDesignProps {
  paperColors: PaperColors | null;
  fontClass: string;
  textureStyle: Record<string, string | undefined>;
  paperTexture: {
    type: string;
    size: number;
    opacity: number;
    color: string | null;
  };
  documentHeader: DocumentHeader;
  documentFooter: DocumentFooter;
  documentSignature: DocumentSignature;
  coverImage: string | null;
  coverSettings: CoverImageSettings;
  grains?: string[];
  grainSettings?: GrainSettings;
  /** Data for letterhead markers ({{publicador}}); absent = shown as saved. */
  textContext?: LetterheadTextContext | null;
  /** Data for the automatic signature; absent = author fields empty. */
  signatureContext?: SignatureContext | null;
}

function getStaticCoverFilter(settings: CoverImageSettings): string {
  switch (settings.filter) {
    case "grayscale":
      return settings.filterHoverBehavior === "apply"
        ? "none"
        : "grayscale(100%)";
    case "sepia":
      return settings.filterHoverBehavior === "apply" ? "none" : "sepia(100%)";
    default:
      return "none";
  }
}

export function DocumentPreview(props: PreviewDesignProps) {
  const t = useTranslations("templates");
  const locale = useLocale();
  const {
    coverImage,
    coverSettings,
    paperTexture,
    documentHeader,
    documentFooter,
    paperColors,
    fontClass,
    textureStyle,
    grains,
    grainSettings,
    textContext,
    signatureContext,
  } = props;
  const sigContext: SignatureContext = signatureContext ?? {};

  return (
    <PaperSurface
      paperColors={paperColors}
      paperTexture={paperTexture}
      textureStyle={textureStyle}
      grains={grains}
      grainSettings={grainSettings}
      contentClassName="md:p-8 p-6"
    >
      {documentHeader.enabled && (
        <DocumentHeaderRenderer
          header={documentHeader}
          className="mb-4"
          textContext={textContext}
        />
      )}
      <h1
        className={cn(
          "w-full text-3xl md:text-4xl font-bold tracking-tight mb-3 transition-colors duration-300",
          fontClass,
        )}
        style={{ color: paperColors?.text || undefined }}
      >
        {t("sampleTitle")}
      </h1>
      {coverImage && (
        <div className="mb-6">
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: coverSettings.borderRadius,
              height: coverSettings.height,
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: arbitrary external URL (user cover/avatar or demo asset); next/image would need remotePatterns for every host */}
            <img
              src={coverImage}
              alt="Capa"
              className="w-full h-full object-cover"
              style={{
                objectPosition: coverSettings.position,
                filter: getStaticCoverFilter(coverSettings),
              }}
            />
          </div>
        </div>
      )}
      <div
        className="h-px flex-1 mb-6"
        style={{
          backgroundColor: paperColors
            ? `${paperColors.text}33`
            : "hsl(var(--foreground) / 0.2)",
        }}
      />
      <div
        lang={locale}
        className={cn("doc-prose", fontClass)}
        style={getPaperProseStyle(paperColors)}
      >
        <p>{t("previewText1")}</p>
        <p>{t("previewText2")}</p>
      </div>
      {isSignatureVisible(sigContext) && (
        <div className="mt-12">
          <SignatureBlock
            context={sigContext}
            color={paperColors?.text}
            background={paperColors?.bg}
          />
        </div>
      )}
      {documentFooter.enabled && (
        <DocumentFooterRenderer
          footer={documentFooter}
          className="mt-4"
          textContext={textContext}
        />
      )}
    </PaperSurface>
  );
}
