// Dev only: fills the local feed with varied published documents so the feed
// layout can be designed against realistic data. Idempotent by title per author.
const API = process.env.API_URL ?? "http://localhost:4000";
const PASSWORD = "Feed#2026seed";

type Doc = {
  title: string;
  type: "article" | "tutorial" | "contract" | "project" | "note";
  abstract?: string;
  cover?: string;
  typography?: "sans" | "serif" | "mono";
  paper?: { presetId: string; bg: string; text: string };
  texture?: "dots" | "grid" | "none";
  category: string;
  tags?: string[];
};

const PAPERS = {
  kraft: { presetId: "kraft", bg: "#D7CCC8", text: "#1A1A1A" },
  pink: { presetId: "pink", bg: "#F48FB1", text: "#1A1A1A" },
  sky: { presetId: "sky", bg: "#4FC3F7", text: "#1A1A1A" },
  yellow: { presetId: "yellow", bg: "#FFEB3B", text: "#1A1A1A" },
};

const cover = (seed: string) => `https://picsum.photos/seed/${seed}/1200/800`;

const AUTHORS: { username: string; displayName: string; docs: Doc[] }[] = [
  {
    username: "feed_ana",
    displayName: "Ana Ribeiro",
    docs: [
      {
        title: "Cadernos de campo: o que aprendi desenhando todo dia",
        type: "article",
        abstract:
          "Um ano de esboços rápidos, o que mudou no meu olhar e por que o papel ainda importa num mundo de telas.",
        cover: cover("sketchbook"),
        typography: "serif",
        category: "digital-illustration",
        tags: ["desenho", "rotina"],
      },
      {
        title: "Tipografia para quem não é designer",
        type: "tutorial",
        abstract:
          "Cinco regras práticas para escolher e combinar fontes sem errar, com exemplos de antes e depois.",
        typography: "sans",
        paper: PAPERS.yellow,
        texture: "grid",
        category: "graphic-design",
        tags: ["tipografia", "básico"],
      },
      {
        title: "Manifesto do papel timbrado",
        type: "note",
        abstract: "Por que um documento com identidade é lido de outro jeito.",
        typography: "serif",
        paper: PAPERS.kraft,
        texture: "dots",
        category: "literature-writing",
      },
      {
        title: "Paleta de outono para ilustração digital",
        type: "project",
        abstract: "Estudo de cor com doze ilustrações e os arquivos de paleta.",
        cover: cover("autumnpalette"),
        category: "art-design",
        tags: ["cor", "estudo"],
      },
      {
        title: "Diário de bordo: a primeira exposição",
        type: "article",
        typography: "mono",
        category: "art-design",
      },
    ],
  },
  {
    username: "feed_bruno",
    displayName: "Bruno Matos",
    docs: [
      {
        title: "Arquitetura de um editor de texto em React",
        type: "tutorial",
        abstract:
          "Do estado do documento ao autosave: como estruturei um editor rico com Tiptap, passo a passo.",
        cover: cover("codeeditor"),
        typography: "mono",
        category: "software-architecture",
        tags: ["react", "tiptap", "editor"],
      },
      {
        title: "Contrato de prestação de serviço para freelancers",
        type: "contract",
        abstract:
          "Modelo comentado de contrato simples, com escopo, prazos, pagamento e cancelamento.",
        typography: "serif",
        paper: PAPERS.sky,
        category: "law-justice",
        tags: ["freelance", "modelo"],
      },
      {
        title: "Por que open source muda carreiras",
        type: "article",
        abstract:
          "Três histórias de pessoas que começaram com um pull request pequeno.",
        cover: cover("opensource"),
        category: "open-source",
      },
      {
        title: "Projeto: estação meteorológica com ESP32",
        type: "project",
        abstract:
          "Sensores, bateria solar e um painel web. Lista de peças e esquema elétrico incluídos.",
        cover: cover("weatherstation"),
        typography: "mono",
        category: "embedded-systems-iot",
        tags: ["esp32", "iot"],
      },
      {
        title: "Notas rápidas sobre keyset pagination",
        type: "tutorial",
        abstract:
          "Cursor por (data, id) e por que offset falha em feeds grandes.",
        typography: "mono",
        paper: PAPERS.yellow,
        texture: "dots",
        category: "software-architecture",
      },
      {
        title: "O que um bom README tem",
        type: "article",
        typography: "sans",
        category: "open-source",
        tags: ["documentação"],
      },
    ],
  },
  {
    username: "feed_carla",
    displayName: "Carla Nunes",
    docs: [
      {
        title: "Fotografar a cidade às seis da manhã",
        type: "article",
        abstract:
          "Luz baixa, ruas vazias e um guia de lugares para começar em São Paulo.",
        cover: cover("citydawn"),
        typography: "serif",
        category: "photography",
        tags: ["fotografia", "cidade"],
      },
      {
        title: "Receita: pão de fermentação natural sem drama",
        type: "tutorial",
        abstract:
          "Cronograma de 24 horas, hidratação e os erros mais comuns da primeira fornada.",
        cover: cover("sourdough"),
        typography: "serif",
        paper: PAPERS.kraft,
        texture: "dots",
        category: "recipes",
        tags: ["pão", "fermentação"],
      },
      {
        title: "Termo de uso de imagens do meu portfólio",
        type: "contract",
        abstract: "Quando você pode usar minhas fotos, com e sem crédito.",
        typography: "serif",
        paper: PAPERS.pink,
        category: "photography",
      },
      {
        title: "Projeto de zine: Bairro em Preto e Branco",
        type: "project",
        abstract: "Vinte páginas impressas em risografia, tiragem de 200.",
        cover: cover("zine"),
        category: "graphic-design",
      },
      {
        title: "Sobre",
        type: "note",
        abstract: "Fotógrafa, padeira nas horas vagas e leitora de zines.",
        typography: "sans",
        paper: PAPERS.pink,
        texture: "grid",
        category: "photography",
      },
    ],
  },
];

