"use client";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/useLanguageStore";

export const Html = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const language = useLanguageStore((s) => s.language);
  return (
    <html lang={language} suppressHydrationWarning className={cn(className)}>
      {children}
    </html>
  );
};
