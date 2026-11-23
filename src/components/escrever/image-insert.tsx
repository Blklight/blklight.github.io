"use client";

import type { EditorView } from "@tiptap/pm/view";
import type { Editor } from "@tiptap/react";
import { ImageUp } from "lucide-react";
import { useRef, useState } from "react";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IMAGE_ACCEPT, uploadWithToast } from "@/features/uploads/api";

/** Image files among pasted or dropped files. */
export function imageFiles(files: FileList | null | undefined): File[] {
  return Array.from(files ?? []).filter((file) =>
    file.type.startsWith("image/"),
  );
}

/**
 * Upload a file and insert it as an image block, at `pos` (drop point) or at
 * the selection. Shows progress and errors as toasts.
 */
export async function uploadAndInsert(
  view: EditorView,
  file: File,
  pos?: number,
  alt?: string,
) {
  const uploaded = await uploadWithToast(file, "editor", {
    loading: "Enviando imagem…",
    success: "Imagem enviada",
  });
  if (!uploaded) return;
  if (view.isDestroyed) return;

  const { state } = view;
  const node = state.schema.nodes.image?.create({
    src: uploaded.url,
    alt: alt || null,
  });
  if (!node) return;
  const at =
    pos === undefined ? undefined : Math.min(pos, state.doc.content.size);
  const tr =
    at === undefined
      ? state.tr.replaceSelectionWith(node)
      : state.tr.replaceRangeWith(at, at, node);
  view.dispatch(tr.scrollIntoView());
}

interface ImageInsertState {
  editor: Editor | null;
  open: (editor: Editor) => void;
  close: () => void;
}

/** Lets the static block list ("+" and "/") open the dialog for an editor. */
export const useImageInsertStore = create<ImageInsertState>((set) => ({
  editor: null,
  open: (editor) => set({ editor }),
  close: () => set({ editor: null }),
}));

/** "Imagem" block dialog: upload a file or paste an external URL (imgur etc.). */
export function ImageInsertDialog() {
  const { editor, close } = useImageInsertStore();
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  const finish = () => {
    setUrl("");
    setAlt("");
    close();
  };

  const insertUrl = () => {
    const src = url.trim();
    if (editor && src)
      editor
        .chain()
        .focus()
        .setImage({ src, alt: alt.trim() || undefined })
        .run();
    finish();
  };

  return (
    <Dialog open={editor !== null} onOpenChange={(open) => !open && finish()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Inserir imagem</DialogTitle>
          <DialogDescription>
            Envie um arquivo (otimizado automaticamente) ou cole a URL de uma
            imagem. Você também pode colar ou arrastar imagens direto no texto.
          </DialogDescription>
        </DialogHeader>

        <Input
          value={alt}
          onChange={(event) => setAlt(event.target.value)}
          placeholder="Descrição da imagem (para leitores de tela)"
          aria-label="Descrição da imagem"
        />

        <input
          ref={fileInput}
          type="file"
          accept={IMAGE_ACCEPT}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (editor && file)
              void uploadAndInsert(editor.view, file, undefined, alt.trim());
            finish();
          }}
        />
        <Button variant="outline" onClick={() => fileInput.current?.click()}>
          <ImageUp className="size-4" />
          Enviar arquivo
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          ou
          <span className="h-px flex-1 bg-border" />
        </div>

        <Input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="https://i.imgur.com/imagem.jpg"
          aria-label="URL da imagem"
          onKeyDown={(event) => {
            if (event.key === "Enter") insertUrl();
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={finish}>
            Cancelar
          </Button>
          <Button onClick={insertUrl} disabled={!url.trim()}>
            Inserir URL
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
