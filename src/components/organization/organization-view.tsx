"use client";

import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { DocumentFeedCard } from "@/components/feed/document-feed-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useOrganization,
  useOrganizationDocuments,
} from "@/features/organizations/queries";
import type { Organization } from "@/types/api.types";

const PAGE_SIZE = 6;

interface OrganizationViewProps {
  orgname: string;
  /** Organization fetched by the Server Component; avoids a second round-trip. */
  initialOrganization: Organization;
}

/**
 * Public organization view: header (display name, @orgname, description) plus
 * the cursor-paginated list of documents published under the organization.
 *
 * Mirrors ProfileView, minus the private-access states: a private org the
 * viewer may not see answers 404 upstream, which the Server Component already
 * turned into `notFound()`.
 */
export function OrganizationView({
  orgname,
  initialOrganization,
}: OrganizationViewProps) {
  const t = useTranslations("organization");
  const tc = useTranslations("common");
  const { data: organization } = useOrganization(orgname, {
    initialData: initialOrganization,
  });

  const {
    data: documents,
    isPending: isDocumentsPending,
    isError: isDocumentsError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useOrganizationDocuments(orgname, { limit: PAGE_SIZE });

  // Defensive dedupe by id: publishing between two page requests can shift the
  // keyset cursor window and serve the same row twice.
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
  const label = organization?.name ?? initialOrganization.name;

  return (
    <div data-testid="org-page" className="flex flex-col gap-10">
      <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div
          className="flex h-16 w-16 items-center justify-center border border-border text-lg text-muted-foreground"
          aria-hidden
        >
          {label.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1
              data-testid="org-name"
              className="text-2xl font-medium tracking-tight"
            >
              {label}
            </h1>
            {initialOrganization.isPrivate ? (
              <span className="border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {t("private")}
              </span>
            ) : null}
          </div>

          <p className="font-mono text-sm text-muted-foreground">
            @{organization?.orgname ?? orgname}
          </p>

          {organization?.description ? (
            <p className="max-w-prose text-sm text-foreground/90">
              {organization.description}
            </p>
          ) : null}
        </div>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {tc("publishedDocs")}
        </h2>

        {isDocumentsPending ? (
          <DocumentsSkeleton />
        ) : isDocumentsError ? (
          <div
            data-testid="org-error"
            className="flex flex-col items-start gap-3 border border-border p-6"
          >
            <p className="text-sm text-muted-foreground">{t("loadError")}</p>
            <Button variant="outline" onClick={() => void refetch()}>
              {tc("retry")}
            </Button>
          </div>
        ) : items.length === 0 ? (
          <p
            data-testid="org-empty"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <FileText className="h-4 w-4" aria-hidden />
            {t("noDocs")}
          </p>
        ) : (
          <>
            <p className="font-mono text-xs text-muted-foreground">
              {tc("docsCount", { shown: items.length, total })}
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
                  data-testid="org-load-more"
                  onClick={() => void fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? tc("loading") : tc("loadMore")}
                </Button>
              ) : (
                <p className="font-mono text-xs text-muted-foreground">
                  {tc("reachedEnd")}
                </p>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function DocumentsSkeleton() {
  const tc = useTranslations("common");
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">{tc("loadingDocs")}</span>
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
