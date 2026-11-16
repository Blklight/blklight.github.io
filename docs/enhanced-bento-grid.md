# EnhancedBentoGrid: análise e plano de reescrita

## 1. Visão geral do atual

Arquivos envolvidos:
- `src/components/enhanced-bento-grid.tsx`: o grid (client component).
- `src/components/card-wrapper.tsx`: aplica `col-span`/`row-span` e a animação de entrada.
- `src/app/page.tsx`: único uso, com `data = await getDocuments()`.
- `src/services/index.ts`: `fetchDocuments` gera `{ document, authordetails }[]`.
- Cards: `article-card.tsx`, `background-card.tsx`, `simple-card.tsx`.

Fluxo atual:
1. Um `useEffect` lê `window.innerWidth` e define `isMobile` e `columnCount` (1 / até 2 / 3 ou 4).
2. Outro `useEffect` define o tipo de card, sorteia um tamanho e, **só com 3 colunas**, "balanceia" e reordena os itens.
3. Um `switch` renderiza o card, que é envolvido pelo `CardWrapper`.

## 2. Problemas encontrados (com notas)

### Críticos (bugs reais)
| # | Problema | Onde | Efeito |
|---|---|---|---|
| 1 | O SSR sempre renderiza `Loading...` | `processedData` começa `[]` e só é preenchido no `useEffect` | Os cards não aparecem no HTML do servidor: pior para SEO, flash de "Loading..." e layout shift. A página já é server component e já tem os dados. |
| 2 | `Math.random()` nos tamanhos | `determineCardSize`, balanceamento | O layout muda a cada render, a cada resize que muda colunas e a cada visita. Se um dia rodar no servidor, causa erro de hydration. |
| 3 | Classes Tailwind dinâmicas | `` `gap-${gap} md:grid-cols-${columnCount}` `` | O Tailwind não gera classes montadas em runtime, então `gap` não funciona (só funciona se `gap-5` existir por acaso em outro arquivo). O `grid-cols` é sobrescrito pelo `style` inline. |
| 4 | Crash com `stylesheet` ausente | `item.document.stylesheet.cardLayout` | `stylesheet` é opcional em `DocumentCard`: um doc sem ele quebra a home. |
| 5 | Valores de `cardLayout` inconsistentes | MDX usa `"ArticleCard"` e também `"article-card"` | `"article-card"` cai no `default` e vira `SimpleCard` sem aviso. |
| 6 | A ordenação por tamanho quebra a ordem por data | `processedItems.sort(...)` (3 colunas) | A seção "Mais recentes" deixa de mostrar os mais recentes primeiro. |
| 7 | `key` sempre igual ao índice | `item.id \|\| index` | `item.id` não existe nesse formato (o identificador é `document.slug`). |

### Código morto ou ilusório
- A inferência de tipo (`item.backgroundImage`, `item.image`) e as regras de tamanho (`item.content.length`, `isImportant`, `isFeatured`) leem campos que **não existem** no objeto `{ document, authordetails }`. Na prática: Background vira 2x1 ou 1x2 por sorteio, Article vira 1x1 ou 1x2 por sorteio, Simple é sempre 1x1.
- No "balanceamento", `currentRow`, `approximateRows` e `itemFitsInCurrentRow` não afetam o resultado: o `result` sai na mesma ordem do `sort`.
- O balanceamento só existe para `columns === 3`; com 2 ou 4 colunas nada acontece.
- `CardWrapper` recebe `type`, mas não usa. `whileHover="hover"` aponta para uma variante comentada.
- `src/components/bento-grid.tsx` (o grid antigo) não retorna JSX; está quebrado e sem uso.
- Em `page.tsx`: `componentMap`, `CardLayoutType` e vários imports não são usados.

### Design e manutenção
- Acoplamento: o grid importa os 3 cards e conhece `document`, `authordetails` e `stylesheet`. Para levá-lo a outro projeto é preciso reescrever o grid.
- `any` em tudo (`data: any[]`, `item: any`, `authors: any`).
- A responsividade é feita em JS (`resize` sem throttle e 1º render errado no mobile) em vez de CSS.
- O campo `_assignedSize` é escrito no próprio item (mutação + campo "privado" misturado aos dados).
- Funções recriadas a cada render dentro do componente.
- `gridAutoRows: "auto"` + `row-span-2`: a "linha dupla" tem a altura de duas linhas `auto`, cuja altura depende do conteúdo vizinho, e o bento fica irregular de forma não intencional.
- Animação: `delay: i * 0.1` sem limite (com 30 itens, o último espera 3 s) e sem `prefers-reduced-motion`.
- Cards: `next/image` não é usado (é `<img>`), o card não sabe seu próprio tamanho e não adapta o layout à célula.

