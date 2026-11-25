import Link from "next/link";
import type { ReactNode } from "react";
import { BOARD_CLIP } from "@/components/dossier/dossier-cover";
import "@/components/dossier/dossier.css";
import { HoloSeal, TriangleStamp } from "@/components/stamps/org-stamps";
import { ARTICLES_BY_ID, TRAIL_REACT } from "@/features/dossier/mock";
import { cn } from "@/lib/utils";

const T = TRAIL_REACT;
const DOCS = String(T.items.length).padStart(2, "0");
const READ = "04";
const MINUTES = T.items.reduce(
  (sum, it) => sum + (ARTICLES_BY_ID.get(it.articleId)?.readingTime ?? 0),
  0,
);
const PAPER = "bg-[oklch(0.94_0.012_85)] text-[oklch(0.2_0_0)]";
const KRAFT =
  "background-texture bg-[oklch(0.7_0.075_72)] text-[oklch(0.25_0.03_60)]";
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

/** Rubber stamp: the ink breaks up where the pad was dry. */
function ConfidentialStamp({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 280 86"
      className={cn("text-[oklch(0.5_0.19_27)] mix-blend-multiply", className)}
    >
      <filter id="conf-ink">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.7"
          numOctaves="2"
          seed="4"
        />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.4 1.75" />
        <feComposite in="SourceGraphic" operator="in" />
      </filter>
      <g
        filter="url(#conf-ink)"
        fill="currentColor"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        textAnchor="middle"
      >
        <rect
          x="3"
          y="3"
          width="274"
          height="80"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        />
        <text x="140" y="47" fontSize="28" letterSpacing="3">
          CONFIDENCIAL
        </text>
        <text x="140" y="69" fontSize="10" letterSpacing="1.5">
          USO RESTRITO · {T.code} · ARQUIVO
        </text>
      </g>
    </svg>
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
    note: "Kraft gasto nas bordas, etiqueta datilografada e grampeada, carimbo de borracha com falhas de tinta e ficha de protocolo.",
    cover: (
      <Board className={KRAFT}>
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_55%,rgb(60_35_10/0.35))]"
        />
        <div className="relative flex h-full flex-col p-10 pl-12 font-mono uppercase">
          <div className="flex justify-between text-[0.6rem] tracking-[0.25em]">
            <span>Arquivo · Uso interno</span>
            <span>Via 1/1</span>
          </div>
          <dl
            className={cn(
              "background-texture relative mt-6 grid w-[74%] rotate-[0.6deg] grid-cols-[5.5rem_1fr] text-[0.68rem] shadow-[1px_2px_0_rgb(0_0_0/0.25)]",
              PAPER,
            )}
          >
            {[
              ["Assunto", T.title],
              ["Ref.", T.code],
              ["Volume", `${DOCS} documentos`],
              ["Classif.", "Leitura restrita"],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="border-current/30 border-b px-2 py-1.5 opacity-60">
                  {k}
                </dt>
                <dd className="border-current/30 border-b border-l px-2 py-1.5 font-bold">
                  {v}
                </dd>
              </div>
            ))}
            {["left-3", "right-3"].map((x) => (
              <span
                key={x}
                aria-hidden
                className={cn(
                  "absolute -top-1 h-1 w-5 rounded-full bg-[linear-gradient(oklch(0.85_0_0),oklch(0.55_0_0))] shadow-[0_1px_1px_rgb(0_0_0/0.4)]",
                  x,
                )}
              />
            ))}
          </dl>
          <ConfidentialStamp className="mt-10 w-[64%] -rotate-[7deg] self-center" />
          <div
            className={cn(
              "background-texture mt-auto w-[56%] -rotate-[1.5deg] text-[0.58rem] shadow-[1px_2px_0_rgb(0_0_0/0.25)]",
              PAPER,
            )}
          >
            <p className="flex justify-between bg-[oklch(0.2_0_0)] px-2 py-1 text-[oklch(0.94_0.012_85)] tracking-[0.2em]">
              <span>Protocolo</span>
              <span>Nº 004/26</span>
            </p>
            <ol className="divide-y divide-current/20 px-2">
              {[
                ["12.11", "Recebido no arquivo", true],
                ["20.11", "Liberado à equipe", true],
                ["25.11", "Em leitura", false],
              ].map(([date, step, done]) => (
                <li key={String(date)} className="flex items-center gap-2 py-1">
                  <span className="opacity-60">{date}</span>
                  <span className="flex-1">{step}</span>
                  <span
                    aria-hidden
                    className="grid size-2.5 place-items-center border border-current text-[0.5rem] leading-none"
                  >
                    {done ? "×" : ""}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Board>
    ),
  },
  {
    name: "Selo",
    note: "Selo holográfico no centro de anéis gravados a seco na placa; código e lacre numerado em relevo.",
    cover: (
      <Board className="dossier-board">
        <div className="relative flex h-full flex-col items-center justify-center">
          {[22, 17, 12].map((r) => (
            <span
              key={r}
              aria-hidden
              className="absolute rounded-full shadow-[inset_0_1px_1px_rgb(0_0_0/0.6),0_1px_0_rgb(255_255_255/0.08)]"
              style={{ width: `${r}rem`, height: `${r}rem` }}
            />
          ))}
          <HoloSeal data={SEAL} rotate={-6} className="relative w-52" />
          <div className="absolute inset-x-12 bottom-10 font-mono text-[0.6rem] uppercase tracking-[0.3em]">
            <p className="dossier-emboss border-current/20 border-y py-3 text-center text-sm tracking-[0.4em]">
              {T.code} · {T.title}
            </p>
            <div className="mt-3 flex justify-between opacity-60">
              <span>Lacre Nº 004-2611</span>
              <span>{DOCS} docs</span>
            </div>
          </div>
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
            {T.sections.map((sec) => (
              <span
                key={sec.id}
                className="background-texture flex-1"
                style={{ backgroundColor: sec.color }}
              />
            ))}
          </div>
          <div className="p-10 pl-12">
            <p className="dossier-emboss font-pixel text-5xl leading-none">
              {T.code}
            </p>
            <ol className="mt-8 space-y-2 font-mono text-xs uppercase">
              {T.sections.map((sec, i) => (
                <li key={sec.id} className="flex gap-3">
                  <span className="opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {sec.title}
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
                <p className="font-bold text-base">{v}</p>
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
  {
    name: "Cartão perfurado",
    note: "Cartão de arquivo com uma coluna por documento: cada documento lido vira um furo.",
    cover: (
      <Board className="dossier-board">
        <div className="flex h-full flex-col p-10 pl-12 font-mono uppercase">
          <div className="flex items-end justify-between">
            <span className="dossier-emboss font-pixel text-5xl leading-none">
              {T.code}
            </span>
            <span className="text-[0.6rem] tracking-[0.2em] opacity-70">
              {T.title}
            </span>
          </div>
          <div
            className={cn(
              "background-texture mt-auto rotate-[-1deg] p-4 text-[0.55rem] shadow-[2px_3px_0_rgb(0_0_0/0.35)] [clip-path:polygon(1.25rem_0,100%_0,100%_100%,0_100%,0_1.25rem)]",
              PAPER,
            )}
          >
            <p className="flex justify-between pl-4 tracking-[0.2em]">
              <span>Cartão de leitura</span>
              <span>{READ}/{DOCS} perfurados</span>
            </p>
            <div className="mt-3 grid grid-cols-12 gap-x-1.5 border-current/30 border-t pt-2 text-center">
              {T.items.map((it, i) => (
                <div key={it.articleId} className="flex flex-col items-center gap-1">
                  <span className="opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {[0, 1, 2, 3, 4, 5].map((row) => (
                    <span
                      key={row}
                      aria-hidden
                      className={cn(
                        "h-2.5 w-1.5",
                        i < Number(READ) && row === i % 6
                          ? "bg-[oklch(0.2_0_0)] shadow-[inset_0_1px_1px_rgb(0_0_0/0.8)]"
                          : "text-[0.5rem] leading-none opacity-40",
                      )}
                    >
                      {i < Number(READ) && row === i % 6 ? "" : row}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Board>
    ),
  },
  {
    name: "Recibo",
    note: "Placa escura com um cupom térmico preso por fita: cada documento com seus minutos e o total da trilha.",
    cover: (
      <Board className="dossier-board">
        <div className="relative flex h-full justify-center pt-12">
          <div
            className={cn(
              "background-texture relative w-[62%] rotate-[1.5deg] self-start px-5 pt-6 pb-10 font-mono text-[0.58rem] uppercase shadow-[2px_4px_0_rgb(0_0_0/0.3)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-6px),95%_100%,90%_calc(100%-6px),85%_100%,80%_calc(100%-6px),75%_100%,70%_calc(100%-6px),65%_100%,60%_calc(100%-6px),55%_100%,50%_calc(100%-6px),45%_100%,40%_calc(100%-6px),35%_100%,30%_calc(100%-6px),25%_100%,20%_calc(100%-6px),15%_100%,10%_calc(100%-6px),5%_100%,0_calc(100%-6px))]",
              "bg-[oklch(0.97_0.004_90)] text-[oklch(0.25_0_0)]",
            )}
          >
            <p className="text-center font-bold text-sm tracking-[0.3em]">
              Blklight
            </p>
            <p className="text-center tracking-[0.2em] opacity-60">
              {T.code} · {T.title}
            </p>
            <ol className="mt-3 border-current/40 border-y border-dashed py-2">
              {T.items.slice(0, 7).map((it, i) => {
                const a = ARTICLES_BY_ID.get(it.articleId);
                return (
                  <li key={it.articleId} className="flex gap-2">
                    <span className="opacity-60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 truncate">{a?.title}</span>
                    <span>{a?.readingTime}min</span>
                  </li>
                );
              })}
              <li className="opacity-60">… +{T.items.length - 7} itens</li>
            </ol>
            <p className="mt-2 flex justify-between font-bold text-xs">
              <span>Total</span>
              <span>{MINUTES} min</span>
            </p>
            <div aria-hidden className={cn("mt-3 h-7", BARCODE)} />
          </div>
          <span
            aria-hidden
            className="absolute top-9 h-6 w-24 -rotate-[4deg] bg-[oklch(0.95_0.02_90/0.55)] shadow-[0_1px_2px_rgb(0_0_0/0.25)] backdrop-blur-[1px]"
          />
        </div>
      </Board>
    ),
  },
  {
    name: "Planta técnica",
    note: "Placa azul de desenho técnico com grade, cotas e carimbo de folha no canto.",
    cover: (
      <Board
        className="text-[oklch(0.95_0.02_240)]"
        earClassName="bg-[oklch(0.42_0.11_255)]"
      >
        <div className="relative h-full bg-[oklch(0.42_0.11_255)] bg-[linear-gradient(rgb(255_255_255/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:24px_24px] p-10 pl-12 font-mono uppercase">
          <p className="text-[0.6rem] tracking-[0.25em] opacity-80">
            Projeto de estudo · Escala 1:1
          </p>
          <svg
            aria-hidden
            viewBox="0 0 200 120"
            className="mt-8 w-[70%]"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          >
            <rect x="10" y="20" width="60" height="40" />
            <rect x="100" y="20" width="60" height="40" />
            <path d="M70 40 H100 M40 60 V95 H130 V60" />
            <path d="M10 10 H70 M10 7 V13 M70 7 V13" opacity="0.7" />
            <text x="32" y="8" fontSize="6" fill="currentColor" stroke="none">
              60
            </text>
          </svg>
          <div className="absolute right-8 bottom-8 grid w-[62%] grid-cols-[1fr_auto] border border-current text-[0.6rem]">
            <div className="border-current border-r border-b p-2">
              <p className="opacity-60">Projeto</p>
              <p className="font-bold text-base">{T.title}</p>
            </div>
            <div className="border-current border-b p-2">
              <p className="opacity-60">Folha</p>
              <p className="font-bold text-base">01/{DOCS}</p>
            </div>
            <div className="border-current border-r p-2">
              <p className="opacity-60">Código</p>
              <p className="font-bold">{T.code}</p>
            </div>
            <div className="p-2">
              <p className="opacity-60">Rev.</p>
              <p className="font-bold">A</p>
            </div>
          </div>
        </div>
      </Board>
    ),
  },
  {
    name: "Tipográfica",
    note: "Brutalismo controlado: número gigante cortado pela borda e um bloco de cor da trilha.",
    cover: (
      <Board className="dossier-board">
        <div className="relative h-full overflow-hidden p-10 pl-12">
          <span
            aria-hidden
            className="absolute -right-6 -bottom-16 font-bold text-[22rem] leading-none tracking-tighter opacity-90"
          >
            04
          </span>
          <div
            className="background-texture w-[55%] p-4 font-mono text-[0.65rem] text-[oklch(0.18_0_0)] uppercase"
            style={{ backgroundColor: T.sections[0].color }}
          >
            <p className="tracking-[0.25em]">Trilha</p>
            <p className="mt-6 font-bold text-3xl tracking-tight normal-case">
              {T.title}
            </p>
          </div>
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.25em] opacity-70">
            {T.code} / {DOCS} documentos / em curso
          </p>
        </div>
      </Board>
    ),
  },
  {
    name: "Fichário",
    note: "Furos de arquivo na lombada com reforço, e etiqueta vertical na borda como um arquivo morto.",
    cover: (
      <Board className={cn(KRAFT, "text-[oklch(0.22_0.03_60)]")}>
        <div className="relative h-full">
          <div className="absolute inset-y-0 left-8 flex flex-col justify-center gap-24">
            {[0, 1].map((h) => (
              <span
                key={h}
                aria-hidden
                className="grid size-9 place-items-center rounded-full bg-[oklch(0.85_0.01_85)] shadow-[0_1px_0_rgb(0_0_0/0.25)]"
              >
                <span className="size-4 rounded-full bg-[oklch(0.15_0_0)] shadow-[inset_0_2px_3px_rgb(0_0_0/0.8)]" />
              </span>
            ))}
          </div>
          <div
            className={cn(
              "background-texture absolute top-10 right-10 bottom-10 flex w-20 flex-col items-center justify-between border-2 border-current py-5 font-mono uppercase",
              PAPER,
            )}
          >
            <span className="font-bold text-2xl">04</span>
            <span className="font-bold text-lg tracking-[0.3em] [writing-mode:vertical-rl]">
              {T.title} · {T.code}
            </span>
            <span className="text-[0.55rem]">{DOCS} docs</span>
          </div>
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
