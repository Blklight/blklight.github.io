export interface ActionCardStyles {
  card?: string;
  content?: string;
  badge?: string;
  title?: string;
  description?: string;
  button?: string;
}

export interface ActionCardBaseProps {
  id: string;
  disabled?: boolean;
  className?: string;
}

export interface ActionCardProps extends ActionCardBaseProps {
  /** URL para navegação quando o card está ativo */
  url?: string;
  /** Callback executado quando o botão é clicado */
  onAction?: () => void;
  /** Estilos customizados para cada parte do card */
  styles?: ActionCardStyles;
  /** Modo skeleton para estado de loading */
  skeleton?: boolean;
  /** Habilita modo flip */
  flip?: boolean;
  /** Label para o botão de ação (modo normal) */
  actionLabel?: string;
  children?: React.ReactNode;
}

export interface ActionCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Marca este conteúdo como verso do card (modo flip) */
  back?: boolean;
  /** Description text or array of items */
  description?: string | string[];
  /** Class name for description */
  descriptionClassName?: string;
}

export interface ActionCardContextValue {
  activeCardId: string | null;
  setActiveCardId: (id: string | null) => void;
  isActive: (id: string) => boolean;
}

export const defaultActionCardStyles: ActionCardStyles = {
  card: "ring-foreground/30",
  content: "bg-dark/10 dark:bg-light/10",
  badge: "bg-secondary text-secondary-foreground",
  title: "text-foreground",
  description: "text-muted-foreground",
  button:
    "bg-secondary hover:bg-secondary/80 text-secondary-foreground border-secondary",
};
