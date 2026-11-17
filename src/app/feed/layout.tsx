import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Feed",
  description: "Documentos publicados pela comunidade.",
};

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The page reads ?type= with useSearchParams, which needs a Suspense boundary.
  return <Suspense>{children}</Suspense>;
}
