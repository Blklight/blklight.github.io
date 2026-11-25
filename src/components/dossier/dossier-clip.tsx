export function DossierClip({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-foreground px-3 py-1 font-mono text-xs text-background shadow">
      <span aria-live="polite" aria-atomic="true">
        <span className="sr-only">Folha </span>
        {String(current).padStart(2, "0")}
        <span aria-hidden> / </span>
        <span className="sr-only"> de </span>
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
