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
