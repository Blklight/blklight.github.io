import type { Metadata } from "next";
import { DossierLab } from "./dossier-lab";

export const metadata: Metadata = { title: "Dossiê · Lab" };

export default function DossiePage() {
  return <DossierLab />;
}
