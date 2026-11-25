import Link from "next/link";
import GrainVsPaperLab from "@/components/GrainVsPaperLab";

const LABS = [
  { href: "/lab/cards", label: "Cards" },
  { href: "/lab/cracha", label: "Crachás" },
  { href: "/lab/artigo", label: "Artigo" },
  { href: "/lab/assinatura", label: "Assinatura" },
  { href: "/lab/tipografia", label: "Tipografia" },
  { href: "/lab/dossie", label: "Dossiê" },
];

export default function LabPage() {
  return (
    <div className="py-10">
      <nav aria-label="Labs" className="mb-10 flex justify-center gap-6">
        {LABS.map((lab) => (
          <Link
            key={lab.href}
            href={lab.href}
            className="font-mono text-sm uppercase tracking-wider underline-offset-4 hover:underline"
          >
            {lab.label}
          </Link>
        ))}
      </nav>
      <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight">
        FilmGrain vs Paper
      </h1>
      <p className="mb-8 text-center text-sm text-neutral-500">
        Mesma imagem / mesmo texto — só muda o efeito
      </p>
      <GrainVsPaperLab />
    </div>
  );
}
