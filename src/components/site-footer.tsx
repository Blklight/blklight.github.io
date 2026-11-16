import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/feed", label: "Feed" },
  { href: "/auth", label: "Entrar" },
  { href: "/auth?mode=register", label: "Criar conta" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
          >
            <Image
              src="/blklight-black.svg"
              alt=""
              width={20}
              height={20}
              className="dark:invert"
            />
            <span className="font-sans font-bold tracking-tight">Blklight</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            Escreva, dê forma ao papel e publique.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="max-w-7xl mx-auto mt-10 text-xs text-muted-foreground">
        © Blklight. Notas, journals e livros chegam em breve.
      </p>
    </footer>
  );
}
