"use client";

import { DigitalSignature } from "@/components/digital-signature";
import { DocumentFooter } from "@/components/document-related/document-footer";
import { DocumentHeader } from "@/components/document-related/document-header";

export function ArticleSample() {
  return (
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
          A jornada da IA moderna começou décadas atrás, mas foi a partir de
          2012 — com o advento do deep learning — que as coisas realmente
          aceleraram. Redes neurais profundas passaram a superar humanos em
          tarefas específicas como reconhecimento de imagem e tradução de
          texto.
        </p>

        <blockquote>
          "A IA não vai substituir humanos. Mas humanos que usam IA vão
          substituir humanos que não usam." — Autor desconhecido
        </blockquote>

        <h2>Aplicações práticas hoje</h2>

        <p>
          As aplicações são vastas e crescem a cada mês. Algumas das mais
          relevantes incluem:
        </p>

        <ul>
          <li>
            <strong>Saúde:</strong> diagnóstico de doenças por imagem com
            precisão superior à de radiologistas em alguns casos
          </li>
          <li>
            <strong>Educação:</strong> tutores personalizados que se adaptam
            ao ritmo de cada aluno
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
          Apesar de todo o avanço tecnológico, o elemento humano continua
          sendo insubstituível. Criatividade, empatia e julgamento ético são
          dimensões que os modelos atuais ainda não conseguem replicar com
          fidelidade. O papel do profissional moderno é saber orquestrar essas
          ferramentas de forma inteligente.
        </p>

        <p>
          Isso exige uma nova forma de pensar: não mais{" "}
          <em>"eu contra a máquina"</em>, mas{" "}
          <em>"eu com a máquina"</em>. A colaboração entre humano e IA tende a
          produzir resultados superiores ao de qualquer um dos dois
          isoladamente.
        </p>

        <h3>Competências para o futuro</h3>

        <ol>
          <li>
            Pensamento crítico e capacidade de questionar outputs da IA
          </li>
          <li>Comunicação clara para formular bons prompts e contextos</li>
          <li>Adaptabilidade diante de ferramentas em constante evolução</li>
        </ol>

        <h2>Conclusão</h2>

        <p>
          Estamos vivendo uma das transições tecnológicas mais rápidas da
          história. Ignorar a IA não é uma opção viável — compreendê-la e
          utilizá-la com consciência é o caminho. O futuro pertence a quem
          souber navegar esse novo cenário com curiosidade e responsabilidade.
        </p>

        <hr />

        <p>
          <small>
            Publicado em{" "}
            <time dateTime="2026-03-05">5 de março de 2026</time> · 4 min de
            leitura
          </small>
        </p>
      </div>
      <DigitalSignature signature="Lab Test" registry="LAB-001" timestamp={new Date().toISOString()} />
      <DocumentFooter />
    </div>
  );
}

export default ArticleSample;
