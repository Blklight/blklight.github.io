"use client";

import { useMemo } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import {
  type DocumentDesignStore,
  normalizePaperStyle,
} from "@/store/create-document-design-store";
import { useDocumentDesignStore } from "@/store/useDocumentDesignStore";
import {
  getAccessibleBorderColor,
  getAccessibleTextColor,
  getMutedTextColor,
} from "./color-utils";
import { FONT_OPTIONS, TEXTURE_PRESETS } from "./constants";
import type { PaperColors } from "./types";

export function useDocumentDesign(
  store: UseBoundStore<StoreApi<DocumentDesignStore>> = useDocumentDesignStore,
) {
  const paperStyle = store((s) => s.paperStyle);
  const paperTexture = store((s) => s.paperTexture);
  const documentHeader = store((s) => s.documentHeader);
  const documentFooter = store((s) => s.documentFooter);
  const documentSignature = store((s) => s.documentSignature);
  const typography = store((s) => s.typography);
  const coverImage = store((s) => s.coverImage);
  const coverSettings = store((s) => s.coverSettings);
  const setPaperStyle = store((s) => s.setPaperStyle);
  const setPaperTexture = store((s) => s.setPaperTexture);
  const setDocumentHeader = store((s) => s.setDocumentHeader);
  const setDocumentFooter = store((s) => s.setDocumentFooter);
  const setDocumentSignature = store((s) => s.setDocumentSignature);
  const setTypography = store((s) => s.setTypography);
  const setCoverImage = store((s) => s.setCoverImage);
  const setCoverSettings = store((s) => s.setCoverSettings);
  const headerFooterLinked = store((s) => s.headerFooterLinked);
  const setHeaderFooterLinked = store((s) => s.setHeaderFooterLinked);

  const paperColors = useMemo<PaperColors | null>(() => {
    const style = normalizePaperStyle(paperStyle);
    if (style.mode === "default" || !style.bg) return null;
    const bg = style.bg;
    const text = style.text || getAccessibleTextColor(bg);
    const muted = getMutedTextColor(text);
    const border = getAccessibleBorderColor(bg);
    return { bg, text, muted, border };
  }, [paperStyle]);

  const fontClass = useMemo(() => {
    const font = FONT_OPTIONS.find((f) => f.id === typography);
    return font?.family || "font-sans";
  }, [typography]);

  const textureStyle = useMemo(() => {
    const preset = TEXTURE_PRESETS.find((p) => p.id === paperTexture.type);
    if (!preset || paperTexture.type === "none") return {};
    const color = paperTexture.color || paperColors?.text || "currentColor";
    switch (paperTexture.type) {
      case "dots":
        return {
          backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
          backgroundSize: `${paperTexture.size}px ${paperTexture.size}px`,
        };
      case "grid":
        return {
          backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
          backgroundSize: `${paperTexture.size}px ${paperTexture.size}px`,
        };
      default:
        return {};
    }
  }, [paperTexture, paperColors]);

  return {
    paperStyle,
    paperTexture,
    documentHeader,
    documentFooter,
    documentSignature,
    typography,
    coverImage,
    coverSettings,
    setPaperStyle,
    setPaperTexture,
    setDocumentHeader,
    setDocumentFooter,
    setDocumentSignature,
    setTypography,
    setCoverImage,
    setCoverSettings,
    headerFooterLinked,
    setHeaderFooterLinked,
    paperColors,
    fontClass,
    textureStyle,
  };
}
