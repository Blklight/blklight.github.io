import { cn } from "@/lib/utils";

const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
];

/** Registration marks on the four corners of the parent (which must be `relative`). */
export function CornerBrackets({
  className,
  size = "size-2.5",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <>
      {CORNERS.map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={cn(
            "pointer-events-none absolute border-current",
            size,
            corner,
            className,
          )}
        />
      ))}
    </>
  );
}
