# Relatório de qualidade: blklight.github.io (front)

Data: 2026-11-09. Base: `main` em `22041a3`. Análise somente leitura; nenhum código foi alterado.
**Atenção:** diferente da API, este caminho **não** está no `.gitignore`. Não commite sem decidir antes.

Relatório irmão: `../blklight-api/docs/QUALITY_REPORT.md`.

> **Status (2026-11-09, branch `fix/quality-p-items`):** feitos os itens P 1, 2, 4, 6, 7, 8 e 9 do plano. O item 5 (B1) não precisava de mudança. O item 14 (Lighthouse) continua pendente. Na limpeza, apareceu que a landing importava `DitherShader`, `Book` e `ProgressiveBlur` sem usar; o B6 tem menos peso do que parecia.
>
> **Status (2026-11-13, branch `fix/quality-m-items`):** feitos os itens M 3, 10, 11, 12 (parte de código) e 13.
> - **3:** CSP estática sem nonce, porque nonce desliga o PPR. Mantém `'unsafe-inline'` em `script-src`.
> - **13:** os fetchers públicos passaram a usar `"use cache"` com `cacheLife("minutes")`. O `instant = false` continua, porque o build falha sem ele. **Correção ao F-M8:** as rotas já respondiam 200 + `noindex` para inexistente na `main`, porque o shell PPR sai antes do `notFound()`, então não havia 404 a preservar.
> - **10:** `bun run gen:api` gera os tipos. Só os tipos de request viraram aliases; os de response continuam manuais, porque o spec não marca `required`. O spec tem `$ref` órfão em categorias (`def-N`).
> - **11:** testes de `renderDocumentContent` e do refresh do `apiClient`.
> - **12:** reset dos overlays com `useLayoutEffect`. Falta rodar a checklist no navegador.

---

## 1. Compreensão do projeto

**O que é.** É o front da plataforma Blklight (`blklight.dev`). Em uso hoje há quatro partes:
- **Área pública:** landing (`/`), feed (`/feed`), perfil (`/[username]`), documento publicado (`/[username]/[slug]`) e organização (`/org/[orgname]`).
- **Área autenticada:** onboarding, dashboard, editor (`/escrever`, `/escrever/[id]`) e galeria de templates de design (`/design`).
- **Admin:** usuários, apps e chat.
- **Demos:** `/examples`, `/masks` e `/lab`.

Das features da API, o front usa só auth, documentos, perfis, organizações e admin. Notes, journals, books, chat de usuário e memory ainda não têm tela.

**Arquitetura.**
- **Stack:** Next 16 (App Router, `cacheComponents: true`), React 19.3, Base UI (shadcn `base-vega`), Tailwind v4, TanStack Query, Zustand e TipTap 3.
- **Páginas públicas:** são Server Components. Usam `fetch` nativo com `no-store` e `React.cache` para não repetir a chamada entre `generateMetadata` e a página (`src/features/*/public-api.server.ts`). O documento publicado é renderizado no servidor com `generateHTML` do TipTap (`src/features/documents/document-read.ts`).
- **Área logada:** é client-side. Usa o `apiClient` (`src/lib/api-client.ts`, axios com Bearer e refresh no 401) e hooks do TanStack Query em `src/features/<domínio>/{api,queries}.ts`.
- **Sessão:**
  - `useAuthStore`, persistido em `localStorage`, guarda o `accessToken` e o `user`;
  - o `SessionBootstrap` valida o cookie de refresh a cada carregamento de página;
  - um script no `<head>` redireciona `/` quando há sessão.
- **Editor:** TipTap com sistema de design por documento (papel, timbre, assinatura e capa). O design fica em stores Zustand por instância, com `localStorage` próprio. O rascunho de um documento novo também vai para o `localStorage`, numa chave por usuário.

**Pontos fortes verificados.**
- O render público é seguro. `generateHTML` só serializa nós do schema, e a extensão Link 3.33 descarta `href` com protocolo não permitido (`javascript:`) no `renderHTML` (`node_modules/@tiptap/extension-link/dist/index.js:412-424`). Nenhum `href` do front usa URL vinda do usuário.
- A busca pública está bem feita e documentada: deduplicação com `cache`, 404 tratado e nenhum token vazando para o servidor.
- O `localStorage` com dados de usuário é limpo no logout (`src/lib/user-storage.ts`).
- Checagens:
  - typecheck: 0 erros;
  - Biome: 0 erros e 73 avisos;
  - testes: 38 de 38 passam;
  - build: ok.
- As camadas `api.ts` → `queries.ts` → componente são consistentes entre as features.

---

## 2. Resumo

