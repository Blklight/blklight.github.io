import { describe, expect, it } from "vitest";
import { isSignatureVisible } from "@/components/document/signature-block";
import { resolveSignature } from "@/features/documents/design/signature";

const context = {
  author: { username: "ana", displayName: "Ana Ribeiro", avatarUrl: null },
  organization: { id: "o1", orgname: "aurora", name: "República da Aurora" },
  authorship: { publicIdentifier: "PLT-12345678.9abcdef0" },
  publishedAt: "2026-11-16T12:00:00.000Z",
};

describe("signature", () => {
  it("is visible on every document with an author name", () => {
    expect(isSignatureVisible(context)).toBe(true);
  });

  it("is hidden only when there is no name to sign with", () => {
    expect(isSignatureVisible({})).toBe(false);
  });

  it("leaves the organization out", () => {
    const resolved = resolveSignature(context);
    expect(resolved).not.toHaveProperty("organization");
    expect(resolved.name).toBe("Ana Ribeiro");
    expect(resolved.identifier).toBe("PLT-12345678.9abcdef0");
    expect(resolved.date).toBe("16/11/2026");
  });
});
