import type { Article, Heading, Stamp, Trail } from "./types";

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function hs(...items: (string | [string, 3])[]): Heading[] {
  return items.map((item) => {
    const [text, level] = typeof item === "string" ? [item, 2 as const] : item;
    return { id: slugify(text), text, level };
  });
}

type ArticleSeed = Omit<Article, "body"> & { stamp?: Stamp };

const SEEDS: ArticleSeed[] = [
  {
    id: "a-node-local",
    slug: "configurar-node-local",
    title: "Configurar Node no ambiente local",
    type: "lesson",
    readingTime: 9,
    tags: ["node", "ambiente"],
    headings: hs(
      "Por que um gerenciador de versões",
      ["Instalando o fnm", 3],
      ["Fixando a versão do projeto", 3],
      "Bun, npm e o lockfile",
      "Variáveis de ambiente",
      "Checklist final",
    ),
    stamp: { label: "Revisado", tone: "ok" },
  },
  {
    id: "a-jsx",
    slug: "jsx-sem-misterio",
    title: "JSX sem mistério",
    type: "lesson",
    readingTime: 7,
    tags: ["react", "jsx"],
    headings: hs(
      "O que o compilador faz",
      "Expressões e atributos",
      ["className e style", 3],
      "Fragments",
      "Listas e a prop key",
    ),
  },
  {
    id: "a-componentes",
    slug: "componentes-e-props",
    title: "Componentes e props",
    type: "lesson",
    readingTime: 11,
    tags: ["react", "props"],
    headings: hs(
      "Uma função que devolve interface",
      "Props como contrato",
      ["Tipando com TypeScript", 3],
      ["children", 3],
      "Composição antes de herança",
      "Quando quebrar um componente",
    ),
  },
  {
    id: "a-ex-cartao",
    slug: "exercicio-cartao-de-perfil",
    title: "Exercício: cartão de perfil",
    type: "exercise",
    readingTime: 15,
    tags: ["prática"],
    headings: hs(
      "Enunciado",
      "Requisitos",
      ["Acessibilidade", 3],
      "Dicas",
      "Gabarito comentado",
    ),
    stamp: { label: "Entregar", tone: "warn" },
  },
  {
    id: "a-usestate",
    slug: "estado-com-usestate",
    title: "Estado com useState",
    type: "lesson",
    readingTime: 10,
    tags: ["react", "hooks", "estado"],
    headings: hs(
      "Renderizar é tirar uma foto",
      "Atualizações em lote",
      ["Função atualizadora", 3],
      "Objetos e arrays imutáveis",
      "Estado derivado não é estado",
    ),
  },
  {
    id: "a-useeffect",
    slug: "voce-talvez-nao-precise-de-um-efeito",
    title: "Você talvez não precise de um efeito",
    type: "reference",
    readingTime: 13,
    tags: ["react", "hooks", "efeitos"],
    headings: hs(
      "Sincronizar com o mundo externo",
      "Casos em que o efeito sobra",
      ["Transformar dados para renderizar", 3],
      ["Responder a eventos", 3],
      "Limpeza e o modo estrito",
      "Buscando dados",
    ),
    stamp: { label: "Leitura obrigatória", tone: "danger" },
  },
  {
    id: "a-reducer",
    slug: "usereducer-na-pratica",
    title: "useReducer na prática",
    type: "lesson",
    readingTime: 12,
    tags: ["react", "estado"],
    headings: hs(
      "Do setState ao dispatch",
      "Escrevendo o reducer",
      ["Ações como eventos", 3],
      "Testando sem renderizar",
      "Contexto + reducer",
    ),
  },
  {
    id: "a-composicao",
    slug: "composicao-e-slots",
    title: "Composição e slots",
    type: "lesson",
    readingTime: 8,
    tags: ["react", "padrões"],
    headings: hs("children como slot", "Render props", "Compound components", [
      "Contexto privado",
      3,
    ]),
  },
  {
    id: "a-formularios",
    slug: "formularios-controlados",
    title: "Formulários controlados",
    type: "lesson",
    readingTime: 14,
    tags: ["react", "formulários"],
    headings: hs(
      "Controlado ou não controlado",
      "Validação no envio",
      ["Mensagens de erro acessíveis", 3],
      "Actions do React 19",
      "Quando usar uma biblioteca",
    ),
  },
  {
    id: "a-nota-memo",
    slug: "nota-sobre-memo",
    title: "Nota: memo, useMemo e o compilador",
    type: "note",
    readingTime: 4,
    tags: ["performance"],
    headings: hs(
      "O problema real",
      "O que o compilador resolve",
      "Regra prática",
    ),
  },
  {
    id: "a-query",
    slug: "dados-do-servidor-com-tanstack-query",
    title: "Dados do servidor com TanStack Query",
    type: "reference",
    readingTime: 16,
    tags: ["dados", "cache"],
    headings: hs(
      "Estado do servidor não é estado da tela",
      "Chaves de consulta",
      ["Invalidação", 3],
      ["Atualização otimista", 3],
      "Pré-busca",
      "Erros e tentativas",
    ),
  },
  {
    id: "a-ex-lista",
    slug: "exercicio-lista-de-tarefas",
    title: "Exercício: lista de tarefas com filtros",
    type: "exercise",
    readingTime: 20,
    tags: ["prática", "estado"],
    headings: hs("Enunciado", "Etapas", ["Bônus", 3], "Gabarito comentado"),
  },
  {
    id: "a-npm",
    slug: "pacotes-e-scripts",
    title: "Pacotes, scripts e o package.json",
    type: "lesson",
    readingTime: 8,
    tags: ["node", "npm"],
    headings: hs("O manifesto do projeto", "Dependências e semver", "Scripts"),
  },
  {
    id: "a-http",
    slug: "primeiro-servidor-http",
    title: "Primeiro servidor HTTP",
    type: "lesson",
    readingTime: 12,
    tags: ["node", "http"],
    headings: hs(
      "O módulo http",
      "Rotas na mão",
      ["Lendo o corpo da requisição", 3],
      "Respostas JSON",
    ),
  },
];