A estrutura é boa. Os problemas estão concentrados em três pontos:

1. **ALTO: o autosave do editor só salva uma vez** e não existe proteção ao sair da página. Quem edita um documento existente pode perder alterações sem nenhum aviso.
2. **ALTO: dependências com falhas altas.** Estão em `follow-redirects` (via axios), `happy-dom` (via `@tiptap/html`, que roda no servidor sobre conteúdo do usuário) e no `shadcn`, que está instalado como dependência de runtime.
3. **MÉDIO: não há CSP nem headers de segurança.** Com o token em `localStorage`, qualquer XSS rouba a sessão.
4. **MÉDIO: código morto.** São 37 componentes de UI sem uso (cerca de 9.900 linhas, quase 1/4 de `src`) e as dependências que só eles usam.
5. **MÉDIO: tipos da API escritos à mão** (1.587 linhas) que já divergem da API real.

---

## 3. Achados ranqueados

### ALTO

**F-A1. O autosave do editor só dispara uma vez por sessão**

Os itens abaixo vêm da leitura do código; não reproduzi no navegador.
- **Onde:** `src/components/escrever/document-editor.tsx:485-492`.
- **Problema:** o efeito de autosave depende de `form.formState.isDirty`. Depois de salvar (`onSave`, `document-editor.tsx:367-388`), o form não é resetado, então `isDirty` continua `true`. O efeito nunca é reagendado e as edições seguintes não são salvas automaticamente.
- **Agravantes:**
  - o rascunho local só existe para documento novo (`src/components/escrever/use-document-form.ts:43`: `if (initialValues ...) return`), então `/escrever/[id]` não tem cópia local;
  - não há `beforeunload` em lugar nenhum;
  - erros de save vão só para `console.error` (`document-editor.tsx:384`), sem aviso ao usuário;
  - `hasUnsavedChanges` fica sempre `true` depois da primeira edição (`document-editor.tsx:754`).
- **Cenário:** você abre `/escrever/abc`, digita um parágrafo e o autosave salva. Você digita mais três parágrafos e fecha a aba. Os três parágrafos são perdidos.
- **Correção:**
  - depois de salvar com sucesso, chamar `form.reset(form.getValues())` para zerar o `isDirty`, ou fazer o efeito depender do conteúdo observado (`useWatch`) em vez do booleano;
  - avisar com `toast.error` quando o save falhar;
  - adicionar `beforeunload` enquanto houver alterações pendentes;
  - criar um teste do fluxo.

**F-A2. Dependências com vulnerabilidades altas**
- **Onde:** `package.json`. O `bun audit` aponta 11 vulnerabilidades: 4 altas, 4 moderadas e 3 baixas.
- **`follow-redirects` (via `axios`):** credenciais personalizadas podem seguir redirects para outro domínio. Atualizar o `axios`.
- **`happy-dom` ≤ 21.0.3 (via `@tiptap/html`):** há avisos de execução de código no host e de SSRF ao processar HTML não confiável. O `generateHTML` roda no servidor sobre conteúdo do usuário. Como ele monta o DOM a partir de JSON, e não faz parse de HTML, a exposição real deve ser pequena. É uma suspeita, mas a atualização é barata.
- **`body-parser`, `minimatch`, `postcss-selector-parser`:** chegam via `shadcn`, que está em `dependencies` e traz `@modelcontextprotocol/sdk` e `express`. O código só usa o pacote para `@import "shadcn/tailwind.css"` (`src/app/globals.css:6`), resolvido no build.
- **Correção:**
  - `bun update axios @tiptap/html` (e as outras extensões `@tiptap/*` alinhadas);
  - mover `shadcn` para `devDependencies`;
  - rodar `bun audit` de novo.

### MÉDIO

**F-M1. Sem CSP e sem headers de segurança**
- **Onde:** `next.config.ts` não tem `headers()` e não há proxy configurando isso.
- **Por que importa:** o access token fica em `localStorage` (`src/store/useAuthStore.ts:41-48`). É uma decisão de design aceitável, com TTL de 15 min e refresh em cookie httpOnly, mas transforma qualquer XSS, inclusive de dependência, em roubo de sessão. Sem CSP, nada limita isso.
- **Correção:** definir `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy` e `frame-ancestors`. O CSP precisa de `script-src` com nonce ou hash, já que há scripts inline: o redirecionamento em `src/app/layout.tsx` e o do `next-themes`. Ler `node_modules/next/dist/docs/` sobre CSP antes, porque o Next 16 tem suporte a nonce.

