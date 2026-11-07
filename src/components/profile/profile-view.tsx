"use client";

import { FileText, Lock } from "lucide-react";
import { useMemo } from "react";
import { DocumentFeedCard } from "@/components/feed/document-feed-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthorDocuments, useProfile } from "@/features/profile/queries";
import type { ProfilePublic } from "@/types/api.types";

const PAGE_SIZE = 6;

const JOINED_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * The backend redacts a private profile by nulling bio/socialLinks and
 * stamping createdAt with the epoch, so a 1970 "member since" is the tell for
 * "this copy is redacted", never a real join date.
 */
function formatJoinedAt(createdAt: string): string | null {
  const time = Date.parse(createdAt);
  if (Number.isNaN(time) || time <= 0) return null;
  return JOINED_FORMAT.format(new Date(time));
}

interface ProfileViewProps {
  username: string;
  /** Profile fetched by the Server Component; avoids a second round-trip. */
  initialProfile: ProfilePublic;
}

export function ProfileView({ username, initialProfile }: ProfileViewProps) {
  const { data: profile, isFetching } = useProfile(username, {
    initialData: initialProfile,
  });

  // A private author the viewer is not an accepted follower of is an explicit
  // state, not missing data: the backend nulls the bio and the documents query
  // answers with an empty page, so neither may be rendered as "nothing here".
  const isBlocked =
    profile?.isPrivate === true && profile.followStatus !== "accepted";

  // The server has no session, so a private profile arrives redacted. Hold the
  // decision until the revalidation (which carries the Bearer token) lands,
  // otherwise an accepted follower would see the private state flash.
  const isResolvingAccess = profile?.isPrivate === true && isFetching;

  const {
    data: documents,
    isPending: isDocumentsPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAuthorDocuments(
    username,
    { limit: PAGE_SIZE },
    { enabled: !isBlocked && !isResolvingAccess },
  );

  const items = useMemo(() => {
    const seen = new Set<string>();
    return (documents?.pages.flatMap((page) => page.items) ?? []).filter(
      (item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      },
    );
  }, [documents]);

  const total = documents?.pages[0]?.total ?? 0;

  // The Server Component always hands over a copy, so this only narrows the
  // type; every hook above has already run.
  if (!profile) {
    return <AccessSkeleton />;
  }

  const joinedAt = formatJoinedAt(profile.createdAt);
  const label = profile.displayName || profile.username;

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        {profile.avatarUrl ? (
          // biome-ignore lint/performance/noImgElement: avatarUrl can come from an arbitrary API host; next/image would require a domain allowlist
          <img
            src={profile.avatarUrl}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full border border-border text-lg text-muted-foreground"
            aria-hidden
          >
            {(profile.displayName || profile.username).charAt(0).toUpperCase()}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-medium tracking-tight">{label}</h1>
            {profile.followStatus === "accepted" ? (
              <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Seguindo
              </span>
            ) : null}
            {profile.followStatus === "pending" ? (
              <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Solicitação pendente
              </span>
            ) : null}
          </div>

          <p className="font-mono text-sm text-muted-foreground">
            @{profile.username}
          </p>

          {profile.bio ? (
            <p className="max-w-prose text-sm text-foreground/90">
              {profile.bio}
            </p>
          ) : null}

          {joinedAt ? (
            <p className="text-xs text-muted-foreground">
              Membro desde {joinedAt}
            </p>
          ) : null}
        </div>
      </header>

      {isResolvingAccess ? (
        <AccessSkeleton />
      ) : isBlocked ? (
        <section className="flex flex-col items-start gap-2 border border-border p-6">
          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <Lock className="h-4 w-4" aria-hidden />
            Perfil privado
          </span>
          <p className="text-sm text-muted-foreground">
            Este perfil é privado. Bio e documentos só são visíveis para quem
            ele aprova como seguidor.
          </p>
        </section>
      ) : (
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Documentos publicados
          </h2>

          {isDocumentsPending ? (
            <DocumentsSkeleton />
          ) : items.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" aria-hidden />
              Nenhum documento publicado.
            </p>
          ) : (
            <>
              <p className="font-mono text-xs text-muted-foreground">
                {items.length} de {total}{" "}
                {total === 1 ? "documento" : "documentos"}
              </p>
              <ul className="flex flex-col gap-4">
                {items.map((document) => (
                  <li key={document.id}>
                    <DocumentFeedCard document={document} />
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center gap-2">
                {hasNextPage ? (
                  <Button
                    variant="outline"
                    onClick={() => void fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    {isFetchingNextPage ? "Carregando..." : "Carregar mais"}
                  </Button>
                ) : (
                  <p className="font-mono text-xs text-muted-foreground">
                    Você chegou ao fim.
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      )}
    </div>
  );
}

function AccessSkeleton() {
  return (
    <div className="flex flex-col gap-2 border border-border p-6">
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-3 w-full max-w-md" />
    </div>
  );
}

function DocumentsSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Carregando documentos</span>
      {["doc-1", "doc-2"].map((key) => (
        <div
          key={key}
          className="flex flex-col gap-3 border border-border/60 p-6"
        >
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}
