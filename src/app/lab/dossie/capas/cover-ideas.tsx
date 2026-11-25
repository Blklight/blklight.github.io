import Link from "next/link";
import type { ReactNode } from "react";
import { BOARD_CLIP } from "@/components/dossier/dossier-cover";
import "@/components/dossier/dossier.css";
import { HoloSeal, TriangleStamp } from "@/components/stamps/org-stamps";
import { TRAIL_REACT } from "@/features/dossier/mock";
import { cn } from "@/lib/utils";

const T = TRAIL_REACT;
const DOCS = String(T.items.length).padStart(2, "0");
const PAPER = "bg-[oklch(0.94_0.012_85)] text-[oklch(0.2_0_0)]";
const BARCODE =
  "bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_4px,currentColor_4px_5px,transparent_5px_8px,currentColor_8px_11px,transparent_11px_12px)]";
const EAR_CLIP =
  "[clip-path:polygon(0_0,100%_0.85rem,100%_calc(100%-0.85rem),0_100%)]";

const SEAL = {
  name: "Blklight",
  handle: "blklight",
  city: "Arquivo",
  date: "",
  shortDate: T.code,
  ref: "Em curso",
  tagline: "",
  since: "",
  status: "Em curso",
};

/** Board + its ear, same material. */
function Board({
  className,
  earClassName,
  children,
}: {
  className: string;
  earClassName?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative mr-11 aspect-[680/880] w-full">
      <span
        aria-hidden
        className={cn(
          "absolute top-[4%] left-[calc(100%-1px)] h-[17%] w-11",
          EAR_CLIP,
          earClassName ?? className,
        )}
      />
      <div
        className={cn(
          "absolute inset-0 overflow-hidden shadow-[0_24px_48px_-20px_rgb(0_0_0/0.55)]",
          BOARD_CLIP,
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Label({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "background-texture p-4 font-mono text-xs uppercase shadow-[2px_3px_0_rgb(0_0_0/0.35)]",
        PAPER,
        className,
      )}
    >
      <div className="flex items-end justify-between border-b border-current pb-2">
        <span className="font-pixel text-4xl leading-none whitespace-nowrap">
          {T.code}
        </span>
        <span>N° {DOCS}</span>
      </div>
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 pt-2">
        <dt className="opacity-60">Título</dt>
        <dd>{T.title}</dd>
        <dt className="opacity-60">Status</dt>
        <dd>Em curso</dd>
      </dl>
      <div aria-hidden className={cn("mt-3 h-8", BARCODE)} />
    </div>
  );
}

const IDEAS: { name: string; note: string; cover: ReactNode }[] = [
  {
    name: "Etiqueta",
    note: "A atual: placa escura, etiqueta de papel com código e barras.",
    cover: (
      <Board className="dossier-board">
        <div className="flex h-full flex-col p-10 pl-12">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
            Blklight · Arquivo de estudo
          </p>
          <Label className="mt-6 w-[82%] -rotate-1" />
        </div>
      </Board>
    ),
  },
  {
    name: "Confidencial",
    note: "Pasta kraft, carimbo vermelho torto e fecho de botão com cordão.",
    cover: (
      <Board className="background-texture bg-[oklch(0.72_0.07_75)] text-[oklch(0.25_0.03_60)]">
        <div className="relative flex h-full flex-col p-10 pl-12 font-mono uppercase">
          <p className="text-[0.6rem] tracking-[0.25em]">
            Arquivo · Uso de leitura
          </p>
          <div className="mt-6 w-[70%] border-2 border-current p-3 text-sm">
            <p className="text-[0.6rem] opacity-70">Assunto</p>
            <p className="font-bold text-xl">{T.title}</p>
            <p className="mt-2 text-[0.6rem] opacity-70">Ref. {T.code}</p>
          </div>
          <p className="mt-16 -rotate-12 self-center border-4 border-[oklch(0.55_0.2_27)] px-4 py-1 text-4xl font-bold tracking-widest text-[oklch(0.55_0.2_27)] opacity-80 mix-blend-multiply">
            Confidencial
          </p>
          <div aria-hidden className="absolute right-12 bottom-14">
            <span className="block size-9 rounded-full border-2 border-[oklch(0.3_0.03_60)] bg-[oklch(0.6_0.05_70)] shadow-md" />
            <span className="absolute top-1/2 left-1/2 block h-0.5 w-40 origin-left -rotate-[150deg] bg-[oklch(0.85_0.02_80)]" />
          </div>
        </div>
      </Board>
    ),
  },
  {
    name: "Janela",
    note: "Recorte na capa mostra o título do primeiro documento por dentro.",
    cover: (
      <Board className="dossier-board">
        <div className="relative h-full p-10 pl-12">
          <span className="font-pixel text-6xl leading-none">{T.code}</span>
          <div className="absolute inset-x-12 top-[34%] h-[22%] overflow-hidden rounded-[2px] shadow-[inset_0_3px_8px_rgb(0_0_0/0.6)]">
            <div className={cn("background-texture h-full p-5", PAPER)}>
              <p className="font-mono text-[0.6rem] uppercase tracking-widest opacity-60">
                Doc. 01 · Fundamentos
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">
                Configurar Node no ambiente local
              </p>
            </div>
          </div>
          <p className="absolute bottom-10 left-12 font-mono text-[0.6rem] uppercase tracking-[0.2em] opacity-70">
            {T.title} · {DOCS} documentos
          </p>
        </div>
      </Board>
    ),
  },
  {
    name: "Selo",
    note: "Minimalista: só o selo holográfico grande e o código em relevo.",
    cover: (
      <Board className="dossier-board">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <HoloSeal data={SEAL} rotate={-6} className="w-56" />
          <p className="dossier-emboss font-mono text-sm uppercase tracking-[0.4em]">
            {T.code} · {T.title}
          </p>
        </div>
      </Board>
    ),
  },
  {
    name: "Divisórias",
    note: "Faixas verticais nas cores das seções, como a borda de um fichário.",
    cover: (
      <Board className="dossier-board">
        <div className="relative h-full">
          <div className="absolute inset-y-0 right-0 flex w-[30%]">
            {T.sections.map((s) => (
              <span
                key={s.id}
                className="background-texture flex-1"
                style={{ backgroundColor: s.color }}
              />
            ))}
          </div>
          <div className="p-10 pl-12">
            <p className="dossier-emboss font-pixel text-5xl leading-none">
              {T.code}
            </p>
            <ol className="mt-8 space-y-2 font-mono text-xs uppercase">
              {T.sections.map((s, i) => (
                <li key={s.id} className="flex gap-3">
                  <span className="opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Board>
    ),
  },
  {
    name: "Ficha técnica",
    note: "Placa clara, grade de campos e carimbo triangular em linha.",
    cover: (
      <Board className={cn("background-texture", PAPER)}>
        <div className="flex h-full flex-col p-10 pl-12 font-mono text-xs uppercase">
          <div className="grid grid-cols-2 border-2 border-current">
            {[
              ["No", `1/${DOCS}`],
              ["Código", T.code],
              ["Conteúdo", T.title],
              ["Status", "Em curso"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="border-current p-2 odd:border-r-2 [&:nth-child(-n+2)]:border-b-2"
              >
                <p className="text-[0.55rem] opacity-60">{k}</p>
                <p className="text-base font-bold">{v}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 tracking-[0.3em]">Contents // Leitura</p>
          <TriangleStamp
            data={SEAL}
            rotate={8}
            className="mt-auto w-32 self-end opacity-80"
          />
          <div aria-hidden className={cn("mt-4 h-8", BARCODE)} />
        </div>
      </Board>
    ),
  },
];

export function CoverIdeas() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Lab · Dossiê
          </p>
          <h1 className="text-4xl font-bold tracking-tight">Ideias de capa</h1>
        </div>
        <Link
          href="/lab/dossie"
          className="font-mono text-xs uppercase tracking-widest underline"
        >
          ← Voltar ao dossiê
        </Link>
      </div>
      <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {IDEAS.map((idea, i) => (
          <li key={idea.name}>
            {idea.cover}
            <p className="mt-4 font-mono text-xs uppercase tracking-widest">
              {String(i + 1).padStart(2, "0")} — {idea.name}
            </p>
            <p className="text-sm text-muted-foreground">{idea.note}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
