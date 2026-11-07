"use client";

import { PenTool } from "lucide-react";
import { SignatureBlock } from "@/components/document/signature-block";
import { cn } from "@/lib/utils";
import type { DesignContext } from "./layout";

export function SignaturePanel({ design, signatureContext }: DesignContext) {
  const { documentSignature, setDocumentSignature, paperColors } = design;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <PenTool className="w-4 h-4 text-foreground/40" />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
          Assinatura Digital
        </span>
      </div>

      {/* Enable toggle (the only control: the signature is always automatic) */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-foreground/60">
          Ativar Assinatura
        </span>
        <button
          type="button"
          onClick={() =>
            setDocumentSignature({
              ...documentSignature,
              enabled: !documentSignature.enabled,
            })
          }
          className={cn(
            "w-10 h-5 rounded-full transition-colors relative",
            documentSignature.enabled ? "bg-foreground" : "bg-foreground/20",
          )}
        >
          <span
            className={cn(
              "absolute top-0.5 w-4 h-4 rounded-full bg-background transition-transform",
              documentSignature.enabled ? "translate-x-5" : "translate-x-0.5",
            )}
          />
        </button>
      </div>

      {documentSignature.enabled && (
        <>
          <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
            Preenchida automaticamente com seus dados.
          </p>

          {/* Preview */}
          <div className="mt-2 p-3 border border-border rounded-xs bg-secondary/20">
            <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/30 block mb-2">
              Preview
            </span>
            <SignatureBlock
              context={signatureContext ?? {}}
              color={paperColors?.text}
              background={paperColors?.bg}
            />
          </div>
        </>
      )}
    </div>
  );
}