const PARAGRAPHS = [
  (t: string) =>
    `Antes de qualquer código, vale entender o problema que <strong>${t.toLowerCase()}</strong> resolve. A maior parte das dúvidas que aparecem depois vem de pular essa etapa e decorar a sintaxe sem o modelo mental por trás dela.`,
  () =>
    "Leia com calma e rode cada exemplo. A ideia não é acertar de primeira, e sim perceber o que muda na tela quando uma linha muda. Anote o que surpreender você: essas notas viram o seu próprio índice de revisão.",
  () =>
    "Em projetos reais as coisas raramente aparecem isoladas. Um detalhe de configuração afeta o build, o build afeta o deploy, e o deploy afeta quem usa. Por isso a trilha volta a alguns temas mais de uma vez, de ângulos diferentes.",
  () =>
    "Se algo parecer abstrato demais, pule para o exercício da seção e volte depois. Ler o código de outra pessoa e tentar explicá-lo em voz alta costuma ser mais útil do que reler a mesma explicação.",
];

const CODE = `<pre><code>// exemplo
function soma(a: number, b: number) {
  return a + b;
}

console.log(soma(2, 3)); // 5</code></pre>`;

const FIGURE = `<figure><img alt="Diagrama em grade ilustrando o fluxo descrito no texto" src="data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 280"><rect width="640" height="280" fill="#e9e6df"/><g stroke="#1a1a1a" stroke-opacity=".15">' +
    Array.from(
      { length: 16 },
      (_, i) => `<line x1="${i * 40}" y1="0" x2="${i * 40}" y2="280"/>`,
    ).join("") +
    Array.from(
      { length: 7 },
      (_, i) => `<line x1="0" y1="${i * 40}" x2="640" y2="${i * 40}"/>`,
    ).join("") +
    '</g><g fill="none" stroke="#1a1a1a" stroke-width="2"><rect x="60" y="100" width="140" height="80"/><rect x="250" y="100" width="140" height="80"/><rect x="440" y="100" width="140" height="80"/><path d="M200 140h50M390 140h50"/></g></svg>',
)}"/><figcaption>Figura — o fluxo em três etapas.</figcaption></figure>`;

