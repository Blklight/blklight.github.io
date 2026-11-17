"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { DocumentEditor } from "@/components/escrever/document-editor";
import { RequireAuth } from "@/components/require-auth";
import { kindBySlug } from "@/features/documents/document-kinds";

export default function EscreverTipoPage() {
  const { tipo } = useParams<{ tipo: string }>();
  const router = useRouter();
  const kind = kindBySlug(tipo);

  useEffect(() => {
    // Not a type: an old /escrever/<id> link, now served by /editar/<id>.
    if (!kind) router.replace(`/editar/${tipo}`);
  }, [kind, tipo, router]);

  if (!kind) return null;
  return (
    <RequireAuth>
      <DocumentEditor key={kind.slug} kind={kind} />
    </RequireAuth>
  );
}
