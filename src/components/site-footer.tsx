import Image from "next/image";
import Link from "next/link";

const FOCUS =
  "rounded-xs outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

const stripes = (a: string, b: string, w = 14) =>
  `repeating-linear-gradient(-45deg, var(--color-${a}) 0 ${w}px, var(--color-${b}) ${w}px ${w * 2}px)`;

// Color band over the footer: striped blocks, then solid ones (the type inks).
const BAND = [
  { grow: 3, bg: stripes("bluesky-400", "magenta-400") },
  { grow: 1, bg: stripes("orange-500", "dark", 18) },
  { grow: 2.5, bg: stripes("cyber-yellow-400", "blklight-400", 20) },
  { grow: 3, bg: "var(--color-cyber-yellow-400)" },
  { grow: 1, bg: "var(--color-crimson-400)" },
  { grow: 1, bg: "var(--color-bluesky-400)" },
];

const COLUMNS: { title: string; links: { label: string; href?: string }[] }[] =
  [
    {
      title: "Ler",
      links: [
        { label: "Feed", href: "/feed" },
        { label: "Artigos", href: "/feed?type=article" },
        { label: "Tutoriais", href: "/feed?type=tutorial" },
        { label: "Projetos", href: "/feed?type=project" },
      ],
    },
    {
      title: "Conta",
      links: [
        { label: "Entrar", href: "/auth" },
        { label: "Criar conta", href: "/auth?mode=register" },
      ],
    },
    {
      title: "Em breve",
      links: [{ label: "Notas" }, { label: "Journals" }, { label: "Livros" }],
    },
  ];

// Horizontal rules clipped to the letters, sized in em so they scale with the type.
const RULED =
  "repeating-linear-gradient(to bottom, var(--foreground) 0 0.032em, transparent 0.032em 0.052em)";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-foreground">
      <div aria-hidden className="flex h-20 md:h-36 border-b border-foreground">
        {BAND.map((block) => (
          <div
            key={block.bg}
            style={{ flexGrow: block.grow, background: block.bg }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[1.7fr_1fr_1fr_1fr] border-b border-foreground">
        <div className="sm:col-span-3 lg:col-span-1 flex flex-col gap-6 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-foreground">
          <Link href="/" className={`inline-flex items-center gap-3 ${FOCUS}`}>
            <Image
              src="/blklight-black.svg"
              alt=""
              width={36}
              height={36}
              className="dark:invert"
            />
            <span className="font-sans text-4xl font-black tracking-tighter">
              Blklight
            </span>
          </Link>
          <p className="max-w-sm text-muted-foreground">
            Escreva, dê forma ao papel e publique no seu perfil.
          </p>
          <Link
            href="/auth?mode=register"
            className={`self-start bg-cyber-yellow-400 px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-dark hover:bg-cyber-yellow-500 transition-colors ${FOCUS}`}
          >
            Criar conta &gt;&gt;&gt;
          </Link>
          <p className="mt-auto font-mono text-xs uppercase tracking-wider">
            © Blklight
          </p>
        </div>

        {COLUMNS.map((column, i) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="p-6 md:p-10 border-b sm:border-b-0 sm:border-r last:border-r-0 last:border-b-0 border-foreground"
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {String(i + 1).padStart(2, "0")} / {column.title}
            </p>
            <ul className="space-y-3 font-mono text-sm uppercase tracking-wider">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className={`hover:underline underline-offset-4 ${FOCUS}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="overflow-hidden border-b border-foreground px-6 md:px-10 py-6 md:py-10">
        <p
          aria-hidden
          className="font-sans font-black tracking-tighter leading-[0.85] pb-[0.16em] text-[clamp(3rem,24vw,24rem)] text-transparent bg-clip-text select-none"
          style={{ backgroundImage: RULED }}
        >
          Blklight
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 bg-muted px-6 md:px-10 py-3 font-mono text-xs uppercase tracking-wider">
        <span>Escreva · Dê forma · Publique</span>
        <span>Feito no Brasil</span>
      </div>
    </footer>
  );
}
