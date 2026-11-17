# UX/UI: onde paramos

Data: 2026-11-16. Branch `ux-ui-improvements` (front) e `feat/feed-card-style` (API). O front depende da API: o feed usa o campo `style` dos cards e a regra de tipos expostos.

## O que foi feito

### Entrada e conta
- **`/auth`** substitui o painel expansível da Home: abas Entrar / Criar conta sincronizadas com `?mode=`, área de altura fixa (sem salto entre abas), coluna de marca com o que o app oferece hoje.
- **Home**: hero com documento timbrado de exemplo, seção de recursos, chamada final e `SiteFooter`; navbar alinhada ao conteúdo; Entrar e Criar conta separados (`AuthLinks`).
- **Navbar interna**: logo, link ativo, menu da conta com avatar (Dashboard, Meu perfil, Escrever, Conta, Administração, Sair).
- **`/conta`**: dados da conta e sessão (saíram do dashboard).
- **Command menu (⌘K / Ctrl+K)**: textos do feed, navegação, novos documentos por tipo, tema.

### Onboarding
- Fluxo refeito na estética Blklight: boas-vindas com prévia do endereço público, cards de app com flip, dither ordenado (`DitherSpotlight`), cor por app (`app-meta.ts`), `FilletCard` (vindo do tpl-ui), etapa final em quadrados.
- Conta de teste presa no onboarding: `onb_preview` / `Preview#2026`; `bun run dev:reset-onboarding [username]` a devolve ao início.

### Dashboard
- Largura total: continuar escrevendo (rascunho mais recente), textos com status, apps ativos, últimos do feed.

### Feed
- Destaque (estilo "projeto do dia" do TCC) + `BentoGrid` determinístico (`src/components/bento/`), largura total.
- 7 modelos de card (Cover, Media, Selo, Paper, Texto, Manchete, Ficha), formatos variados (chanfro, arredondado, reto), paleta de 9 superfícies; a cor do tipo fica na aba. Modelos em rodízio por página, estáveis ao paginar.
- Filtros por tipo e categoria, busca. Só artigos, tutoriais e projetos aparecem (regra na API).
- Seed: `bun run dev:seed-feed` (autores `feed_ana`, `feed_bruno`, `feed_carla`, senha `Feed#2026seed`).

### Escrever e ler
- **`/escrever`**: escolha do tipo. **`/escrever/<tipo>`** (artigo, tutorial, projeto, nota, contrato): mesmo editor, textos por tipo em `src/features/documents/document-kinds.ts`. **`/editar/[id]`** substitui `/escrever/[id]` (links antigos redirecionam).
- Editor: faixa presa ao topo da folha (tipo, status, tipografia, desfazer/refazer, Temas, Editar design); menu flutuante na seleção; "+" em linha vazia (títulos, listas, citação, bloco de código, imagem, linha). Marcador `{{tipo}}` no papel timbrado.
- Assinatura sempre presente em documento publicado, sem a organização.
- Artigo publicado: navbar + o documento (saiu o bloco de metadados acima da folha).
- Editar design: cabeçalho, sidebar e painéis mais legíveis, acentos corrigidos.

### Correções no caminho
- Editor convertia tutoriais/projetos em artigo a cada salvamento.
- `Date.now()` no pré-render da página do artigo (assinatura).
- Tipo `page` inexistente na API trocado por `note`.
- Navbar sem login vazava no mobile.
- Next 16.4.2 → 16.4.6 (vulnerabilidade).

## Em aberto

### Leitura (próxima fase)
Referência de aparência para estudo: https://un.ms/research.
- Ações do leitor: curtir, salvar (bookmarks já existem na API), compartilhar, seguir o autor.
- Contexto: tipo, tempo de leitura, data de atualização; categoria e tags levando ao feed filtrado.
- Sumário, âncoras nos títulos, bloco do autor no fim, "mais deste autor".
- Exercícios de tutorial (a API devolve; nem a leitura nem o editor tratam ainda).
- Efeito de filtro da capa no hover (configurado no editor, ignorado na leitura).
- Layout do entorno da folha (largura total vs. coluna de leitura).

### Editor
- Atalho "/" para inserir blocos.
- Atualizar a URL para `/editar/<id>` após o primeiro salvamento.
- Slug editável e agendamento de publicação (previstos no TCC).
- Botão "Visualizar payload JSON" visível ao autor; esconder em produção exige uma flag `NEXT_PUBLIC_*`.
- Assinatura de organização (bloco próprio, a planejar).

### Feed
- Perfil e página de organização ainda usam o `DocumentFeedCard` antigo.
- Feed do autor e de quem você segue não trazem `style` (só o público e o de organização).
- Buraco ocasional no fim do grid; duotone amarelo em capa escura fica oliva.

### Filtros (SVG)
- O usuário vai trazer os filtros que usa para avaliar a estrutura do código.

### UX_NOTES.md (`../docs/UX_NOTES.md`)
Feitos: 1.1, 1.3, 1.5 (telas tocadas), 2.1, 2.3, 2.4. Parciais: 1.2 (onboarding explica; o dashboard mostra os apps, o menu ainda não), 1.4 (interface em PT; mensagens de erro da API ainda em inglês), 7.1 (onboarding, auth, design), 7.2 (dither/gradiente respeitam reduced motion).
Abertos: 2.2 (telas em branco enquanto a sessão hidrata), 2.5 (`error.tsx` global), 2.6 (rotas de demonstração em produção), seção 3 (estado de salvamento, rascunho local, publicado vs. alterações), 4.2–4.4, seção 5 (mensagens de erro e 429), seção 6 (reautenticação, códigos de recuperação, sessões, disputas), 7.3 (custo da landing).

### Não verificado
- Tema `book` em todas as telas novas.
- Mobile do command menu, dashboard e editor.
- O TCC (`docs/TCC - All New Blklight...md`) está no diretório mas fora do git (8 MB com imagens embutidas).
