import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import {
  barlow,
  ebgaramond,
  inter,
  jetbrains,
  overpass,
  playfair,
  roboto,
} from "@/components/fonts";
import { LayoutBase } from "@/components/layout-base";

export const metadata: Metadata = {
  title: "All New Blklight",
  description: "Wireframes for the new Blklight website",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${barlow.variable} ${ebgaramond.variable} ${jetbrains.variable} ${playfair.variable} ${roboto.variable} ${overpass.variable} antialiased`}
      >
        <Providers>
          <LayoutBase>{children}</LayoutBase>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
