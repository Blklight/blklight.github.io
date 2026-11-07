// import { FreelanceNewProject } from "@/components/forms/freelance-new-project";
// import { ProjectForm } from "@/components/forms/project-form";

export const ContentTools = [
  {
    id: "create-article",
    title: "Escrever artigo",
    description: [
      "Escreva e publique artigos sobre seus temas favoritos.",
      "Adicione imagens, formate o texto e compartilhe conhecimento com a comunidade.",
    ],
    url: "#",
    styles: {
      card: "ring-cyber-yellow-500/50 hover:ring-cyber-yellow-500/50 !border-cyber-yellow-500",
      content: "bg-cyber-yellow-500 text-dark border-cyber-yellow-500",
      badge:
        "bg-dark text-cyber-yellow-500 dark:text-cyber-yellow-500 border-cyber-yellow-500",
      title: "text-dark",
      description: "text-dark",
      button:
        "bg-cyber-yellow-500 dark:bg-cyber-yellow-500 text-dark border-cyber-yellow-500 dark:border-cyber-yellow-500 hover:bg-cyber-yellow-500 hover:text-dark",
    },
  },
  {
    id: "create-tutorial",
    title: "Criar tutorial",
    description: [
      "Crie tutoriais passo a passo para ensinar algo novo.",
      "Use exemplos, imagens e códigos para deixar tudo mais claro e fácil de seguir.",
    ],
    url: "#",
    styles: {
      card: "ring-bluesky-500/50 hover:ring-bluesky-500/50 !border-bluesky-500",
      content: "bg-bluesky-500 text-dark border-bluesky-500",
      badge:
        "bg-light text-bluesky-500 dark:text-bluesky-500 border-bluesky-500",
      title: "text-light",
      description: "text-light",
      button:
        "bg-bluesky-500 dark:bg-bluesky-500 text-light border-bluesky-500 dark:border-bluesky-500 hover:bg-bluesky-400 hover:text-light",
    },
  },
  {
    id: "create-project",
    title: "Apresentar projeto",
    description:
      "Apresente e documente seus projetos. Descreva a ideia, as ferramentas usadas e compartilhe seu progresso com outras pessoas.",
    url: "/projects",
    styles: {
      card: "ring-magenta-400/50  hover:ring-magenta-400/50 !border-magenta-400/50",
      content: "bg-magenta-400 text-dark border-magenta-400",
      badge:
        "bg-dark text-magenta-400 dark:text-magenta-400 border-magenta-400",
      title: "text-dark",
      description: "text-dark",
      button:
        "bg-magenta-400 dark:bg-magenta-400 text-dark border-magenta-400 dark:border-magenta-400 hover:bg-magenta-600 hover:text-dark",
    },
  },
  {
    id: "create-learning-path",
    title: "Criar caminho de aprendizado",
    description: [
      "Os caminhos de aprendizado permitem criar conteúdo educacional estruturado em formato de livro ou construir jornadas de aprendizado pessoais com os materiais que você deseja aprender.",
      "Compartilhar conhecimento com outros.",
    ],
    url: "/tools?new=learning-path",
    styles: {
      card: "ring-blklight-500/50  hover:ring-blklight-500/50 !border-blklight-500/50",
      content: "bg-blklight-500 text-light border-blklight-500",
      badge:
        "bg-light text-blklight-500 dark:text-blklight-500 border-blklight-500",
      title: "text-light",
      description: "text-light",
      button:
        "bg-blklight-500 dark:bg-blklight-500 text-light border-blklight-500 dark:border-blklight-500 hover:bg-blklight-400 hover:text-light",
    },
  },
];

export type ContentTool = {
  id: string;
  title: string;
  description: string | string[];
  url: string;
  styles: {
    card: string;
    content: string;
    badge: string;
    title: string;
    description: string;
    button: string;
  };
};

export type ManagementTool = {
  id: string;
  title: string;
  description: string | string[];
  backContent?: React.ReactNode;
  styles: {
    card: string;
    content: string;
    badge: string;
    title: string;
    description: string;
    button: string;
  };
};

export const ManagementTools: ManagementTool[] = [
  {
    id: "create-board",
    title: "Criar board",
    description:
      "Escreva e publique artigos sobre seus temas favoritos. Adicione imagens, formate o texto e compartilhe conhecimento com a comunidade.",
    backContent: "<ProjectForm />",
    styles: {
      card: "ring-orange-500/50 hover:ring-orange-500/50 !border-orange-500",
      content: "bg-orange-500 text-dark border-orange-500",
      badge: "bg-light text-orange-500 dark:text-orange-500 border-orange-500",
      title: "text-light",
      description: "text-light",
      button:
        "bg-orange-500 dark:bg-orange-500 text-light border-orange-500 dark:border-orange-500 hover:bg-orange-400 dark:hover:bg-orange-400 hover:text-light",
    },
  },
  {
    id: "create-freelance-hour-budgeting",
    title: "Criar orçamento de horas freelances",
    description:
      "Crie orçamentos de horas para freelances e divulgue para a comunidade.",
    backContent: "<FreelanceNewProject />",
    styles: {
      card: "ring-teal-500/50 hover:ring-teal-500/50 !border-teal-500",
      content: "bg-teal-500 text-light border-teal-500",
      badge: "bg-light text-teal-500 dark:text-teal-500 border-teal-500",
      title: "text-light",
      description: "text-light",
      button:
        "bg-teal-500 dark:bg-teal-500 text-light border-teal-500 dark:border-teal-500 hover:bg-teal-400 dark:hover:bg-teal-400 hover:text-light",
    },
  },
  {
    id: "my-notes",
    title: "Minhas anotações",
    description: "Organize suas anotações pessoais",
    backContent: "<FreelanceNewProject />",
    styles: {
      card: "ring-yellow-300/50 hover:ring-yellow-300/50 !border-yellow-300",
      content: "bg-yellow-300 text-light border-yellow-300",
      badge: "bg-dark text-yellow-500 dark:text-yellow-300 border-yellow-300",
      title: "text-dark",
      description: "text-dark",
      button:
        "bg-yellow-300 dark:bg-yellow-300 text-dark border-yellow-300 dark:border-yellow-300 hover:bg-yellow-500 dark:hover:bg-yellow-500 hover:text-dark",
    },
  },
];
