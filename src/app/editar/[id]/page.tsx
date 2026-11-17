"use client";

import { useParams } from "next/navigation";
import { DocumentEditor } from "@/components/escrever/document-editor";
import { RequireAuth } from "@/components/require-auth";
import { useMyDocument } from "@/features/documents/queries";

export default function EscreverDocumentPage() {
  return (
    <RequireAuth>
      <EscreverDocument />
    </RequireAuth>
  );
}

// Rendered only for authenticated visitors: the document query must not run
// for an anonymous one (and the editor must not flash before the redirect).
function EscreverDocument() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const { data, isPending, isError, error, refetch } = useMyDocument(
    id as string,
  );

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground border-t-transparent animate-spin" />
      </div>
    );
  }

  if (isError) {
    // The backend answers 404 with "Document not found" for both missing docs
    // and docs owned by someone else. Surface the real API message rather than
    // inventing a new one.
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message ?? "Nao foi possivel carregar o documento.";
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-6 h-6 border-2 border-foreground border-t-transparent" />
        <p className="text-xs font-mono uppercase tracking-widest text-foreground/60">
          {message}
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-xs font-mono uppercase tracking-widest border border-foreground/20 px-4 py-2 hover:border-accent/60 transition-colors cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data) return null;

  // Key by id so navigating between documents gets a fresh editor/design-store
  // session instead of reusing stale state.
  return <DocumentEditor key={data.id} initialValues={data} />;
}
