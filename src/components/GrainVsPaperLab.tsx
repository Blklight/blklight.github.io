// components/GrainVsPaperLab.tsx
"use client";

import { Shader, FilmGrain, Paper, ImageTexture, Text } from "shaders/react";

const SAMPLE_IMAGE =
  "https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg";
// ou: '/sua-foto.jpg'

// cor do texto — troca se o tema for escuro
const INK = "#1a1510";
const MUTED = "#5c5348";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
        {title}
      </p>
      <div className="overflow-hidden rounded-xl border border-neutral-200/60 dark:border-neutral-700/60">
        {children}
      </div>
    </div>
  );
}

/** Bloco de tipografia: título + lead + corpo (micro artigo) */
function MicroArticle({
  ink = INK,
  muted = MUTED,
}: {
  ink?: string;
  muted?: string;
}) {
  return (
    <>
      <Text
        text="Notas de campo"
        fontFamily="Inter"
        fontWeight={600}
        fontSize={0.045}
        letterSpacing={0.08}
        textTransform="uppercase"
        color={muted}
        center={{ x: 0.5, y: 0.22 }}
      />
      <Text
        text="A textura que a tela esqueceu"
        fontFamily="Inter"
        fontWeight={700}
        fontSize={0.09}
        color={ink}
        center={{ x: 0.5, y: 0.38 }}
        width={0.85}
        textAlign="center"
        lineHeight={1.15}
      />
      <Text
        text="Entre o grão da emulsão e a fibra do papel, a interface ganha corpo sem precisar parecer um objeto físico. O olho lê ruído como presença."
        fontFamily="Inter"
        fontWeight={400}
        fontSize={0.032}
        color={muted}
        center={{ x: 0.5, y: 0.62 }}
        width={0.78}
        textAlign="center"
        lineHeight={1.45}
      />
    </>
  );
}

export default function GrainVsPaperLab() {
  return (
    <div className="mx-auto grid max-w-5xl gap-6 p-6 sm:grid-cols-2">
      {/* FilmGrain → imagem */}
      <Card title="FilmGrain → imagem">
        <Shader className="aspect-[4/3] w-full">
          <FilmGrain strength={0.25} bias={1.5} animated={false}>
            <ImageTexture url={SAMPLE_IMAGE} objectFit="cover" />
          </FilmGrain>
        </Shader>
      </Card>

      {/* Paper → imagem */}
      <Card title="Paper → imagem">
        <Shader className="aspect-[4/3] w-full">
          <Paper roughness={0.4} grainScale={1.2} displacement={0.12} seed={3}>
            <ImageTexture url={SAMPLE_IMAGE} objectFit="cover" />
          </Paper>
        </Shader>
      </Card>

      {/* FilmGrain → micro artigo (fundo transparente) */}
      <Card title="FilmGrain → texto">
        <Shader className="aspect-[4/3] w-full">
          <FilmGrain strength={0.35} bias={1.5} animated={false}>
            <MicroArticle />
          </FilmGrain>
        </Shader>
      </Card>

      {/* Paper → micro artigo (fundo transparente) */}
      <Card title="Paper → texto">
        <Shader className="aspect-[4/3] w-full">
          <Paper roughness={0.4} grainScale={1.2} displacement={0.12} seed={3}>
            <MicroArticle />
          </Paper>
        </Shader>
      </Card>
    </div>
  );
}
