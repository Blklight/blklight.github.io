# Pendências: cards do feed e fichas de apps

Atualizado em 2026-11-19, ao fim da branch `cards-improvements` (PR #24). Notas para continuar em outra sessão.

Relatórios completos: `.impeccable/critique/` e `.impeccable/audit/` (última auditoria: 16/20; última crítica: 22/32).

## Prioridade alta

### Texto do destaque sobre a imagem

- **Problema:** no banner do destaque, o resumo e a data passam sobre a parte clara do duotone. A 390px o contraste medido foi 1,5:1; a 1440px, 2,5:1.
- **Onde:** `src/components/feed/cards/featured-card.tsx` (gradiente horizontal `from-dark/90 via-dark/45 to-transparent`, resumo em `text-light/85`, metadados em `text-light/70`).
- **Caminhos:**
  - usar um gradiente de baixo para cima no celular;
  - ou dar ao resumo e aos metadados o mesmo fundo escuro que o título já tem;
  - ou escurecer o ponto mais claro do duotone `duo-brand`.

### Modelo do card ainda muda ao filtrar

- **Problema:** a regra que evita repetir o modelo do vizinho depende de qual card vem antes na lista. Filtrar muda a lista, e alguns documentos trocam de modelo, por exemplo de Texto para Manchete.
- **Onde:** `toBentoItems` em `src/features/documents/to-bento-item.ts`.
- **Caminho:** calcular o modelo só pelo id. Para evitar vizinhos iguais, olhar a posição real na grade (em `packBento`) ou aceitar alguma repetição. Ajustar o teste que hoje permite a troca.

### Modelos para documentos sem capa

- **2026-11-21:** ficha técnica, field report e jornal criados em `/lab/cards`, ainda fora do feed.

- **Problema:** a Ficha saiu, e documentos sem capa só usam Texto e Manchete (e Paper quando o autor muda o papel). A variedade nesse grupo caiu.
- **Próximo passo:** pesquisar referências e desenhar modelos novos. As ideias de recorte de jornal, ingresso, planta técnica, polaroid, pôster de risografia e cartão-postal foram descartadas.

### Posição da aba de tipo escolhida pelo autor

- **Hoje:** cada modelo tem uma posição padrão. A aba fica rente nos cards retos (Texto, Selo) e recuada 24px nos curvos e chanfrados, sempre com 2px de raio.
- **Planejado:** o autor escolhe onde a aba fica no próprio card. Isso precisa de um campo no estilo do documento (API) e de um controle no "Editar design".

## Prioridade média

### Foco invisível fora do feed

- **Problema:** o mesmo bug corrigido no feed. No Tailwind v4, `outline-none` anula `focus-visible:outline-2`, e o foco não aparece.
- **Onde:** `src/components/navbar.tsx`, `src/components/command-menu.tsx`, `src/app/dashboard/page.tsx`, `src/components/onboarding/apps-step.tsx`.
- **Correção:** acrescentar `focus-visible:outline-solid` (ver `grep -rn "outline-none.*focus-visible:outline-[0-9]" src`).

### Título focado fica sob as barras fixas

- **Problema:** ao navegar com Tab, o título do card pode ficar escondido sob a navbar e a barra de filtros, que são fixas no topo.
- **Correção:** `scroll-padding-top` no `html`, com a altura das duas barras no `lg`.

### Link do autor no card

- O link do autor tinha 79×16px na Ficha. A Ficha saiu, mas vale conferir que todo link de autor nos cards tenha pelo menos 24px de altura (WCAG 2.5.8).

### Card Paper com as cores do autor

- **Problema:** o resumo e os metadados usam `opacity-80` e `opacity-70` sobre as cores escolhidas pelo autor. Com uma paleta de pouco contraste, o texto fica abaixo de AA.
- **Onde:** `PaperCard` em `src/components/feed/cards/feed-cards.tsx`.
- **Caminho:** usar a cor cheia do autor ou calcular o contraste contra `paperColors.bg` e tirar a opacidade quando cair abaixo de 4,5:1.

### Tema escuro

- O fundo amarelo do card Texto fica oliva e turvo (`cyber-yellow-400/10`).
- O Cover não tem contorno no escuro e perde a silhueta. A Manchete foi resolvida com um tom acima da página.

### Manchete com filtro ativo

- **Problema:** o título usa a cor da superfície (`surface.onDark`). Com o feed filtrado, um título magenta pode ficar sob a aba amarela de Artigo.
- **Caminho:** com `TypeInkContext` ativo, usar um título claro ou uma cor que não seja de tipo.

### Duotone com duas imagens

- **Problema:** o Cover e o banner do destaque ainda empilham duas `<img>` (com e sem filtro). O banner marca as duas com `fetchPriority="high"`.
- **Caminho:** usar uma imagem só, com o filtro saindo no hover, e uma única imagem com prioridade alta.

### `srcset` das capas

- As capas vêm de endereços arbitrários informados pelo autor. Variantes de largura dependem de um serviço de imagens na API, ou de uma lista de domínios permitidos para usar `next/image`.
- **Atualização (2026-11-23):** a API agora tem upload (`POST /api/v1/uploads`, branch `feat/image-uploads`). Uma capa enviada por upload é salva inteira, com até 1920px de largura. O card exibe essa capa com 160px de altura, mas baixa o arquivo inteiro: na capa de teste, 313 KB.
- **Por que não basta uma variante "do card":** hoje o feed escolhe o modelo do card sozinho (`toBentoItems`), e o mesmo documento aparece em vários formatos: faixa do feed, metade lateral, banner do destaque, perfil, organização, celular e desktop. Uma versão recortada para um formato fica errada nos outros.
- **Caminho:** reduzir por largura, sem recortar.
  - Gerar 2 ou 3 larguras a partir da imagem já enviada (por exemplo 480, 960 e o original), com o mesmo nome e um sufixo: `<id>-480.webp` e `<id>-960.webp`. Não precisa de coluna nova.
  - Cada card declara `srcset`/`sizes`, e o navegador baixa só a menor largura que basta. O recorte continua no CSS (`object-cover`).
  - Gerar no upload da capa ou depois, com um script que processa as capas já enviadas. Para capas por URL externa, usar a URL original.
- **Futuro: etapa de ajuste da publicação.** Quando o autor puder escolher o card, essa etapa pode:
  - guardar o modelo escolhido e o ponto de foco da capa (ver o item abaixo);
  - mostrar a prévia do recorte em cada formato em que o card aparece.

  As larguras continuam valendo, porque o card escolhido ainda muda de tamanho entre celular, desktop e o banner do destaque.

### Posição da capa nos cards

- **Problema:** o autor ajusta o ponto de foco da capa (`coverSettings.position`), mas só o artigo e o preview respeitam esse ajuste. Os cards recortam sempre pelo centro (`object-cover` sem `objectPosition`, em `src/components/feed/`), e o rosto ou o assunto pode ficar fora do recorte.
- **Por que não foi feito:** cada modelo de card tem um formato diferente (faixa de 160px, metade lateral, banner do destaque). Um único ponto de foco pensado para a altura do artigo nem sempre serve para todos.
- **Caminhos:**
  - aplicar o mesmo `objectPosition` do artigo em todos os cards. É simples, e para o eixo vertical costuma bastar;
  - ou guardar um ponto de foco em porcentagem (`x%`, `y%`), escolhido clicando na imagem, que funciona em qualquer proporção de recorte;
  - o `style` do documento já chega aos cards do feed público e do feed de organização. Os feeds do autor e de quem você segue ainda não trazem esse dado (ver seção "Feed" em `UX-UI-STATUS.md`).

## Editor (2026-11-21, branch `feat/editor-refino`)

- **Design perdido ao publicar direto:** um documento novo que nunca foi salvo e é publicado direto sai com o estilo padrão (`typography: "serif"`, `paperStyle: {}`). O `POST /api/v1/documents` parece ignorar os campos de estilo; o `PATCH` salva. Caminho: criar e em seguida aplicar o estilo, ou corrigir no backend.
- Inserir imagem (pelo "+", "/" ou a alça) ainda usa `window.prompt`; trocar por um diálogo como o da capa.
- O menu de inserção pode ganhar lista de tarefas, embed e tabela (extensões open-source).
- A alça de bloco some no celular (abaixo de 768px) e em linhas vazias, onde fica o "+".
- Desfazer volta até antes do rascunho restaurado (o `setContent` do rascunho entra no histórico): Ctrl+Z repetido apaga o texto todo.
- A hifenização em português não apareceu no Chromium do Playwright; conferir no Chrome do dia a dia.
- Conta de teste no backend local: `editor_check1@example.test`, com o documento publicado "Teste de tipografia".

## Prioridade baixa

- O contador "12/22" está dentro do `h2` "Mais recentes" (`src/app/feed/page.tsx`). Tirar do título ou dar um `aria-label`.
- As categorias vêm em inglês da API ("Photography", "Software Architecture"), numa interface em pt-BR.
- Uma palavra fica sozinha na última linha do resumo do Media a 390px.
- Cards Texto sem resumo ficam metade vazios. O título poderia crescer quando não há resumo.
- As células ficam com opacidade 0 até entrarem na tela (`bento-cell.tsx`), então print e captura de página inteira saem com a grade vazia.
- `src/components/feed/document-feed-card.tsx` (perfis de usuário e organização) é um segundo sistema de card para os mesmos documentos, com data, aba e badge diferentes do feed.
- Hover no tema livro: confirmar que o `mix-blend-multiply` do card Texto não clareia o fundo.

## Fichas de apps (onboarding e dashboard)

- A frente das fichas no onboarding ficou com um vazio grande entre o nome e o botão, depois que o numeral saiu. Avaliar o que ocupa esse espaço, ou diminuir a altura (`h-115`).
- Não foram conferidos a 390px com o card virado, nem no tema livro.
- O dashboard foi conferido com a resposta da API simulada, porque a conta de teste não tem apps ativos.

## Ambiente

- O servidor de dev (Turbopack) às vezes para de atualizar o `src/app/globals.css` e continua servindo o CSS antigo, mesmo depois de salvar. Reiniciar o `bun run dev` resolve.
- O Tally (`../../workspace/tally`) está no Next 16.4.2, versão com vulnerabilidade conhecida, a mesma que o Blklight atualizou para 16.4.6.

---

# Pendências de 2026-11-21: onboarding, crachás e navbar

Branch `refino-ui` (ainda não enviada). Itens que ficaram abertos depois do refino das fichas, do onboarding, dos crachás e da navbar. As seções acima são de 2026-11-19 e continuam valendo, exceto onde indicado aqui.

## Resolvido desde 2026-11-19

- O vazio na frente das fichas do onboarding: a altura caiu de `h-115` para `h-96` e o verso passou a rolar com fade.
- O dashboard agora usa o mesmo card das fichas (`AppTile`), com chanfro sempre no canto inferior direito.

## Prioridade alta

### Navegação e busca no celular

- **Problema:** abaixo de `md` a barra de comando fica escondida, então não há busca nem ⌘K em telas pequenas. O dropdown de navegação aparece, mas só tem Feed e Escrever.
- **Onde:** `src/components/navbar.tsx` (`hidden md:flex` na coluna central) e `src/components/command-menu.tsx`.
- **Caminho:** resolver junto com a reforma da navegação interna, já planejada (botão de busca que abre a barra em tela cheia, por exemplo).

### Verificações que não foram feitas

- Nada desta rodada foi conferido a 390px, no tema livro, com `prefers-reduced-motion` ligado nem no Safari.
- O holo-card do heygaia foi testado no Firefox antes da adaptação; depois dela, só no Chromium.
- A versão escura do classic também aparece no onboarding, sobre o painel Grainient. Conferir se combina.

## Prioridade média

### Crachás

- **Foto:** sem API de upload. O classic mostra as iniciais com "foto em breve"; os demais usam `avatarUrl` quando existe.
- **Número de membro:** hoje são os 6 primeiros caracteres do id do usuário (`src/app/onboarding/page.tsx`). Não há número sequencial na API.
- **Redes sociais:** `BadgeData.socials` existe, mas a API não tem esse campo; só aparecem no `/lab/cracha`. O holo-card não mostra redes (exigiria mexer no layout dele).
- **Escolha do modelo:** os modelos (`classic`, `holo`, `holo-card`) só são escolhidos no código. Falta onde a pessoa escolhe (perfil ou onboarding) e onde o crachá aparece fora do onboarding (perfil, busca de usuários).
- **Holo-card:** o GIF de brilho (`public/badges/sparkles.gif`) e a imagem de teste (`public/badges/holo-bg.jpg`) vieram de terceiros (CodePen e imgur). Conferir a licença antes de ir para produção. A frente ainda usa `react-parallax-tilt` (outra lib de tilt além da do Animate UI).
- **Industrial:** sem versão escura (é sempre metal claro). Setor e Nível estão fixos no código ("Escrita", "Pleno"/"Provisório"), porque a API não tem esses dados.
- **Holo-card, recorte:** a arte e o wrapper agora têm o mesmo raio, e uma máscara impede que o desfoque escape do canto durante o tilt. A máscara também corta a sombra externa, que ficou bem mais fraca. Confirmar se o vazamento relatado sumiu.
- **Pastas:** os crachás importam `app-meta`, `corner-brackets` e `FLAT` de `src/components/onboarding/`. Mover para uma pasta comum quando a busca de usuários existir.

### Onboarding

- **Apps "em breve":** a lista de quais apps têm telas vem de um atalho no front (`src/components/onboarding/app-meta.ts`). A API não tem esse campo.
- **Configuração interrompida:** se a pessoa fechar a aba durante o "Configurando…", os apps podem ficar ativos sem o onboarding concluído. Ao voltar, o fluxo recomeça e refaz as chamadas (idempotentes, mas não foi testado).
- **Transição de página:** `src/components/animate-ui/components/page-transition.tsx` está instalado e não ligado (ver DESIGN.md).

### Navbar

- O seletor de tema existe em dois lugares: o botão ao lado do perfil e o menu de conta. Decidir se o botão fica.
- No menu de conta, o foco abre no seletor de tema, antes dos atalhos.
- O menu de conta não prende o foco: Tab pode sair dele com o painel aberto (fecha só com Esc ou clique fora).

## Prioridade baixa

- O showcase (`/componentes`) não tem demo do holo-card, dos crachás poster/factory/ops/spec nem do menu de conta.
- Crachás mostram os apps no verso; para o uso social (perfil, busca) isso vai mudar.
- Cards ficha, field report, jornal, pasta, linhas e hud existem só no lab; decidir se entram no feed (`CARDS` em `src/app/feed/page.tsx` e `FeedCardType`).
- Textos em inglês no holo-card foram traduzidos à mão no componente adaptado; se o heygaia atualizar o original, a adaptação não acompanha.

## Ambiente (2026-11-21)

- Contas de teste criadas no backend local durante os testes, com e-mail `@example.test`: prefixos `cards_check_`, `cards_fix_`, `ff_`, `ffb_`, `badge_`, `tile_`. Podem ser apagadas.
- Firefox do Playwright instalado em `~/.cache/ms-playwright/firefox-1495` para reproduzir o bug de clique com tilt.
- O problema do `globals.css` antigo no dev server se repetiu; editar o arquivo (não só `touch`) também força a atualização.

