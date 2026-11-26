# Dossiê e anotações: levar do lab para a plataforma

Registrado em 2026-11-25, na branch `feat/lab-dossie` (PR #29). Ainda **não há plano escrito**: este documento lista o que o plano precisa cobrir. Fazer o plano em fases, com as perguntas resolvidas antes, e só depois mexer na API.

## Onde está hoje

- Rota de teste: `/lab/dossie` (e as ideias de capa em `/lab/dossie/capas`).
- Dossiê: `src/components/dossier/`. Não conhece "trilha": recebe folhas, seções e abas por props. `src/features/dossier/trail-adapter.ts` converte uma trilha.
- Anotações, feitas para reaproveitar fora do dossiê:
  - dados: `src/features/notes/` (tipos, âncora por citação, store);
  - interface: `src/components/notes/` (papel, notas da leitura, bolso, quadro).
- O dossiê expõe `renderAside` (coluna à direita do documento) e `renderActions` (botões ao lado de "Voltar à pasta"); o lab usa os dois para as anotações.
- Dados de exemplo: `src/features/dossier/mock.ts` e `src/app/lab/dossie/demo-notes.ts`.

## O que o plano precisa cobrir

### Persistência na API

- **Anotações:** hoje em localStorage (`blklight-notes`, `src/features/notes/store.ts`, marcado como `shortcut:`). Definir endpoints no blklight-api.
- **Progresso de leitura:** hoje em localStorage (`blklight-progress`, `src/features/dossier/progress-store.ts`, também `shortcut:`). Lidos por documento e último lido por trilha.
- **Privacidade:** decidir o que é privado e o que pode ser compartilhado (notas de equipe, por exemplo).
- **Migração:** decidir se as notas salvas no navegador sobem para a conta no primeiro login.

### Rotas e dados reais

- Trilhas e artigos vindos da API em vez de `mock.ts`.
- Rotas definitivas, por exemplo `/trilhas/...` e `/artigos/:slug`. O `?doc=slug` já reflete o documento aberto.
- Carregar o corpo do documento sob demanda (hoje `src/features/dossier/load-body.ts` simula a espera).

### Anotações fora do dossiê

- Em quais telas elas entram (leitura de artigo avulso, perfil, busca).
- O quadro funciona por escopo (`scopeId`); definir os escopos fora de uma trilha.

### Pendências de interface

- Editar uma marcação (cor ou trecho) sem apagar e marcar de novo.
- Quadro no celular: zoom com pinça e redimensionar por toque.
- Separar `src/components/notes/reading-notes.tsx` e `src/components/notes/notes-board.tsx`, que já passam de 300 linhas.
- Escolher a capa definitiva. Ficaram Etiqueta, Selo (com alterações a definir), Divisórias, Ficha técnica, Planta técnica e Tipográfica.
- Redesenhar o bolso no fundo da pasta.
- Testar modo escuro das telas novas e celular em aparelho de verdade.
