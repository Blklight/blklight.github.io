# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dois públicos com o mesmo peso:

- **Quem aprende e cria:** estudantes, profissionais em formação, designers, desenvolvedores e entusiastas, principalmente de design e desenvolvimento. Leem, escrevem e compartilham artigos, tutoriais e projetos, e organizam o próprio estudo.
- **Quem publica documentos com identidade:** pessoas e organizações que querem publicar textos com cara própria (papel timbrado, assinatura, capa, tipografia), incluindo notas e contratos.

Leitura pública não exige login.

## Product Purpose

Blklight é um hub criativo e de aprendizado: um ecossistema de ferramentas para escrever, publicar, ler e estudar, com um perfil público por usuário (`/[username]`) e por organização (`/org/[orgname]`). Nasceu como projeto pessoal (ideia de 2018, desenvolvimento sério desde 2020) e foi formalizado no TCC "All New Blklight" (Design Digital, UFPel, 2025).

Sucesso é a pessoa conseguir criar e publicar um texto com identidade própria sem atrito, e encontrar e estudar conteúdo organizado em vez de disperso. O protótipo do TCC atingiu SUS médio de 85,5 na tarefa de criar e publicar um tutorial; essa é a barra de usabilidade.

## Positioning

Quatro diferenciais, todos ativos:

1. **Documentos com identidade:** cada texto é uma folha desenhada (fonte, papel, textura, capa, papel timbrado, assinatura digital), não um post uniforme de blog.
2. **Trilhas de aprendizagem:** criar e salvar tutoriais e montar a própria trilha de estudo (diferencial apontado no SWOT do TCC).
3. **Hub unificado de apps:** escrita, leitura, notas de código e quadro de ideias num só ecossistema, com um perfil público.
4. **Identidade visual anti-template:** meio-termo entre a padronização da web e o web brutalismo; variedade e criatividade sem sacrificar usabilidade nem acessibilidade.

Referências do benchmark do TCC: Medium (escrita; fraqueza: paywall), Behance (visual; fraco para texto), Research by UNMS (estudo; adoção baixa, IA paga).

## Operating Context

- **Escrever:** `/escrever` escolhe o tipo; `/escrever/<tipo>` abre o editor (artigo, tutorial, projeto, nota, contrato); `/editar/[id]` edita. Editor TipTap na própria folha, com menu flutuante na seleção, "+" em linha vazia, autosave e painel "Editar design" (temas, papel, cores, capa, textura, grão, papel timbrado, assinatura).
- **Ler:** `/feed` mostra só artigos, tutoriais e projetos (regra da API), com destaque, bento grid determinístico, filtros por tipo e categoria e busca. Nota, contrato e página não aparecem no feed. Documento publicado em `/[username]/[slug]`.
- **Conta:** `/auth` (entrar/criar conta), onboarding em 3 etapas com escolha de apps, `/dashboard`, `/conta`, `/admin`.
- **Navegação:** command menu (⌘K / Ctrl+K) com textos, navegação, novos documentos por tipo e tema.
- **Temas:** claro, escuro e livro.

## Capabilities and Constraints

- Front-end Next.js 16 + React 19 com SSR em servidor Node; depende da API própria (`API_URL`, padrão `localhost:4000`). Não é export estático, apesar do nome do repo.
- Tipos de documento: `article`, `tutorial`, `project`, `note`, `contract`. Textos por tipo em `src/features/documents/document-kinds.ts`.
- Apps da plataforma (`app-meta.ts`): Escrita (publisher, disponível); Leitura (reader), Código e Ideias (canvas) ainda sem telas.
- Assinatura sempre presente em documento publicado.
- **Em aberto:** trilhas de aprendizagem ainda não têm telas neste front; recursos pagos sem estudo de viabilidade; versão mobile das ferramentas de criação não foi projetada no TCC.

## Brand Commitments

- Nome: **Blklight**. Protótipo do TCC: https://allnew.blklight.dev/.
- Cores por tipo de conteúdo são parte da identidade: tutorial laranja `#FF6D00`, artigo amarelo `#FDF800` (cyber-yellow), projeto magenta `#FF29FF`; primária ultravioleta `#6A4DFF`, secundária azul-céu `#28ACFF`. No feed, a cor do tipo não pinta o corpo dos cards: aparece nos botões de filtro (como legenda) e acende nas abas só quando o feed está filtrado por aquele tipo. Sem filtro, a aba é neutra, com nome e símbolo do tipo (decisão de 2026-11-18).
- Brutalismo controlado: mistura do analógico (grão, papel) com o digital (grid modular), layouts em largura total, cards variados entre si (nunca o mesmo modelo repetido), identidade estável por item.
- Voz: português brasileiro, direto, sem jargão de marketing.

## Evidence on Hand

- TCC completo: `docs/TCC - All New Blklight - Julian Silva da Cunha.md` (benchmark, SWOT, MoSCoW, sitemap, wireframes, guia de estilos, resultado SUS).
- Resultado SUS: 5 participantes (3 devs, 2 sem vínculo com tecnologia), média 85,5, faixa 77,5 a 95,0. Amostra pequena; não citar como prova de mercado.
- Estado de UX/UI: `docs/UX-UI-STATUS.md`. Seed de feed de desenvolvimento: `bun run dev:seed-feed`.
- Não há depoimentos, clientes, números de uso ou preços reais. Não inventar.

## Product Principles

1. **Usabilidade antes da expressão.** Criatividade visual nunca custa clareza de navegação, rótulos ou acessibilidade.
2. **Cada texto tem identidade.** O documento é um objeto desenhado pelo autor, não um post genérico.
3. **Variedade com estabilidade.** Diferente entre itens, consistente para o mesmo item (determinístico por id).
4. **Conteúdo organizado, não disperso.** Tipos, categorias, níveis e trilhas existem para que o estudo seja encontrável.
5. **Leitura aberta.** Ler não exige conta; escrever e organizar sim.

## Accessibility & Inclusion

- Meta: **WCAG 2.2 AA** (contraste, teclado, foco visível, papéis/`aria`) em todos os temas, incluindo o tema livro e as cores fortes por tipo.
- Idioma: interface em pt-BR hoje; manter textos isolados para permitir i18n (inglês) no futuro.
- O TCC registra acessibilidade como estudo pendente; tratar como requisito, não como polimento.
