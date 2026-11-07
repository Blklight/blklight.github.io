"use client";

import { DocumentEditor } from "@/components/escrever/document-editor";
import { RequireAuth } from "@/components/require-auth";

export default function EscreverPage() {
  return (
    <RequireAuth>
      <DocumentEditor />
    </RequireAuth>
  );
}
