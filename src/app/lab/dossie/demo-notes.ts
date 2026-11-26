import type { Annotation } from "@/features/notes/types";

type Demo = Omit<Annotation, "id" | "createdAt" | "updatedAt" | "scopeId" | "color"> & {
  sectionId?: string;
};

const q = (exact: string) => ({ exact, prefix: "", suffix: "" });

/** Notes to fill the lab's board on first visit (TRL-004). */
export const DEMO_NOTES: Demo[] = [
  {
    docId: "a-node-local",
    sectionId: "s-base",
    anchor: q("A maior parte das dúvidas"),
    text: "Foi exatamente o que aconteceu comigo com nvm × fnm.",
    board: { x: 0, y: 0 },
  },
  {
    docId: "a-node-local",
    sectionId: "s-base",
    anchor: q("perceber o que muda na tela"),
    text: "",
    board: { x: 40, y: 200 },
  },
  {
    docId: "a-jsx",
    sectionId: "s-base",
    anchor: q("Leia com calma e rode cada exemplo"),
    text: "Rodar os exemplos com o DevTools aberto na aba Components.",
    board: { x: 320, y: 30 },
  },
  {
    docId: "a-usestate",
    sectionId: "s-estado",
    anchor: q("Anote o que surpreender você"),
    text: "Surpresa: o valor só muda no próximo render. Revisar 'atualizações em lote'.",
    board: { x: 640, y: -10 },
  },
  {
    docId: "a-useeffect",
    sectionId: "s-estado",
    anchor: q("Um detalhe de configuração afeta o build"),
    text: "Comparar com o capítulo de efeitos: dependências erradas = loop.",
    board: { x: 680, y: 230 },
  },
  {
    docId: "a-composicao",
    sectionId: "s-padroes",
    anchor: q("Ler o código de outra pessoa"),
    text: "Ler o código do Radix/Base UI para ver slots na prática.",
    board: { x: 980, y: 60 },
  },
  {
    docId: "a-query",
    sectionId: "s-dados",
    anchor: q("pule para o exercício da seção"),
    text: "",
    board: { x: 1000, y: 300 },
  },
  {
    text: "Montar um resumo de uma página da trilha no fim.",
    board: { x: 330, y: 300 },
  },
  {
    text: "Dúvidas para a monitoria:\n1. quando usar useReducer?\n2. cache do TanStack Query entre rotas",
    board: { x: 360, y: 480 },
  },
];
