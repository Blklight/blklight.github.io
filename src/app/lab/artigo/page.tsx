"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArticleSample } from "./article-sample";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { deriveReadDesign } from "@/features/documents/document-read";
import { PAPER_THEME_PRESETS } from "@/components/document/constants";
import { cn } from "@/lib/utils";
import type { DocumentFull } from "@/types/api.types";

const ShaderFilmGrain = dynamic(
  async () => {
    const mod = await import("shaders/react");
    const { Shader, FilmGrain, SolidColor } = mod;
    return function Comp({
      paperColor,
      mode,
      grainStrength,
      grainBias,
      opacity,
    }: {
      paperColor?: string;
      mode: "shader-fundo" | "shader-overlay" | "shader-viewport";
      grainStrength: number;
      grainBias: number;
      opacity: number;
    }) {
      const defaultBg =
        paperColor && paperColor !== "transparent"
          ? paperColor
          : "#f5f0e6";
      if (mode === "shader-viewport") {
        return (
          <Shader className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
            <FilmGrain strength={grainStrength} bias={grainBias} animated={false}>
              <SolidColor color={defaultBg} />
            </FilmGrain>
          </Shader>
        );
      }
      return (
        <Shader className="absolute inset-0 h-full w-full" style={{ pointerEvents: "none" }}>
          {mode === "shader-fundo" ? (
            <FilmGrain strength={grainStrength} bias={grainBias} animated={false}>
              <SolidColor color={defaultBg} />
            </FilmGrain>
          ) : (
            <FilmGrain strength={grainStrength} bias={grainBias} animated={false}>
              <SolidColor color="#808080" />
            </FilmGrain>
          )}
        </Shader>
      );
    };
  },
  { ssr: false }
);

type TextureMode =
  | "none"
  | "background-texture"
  | "texture-noise"
  | "texture-papergrain"
  | "grade"
  | "pontos"
  | "shader-fundo"
  | "shader-overlay"
  | "shader-viewport";

const PAPER_PRESETS = [
  { id: "default", name: "Tema Padrão", bg: "transparent" },
  ...PAPER_THEME_PRESETS.map((p) => ({ id: p.id, name: p.name, bg: p.bg })),
];

function rgbToHex(rgb: string): string | null {
  const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (!m) return null;
  const r = Number(m[1]).toString(16).padStart(2, "0");
  const g = Number(m[2]).toString(16).padStart(2, "0");
  const b = Number(m[3]).toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
}

function makeDummyDocument(paperBg: string | null): DocumentFull {
  const style: any = {
    typography: "mono",
    paperStyle: paperBg && paperBg !== "transparent" ? { bg: paperBg } : {},
    paperTexture: { type: "none", size: 24, opacity: 0.15 },
    coverSettings: { position: "center", borderRadius: 0, height: 280, filter: "none" },
    documentHeader: { enabled: false, mode: "custom", presetId: null, lines: [], lineFormats: [], style: {} },
    documentFooter: { enabled: false, mode: "custom", presetId: null, lines: [], lineFormats: [], style: {} },
    documentSignature: null,
  };
  return {
    id: "lab-article",
    title: "Lab",
    slug: "lab",
    abstract: null,
    content: {},
    coverImageUrl: null,
    category: null,
    tags: [],
    status: "PUBLISHED",
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    style,
    author: {
      id: "lab",
      username: "lab",
      displayName: "Lab",
      avatarUrl: null,
    },
    organization: null,
    likes: { likesCount: 0, likedByMe: false },
    authorship: null,
  } as unknown as DocumentFull;
}

