import type React from "react";
import type { ReactNode } from "react";
import noisyImg from "../assets/images/noisy.png";

export const OVERLAY_PATTERNS = {
  // dots: "/overlays/01.png",
  // grid: "/overlays/02.png",
  noisy: noisyImg,
} as const;

export type PatternName = keyof typeof OVERLAY_PATTERNS;

interface MediaViewProps {
  imageSrc?: string;
  videoSrc?: string;
  backgroundNode?: ReactNode; // Permite passar layouts customizados para a camada de fundo
  pattern?: "noisy" | "dots" | "grid" | "none";
  overlayColor?: string; // Ex: "bg-black/40"
  parallax?: boolean;
  className?: string;
  children?: ReactNode;
}

export const MediaView: React.FC<MediaViewProps> = ({
  imageSrc,
  videoSrc,
  backgroundNode,
  pattern = "none",
  overlayColor,
  parallax = false,
  className = "",
  children,
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 1. CAMADA DE MÍDIA / BACKGROUND (Fica no fundo) */}
      <div
        className={`absolute inset-0 w-full h-full ${
          parallax ? "will-change-transform transform-gpu scale-105" : ""
        }`}
      >
        {/* Renderiza backgroundNode customizado se fornecido */}
        {backgroundNode ? (
          backgroundNode
        ) : videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : imageSrc ? (
          // biome-ignore lint/performance/noImgElement: arbitrary external URL (user cover/avatar or demo asset); next/image would need remotePatterns for every host
          <img src={imageSrc} alt="" className="w-full h-full object-cover" />
        ) : null}
      </div>

      {/* 2. CAMADA DE TEXTURA E OVERLAY (Fica por cima da mídia/backgroundNode e por baixo do children) */}
      {overlayColor && (
        <div
          className={`absolute inset-0 pointer-events-none z-10 ${overlayColor}`}
        />
      )}

      {pattern === "noisy" && (
        <div className="absolute inset-0 pointer-events-none z-10 noisy-pattern opacity-30" />
      )}

      {/* 3. CAMADA DE CONTEÚDO (Fica no topo, preservando clareza e interatividade) */}
      {children && (
        <div className="relative z-20 w-full h-full">{children}</div>
      )}
    </div>
  );
};
