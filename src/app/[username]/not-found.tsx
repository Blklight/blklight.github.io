import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Profile not found
      </p>
      <h1 className="text-2xl font-bold">Este perfil não existe</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        O usuário pode ter mudado de nome ou sido removido. Um perfil privado
        continua acessível aqui — ele apenas oculta bio e documentos.
      </p>
      <Link
        href="/feed"
        className="mt-2 text-xs font-mono uppercase tracking-widest border border-foreground/20 px-4 py-2 hover:border-accent/60 transition-colors"
      >
        Ver o feed
      </Link>
    </div>
  );
}
