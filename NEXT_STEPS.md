# Próximos passos: migração blklight.github.io

Atualizado em 2026-11-07. Notas para continuar a migração em outra sessão.

## Onde estamos

- Branch: `migration/ascended`, já enviada ao GitHub.
- PR: https://github.com/Blklight/blklight.github.io/pull/19, apontando para `main`.
- Origem do material:
  - Base estrutural: `../../templates/tpl-ui` (Next 16, Base UI/shadcn `base-vega`, TanStack Query, Vitest, Biome).
  - Features: `../../reference/ascended` (Radix). Serve só de referência e não deve ser alterado.
- Estado no último commit:
  - `bun run typecheck`: 0 erros.
  - `bun run lint`: 0 erros, 73 avisos.
  - `bun run test`: 33/33.
  - `bun run build`: ok.
- Relatórios de cada etapa: `~/blklight-reports/blklight-github-io-{1..7}.md`.

### Commits da branch

1. `chore: substitui base pelo tpl-ui`
2. `feat: migra infra compartilhada do ascended`
3. `feat: migra shell, auth e onboarding do ascended`
4. `feat: migra leitura pública do ascended`
5. `feat: migra editor /escrever e /design do ascended`
6. `feat: migra painel /admin do ascended`
7. `feat: migra demos (/examples, /masks) e /lab do ascended`
8. `fix(css): keyframes do accordion usam --accordion-panel-height (Base UI)`

## Decisões tomadas

- **Deploy:** servidor Node/Vercel com SSR. Não há export estático para GitHub Pages; o nome `.github.io` é só o nome do repo.
- **Fora do escopo:**
  - `/projects` (project-presentation-builder e o editor TipTap legado em `components/editor/`).
  - Componentes sem uso: Dither, Folder, LatticeLoader, BellToggle.
  - Dependências: three/r3f e yjs.
- **`/lab` e `GrainVsPaperLab.tsx`:** copiados sem alteração e excluídos do Biome em `biome.json`. Só ganharam um `layout.tsx` novo.
- **`legacy-content/`:** guarda o MDX do site antigo. Não é renderizado e pode ser apagado.
- **Showcase `/components` do tpl-ui:** removido.

## Pendências

### 1. Teste manual (prioridade)

Até agora só typecheck, lint e build validaram a migração. O Base UI aceita algumas props do Radix sem erro de tipo, e elas simplesmente não fazem nada, então é preciso testar no navegador.

Rode `bun run dev` na porta 3000 com o backend na porta 4000. O CORS do backend só aceita `localhost:3000`. Verifique:

- [ ] Login, registro e logout. O refresh de token acontece quando a API responde 401.
- [ ] Onboarding com as 3 etapas.
- [ ] Menu do avatar na navbar: abrir o "Admin panel" e fazer "Log out" (agora usa `onClick`, antes era `onSelect`).
- [ ] Theme toggler com os temas light, dark, book e system, incluindo a animação de view transition.
- [ ] `/feed`: busca, filtro de categoria (o label deve aparecer no trigger) e paginação.
- [ ] `/[username]`, `/[username]/[slug]` e `/org/[orgname]`: renderização, e 404 para usuário ou documento inexistente.
- [ ] `/escrever`: criar, salvar e publicar; painéis de design; Sheet de templates; modais.
- [ ] `/escrever/[id]`: editar um documento existente.
- [ ] `/design`: galeria de templates, renomear e apagar.
- [ ] `/admin`:
  - Filtros com Select (users e apps).
  - Dialogs "novo app" e "convidar".
  - Formulários com `FormControl render`.
  - Switch "ativo".
  - Troca de role.
- [ ] `/examples`, `/masks` e `/lab`.

### 2. Converter as rotas com `instant = false`

As rotas `src/app/[username]/page.tsx`, `src/app/[username]/[slug]/page.tsx` e `src/app/org/[orgname]/page.tsx` usam `export const instant = false`. Isso dá SSR bloqueante, como era no ascended.

- Para ganhar streaming, converta para `<Suspense>` e/ou `"use cache"`. Leia antes `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`.
- O `notFound()` precisa continuar devolvendo status 404.

### 3. Reduzir os avisos do Biome

São 73 avisos, quase todos herdados do ascended. Os principais:
- `noNonNullAssertion` em `src/features/*/api.ts`.
- `noImgElement` nos componentes de documento.
- `noExplicitAny` em `src/types/api.types.ts`.

### 4. Levar os fixes de volta para o tpl-ui

O tpl-ui upstream (`488d1f3`) não passa em typecheck nem em lint. Leve estes fixes para lá:
- `src/components/ui/animated-theme-toggler.tsx`, reescrito para Base UI.
- `src/store/useLanguageStore.ts`, agora tipado.
- `themes={["light","dark","book","system"]}` no ThemeProvider em `src/app/layout.tsx`.
- Keyframes do accordion usando `--accordion-panel-height`.

### 5. Depois do merge

- [ ] Configurar o deploy (Vercel ou servidor Node) com `NEXT_PUBLIC_API_URL`.
- [ ] Ajustar o CORS e o cookie de refresh do backend para o domínio de produção (`blklight.dev`).
- [ ] Ver os alertas do Dependabot no repo; o GitHub avisou no push.
- [ ] Apagar as branches antigas: `prototype`, `content-directories` (Nuxt antigo) e as do dependabot.
- [ ] Decidir se `legacy-content/` vai virar blog ou se pode ser apagado.

## Convenções Radix → Base UI usadas na migração

Use estas regras ao trazer mais coisas do ascended.

- **`asChild` → `render`:**
  - Antes: `<DialogTrigger asChild><Button>x</Button></DialogTrigger>`
  - Depois: `<DialogTrigger render={<Button />}>x</DialogTrigger>`
- **Itens de menu:** `DropdownMenuItem onSelect` vira `onClick`.
- **`FormControl`:** use sempre `render={<Input {...field} />}`. Sem `render`, o input fica dentro de um `<div>` e perde `id` e `aria-invalid`.
- **`Select`:**
  - Quando o texto exibido difere do valor, passe `items` no Root (um `Record<valor, label>` ou um array `{ value, label }`). Sem isso, o trigger mostra o valor cru.
  - O `onValueChange` pode receber `null`.
- **ToggleGroup:** não existe `type="single"`. Use `value={[v]}` e trate o array.
- **Seletores de dados:** use `data-open` e `data-closed` no lugar de `data-[state=open]`, e `data-horizontal` e `data-vertical` no lugar de `data-[orientation=*]`.
- **`cacheComponents`:**
  - `Date.now()`, `new Date()` e `Math.random()` no render de Client Component quebram o prerender. Envolva com `RequestTime` (`src/components/request-time.tsx`).
  - Rotas com fetch dinâmico precisam de `Suspense`, de `"use cache"` ou de `instant = false`.
- **Regras gerais:**
  - Não edite `src/components/ui/` à mão sem necessidade.
  - Rode `typecheck`, `lint`, `test` e `build` antes de cada commit.
  - Faça um commit por etapa, com `git add` por caminho.
