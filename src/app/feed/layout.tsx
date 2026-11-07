import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "Documentos publicados pela comunidade.",
};

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
