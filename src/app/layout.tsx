import { GeistPixelCircle, GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Merriweather } from "next/font/google";
import { Html } from "@/components/html";
import { LayoutBase } from "@/components/layout-base";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Blklight",
  description: "Plataforma Blklight",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <Html
      className={cn(
        "antialiased",
        inter.variable,
        "font-mono",
        jetBrainsMono.variable,
        merriweather.variable,
        GeistPixelSquare.variable,
        GeistPixelCircle.variable,
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          themes={["light", "dark", "book", "system"]}
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              <LayoutBase>{children}</LayoutBase>
            </TooltipProvider>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </Html>
  );
}