async function call<T>(
  path: string,
  init: { method?: string; token?: string; body?: unknown } = {},
): Promise<{ status: number; data: T }> {
  const res = await fetch(`${API}${path}`, {
    method: init.method ?? "GET",
    headers: {
      ...(init.body === undefined
        ? {}
        : { "content-type": "application/json" }),
      ...(init.token ? { authorization: `Bearer ${init.token}` } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const json = (await res.json().catch(() => ({}))) as { data: T };
  return { status: res.status, data: json.data };
}

async function session(username: string): Promise<string> {
  const login = await call<{ accessToken: string }>("/api/v1/auth/login", {
    method: "POST",
    body: { identifier: username, password: PASSWORD },
  });
  if (login.status === 200) return login.data.accessToken;
  const reg = await call<{ accessToken: string }>("/api/v1/auth/register", {
    method: "POST",
    body: {
      email: `${username}@example.com`,
      username,
      password: PASSWORD,
      confirmPassword: PASSWORD,
    },
  });
  if (reg.status >= 300) throw new Error(`register ${username}: ${reg.status}`);
  return reg.data.accessToken;
}

const categories =
  await call<{ id: string; slug: string }[]>("/api/v1/categories");
const categoryId = (slug: string) => {
  const found = categories.data.find((c) => c.slug === slug);
  if (!found) throw new Error(`unknown category ${slug}`);
  return found.id;
};

let created = 0;
for (const author of AUTHORS) {
  const token = await session(author.username);
  await call("/api/v1/profiles/me", {
    method: "PATCH",
    token,
    body: { displayName: author.displayName },
  });
  const mine = await call<{ title: string }[]>(
    "/api/v1/documents/me?limit=50",
    {
      token,
    },
  );
  const existing = new Set(mine.data.map((d) => d.title));

  for (const doc of author.docs) {
    if (existing.has(doc.title)) continue;
    const res = await call<{ id: string }>("/api/v1/documents", {
      method: "POST",
      token,
      body: {
        title: doc.title,
        type: doc.type,
        abstract: doc.abstract ?? null,
        coverImageUrl: doc.cover ?? null,
        categoryId: categoryId(doc.category),
        tags: doc.tags ?? [],
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: doc.abstract ?? doc.title }],
            },
          ],
        },
      },
    });
    if (res.status >= 300)
      throw new Error(`create "${doc.title}": ${res.status}`);
    // Create ignores paper fields; the style is written by the update route.
    const styled = await call(`/api/v1/documents/${res.data.id}`, {
      method: "PATCH",
      token,
      body: {
        typography: doc.typography ?? "sans",
        paperStyle: doc.paper
          ? { mode: "preset", ...doc.paper }
          : { mode: "default", presetId: null, bg: null, text: null },
        paperTexture: {
          type: doc.texture ?? "none",
          size: 24,
          opacity: 0.15,
          color: null,
        },
      },
    });
    if (styled.status >= 300)
      throw new Error(`style "${doc.title}": ${styled.status}`);
    const pub = await call(`/api/v1/documents/${res.data.id}/publish`, {
      method: "PATCH",
      token,
    });
    if (pub.status >= 300)
      throw new Error(`publish "${doc.title}": ${pub.status}`);
    created += 1;
  }
}

console.log(`seed-feed: ${created} documents created`);
export {};