### O que vale manter
- Vocabulário de tamanhos `1x1 | 2x1 | 1x2 | 2x2`.
- `grid-auto-flow: dense` para preencher buracos.
- A ideia de o tamanho depender do tipo e do destaque do conteúdo.
- Entrada animada com stagger e `whileInView` + `once`.

## 3. Plano da nova versão

### 3.1 Princípios
1. **O grid só cuida de layout.** Ele não conhece documentos, autores nem cards específicos.
2. **Determinístico.** O mesmo item sempre recebe o mesmo tamanho. A variedade vem de um hash do `id`, não de `Math.random()`. Assim continua "fora do padrão", mas é estável e seguro no SSR.
3. **Responsividade em CSS**, sem `window.innerWidth`. O grid pode ser server component; só a camada de animação é client.
4. **A ordem dos dados é respeitada.** O grid não reordena; o `dense` só preenche buracos.

### 3.2 Nome
Renomear para **`BentoGrid`** (pasta `components/bento/`). O "Enhanced" só existia para diferenciar do `bento-grid.tsx` antigo e quebrado, que não vai para o novo projeto. Itens: `BentoItem`; cards: `BentoCardProps` / `BentoCardDef`.

### 3.3 API pública

```tsx
type BentoSize = "1x1" | "2x1" | "1x2" | "2x2";

type BentoItem<T extends string = string, D = unknown> = {
  id: string;            // estável (slug), usado como key e seed
  type: T;               // chave do mapa de cards
  size?: BentoSize;      // explícito: sempre vence
  featured?: boolean;    // pede um tamanho maior
  data: D;
};

type BentoCardProps<D> = { data: D; size: BentoSize };

type BentoCardDef<D> = {
  component: React.ComponentType<BentoCardProps<D>>;
  sizes?: Partial<Record<BentoSize, number>>; // pesos do sorteio determinístico
  featuredSize?: BentoSize;                   // padrão "2x2"
};

<BentoGrid
  items={items}
  cards={{
    article: { component: ArticleCard, sizes: { "1x1": 3, "1x2": 1 } },
    cover:   { component: CoverCard,   sizes: { "2x1": 1, "1x2": 1 } },
    note:    { component: NoteCard },  // sem sizes: sempre 1x1
  }}
  className="..."
/>
```

Notas:
- Tipo desconhecido: em dev, `console.warn` com o `type`; em prod, o item é ignorado. Nunca usa um fallback silencioso (evita o bug 5).
- Os genéricos garantem que `data` de cada `type` bate com o card registrado. Se ficar verboso, aceitar `BentoItem` com `data: unknown` e tipar dentro do card.

### 3.4 Resolução de tamanho (`resolveSize`)
Função pura em `bento-layout.ts`, sem React:
1. Se `item.size` existe, usa ele.
2. Se `item.featured`, usa `def.featuredSize ?? "2x2"`.
3. Se `def.sizes` existe, faz um sorteio ponderado com `hash(item.id)` como semente (por exemplo FNV-1a de 32 bits, poucas linhas).
4. Caso contrário, `"1x1"`.

Regras anti-monotonia opcionais (aplicadas em sequência, ainda determinísticas):
- No máximo um `2x2` a cada N itens; o excedente vira `2x1`.
- Dois itens grandes seguidos: o segundo vira `1x1`.

Começar só com os passos 1 a 4. Adicionar as regras extras apenas se o resultado visual pedir.

