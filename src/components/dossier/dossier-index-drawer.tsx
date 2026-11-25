"use client";

import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

/** Small screens: the index slides in from the left, over the page. */
export function DossierIndexDrawer({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="border-0 bg-transparent p-2 pt-[calc(3.5625rem+0.5rem)] shadow-none data-[side=left]:w-auto data-[side=left]:sm:max-w-none data-[side=left]:data-ending-style:-translate-x-full data-[side=left]:data-starting-style:-translate-x-full"
      >
        <SheetTitle className="sr-only">Sumário</SheetTitle>
        {children}
      </SheetContent>
    </Sheet>
  );
}
