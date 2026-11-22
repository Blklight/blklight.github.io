"use client";

import { useState } from "react";
import { FONT_OPTIONS } from "@/components/document/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** Measures to test: phone, the 640px breakpoint where justification starts, the editor paper. */
const WIDTHS = [
  { id: "375", label: "375px · celular", className: "max-w-[375px]" },
  { id: "640", label: "640px · justifica", className: "max-w-[640px]" },
  { id: "720", label: "720px · papel", className: "max-w-[720px]" },
];

/** Same body as a real document: every block .doc-prose styles, in Portuguese for hyphenation. */
function Sample() {
  return (
    <>
      <h1>Sobre escrever devagar</h1>
      <p>
        Um texto pede tempo antes de pedir leitores. A primeira versão quase
        nunca é a melhor, e a pressa costuma esconder o que o autor queria
        dizer de verdade. Escrever devagar é dar espaço para a ideia
        amadurecer, para a frase encontrar o seu ritmo e para o parágrafo
        terminar onde precisa terminar.
      </p>
      <p>
        Isso não significa escrever pouco. Significa reler, cortar,
        reorganizar e, principalmente, desconfiar da primeira palavra que
        aparece. Paralelepípedo, inconstitucionalmente e
        desproporcionalmente são palavras longas que testam a hifenização.
      </p>
      <h2>O ritmo da leitura</h2>
      <p>
        Uma linha confortável tem entre 45 e 75 caracteres. Mais curta, o olho
        salta demais; mais longa, ele se perde no retorno. A entrelinha
        acompanha a medida: quanto mais longa a linha, mais ar ela pede.
      </p>
      <blockquote>
        <p>
          A tipografia existe para honrar o conteúdo. — Robert Bringhurst
        </p>
      </blockquote>
      <p>
        Depois de uma citação, o parágrafo volta sem recuo, como depois de um
        título. Os números 1234567890 aparecem no corpo do texto.
      </p>
      <h3>Listas e código</h3>
      <ul>
        <li>Recuo ou espaço entre parágrafos, nunca os dois.</li>
        <li>Justificar só com hifenização.</li>
        <li>Títulos com mais espaço acima do que abaixo.</li>
      </ul>
      <ol>
        <li>Escolha a fonte.</li>
        <li>Teste na medida real.</li>
        <li>Leia no celular.</li>
      </ol>
      <p>
        Um trecho de código inline, como <code>text-indent: 1.5em</code>, não
        pode quebrar a linha.
      </p>
      <pre>
        <code>{`.doc-prose p {\n  text-indent: 1.5em;\n}`}</code>
      </pre>
      <hr />
      <p>
        Depois do divisor, mais um parágrafo para conferir o espaço e o recuo
        zerado. Fim do exemplo.
      </p>
    </>
  );
}

/** Lab: the reading typography (.doc-prose) in every font and measure, side by side. */
export default function TypographyLabPage() {
  const [width, setWidth] = useState(WIDTHS[2].id);
  const [font, setFont] = useState<string | null>(null);
  const measure = WIDTHS.find((w) => w.id === width) ?? WIDTHS[2];
  const fonts = font
    ? FONT_OPTIONS.filter((f) => f.id === font)
    : FONT_OPTIONS;

  return (
    <div className="px-6 py-10 md:px-10">
      <h1 className="font-sans text-4xl font-bold tracking-tight">
        Tipografia de leitura
      </h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        A mesma classe <code className="font-mono text-sm">.doc-prose</code>{" "}
        do editor e da página publicada, em cada fonte e medida. Para a
        hifenização, use o Chrome ou o Firefox.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-6">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Fonte</legend>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Fonte
          </span>
          <Button
            size="sm"
            variant={font === null ? "default" : "outline"}
            aria-pressed={font === null}
            onClick={() => setFont(null)}
          >
            Todas
          </Button>
          {FONT_OPTIONS.map((option) => (
            <Button
              key={option.id}
              size="sm"
              variant={font === option.id ? "default" : "outline"}
              aria-pressed={font === option.id}
              onClick={() => setFont(option.id)}
              className={option.family}
            >
              {option.name}
            </Button>
          ))}
        </fieldset>
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">Medida</legend>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Medida
          </span>
          {WIDTHS.map((option) => (
            <Button
              key={option.id}
              size="sm"
              variant={width === option.id ? "default" : "outline"}
              aria-pressed={width === option.id}
              onClick={() => setWidth(option.id)}
            >
              {option.label}
            </Button>
          ))}
        </fieldset>
      </div>

      <div className="mt-10 flex gap-10 overflow-x-auto pb-6">
        {fonts.map((option) => (
          <section
            key={option.id}
            aria-label={option.name}
            className={cn("w-full shrink-0", measure.className)}
          >
            <h2 className="mb-4 border-b border-border pb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {option.name} · {option.id}
            </h2>
            <div className="rounded-xs border border-border bg-background p-6 md:p-8">
              <article lang="pt-BR" className={cn("doc-prose", option.family)}>
                <Sample />
              </article>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