### 3.5 Layout responsivo só com CSS
- Colunas: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-dense`. Usar classes estáticas, para o Tailwind gerá-las. Se forem configuráveis, passar por prop um preset fechado ou uma CSS var.
- Mapa estático de spans: mobile sempre 1x1, e o span só a partir de `sm:`:
  ```ts
  const SPAN: Record<BentoSize, string> = {
    "1x1": "",
    "2x1": "sm:col-span-2",
    "1x2": "sm:row-span-2",
    "2x2": "sm:col-span-2 sm:row-span-2",
  };
  ```
- Altura de linha fixa via CSS var, para o bento ficar regular: `auto-rows-[var(--bento-row,14rem)]`. Assim um `1x2` tem exatamente 2 linhas + gap.
- Gap: classe estática padrão (`gap-4`), sobrescrevível via `className`.
- Com 1 coluna, o `2x2` fica naturalmente 1x1 por causa do prefixo `sm:`. Não precisa de `isMobile`.
- Limitação aceita: com `dense`, a ordem visual pode diferir da ordem do DOM em alguns pontos. A leitura por teclado e leitor de tela segue o DOM, que mantém a ordem dos dados.
- Buraco na última linha: aceitar. Se incomodar, o plano B é uma passada em `bento-layout.ts` que simula a ocupação para N colunas e reduz o último item grande. Isso só vale se o grid passar a receber o número de colunas.

### 3.6 Animação
- `BentoCell` (client, `motion`) envolve cada card: `whileInView` + `once`, `delay: Math.min(i, 8) * 0.06`.
- `useReducedMotion()` do `motion`: sem translate e sem delay.
- A animação é opcional (prop `animate={false}`) para o grid funcionar sem `motion`.

### 3.7 Contrato dos cards
Cada card do novo projeto:
- Recebe `{ data, size }` e mais nada do grid.
- Ocupa a célula toda: raiz com `h-full` e `@container`, sem altura própria.
- **Adapta o layout à célula com container queries** (`@sm:`, `@md:` do Tailwind v4), não ao viewport nem ao `size`. Usar `size` apenas para escolhas discretas (por exemplo, mostrar o resumo só em `2x2`).
- Link acessível: um `<Link>` principal no título, com `after:absolute after:inset-0` para o card inteiro ser clicável sem aninhar links. Ações secundárias (bookmark, share) ficam com `relative z-10`.
- Imagens: `next/image` com `fill` e `sizes` coerente com o span (por exemplo `(min-width:1024px) 66vw, 100vw` para `2x*`).
- shadcn sobre Base UI: composição via prop `render` (Base UI) no lugar de `asChild` (Radix) em Button, Tooltip etc.
- Estilo por tipo de documento (as tabelas `styles` repetidas nos 3 cards atuais): extrair para um único `cardTheme` com `cva` e reaproveitar.

Arquétipos iniciais sugeridos (genéricos, não cópias dos atuais):
| Card | Conteúdo | Pesos de tamanho sugeridos |
|---|---|---|
| `TextCard` | título, descrição, tags, meta | `1x1` |
| `MediaCard` | imagem no topo + texto; em células largas, imagem ao lado | `1x1:3, 1x2:1, 2x1:1` |
| `CoverCard` | imagem de fundo + overlay com texto | `2x1:1, 1x2:1`; featured `2x2` |

Partes compartilhadas: `CardMeta` (autor + data), `CardTags`, `CardTypeBadge`.

### 3.8 Adaptador de dados (fica no app, não no grid)
```ts
// app: converte o formato do conteúdo em BentoItem
const toBentoItem = (doc: DocumentCard, authors: Author[]): BentoItem => ({
  id: doc.slug,
  type: normalizeCardLayout(doc.stylesheet?.cardLayout), // "article-card" | "ArticleCard" -> "media"
  size: doc.stylesheet?.cardSize,                         // campo novo opcional no frontmatter
  featured: doc.featured,
  data: { ...doc, authors },
});
```
- Padronizar `cardLayout` no conteúdo (kebab-case) e validar com `enum` no schema do contentlayer/zod.
- Adicionar `cardSize` e `featured` opcionais ao frontmatter, para o autor poder forçar o layout.

### 3.9 Estrutura de arquivos
```
components/bento/
  bento-grid.tsx      // server-safe: grid + map de items -> resolveSize -> card
  bento-cell.tsx      // "use client": motion wrapper + classes de span
  bento-layout.ts     // tipos, hash, resolveSize, SPAN (puro)
  bento-layout.test.ts
components/cards/
  text-card.tsx, media-card.tsx, cover-card.tsx
  parts/ card-meta.tsx, card-tags.tsx, card-type-badge.tsx
  card-theme.ts       // cva por documentType
```

### 3.10 Fases
1. **Layout puro:** `bento-layout.ts` + teste (mesmo id dá o mesmo tamanho; `size` explícito vence; `featured`; pesos respeitados aproximadamente em 1000 ids; tipo sem `sizes` dá `1x1`).
2. **Grid:** `bento-grid.tsx` + `bento-cell.tsx` com classes estáticas, CSS var de linha e aviso para tipo desconhecido.
3. **Cards:** partes compartilhadas + os 3 arquétipos com container queries.
4. **Integração:** adaptador `toBentoItem`, normalização de `cardLayout`, campos novos no schema.
5. **Polimento:** reduced motion, empty state (`items.length === 0` mostra uma mensagem, não "Loading..."), e, se necessário, as regras anti-monotonia.

### 3.11 Verificação
- `tsc --noEmit` sem erros e sem `any` no grid.
- Testes de `bento-layout` passando (vitest ou `node --test`).
- View-source da página: os cards aparecem no HTML do servidor (nada de "Loading...").
- Sem avisos de hydration no console.
- Recarregar a página várias vezes: o layout é idêntico.
- Ordem: a lista segue a data (mais recente primeiro) no DOM.
- Testes visuais em 375, 768, 1024 e 1440 px: sem scroll horizontal; `2x2` vira 1 coluna no mobile.
- Navegação por teclado: um foco por card, sem links aninhados.
- `prefers-reduced-motion` ativo: sem animação de deslocamento.
