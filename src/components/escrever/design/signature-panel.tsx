"use client";

import { PenTool } from "lucide-react";
import { SignatureBlock } from "@/components/document/signature-block";
import type { DesignContext } from "./layout";

export function SignaturePanel({ design, signatureContext }: DesignContext) {
  const { paperColors } = design;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <PenTool className="w-4 h-4 text-foreground/60" />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
          Assinatura digital
        </span>
      </div>

      <p className="text-xs text-foreground/60 leading-relaxed">
        A assinatura acompanha todo documento publicado: seu nome, o
        identificador público e a data, preenchidos automaticamente.
      </p>

      <div className="p-3 border border-border rounded-xs bg-secondary/20">
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/60 block mb-2">
          Prévia
        </span>
        <SignatureBlock
          context={signatureContext ?? {}}
          color={paperColors?.text}
          background={paperColors?.bg}
        />
      </div>
    </div>
  );
}
