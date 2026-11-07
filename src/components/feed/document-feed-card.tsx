import { Heart } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DocumentCard, DocumentType } from "@/types/api.types";

const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "medium",
  timeZone: "UTC",
});

const TYPE_LABEL: Record<DocumentType, string> = {
  article: "Artigo",
  tutorial: "Tutorial",
  contract: "Contrato",
  project: "Projeto",
  page: "Página",
};

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : DATE_FORMAT.format(date);
}

function authorLabel(document: DocumentCard): string {
  return document.author.displayName || document.author.username;
}

interface DocumentFeedCardProps {
  document: DocumentCard;
}

/**
 * One document in the public feed. Links to the public read route
 * /:username/:slug. `likesCount` is flat on DOCUMENT_CARD_SCHEMA, so the card
 * shows the total only and never claims the viewer liked it.
 */
export function DocumentFeedCard({ document }: DocumentFeedCardProps) {
  const href = `/${document.author.username}/${document.slug}`;

  return (
    <Card data-testid="feed-card" className="gap-0 overflow-hidden py-0">
      {document.coverImageUrl ? (
        // biome-ignore lint/performance/noImgElement: coverImageUrl can point at an arbitrary API host; next/image would require a remote domain allowlist
        <img
          src={document.coverImageUrl}
          alt=""
          className="h-40 w-full object-cover"
        />
      ) : null}

      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="font-mono text-[10px] uppercase tracking-widest"
          >
            {TYPE_LABEL[document.typeName] ?? document.typeName}
          </Badge>
          {document.category ? (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {document.category.name}
            </span>
          ) : null}
          {document.organization ? (
            <Link
              href={`/org/${document.organization.orgname}`}
              data-testid="feed-card-org"
              className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline"
            >
              {document.organization.name}
            </Link>
          ) : null}
        </div>

        <CardTitle className="text-xl leading-snug">
          <Link
            href={href}
            data-testid="feed-card-title-link"
            className="hover:underline"
          >
            {document.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {document.abstract ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {document.abstract}
          </p>
        ) : null}

        {document.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {document.tags.map((tag) => (
              <li
                key={tag.id}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                #{tag.name}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border/60 pt-3 text-xs text-muted-foreground">
          <Link
            href={`/${document.author.username}`}
            className="font-medium text-foreground hover:underline"
          >
            {authorLabel(document)}
          </Link>
          <span className="font-mono">@{document.author.username}</span>
          <span aria-hidden>·</span>
          <time dateTime={document.publishedAt}>
            {formatDate(document.publishedAt)}
          </time>
          <span className="ml-auto flex items-center gap-1.5">
            <Heart className="h-4 w-4" aria-hidden />
            <span className="font-mono">{document.likesCount}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