**F-M2. Código morto: 37 componentes de UI e as dependências que só eles usam**
- **Onde:** `src/components/ui/`. Nenhum arquivo do projeto importa estes componentes:
  - `poll-widget` (1294 linhas), `floating-panel` (954), `terminal-animation` (822), `choice-poll` (778), `morph-surface` (692), `holo-card` (461) e `chart` (372);
  - além deles: `popover-motion`, `menubar`, `context-menu`, `carousel`, `calendar`, `drawer`, `item`, `chamfer-*`, `command`, `navigation-menu`, `flip-card`, `breadcrumb`, `toggle-group`, `button-group`, `input-otp`, `progress`, `accordion`, `alert`, `washi-tape`, `scroll-area`, `slider`, `hover-card`, `resizable`, `radio-group`, `aspect-ratio`, `collapsible` e `spinner`.
- **Dependências que provavelmente só servem a esses componentes:** `recharts`, `react-day-picker`, `cmdk`, `input-otp`, `embla-carousel-react` e `react-resizable-panels`.
- **Também:** `legacy-content/`, que segundo o `NEXT_STEPS.md` pode ser apagado.
- **Correção:** apagar, já que o shadcn reinstala quando precisar. Para confirmar antes e depois, rodar `knip` ou `bunx knip`.

**F-M3. Tipos da API escritos à mão, já divergindo**
- **Onde:** `src/types/api.types.ts`, com 1.587 linhas.
- **Exemplo:** `AuthResponse` (`api.types.ts:181-184`) tem só `user` e `accessToken`, mas a API devolve também `profile` e `apps` (`../blklight-api/src/features/auth/auth.zod.ts:50-55`). Por isso o front faz outra chamada para buscar o perfil logo depois do login (`useCurrentProfile` em `src/components/navbar.tsx`).
- **Correção:** gerar os tipos do OpenAPI que a API já expõe (`@fastify/swagger`) com `openapi-typescript`, num script `bun run gen:api`. Isso só vale depois que a API usar o zod como fonte única do schema (item 18 do relatório da API); senão o OpenAPI continua incompleto.

**F-M4. `r.data.data!` em toda a camada de API**
- **Onde:** `src/features/{documents,admin,organizations,profile}/api.ts`, com 24 asserções não-nulas no total. São os 24 avisos `noNonNullAssertion` do Biome.
- **Problema:** se o envelope vier com `data: null`, a função devolve `undefined` com tipo de objeto, e o erro estoura depois, longe da causa.
- **Correção:** criar um helper `unwrap(r)` em `src/lib/api-client.ts` que lança um erro quando `data` é nulo, e usá-lo nas 24 chamadas.

**F-M5. Login duplicado e estado morto na navbar**
- **Onde:** `src/components/navbar.tsx` (346 linhas) e `src/components/landing-navbar.tsx` (213). Os dois montam a mesma tela de login: branding, Grainient, features e abas Login/Register.
- **Estado morto em `navbar.tsx:55-93`:** `mode`/`setMode`, `showPassword`, `isLoading`, um `handleSubmit` com `setTimeout` falso e `clearSession`, todos sem uso.
- **Correção:** extrair um `AuthScreen` usado pelas duas navbars e apagar o estado morto.

**F-M6. Cores fixas fora dos tokens**
- **Onde:** 28 ocorrências de `text-|bg-|border-[#hex]` fora de `ui/`, em `navbar.tsx`, `landing-navbar.tsx`, `layout-base.tsx`, `document-related/document-header.tsx`, `document-related/document-footer.tsx` e `digital-signature.tsx`.
- **Problema:** quebra a regra de tokens semânticos do `AGENTS.md`, e o tema `book` não é coberto. Por exemplo, `text-[#252525]` com `dark:` não tem variante `book:`.
- **Correção:** trocar por `text-foreground`, `bg-background` e afins.

**F-M7. Outros estados preservados pelo `<Activity>`** *(suspeita)*
- **Contexto:** o caso do `ExpandableScreen` foi corrigido no PR #20.
- **Risco:** outros overlays e estados transitórios podem voltar abertos depois de navegar, como dialogs do admin, o Sheet de templates, o overlay de publicação e dropdowns.
- **Correção:** revisar seguindo `node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md` e incluir esse ponto no teste manual.

**F-M8. Três rotas com `instant = false`**
- É o item 2 do `NEXT_STEPS.md`: `src/app/[username]/page.tsx`, `src/app/[username]/[slug]/page.tsx` e `src/app/org/[orgname]/page.tsx`. Estão com SSR bloqueante; converter para `Suspense` ou `"use cache"` sem perder o status 404.

### BAIXO

