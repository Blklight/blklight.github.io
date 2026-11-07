import Link from "next/link";

export default function DocumentNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Document not found
      </p>
      <h1 className="text-2xl font-bold">Este documento não está disponível</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        O documento pode ter sido removido, não publicado ou o autor pode não
        existir mais.
      </p>
      <Link
        href="/"
        className="mt-2 text-xs font-mono uppercase tracking-widest border border-foreground/20 px-4 py-2 hover:border-accent/60 transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
