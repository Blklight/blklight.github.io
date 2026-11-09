"use client";
import { useState } from "react";
import { DigitalSignature } from "@/components/digital-signature";
import { DocumentFooter } from "@/components/document-related/document-footer";
import { DocumentHeader } from "@/components/document-related/document-header";
import { LoginForm } from "@/components/forms/auth/login-form";
import { RegisterForm } from "@/components/forms/auth/register-form";
import { MediaView } from "@/components/media-view";
import { Card } from "@/components/ui/card";
import { CornerFrame, CornerMarkers } from "@/components/ui/corner-frame";
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  PopoverForm,
  PopoverFormButton,
  PopoverFormCutOutLeftIcon,
  PopoverFormCutOutRightIcon,
  PopoverFormSeparator,
  PopoverFormSuccess,
} from "@/components/ui/popover-form";
import { Textarea } from "@/components/ui/textarea";
import { TextureOverlay } from "@/components/ui/texture-overlay";

type FormState = "idle" | "loading" | "success";

import {
  Halftone,
  ImageTexture,
  Paper,
  Shader,
  SolidColor,
} from "shaders/react";

export default function ExamplesPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit() {
    setFormState("loading");
    setTimeout(() => {
      setFormState("success");
    }, 1500);
    setTimeout(() => {
      setOpen(false);
      setFormState("idle");
      setName("");
      setEmail("");
      setMessage("");
    }, 3300);
  }

  const tabs = [
    {
      id: 0,
      label: "Login",
      content: <LoginForm />,
    },
    {
      id: 1,
      label: "Register",
      content: <RegisterForm />,
    },
  ];

  return (
    <section className="bg-light book:bg-sepia dark:bg-dark rounded-xs relative z-0">
      <TextureOverlay texture={"grid"} className="mix-blend-overlay" />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-9xl font-pixel-circle mb-2">Examples</h1>
        <div className="flex flex-col gap-2">
          <Card className="relative z-1 rounded-xs p-0 border-dark dark:border-light">
            <TextureOverlay
              texture={"dots"}
              opacity={0.5}
              className="-z-1 bg-center"
            />
            <div id="article-test" className="p-8">
              <DocumentHeader department="Departamento de Gestão de Ativos Especiais" />
              <div className="prose dark:prose-invert font-mono py-5">
                <h1>O Futuro da Inteligência Artificial no Cotidiano</h1>

                <p>
                  Nos últimos anos, a inteligência artificial deixou de ser um
                  conceito de ficção científica para se tornar parte integral do
                  nosso dia a dia. De assistentes virtuais a sistemas de
                  recomendação, a IA está presente em praticamente todos os
                  aspectos da vida moderna.
                </p>

                <h2>Como chegamos até aqui</h2>

                <p>
                  A jornada da IA moderna começou décadas atrás, mas foi a
                  partir de 2012 — com o advento do deep learning — que as
                  coisas realmente aceleraram. Redes neurais profundas passaram
                  a superar humanos em tarefas específicas como reconhecimento
                  de imagem e tradução de texto.
                </p>

                <blockquote>
                  "A IA não vai substituir humanos. Mas humanos que usam IA vão
                  substituir humanos que não usam." — Autor desconhecido
                </blockquote>

                <h2>Aplicações práticas hoje</h2>

                <p>
                  As aplicações são vastas e crescem a cada mês. Algumas das
                  mais relevantes incluem:
                </p>

                <ul>
                  <li>
                    <strong>Saúde:</strong> diagnóstico de doenças por imagem
                    com precisão superior à de radiologistas em alguns casos
                  </li>
                  <li>
                    <strong>Educação:</strong> tutores personalizados que se
                    adaptam ao ritmo de cada aluno
                  </li>
                  <li>
                    <strong>Produtividade:</strong> geração de código, textos e
                    análises em segundos
                  </li>
                  <li>
                    <strong>Transporte:</strong> otimização de rotas e veículos
                    autônomos em fase de expansão
                  </li>
                </ul>

                <h2>O lado humano da equação</h2>

                <p>
                  Apesar de todo o avanço tecnológico, o elemento humano
                  continua sendo insubstituível. Criatividade, empatia e
                  julgamento ético são dimensões que os modelos atuais ainda não
                  conseguem replicar com fidelidade. O papel do profissional
                  moderno é saber orquestrar essas ferramentas de forma
                  inteligente.
                </p>

                <p>
                  Isso exige uma nova forma de pensar: não mais{" "}
                  <em>"eu contra a máquina"</em>, mas{" "}
                  <em>"eu com a máquina"</em>. A colaboração entre humano e IA
                  tende a produzir resultados superiores ao de qualquer um dos
                  dois isoladamente.
                </p>

                <h3>Competências para o futuro</h3>

                <ol>
                  <li>
                    Pensamento crítico e capacidade de questionar outputs da IA
                  </li>
                  <li>
                    Comunicação clara para formular bons prompts e contextos
                  </li>
                  <li>
                    Adaptabilidade diante de ferramentas em constante evolução
                  </li>
                </ol>

                <h2>Conclusão</h2>

                <p>
                  Estamos vivendo uma das transições tecnológicas mais rápidas
                  da história. Ignorar a IA não é uma opção viável —
                  compreendê-la e utilizá-la com consciência é o caminho. O
                  futuro pertence a quem souber navegar esse novo cenário com
                  curiosidade e responsabilidade.
                </p>

                <hr />

                <p>
                  <small>
                    Publicado em{" "}
                    <time dateTime="2026-03-05">5 de março de 2026</time> · 4
                    min de leitura
                  </small>
                </p>
              </div>
              <DigitalSignature
                signature="Ultimate Mercer"
                registry="@ultimatemercer"
                timestamp={Date.now()}
              />
              <DocumentFooter />
            </div>
          </Card>

          {/* Seção de Demonstração: CornerFrame & CornerMarkers */}
          <div id="corner-frame-showcase" className="my-8 flex flex-col gap-6">
            <div className="border-b border-border pb-2">
              <h2 className="text-2xl font-mono font-bold tracking-tight">
                CornerFrame &amp; CornerMarkers
              </h2>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                Componentes de cantos técnicos e frames desacoplados do
                digital-signature, utilizáveis em qualquer lugar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Default Style (Clean / Flat) */}
              <CornerFrame className="p-6 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    [01] Estilo Padrão (Clean)
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-xs border border-border text-muted-foreground">
                    withTexture: false
                  </span>
                </div>
                <h3 className="font-mono text-base font-bold">Default Frame</h3>
                <p className="text-xs text-muted-foreground">
                  Fundo limpo e suave sem ruído por padrão. A textura só é
                  adicionada quando solicitada explicitamente.
                </p>
              </CornerFrame>

              {/* 2. Cyberpunk / Themed Style com Textura Ativada */}
              <CornerFrame
                color="#f97316"
                background="#0c0a09"
                withTexture
                cornerSize="sm"
                className="p-6 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-500">
                    [02] Themed &amp; Texture
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-xs border border-orange-500/40 text-orange-400">
                    withTexture: true
                  </span>
                </div>
                <h3 className="font-mono text-base font-bold text-orange-400">
                  Laranja + Textura Tátil
                </h3>
                <p className="text-xs text-orange-300/80">
                  Adiciona a classe .background-texture pontualmente apenas
                  neste bloco de destaque.
                </p>
              </CornerFrame>

              {/* 3. Terminal Green HUD */}
              <CornerFrame
                color="#10b981"
                cornerSize="lg"
                cornerThickness={2}
                cornerOpacity={0.8}
                className="p-6 flex flex-col gap-2 font-mono"
              >
                <span className="text-[10px] uppercase tracking-wider text-emerald-500">
                  [03] HUD Terminal (Size: LG)
                </span>
                <h3 className="text-base font-bold text-emerald-400">
                  Cantos Grandes (32px)
                </h3>
                <p className="text-xs text-emerald-300/80">
                  Ideal para painéis de monitoramento, logs ou blocos de código
                  com cantos destacados.
                </p>
              </CornerFrame>

              {/* 4. Diagonal Corners + Custom Offset */}
              <CornerFrame
                color="#38bdf8"
                corners={["tl", "br"]}
                cornerSize={28}
                cornerThickness={3}
                cornerOffset={-4}
                withBackground={false}
                className="p-6 flex flex-col gap-2 border border-sky-500/30 font-mono"
              >
                <span className="text-[10px] uppercase tracking-wider text-sky-400">
                  [04] Cantos Diagonais &amp; Offset Negativo
                </span>
                <h3 className="text-base font-bold text-sky-300">
                  Offset -4px (Extrapolação)
                </h3>
                <p className="text-xs text-sky-200/70">
                  Apenas cantos superior esquerdo e inferior direito, projetados
                  levemente para fora da borda.
                </p>
              </CornerFrame>
            </div>

            {/* 5. Standalone CornerMarkers inside an existing complex card */}
            <div className="relative border border-dashed border-border p-6 rounded-xs bg-secondary/10 flex flex-col gap-3 font-mono">
              <CornerMarkers
                color="#a855f7"
                cornerSize="xs"
                cornerThickness={1.5}
                cornerOpacity={0.7}
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-purple-400">
                  [05] CornerMarkers Standalone
                </span>
                <span className="text-[10px] text-muted-foreground">
                  Injetado em container nativo
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                O componente{" "}
                <code className="text-purple-400">&lt;CornerMarkers /&gt;</code>{" "}
                pode ser colocado diretamente dentro de qualquer elemento com{" "}
                <code className="text-purple-400">relative</code>, sem alterar
                sua hierarquia de divs.
              </p>
            </div>

            {/* 6. Novos tamanhos Micro ("2xs", "xs") e Custom livre/assimétrico */}
            <div className="flex flex-col gap-3 p-5 border border-border rounded-xs bg-muted/5 font-mono">
              <span className="text-[10px] uppercase tracking-wider text-foreground/40">
                [06] Micro Tamanhos &amp; Dimensões Customizadas
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {/* 2xs (8px) */}
                <CornerFrame
                  cornerSize="2xs"
                  color="#ec4899"
                  className="p-3 text-center"
                >
                  <span className="text-[10px] font-bold text-pink-400 block">
                    Preset &quot;2xs&quot; (8px)
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    Auto-espessura 1px
                  </span>
                </CornerFrame>

                {/* xs (12px) */}
                <CornerFrame
                  cornerSize="xs"
                  color="#eab308"
                  className="p-3 text-center"
                >
                  <span className="text-[10px] font-bold text-yellow-400 block">
                    Preset &quot;xs&quot; (12px)
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    Sutil e elegante
                  </span>
                </CornerFrame>

                {/* Número livre em px: cornerSize={6} */}
                <CornerFrame
                  cornerSize={6}
                  cornerThickness={1}
                  color="#06b6d4"
                  className="p-3 text-center"
                >
                  <span className="text-[10px] font-bold text-cyan-400 block">
                    Custom 6px
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    cornerSize=&#123;6&#125;
                  </span>
                </CornerFrame>

                {/* Assimétrico [width, height]: cornerSize={[24, 8]} */}
                <CornerFrame
                  cornerSize={[24, 8]}
                  color="#84cc16"
                  className="p-3 text-center"
                >
                  <span className="text-[10px] font-bold text-lime-400 block">
                    Assimétrico [24, 8]
                  </span>
                  <span className="text-[9px] text-muted-foreground">
                    Estilo HUD retangular
                  </span>
                </CornerFrame>
              </div>
            </div>
          </div>
        </div>
        {/* <div id="action-cards">
          <ActionCardProvider>
            <div className="mb-5">
              <h2 className="text-2xl font-bold mb-4">Estilos Default</h2>
              <motion.div
                variants={gridVariants}
                initial="initial"
                animate="in"
                className="grid grid-cols-2 gap-4"
              >
                <ActionCardWrapper variants="card">
                  <ActionCard id="default-1" actionLabel="Ação">
                    <ActionCardHeader badge="Default" title="Card Padrão" />
                    <ActionCardContent description="Este card usa o estilo default automático" />
                  </ActionCard>
                </ActionCardWrapper>

                <ActionCardWrapper variants="card">
                  <ActionCard id="default-2" flip>
                    <ActionCardContent>
                      <ActionCardHeader badge="Default" title="Flip Padrão" />
                      <ActionCardContent description="Flip com estilo default" />
                    </ActionCardContent>
                    <ActionCardContent back>
                      <p>Conteúdo do verso com estilo default</p>
                    </ActionCardContent>
                  </ActionCard>
                </ActionCardWrapper>
              </motion.div>
            </div>

            <motion.div
              variants={gridVariants}
              initial="initial"
              animate="in"
              className="grid grid-cols-2 gap-4 mb-5"
            >
              {ContentTools.map((tool) => (
                <ActionCardWrapper key={tool.id} variants="card">
                  <ActionCard
                    id={tool.id}
                    url={tool.url}
                    styles={tool.styles}
                    actionLabel={tool.title}
                  >
                    <ActionCardHeader badge="Conteúdo" title={tool.title} />
                    <ActionCardContent description={tool.description} />
                  </ActionCard>
                </ActionCardWrapper>
              ))}
            </motion.div>

            <motion.div
              variants={gridVariants}
              initial="initial"
              animate="in"
              className="grid grid-cols-2 gap-4"
            >
              {ManagementTools.map((tool) => (
                <ActionCardWrapper key={tool.id} variants="card">
                  <ActionCard id={tool.id} flip styles={tool.styles}>
                    <ActionCardContent>
                      <ActionCardHeader
                        badge="Gerenciamento"
                        title={tool.title}
                      />
                      <ActionCardContent description={tool.description} />
                    </ActionCardContent>
                    <ActionCardContent back>
                      <div className="p-4">
                        <h2 className="text-xl font-semibold mb-4">
                          Conteúdo do verso
                        </h2>
                        <p className="mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris.
                        </p>
                        <div className="space-y-2">
                          <p>• Informações detalhadas</p>
                          <p>• Formulários</p>
                          <p>• Configurações</p>
                          <p>• Qualquer outro conteúdo</p>
                        </div>
                      </div>
                    </ActionCardContent>
                  </ActionCard>
                </ActionCardWrapper>
              ))}
            </motion.div>
          </ActionCardProvider>
        </div> */}
        <div className="flex  w-full items-center justify-center my-4">
          <PopoverForm
            title="Click Here"
            open={open}
            setOpen={setOpen}
            width="364px"
            height="372px"
            showCloseButton={formState !== "success"}
            showSuccess={formState === "success"}
            openChild={
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!name || !email || !message) return;
                  submit();
                }}
                className=" space-y-4"
              >
                <div className="px-4 pt-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-black"
                    required
                  />
                </div>
                <div className="px-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-black"
                    required
                  />
                </div>
                <div className="px-4">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-black"
                    rows={3}
                    required
                  />
                </div>
                <div className="relative flex h-12 items-center px-[10px]">
                  <PopoverFormSeparator />
                  <div className="absolute left-0 top-0 -translate-x-[1.5px] -translate-y-1/2">
                    <PopoverFormCutOutLeftIcon />
                  </div>
                  <div className="absolute right-0 top-0 translate-x-[1.5px] -translate-y-1/2 rotate-180">
                    <PopoverFormCutOutRightIcon />
                  </div>
                  <PopoverFormButton
                    loading={formState === "loading"}
                    text="Submit"
                  />
                </div>
              </form>
            }
            successChild={
              <PopoverFormSuccess
                title="Message Sent"
                description="Thank you for contacting us. We'll get back to you soon!"
              />
            }
          />
        </div>
        <div className="my-5">
          <div className="flex flex-col border border-dark p-8 bg-blklight-500 rounded-xs background-texture">
            <FieldGroup>
              <Field>
                <Input
                  type="text"
                  placeholder="Titulo ..."
                  className="font-mono bg-dark/10 border-0 rounded-xs! h-14 text-xl! text-dark! dark:text-dark! placeholder:text-dark/50 dark:placeholder:text-dark/50 focus-visible:ring-none focus-visible:ring-offset-0 focus-visible:ring-transparent"
                  required
                />
              </Field>
              <Field>
                <FieldLabel id="content" className="">
                  Conteúdo
                </FieldLabel>
                <Textarea
                  id="content"
                  placeholder="Digite o conteúdo do documento aqui..."
                  className="font-mono bg-dark/10 border-0 h-32 text-base! text-dark! dark:text-dark! placeholder:text-dark/50 dark:placeholder:text-dark/50"
                  required
                />
              </Field>
            </FieldGroup>
          </div>
        </div>
        <div className="my-5">
          <LoginForm />
          <RegisterForm />
        </div>
        <div className="w-full">
          <DirectionAwareTabs className="w-full flex" tabs={tabs} />
        </div>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold">Header test</h1>
        <div className="">
          <MediaView pattern="noisy" className="flex w-full h-150 ">
            <div className="bg-blue-500 w-full h-full">
              {/* biome-ignore lint/performance/noImgElement: arbitrary external URL (user cover/avatar or demo asset); next/image would need remotePatterns for every host */}
              <img
                src="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="bg-green-500 w-full h-full"></div>
            <div className="absolute inset-0 p-4">
              <div className="flex flex-col justify-end items-center h-full">
                <h2 className="text-4xl font-bold text-white mb-4">
                  <span className="marker-line bg-green-500 py-1!">Test</span>
                </h2>
              </div>
            </div>
          </MediaView>
        </div>
        <div className="bg-muted h-10"></div>

        <div className="pattern-noisy relative flex w-full h-162.5 overflow-hidden">
          {/* Lado Esquerdo - Imagem com fundo azul */}
          <div className="bg-blue-500 w-1/2 h-full">
            {/* biome-ignore lint/performance/noImgElement: arbitrary external URL (user cover/avatar or demo asset); next/image would need remotePatterns for every host */}
            <img
              src="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
          </div>

          {/* Lado Direito - Verde */}
          <div className="bg-background w-1/2 h-full"></div>

          {/* Conteúdo sobreposto (Texto, botões, etc.) */}
          <div className="absolute inset-0 p-4 pb-24">
            <div className="flex flex-col justify-end items-center h-full">
              <h2 className="text-4xl font-bold  mb-4">
                <span className="marker-line bg-background py-1!">Test</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="relative bg-muted h-20 p-8 rounded-t-[64px] -mt-16 z-11 mb-20 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.3)]">
          <h5 className="text-sm font-bold ">
            Pelotas, 06 de Outubro de 2026, 16h27
          </h5>
        </div>
      </div>
      <div className="">
        <Shader className="w-full max-w-2xl aspect-[3/2]">
          <Halftone
            style="cmyk"
            frequency={50}
            misprint={0.003}
            paperColor="#f5f0e8"
          >
            <ImageTexture
              url="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
              objectFit="cover"
            />
          </Halftone>
        </Shader>
        <div className="max-w-2xl">
          <Shader className="w-full h-200  aspect-4/3">
            {/* <Halftone style="cmyk" frequency={90}>
            <ImageTexture
              url="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
              objectFit="cover"
            />
          </Halftone> */}
            {/* <Halftone style="cmyk" frequency={70} misprint={0.003}>
            <Paper roughness={0.4}>
              <ImageTexture
                url="https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
                objectFit="cover"
              />
            </Paper>
          </Halftone> */}

            {/* <FilmGrain strength={0.25} bias={1.5}> */}
            {/* <Glitch
                intensity={0.15}
                speed={0.8}
                rgbShift={3}
                blockDensity={8}
              > */}
            {/* <VHS wobble={0.6} scanlineNoise={0.35} smear={0.15} speed={0.8}> */}
            {/* <ImageTexture
                url={
                  "https://ultimatemercer.com/Ultimate/dist/ex-img/kiernan-eps.jpg"
                }
                objectFit="cover"
              /> */}
            {/* </VHS> */}
            {/* </Glitch> */}
            {/* </FilmGrain> */}
            <Paper
              roughness={0.35}
              grainScale={1.2} // >1 = grão mais fino
              displacement={0.12}
              seed={7}
            >
              {/* fundo da página */}
              <SolidColor color="#f5f0e6" />
              {/* ou: <ImageTexture url="/bg.jpg" objectFit="cover" /> */}
            </Paper>
          </Shader>
        </div>
      </div>
    </section>
  );
}
