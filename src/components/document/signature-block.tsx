import { DigitalSignature } from "@/components/digital-signature";
import {
  resolveSignature,
  type SignatureContext,
} from "@/features/documents/design/signature";

/** Only `enabled` is read from the saved signature (the switch). */
export interface SignatureBlockSignature {
  enabled: boolean;
}

/** Shown when enabled and the resolved name is not empty. */
export function isSignatureVisible(
  signature: SignatureBlockSignature | null | undefined,
  context: SignatureContext,
): boolean {
  return !!signature?.enabled && resolveSignature(context).name !== "";
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
      organization={resolved.organization}
      color={color}
      background={background}
    />
  );
}
