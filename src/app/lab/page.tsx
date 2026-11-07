// app/lab/page.tsx
import GrainVsPaperLab from "@/components/GrainVsPaperLab";

export default function LabPage() {
  return (
    <div className="py-10">
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
