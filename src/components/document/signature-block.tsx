import { DigitalSignature } from "@/components/digital-signature";
import {
  resolveSignature,
  type SignatureContext,
} from "@/features/documents/design/signature";

/** Only `enabled` is read from the saved signature (the switch). */
export interface SignatureBlockSignature {
  enabled: boolean;
}

/** Shown whenever the resolved name is not empty. */
export function isSignatureVisible(context: SignatureContext): boolean {
  // Always on: the signature is the authorship stamp of every document.
  return resolveSignature(context).name !== "";
}

/**
 * Document signature (reading page, design preview, editor, Assinatura tab),
 * always automatic (signature.ts). Visibility is decided by the caller
 * (isSignatureVisible). No "use client": usable from Server Components.
 */
export function SignatureBlock({
  context,
  color,
  background,
}: {
  context: SignatureContext;
  color?: string;
  background?: string;
}) {
  const resolved = resolveSignature(context);
  return (
    <DigitalSignature
      signature={resolved.name}
      registry={resolved.identifier}
      dateText={resolved.date}
      color={color}
      background={background}
    />
  );
}