const LIST =
  "<ul><li>Leia o enunciado inteiro antes de começar.</li><li>Faça funcionar, depois deixe bonito.</li><li>Escreva um teste para o caso que mais quebrou.</li></ul>";

function buildBody(seed: ArticleSeed): string {
  const extras = [CODE, FIGURE, LIST];
  const parts: string[] = [`<p>${PARAGRAPHS[0](seed.title)}</p>`];
  seed.headings.forEach((h, i) => {
    parts.push(`<h${h.level} id="${h.id}">${h.text}</h${h.level}>`);
    const count = h.level === 2 ? 3 : 2;
    for (let p = 0; p < count; p++) {
      parts.push(
        `<p>${PARAGRAPHS[(i + p + 1) % PARAGRAPHS.length](seed.title)}</p>`,
      );
    }
    if (i < extras.length) parts.push(extras[i]);
  });
  return parts.join("\n");
}

export const ARTICLES: Article[] = SEEDS.map(({ stamp: _stamp, ...a }) => a);

export const ARTICLE_STAMPS: Record<string, Stamp> = Object.fromEntries(
  SEEDS.flatMap((s) => (s.stamp ? [[s.id, s.stamp]] : [])),
);

export const ARTICLES_BY_ID: ReadonlyMap<string, Article> = new Map(
  ARTICLES.map((a) => [a.id, a]),
);

/** Kept apart from ARTICLES: the body only ever arrives through loadArticleBody. */
export const ARTICLE_BODIES: Record<string, string> = Object.fromEntries(
  SEEDS.map((s) => [s.id, buildBody(s)]),
);

export const TRAIL_REACT: Trail = {
  id: "t-react",
  slug: "react",
  code: "TRL-004",
  title: "React",
  status: "active",
  sections: [
    { id: "s-base", title: "Fundamentos", color: "oklch(0.72 0.15 250)" },
    { id: "s-estado", title: "Estado e efeitos", color: "oklch(0.75 0.16 60)" },
    { id: "s-padroes", title: "Padrões", color: "oklch(0.7 0.14 150)" },
    { id: "s-dados", title: "Dados", color: "oklch(0.68 0.17 330)" },
  ],
  items: [
    {
      articleId: "a-node-local",
      order: 1,
      sectionId: "s-base",
      intro:
        "Antes do React, deixe o ambiente pronto. Se já usa Node, só confira a versão.",
    },
    { articleId: "a-jsx", order: 2, sectionId: "s-base" },
    { articleId: "a-componentes", order: 3, sectionId: "s-base" },
    {
      articleId: "a-ex-cartao",
      order: 4,
      sectionId: "s-base",
      intro: "Primeiro exercício: use só props, sem estado.",
    },
    { articleId: "a-usestate", order: 5, sectionId: "s-estado" },
    { articleId: "a-useeffect", order: 6, sectionId: "s-estado" },
    { articleId: "a-reducer", order: 7, sectionId: "s-estado" },
    { articleId: "a-composicao", order: 8, sectionId: "s-padroes" },
    { articleId: "a-formularios", order: 9, sectionId: "s-padroes" },
    { articleId: "a-nota-memo", order: 10, sectionId: "s-padroes" },
    { articleId: "a-query", order: 11, sectionId: "s-dados" },
    { articleId: "a-ex-lista", order: 12, sectionId: "s-dados" },
  ],
};

export const TRAIL_NODE: Trail = {
  id: "t-node",
  slug: "node-basico",
  code: "TRL-002",
  title: "Node básico",
  status: "completed",
  sections: [
    { id: "n-amb", title: "Ambiente", color: "oklch(0.72 0.15 140)" },
    { id: "n-srv", title: "Servidor", color: "oklch(0.7 0.12 40)" },
  ],
  items: [
    {
      articleId: "a-node-local",
      order: 1,
      sectionId: "n-amb",
      intro: "Aqui o foco é o Node em si; a parte de Bun é opcional.",
    },
    { articleId: "a-npm", order: 2, sectionId: "n-amb" },
    { articleId: "a-http", order: 3, sectionId: "n-srv" },
  ],
};

export const TRAILS: Trail[] = [TRAIL_REACT, TRAIL_NODE];
