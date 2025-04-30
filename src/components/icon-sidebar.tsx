"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, GalleryVerticalEnd, Plus } from "lucide-react";
import Link from "next/link";

export const IconSidebar = () => {
  return (
    <div className="flex flex-col md:h-svh md:sticky md:top-0 gap-4 items-center md:py-5 p-2.5 px-2.5">
      <Button size={"icon"} className="" asChild>
        <Link href="/">
          <Image
            src="/blklight-light.svg"
            className="!max-w-none mx-auto size-8"
            width="32"
            height="32"
            alt="Ultimate Mercer Logo"
          />
        </Link>
      </Button>

      {/* <Button variant={"secondary"} size={"icon"}>
        <GalleryVerticalEnd className="w-4 h-4" />
      </Button>
      <Button variant={"secondary"} size={"icon"}>
        <GalleryVerticalEnd className="w-4 h-4" />
      </Button>
      <Button variant={"secondary"} size={"icon"}>
        <GalleryVerticalEnd className="w-4 h-4" />
      </Button>
      <Button variant={"secondary"} size={"icon"}>
        <Plus className="w-4 h-4" />
      </Button>
      <Button variant={"secondary"} size={"icon"} className="mt-auto">
        <EllipsisVertical className="w-4 h-4" />
      </Button> */}
    </div>
  );
};
