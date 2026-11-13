import { Heart } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  DocumentFooterRenderer,
  DocumentHeaderRenderer,
} from "@/components/document/letterhead-renderer";
import { getPaperProseStyle } from "@/components/document/paper-prose-style";
import {
  isSignatureVisible,
  SignatureBlock,
} from "@/components/document/signature-block";
import type { PaperStyle } from "@/components/document/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import type { SignatureContext } from "@/features/documents/design/signature";
import {
  coverFilterCss,
  deriveReadDesign,
  renderDocumentContent,
} from "@/features/documents/document-read";
import { getPublicDocument } from "@/features/documents/public-api.server";
import { cn } from "@/lib/utils";
import type { DocumentFull } from "@/types/api.types";

// params e dados são aguardados fora de <Suspense>; sem isto o build falha na validação do shell.
// O shell do layout já foi enviado, então notFound() responde 200 com noindex, não 404.
export const instant = false;

interface DocumentPageProps {
  params: Promise<{ username: string; slug: string }>;
}

const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeZone: "UTC",
});

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : DATE_FORMAT.format(date);
}

function authorLabel(document: DocumentFull): string {
  return document.author.displayName || document.author.username;
}

export async function generateMetadata({
  params,
}: DocumentPageProps): Promise<Metadata> {
  const { username, slug } = await params;
  const document = await getPublicDocument(username, slug);

  if (!document) {
    return { title: "Documento não encontrado" };
  }

  const description =
    document.abstract ??
    `Documento publicado por ${authorLabel(document)} no Blklight.`;

  return {
    title: document.title,
    description,
    openGraph: {
      title: document.title,
      description,
      type: "article",
      ...(document.coverImageUrl ? { images: [document.coverImageUrl] } : {}),
    },
  };
}

export default async function PublicDocumentPage({
  params,
}: DocumentPageProps) {
  const { username, slug } = await params;
  const document = await getPublicDocument(username, slug);

  if (!document) {
    notFound();
  }

  const design = deriveReadDesign(document);
  const { paperColors, fontClass } = design;
  const contentHtml = renderDocumentContent(document.content);
  const proseStyle = getPaperProseStyle(paperColors);
  // Letterhead markers ({{publicador}} etc.): private orgs already come null.
  const letterheadContext: LetterheadTextContext = {
    author: document.author,
    organization: document.organization,
  };
  // Signature: always automatic; only `enabled` is read from the saved data.
  const signature = design.signature;
  const signatureContext: SignatureContext = {
    ...letterheadContext,
    authorship: document.authorship,
    publishedAt: document.publishedAt,
  };
  const showSignature =
    signature !== null && isSignatureVisible(signature, signatureContext);
  // The signature already shows the public identifier: don't repeat it below
  // the paper.
  const signatureShowsIdentifier =
    showSignature && !!document.authorship?.publicIdentifier;
  const paperStyle = document.style?.paperStyle as
    | PaperStyle
    | null
    | undefined;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        {/* Byline / meta bar (above the paper, in the page background) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 text-sm text-muted-foreground">
          <Avatar className="h-7 w-7" aria-hidden>
            <AvatarImage src={document.author.avatarUrl ?? undefined} alt="" />
            <AvatarFallback>
              {authorLabel(document).charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">
            {authorLabel(document)}
          </span>
          <span className="font-mono text-xs">@{document.author.username}</span>
          <span aria-hidden>·</span>
          <time dateTime={document.publishedAt} className="text-xs">
            {formatDate(document.publishedAt)}
          </time>
          {document.organization ? (
            <>
              <span aria-hidden>·</span>
              <Link
                href={`/org/${document.organization.orgname}`}
                data-testid="document-org-link"
                className="text-xs hover:underline"
              >
                em {document.organization.name}
              </Link>
            </>
          ) : null}
          <span
            className="ml-auto flex items-center gap-1.5"
            data-testid="likes"
          >
            <Heart
              className={cn(
                "w-4 h-4",
                document.likes.likedByMe
                  ? "fill-accent text-accent"
                  : "text-muted-foreground",
              )}
              aria-hidden
            />
            <span className="font-mono text-xs">
              {document.likes.likesCount}
            </span>
          </span>
        </div>

        {(document.category || document.tags.length > 0) && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {document.category && (
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-foreground/20">
                {document.category.name}
              </span>
            )}
            {document.tags.map((tag) => (
              <span
                key={tag.id}
                className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 border border-foreground/20"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Paper — mirrors the editor's document container */}
        <PaperSurface
          as="article"
          paperColors={paperColors}
          paperTexture={design.paperTexture}
          textureStyle={design.textureStyle}
          grains={paperStyle?.grains}
          grainSettings={paperStyle?.grainSettings}
          contentClassName="md:p-10 p-8"
        >
          {design.header.enabled && (
            <DocumentHeaderRenderer
              header={design.header}
              className="mb-4"
              textContext={letterheadContext}
            />
          )}

          <h1
            className={cn(
              "w-full text-3xl md:text-4xl font-bold tracking-tight mb-3",
              fontClass,
            )}
            style={{ color: paperColors?.text || undefined }}
          >
            {document.title}
          </h1>

          {document.abstract && (
            <p
              className={cn("text-xl mb-6", fontClass)}
              style={{ color: paperColors?.muted || undefined }}
            >
              {document.abstract}
            </p>
          )}

          {design.coverImage && (
            <div className="mb-6">
              <div
                className="relative overflow-hidden"
                style={{
                  borderRadius: design.cover.borderRadius,
                  height: design.cover.height,
                }}
              >
                {/* biome-ignore lint/performance/noImgElement: coverImageUrl can come from an arbitrary API host; next/image would require a domain allowlist */}
                <img
                  src={design.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: design.cover.position,
                    filter: coverFilterCss(design.cover),
                  }}
                />
              </div>
            </div>
          )}

          <div
            className="h-px flex-1 mb-6"
            style={{
              backgroundColor: paperColors
                ? `${paperColors.text}33`
                : "hsl(var(--foreground) / 0.2)",
            }}
          />

          <div
            className={cn("prose prose-lg max-w-none", fontClass)}
            style={proseStyle}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: contentHtml is produced server-side by generateHTML from the document's own TipTap JSON via TipTap's schema-based serializer (not raw user HTML); standard rich-text render path.
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {showSignature && (
            <div className="mt-8">
              <SignatureBlock
                context={signatureContext}
                color={paperColors?.text}
                background={paperColors?.bg}
              />
            </div>
          )}

          {design.footer.enabled && (
            <DocumentFooterRenderer
              footer={design.footer}
              className="mt-4"
              textContext={letterheadContext}
            />
          )}
        </PaperSurface>

        {/* Authorship — public identifier, discreet */}
        {document.authorship?.publicIdentifier && !signatureShowsIdentifier && (
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Public identifier · {document.authorship.publicIdentifier}
          </p>
        )}
      </div>
    </div>
  );
}
