import { Heart } from "lucide-react";
import Link from "next/link";
import { createContext, type ReactNode, useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Corner } from "@/components/ui/chamfer-utils";
import { cn } from "@/lib/utils";
import type { DocumentCard } from "@/types/api.types";
import { typeTheme } from "./card-theme";

const DATE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  timeZone: "UTC",
});

export const docHref = (doc: DocumentCard) =>
  `/${doc.author.username}/${doc.slug}`;

export const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : DATE.format(date);
};

/**
 * True while the feed is filtered to one type: only then does the type ink
 * paint the tabs, because every card on screen shares it and color can't mislead.
 */
export const TypeInkContext = createContext(false);

const NEUTRAL_TAB = {
  ink: "bg-dark text-light",
  paper: "bg-light text-dark",
  auto: "bg-foreground text-background",
} as const;

/** Type label flush with a top corner; moves right when the top-left corner is cut. */
export function TypeTab({
  type,
  corners = [],
  tone = "ink",
}: {
  type: string;
  corners?: Corner[];
  /** Neutral tab colors, picked to stand out from the card body. */
  tone?: keyof typeof NEUTRAL_TAB;
}) {
  const lit = useContext(TypeInkContext);
  const theme = typeTheme(type);
  const Icon = theme.icon;
  const right = corners.includes("tl");
  return (
    <span
      className={cn(
        "absolute top-0 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs uppercase tracking-wider",
        right ? "right-0 rounded-bl-xs" : "left-0 rounded-br-xs",
        lit
          ? cn(theme.solid, "ring-1 ring-inset ring-dark")
          : NEUTRAL_TAB[tone],
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      {theme.label}
    </span>
  );
}

/** Title link stretched over the card: the whole card is clickable, no nested links. */
export function CardTitle({
  doc,
  className,
  children,
}: {
  doc: DocumentCard;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <h3 className={cn("font-bold tracking-tight text-balance", className)}>
      <Link
        href={docHref(doc)}
        className="outline-none after:absolute after:inset-0 after:z-10 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-current hover:underline underline-offset-4 decoration-2"
      >
        {children ?? doc.title}
      </Link>
    </h3>
  );
}

export function CardMeta({
  doc,
  className,
  muted,
}: {
  doc: DocumentCard;
  className?: string;
  muted?: string;
}) {
  const name = doc.author.displayName || doc.author.username;
  return (
    <div className={cn("flex items-center gap-2 text-xs", className)}>
      <Link
        href={`/${doc.author.username}`}
        className="relative z-20 flex items-center gap-2 min-w-0 rounded-xs hover:underline underline-offset-4 outline-none focus-visible:outline-2 focus-visible:outline-current"
      >
        <Avatar className="size-6 rounded-xs after:rounded-xs">
          <AvatarImage src={doc.author.avatarUrl ?? undefined} alt="" />
          <AvatarFallback className="rounded-xs bg-foreground text-background font-sans text-[0.7rem] font-bold">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="truncate font-medium">{name}</span>
      </Link>
      <span aria-hidden className={muted}>
        ·
      </span>
      <time dateTime={doc.publishedAt} className={cn("shrink-0", muted)}>
        {formatDate(doc.publishedAt)}
      </time>
      <span className={cn("ml-auto flex shrink-0 items-center gap-1", muted)}>
        <Heart className="size-3.5" aria-hidden />
        {doc.likesCount}
        <span className="sr-only">curtidas</span>
      </span>
    </div>
  );
}

export function CardTags({
  doc,
  className,
}: {
  doc: DocumentCard;
  className?: string;
}) {
  if (doc.tags.length === 0) return null;
  return (
    <ul className={cn("flex flex-wrap gap-x-3 gap-y-1 text-xs", className)}>
      {doc.tags.slice(0, 3).map((tag) => (
        <li key={tag.id}>#{tag.name}</li>
      ))}
    </ul>
  );
}
