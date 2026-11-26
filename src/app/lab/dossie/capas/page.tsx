import type { Metadata } from "next";
import { CoverIdeas } from "./cover-ideas";

export const metadata: Metadata = { title: "Capas do dossiê · Lab" };

export default function CapasPage() {
  return <CoverIdeas />;
}