export default function LabArtigoPage() {
  const [textureMode, setTextureMode] = useState<TextureMode>("none");
  const [paperPresetId, setPaperPresetId] = useState("default");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [opacity, setOpacity] = useState(0.5);
  const [cellSize, setCellSize] = useState(16);
  const [grainStrength, setGrainStrength] = useState(0.25);
  const [grainBias, setGrainBias] = useState(1.5);
  const [shaderOpacity, setShaderOpacity] = useState(1.0);

  const paperPreset = useMemo(
    () => PAPER_PRESETS.find((p) => p.id === paperPresetId) || PAPER_PRESETS[0],
    [paperPresetId]
  );

  const readDesign = useMemo(() => {
    try {
      if (textureMode === "grade" || textureMode === "pontos") {
        const doc = makeDummyDocument(paperPreset.bg);
        (doc.style as any).paperTexture = {
          type: textureMode === "grade" ? "grid" : "dots",
          size: Math.max(4, cellSize),
          opacity: Math.max(0, Math.min(1, opacity)),
        };
        return deriveReadDesign(doc);
      }
    } catch (e) {
      // ignore
    }
    return null;
  }, [textureMode, paperPreset.bg, cellSize, opacity]);

  const paperColor =
    paperPreset.bg === "transparent" ? undefined : paperPreset.bg;

  const paperColorForShader =
    paperColor !== undefined ? paperColor : theme === "dark" ? "#1a1510" : "#f5f0e6";

  const [viewportBg, setViewportBg] = useState<string>("#ffffff");
  const [viewportBgSource, setViewportBgSource] = useState<string>("default");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const bg = window.getComputedStyle(document.body).backgroundColor;
      const hex = rgbToHex(bg);
      if (hex) {
        setViewportBg(hex);
        setViewportBgSource(bg);
      } else {
        const fallback = theme === "dark" ? "#262626" : "#ffffff";
        setViewportBg(fallback);
        setViewportBgSource("fallback");
      }
    } catch {
      const fallback = theme === "dark" ? "#262626" : "#ffffff";
      setViewportBg(fallback);
      setViewportBgSource("fallback");
    }
  }, [theme, textureMode]);

  const debugInfo = useMemo(() => {
    const info: any = {
      mode: textureMode,
      paperPresetId,
      paperColor: paperColor || "transparent",
      theme,
    };
    if (textureMode === "texture-noise") {
      info.opacity = opacity;
      info.overlay = { texture: "noise", opacity };
    }
    if (textureMode === "texture-papergrain") {
      info.opacity = opacity;
      info.overlay = { texture: "paperGrain", opacity };
    }
    if (textureMode === "grade" || textureMode === "pontos") {
      info.cellSize = cellSize;
      info.opacity = opacity;
      info.deriveReadDesignCalled = !!readDesign;
      info.textureStyle = readDesign?.textureStyle || null;
    }
    if (textureMode === "shader-fundo" || textureMode === "shader-overlay" || textureMode === "shader-viewport") {
      info.grainStrength = grainStrength;
      info.grainBias = grainBias;
      info.shaderOpacity = shaderOpacity;
      info.shader = {
        type: textureMode,
        tree: textureMode === "shader-viewport" ? "Shader(fixed viewport) > FilmGrain > SolidColor" : "Shader > FilmGrain > SolidColor",
        animated: false,
        strength: grainStrength,
        bias: grainBias,
      };
    }
    if (textureMode === "shader-viewport") {
      info.viewportBg = viewportBg;
      info.viewportBgSource = viewportBgSource;
    }
    return info;
  }, [textureMode, paperPresetId, paperColor, theme, opacity, cellSize, grainStrength, grainBias, shaderOpacity, viewportBg, viewportBgSource, readDesign]);

  const rafMapRef = useRef<Record<string, number>>({});
  const [rafMap, setRafMap] = useState<Record<string, number>>({});

  const measureRaf = () => {
    if (typeof window === "undefined") return;
    const original = window.requestAnimationFrame.bind(window);
    let count = 0;
    const start = performance.now();
    (window as any).requestAnimationFrame = (cb: FrameRequestCallback) => {
      count += 1;
      return original(cb);
    };
    setTimeout(() => {
      const elapsed = performance.now() - start;
      void elapsed;
      rafMapRef.current[textureMode] = count;
      setRafMap({ ...rafMapRef.current });
      try {
        (window as any).requestAnimationFrame = original;
      } catch {}
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") {
        // ensure restoration if unmounted mid-measure - best effort
      }
    };
  }, []);

  const [canvasReport, setCanvasReport] = useState<any>(null);

  const measureNow = () => {
    try {
      const report: any = {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        canvases: [],
      };
      const canvases = document.querySelectorAll("canvas");
      canvases.forEach((c, idx) => {
        const canvas = c as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();
        report.canvases.push({
          idx,
          buffer: { width: canvas.width, height: canvas.height },
          css: { width: Math.round(rect.width), height: Math.round(rect.height) },
          ratio: {
            w: rect.width > 0 ? canvas.width / rect.width : null,
            h: rect.height > 0 ? canvas.height / rect.height : null,
          },
        });
      });
      setCanvasReport(report);
    } catch (e) {
      setCanvasReport({ error: String(e) });
    }
  };

  return (
    <section
      className={cn(
        "min-h-screen py-12 transition-colors relative",
        theme === "dark" ? "dark bg-dark" : "bg-light",
        textureMode === "background-texture" ? "background-texture" : ""
      )}
    >
      {(textureMode === "shader-viewport") && (
        <div className="pointer-events-none fixed inset-0 z-0 h-screen w-screen">
          <ShaderFilmGrain
            paperColor={viewportBg}
            mode="shader-viewport"
            grainStrength={grainStrength}
            grainBias={grainBias}
            opacity={shaderOpacity}
          />
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">Lab / Artigo</h1>
          <p className="text-sm text-muted-foreground">
            Comparação de texturas no artigo de teste
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 border rounded-xs bg-background/80">
          <label className="flex flex-col gap-1 text-sm">
            <span>Textura</span>
            <select
              className="border rounded-xs px-2 py-1"
              value={textureMode}
              onChange={(e) => setTextureMode(e.target.value as TextureMode)}
            >
              <option value="none">nenhuma</option>
              <option value="background-texture">.background-texture</option>
              <option value="texture-noise">TextureOverlay noise</option>
              <option value="texture-papergrain">TextureOverlay paperGrain</option>
              <option value="grade">grade</option>
              <option value="pontos">pontos</option>
              <option value="shader-fundo">shader-fundo</option>
              <option value="shader-overlay">shader-overlay</option>
              <option value="shader-viewport">shader-viewport</option>
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span>Cor do papel</span>
            <select
              className="border rounded-xs px-2 py-1"
              value={paperPresetId}
              onChange={(e) => setPaperPresetId(e.target.value)}
            >
              {PAPER_PRESETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-sm">
            <span>Tema</span>
            <select
              className="border rounded-xs px-2 py-1"
              value={theme}
              onChange={(e) => setTheme(e.target.value as "light" | "dark")}
            >
              <option value="light">claro</option>
              <option value="dark">escuro</option>
            </select>
          </label>

          {(textureMode === "texture-noise" || textureMode === "texture-papergrain") ? (
            <label className="flex flex-col gap-1 text-sm">
              <span>Opacidade: {opacity.toFixed(2)}</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </label>
          ) : null}

          {(textureMode === "grade" || textureMode === "pontos") ? (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span>Opacidade: {opacity.toFixed(2)}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Tamanho da célula: {cellSize}px</span>
                <input
                  type="range"
                  min={4}
                  max={48}
                  step={1}
                  value={cellSize}
                  onChange={(e) => setCellSize(Number(e.target.value))}
                />
              </label>
            </>
          ) : null}

          {(textureMode === "shader-fundo" || textureMode === "shader-overlay" || textureMode === "shader-viewport") ? (
            <>
              <label className="flex flex-col gap-1 text-sm">
                <span>Strength: {grainStrength.toFixed(2)}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={grainStrength}
                  onChange={(e) => setGrainStrength(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Bias: {grainBias.toFixed(1)}</span>
                <input
                  type="range"
                  min={0}
                  max={4}
                  step={0.1}
                  value={grainBias}
                  onChange={(e) => setGrainBias(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                <span>Opacidade: {shaderOpacity.toFixed(2)}</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={shaderOpacity}
                  onChange={(e) => setShaderOpacity(Number(e.target.value))}
                />
              </label>
            </>
          ) : null}
        </div>

        <div className="text-xs font-mono p-3 border rounded-xs space-y-1 bg-background/80">
          <div className="font-bold">Depuração</div>
          <div>modo: {debugInfo.mode}</div>
          <div>papel: {debugInfo.paperColor}</div>
          <div>tema: {debugInfo.theme}</div>
          {debugInfo.opacity !== undefined && <div>opacidade: {debugInfo.opacity}</div>}
          {debugInfo.cellSize !== undefined && <div>tamanho_celula: {debugInfo.cellSize}px</div>}
          {debugInfo.grainStrength !== undefined && <div>strength: {debugInfo.grainStrength}</div>}
          {debugInfo.grainBias !== undefined && <div>bias: {debugInfo.grainBias}</div>}
          {debugInfo.shaderOpacity !== undefined && <div>shader_opacidade: {debugInfo.shaderOpacity}</div>}
          {debugInfo.deriveReadDesignCalled !== undefined && <div>deriveReadDesign_called: {String(debugInfo.deriveReadDesignCalled)}</div>}
          {debugInfo.textureStyle && <div>textureStyle: {JSON.stringify(debugInfo.textureStyle)}</div>}
          {debugInfo.overlay && <div>overlay: {JSON.stringify(debugInfo.overlay)}</div>}
          {debugInfo.shader && <div>shader: {JSON.stringify(debugInfo.shader)}</div>}
          {debugInfo.viewportBg && <div>viewport_bg: {debugInfo.viewportBg} (src:{debugInfo.viewportBgSource})</div>}
          <div className="flex gap-2 items-center mt-2">
            <button type="button" className="border px-2 py-1" onClick={measureRaf}>Medir rAF 2s</button>
            <button type="button" className="border px-2 py-1" onClick={measureNow}>Medir agora</button>
          </div>
          <div>rAF_tabela: {JSON.stringify(rafMap)}</div>
          <div>canvas_report: {JSON.stringify(canvasReport)}</div>
        </div>

        <article
          id="lab-article-paper"
          className="border border-foreground relative overflow-hidden transition-colors duration-300 isolate"
          style={{
            backgroundColor: paperColor || undefined,
          }}
        >
          {textureMode === "texture-noise" && (
            <TextureOverlay
              texture="noise"
              opacity={opacity}
              className="z-0"
            />
          )}
          {textureMode === "texture-papergrain" && (
            <TextureOverlay
              texture="paperGrain"
              opacity={opacity}
              className="z-0"
            />
          )}
          {(textureMode === "grade" || textureMode === "pontos") && readDesign && (
            <div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                ...readDesign.textureStyle,
                opacity: Math.max(0, Math.min(1, opacity)),
              }}
            />
          )}
          {(textureMode === "shader-fundo") && (
            <div className="absolute inset-0 h-full w-full pointer-events-none z-0" style={{ opacity: shaderOpacity }}>
              <ShaderFilmGrain
                paperColor={paperColorForShader}
                mode="shader-fundo"
                grainStrength={grainStrength}
                grainBias={grainBias}
                opacity={shaderOpacity}
              />
            </div>
          )}
          {(textureMode === "shader-overlay") && (
            <div
              className="absolute inset-0 h-full w-full pointer-events-none z-20"
              style={{ opacity: shaderOpacity, mixBlendMode: "overlay" }}
            >
              <ShaderFilmGrain
                paperColor={paperColorForShader}
                mode="shader-overlay"
                grainStrength={grainStrength}
                grainBias={grainBias}
                opacity={shaderOpacity}
              />
            </div>
          )}
          <div className="relative z-10">
            <ArticleSample />
          </div>
        </article>
      </div>
    </section>
  );
}
