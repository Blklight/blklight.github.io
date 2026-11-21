import { useState } from "react";
import type { ShowcaseCategory } from "@/components/showcase/types";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AuroraText } from "@/components/ui/aurora-text";
import Book, {
  BookDescription,
  BookHeader,
  BookTitle,
} from "@/components/ui/book";
import { Button } from "@/components/ui/button";
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";
import { DitherShader } from "@/components/ui/dither-shader";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/components/ui/popover-form";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { TextAnimate } from "@/components/ui/text-animate";
import { TextureOverlay } from "@/components/ui/texture-overlay";

const ditherSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='320'%3E%3Cdefs%3E%3CradialGradient id='g' cx='50%25' cy='50%25'%3E%3Cstop offset='0' stop-color='white'/%3E%3Cstop offset='1' stop-color='black'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='480' height='320' fill='url(%23g)'/%3E%3C/svg%3E";

const _holoBackground =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='446'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%236d28d9'/%3E%3Cstop offset='1' stop-color='%23db2777'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='320' height='446' fill='url(%23g)'/%3E%3C/svg%3E";

const directionTabs = [
  {
    id: 0,
    label: "Visão geral",
    content: (
      <p className="text-muted-foreground text-sm">
        Transição direcional entre painéis com animação compartilhada.
      </p>
    ),
  },
  {
    id: 1,
    label: "Detalhes",
    content: (
      <p className="text-muted-foreground text-sm">
        O conteúdo acompanha a direção do movimento entre as abas.
      </p>
    ),
  },
  {
    id: 2,
    label: "Config",
    content: (
      <p className="text-muted-foreground text-sm">
        Ideal para painéis de configuração com pouco conteúdo.
      </p>
    ),
  },
];

const blurLines = [
  "Linha de conteúdo 1 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 2 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 3 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 4 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 5 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 6 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 7 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 8 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 9 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 10 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 11 para evidenciar o desfoque progressivo.",
  "Linha de conteúdo 12 para evidenciar o desfoque progressivo.",
].map((line) => (
  <p className="text-muted-foreground" key={line}>
    {line}
  </p>
));

const _pollOptions = [
  { id: "dark", label: "Modo escuro" },
  { id: "realtime", label: "Tempo real" },
  { id: "export", label: "Exportação" },
];

function AnimatedThemeTogglerDemo() {
  return (
    <div className="flex items-center gap-3">
      <AnimatedThemeToggler className="inline-flex size-9 items-center justify-center rounded-md border [&_svg]:size-4" />
      <span className="text-muted-foreground text-sm">
        Alterna o tema com transição de view.
      </span>
    </div>
  );
}

function AuroraTextDemo() {
  return <AuroraText className="font-bold text-4xl">Blklight</AuroraText>;
}

function BookDemo() {
  return (
    <Book>
      <BookHeader>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
          Novo
        </span>
      </BookHeader>
      <BookTitle>Design System</BookTitle>
      <BookDescription>
        72 componentes base-vega prontos para compor.
      </BookDescription>
    </Book>
  );
}

function DitherShaderDemo() {
  return (
    <DitherShader
      className="h-44 w-full overflow-hidden rounded-lg"
      colorMode="duotone"
      ditherMode="bayer"
      gridSize={1}
      primaryColor="#252525"
      secondaryColor="#eaeaea"
      src={ditherSrc}
      threshold={0.35}
    />
  );
}

function DirectionAwareTabsDemo() {
  return (
    <DirectionAwareTabs className="w-full max-w-md" tabs={directionTabs} />
  );
}

function ExpandableScreenDemo() {
  return (
    <ExpandableScreen>
      <ExpandableScreenTrigger>
        <Button variant="outline">Expandir</Button>
      </ExpandableScreenTrigger>
      <ExpandableScreenContent className="bg-background p-8">
        <h3 className="font-semibold text-xl">Conteúdo expandido</h3>
        <p className="mt-2 text-muted-foreground text-sm">
          O gatilho se transforma em uma tela cheia com animação compartilhada
          de layout.
        </p>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}

function PopoverFormDemo() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [note, setNote] = useState("");

  return (
    <PopoverForm
      open={open}
      setOpen={setOpen}
      showSuccess={showSuccess}
      title="Deixe um comentário"
      openChild={
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!note) {
              return;
            }
            setShowSuccess(true);
          }}
        >
          <div className="px-4 pt-4">
            <label
              className="mb-1 block font-medium text-muted-foreground text-sm"
              htmlFor="showcase-popover-form-note"
            >
              Comentário
            </label>
            <textarea
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2"
              id="showcase-popover-form-note"
              onChange={(event) => setNote(event.target.value)}
              rows={4}
              value={note}
            />
          </div>
          <div className="relative flex h-12 items-center px-[10px]">
            <PopoverFormSeparator />
            <div className="absolute top-0 left-0 -translate-x-[1.5px] -translate-y-1/2">
              <PopoverFormCutOutLeftIcon />
            </div>
            <div className="absolute top-0 right-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
              <PopoverFormCutOutRightIcon />
            </div>
            <PopoverFormButton loading={false} text="Enviar" />
          </div>
        </form>
      }
      successChild={
        <PopoverFormSuccess
          description="Obrigado pelo seu comentário!"
          title="Enviado"
        />
      }
    />
  );
}

function ProgressiveBlurDemo() {
  return (
    <div className="relative h-44 w-full overflow-hidden rounded-lg border">
      <div className="flex h-full flex-col gap-3 p-4 text-sm">{blurLines}</div>
      <ProgressiveBlur position="bottom" />
    </div>
  );
}

function TextAnimateDemo() {
  return (
    <TextAnimate
      className="font-semibold text-2xl"
      delay={0.1}
      text="Animação de texto por palavras"
      type="fadeInUp"
    />
  );
}

function TextureOverlayDemo() {
  return (
    <div className="relative h-40 w-full overflow-hidden rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
      <TextureOverlay className="mix-blend-overlay" texture="grid" />
      <span className="relative z-10 flex h-full items-center justify-center font-semibold text-white">
        Texture Overlay
      </span>
    </div>
  );
}

export const customCategory: ShowcaseCategory = {
  id: "custom",
  title: "Custom",
  items: [
    {
      slug: "animated-theme-toggler",
      name: "Animated Theme Toggler",
      demo: AnimatedThemeTogglerDemo,
    },
    { slug: "aurora-text", name: "Aurora Text", demo: AuroraTextDemo },
    { slug: "book", name: "Book", demo: BookDemo },
    { slug: "dither-shader", name: "Dither Shader", demo: DitherShaderDemo },
    {
      slug: "direction-aware-tabs",
      name: "Direction Aware Tabs",
      demo: DirectionAwareTabsDemo,
    },
    {
      slug: "expandable-screen",
      name: "Expandable Screen",
      demo: ExpandableScreenDemo,
    },
    { slug: "popover-form", name: "Popover Form", demo: PopoverFormDemo },
    {
      slug: "progressive-blur",
      name: "Progressive Blur",
      demo: ProgressiveBlurDemo,
    },
    { slug: "text-animate", name: "Text Animate", demo: TextAnimateDemo },
    {
      slug: "texture-overlay",
      name: "Texture Overlay",
      demo: TextureOverlayDemo,
    },
  ],
};