- **B1.** ~~As páginas de admin não checam a role.~~ **Achado incorreto:** `src/app/admin/layout.tsx` já manda quem não é admin para `/dashboard`.
- **B2.** Há 8 avisos `noImgElement` para URLs externas do usuário (capa, avatar, preview). Trocar por `next/image` exigiria `remotePatterns` para hosts arbitrários. Correção: manter `<img loading="lazy">` e justificar com `biome-ignore`.
- **B3.** Há `biome-ignore` com `<explanation>` vazio, em `useSemanticElements` e `useButtonType`. Preencher ou corrigir.
- **B4.** Há 22 imports e 8 variáveis sem uso. `bunx biome check --write` resolve a maior parte.
- **B5.** Há `any` em `src/types/api.types.ts:192-193`.
- **B6.** A landing (`/`) é um Client Component inteiro, com WebGL (DitherShader, Grainient via `ogl`) e animações. É uma suspeita de JS e tempo de carregamento altos que não medi. Correção: medir com Lighthouse e carregar os shaders com `next/dynamic`.
- **B7.** Os erros do editor vão só para `console.error` e não existe nenhum reporte de erro, como Sentry ou um log próprio.

### Pontos ligados ao relatório da API

- **API M5:** a API responde 401 quando o usuário não é dono de um exercício. O `apiClient` entende isso como token vencido e faz um refresh à toa. Corrigir do lado da API.
- **API A2, item 7:** a API aceita URLs `javascript:`. No front, essas URLs só vão para `<img src>`, onde não executam, e o Link do TipTap as filtra. Hoje não há exposição, mas qualquer `href` futuro com URL do usuário precisa validar o protocolo.

### Testes

São 38 testes em 10 arquivos: primitivos de UI, `expandable-screen`, `login-form`, `session-bootstrap`, `query-client`, `session`, `utils`, hooks e store.

**Lacunas de maior valor:**
- **Autosave do editor:** um teste teria pegado o F-A1.
- **`renderDocumentContent`:** testar que link `javascript:` e HTML injetado não saem no HTML gerado. Isso trava a garantia de segurança contra regressão numa atualização do TipTap.
- **Fluxo de refresh do `apiClient`:** 401 com várias requisições em paralelo deve gerar um único refresh; falha no refresh deve fazer logout.
- **Outras telas:** filtros e paginação do feed, e formulários do admin.

---

## 4. Plano de melhoria em fases

Tamanhos: **P** cabe em uma tarde; **M** leva de 1 a 3 dias; **G** leva uma semana ou mais.

**Fase 0: agora**
1. Corrigir o autosave, avisar quando o save falhar e adicionar `beforeunload`, com teste (F-A1). **P**
2. `bun update axios @tiptap/*`, mover `shadcn` para `devDependencies` e rodar `bun audit` (F-A2). **P**

**Fase 1: segurança e robustez**
3. CSP com nonce e headers de segurança (F-M1). **M**
4. Helper `unwrap()` na camada de API (F-M4). **P**
5. Guard de role no admin (B1). **P**

**Fase 2: limpeza**
6. Apagar os 37 componentes de UI sem uso, as dependências órfãs e `legacy-content/`, confirmando com `knip` (F-M2). **P**
7. Extrair `AuthScreen` e apagar o estado morto da navbar (F-M5). **P**
8. Trocar as cores fixas por tokens (F-M6). **P**
9. `biome check --write` e os avisos restantes (B2 a B5). Meta: 0 avisos. **P**

**Fase 3: contratos e testes**
10. Gerar os tipos da API a partir do OpenAPI. Depende de a API usar o zod como fonte única (F-M3). **M**
11. Testes de `renderDocumentContent`, do refresh do `apiClient` e do autosave. **M**

**Fase 4: continuação do `NEXT_STEPS.md`**
12. Terminar a checklist de teste manual, incluindo os overlays preservados pelo `<Activity>` (F-M7). **M**
13. Converter as rotas com `instant = false` (F-M8). **M**
14. Medir a landing com Lighthouse e carregar os shaders sob demanda (B6). **P**

---

## 5. O que não verifiquei

- O F-A1 vem da leitura do código. Não reproduzi no navegador; a reprodução está descrita no cenário.
- Não li em detalhe os painéis de design do editor, as páginas de admin nem `/examples`, `/masks` e `/lab` (o `/lab` está fora do Biome por decisão da migração).
- Não medi o tamanho do bundle nem o desempenho.
- Acessibilidade: só olhei o lint. Não testei com teclado nem com leitor de tela.
- As dependências "órfãs" do F-M2 vêm de grep. Confirmar com `knip` antes de apagar.
