export function DossierClip({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="absolute top-[5%] left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-[3px] bg-[linear-gradient(180deg,oklch(0.82_0.01_250),oklch(0.6_0.01_250))] px-4 py-1.5 font-mono text-xs font-bold text-[oklch(0.2_0_0)] shadow-[0_3px_4px_rgb(0_0_0/0.45)]">
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-current opacity-60"
      />
      <span aria-live="polite" aria-atomic="true">
        <span className="sr-only">Folha </span>
        {String(current).padStart(2, "0")}
        <span aria-hidden> / </span>
        <span className="sr-only"> de </span>
        {String(total).padStart(2, "0")}
      </span>
      <span
        aria-hidden
        className="size-1.5 rounded-full bg-current opacity-60"
      />
    </div>
  );
}
