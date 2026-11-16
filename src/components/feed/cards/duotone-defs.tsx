import { TYPE_THEME } from "./card-theme";

const DARK = 0.145;

/** One SVG filter per document type: shadows go to ink, highlights to the type accent. */
export function DuotoneDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      className="absolute pointer-events-none"
    >
      <defs>
        {Object.entries(TYPE_THEME).map(([type, theme]) => (
          <filter
            key={type}
            id={`duo-${type}`}
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              type="matrix"
              values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues={`${DARK} ${theme.rgb[0]}`} />
              <feFuncG type="table" tableValues={`${DARK} ${theme.rgb[1]}`} />
              <feFuncB type="table" tableValues={`${DARK} ${theme.rgb[2]}`} />
            </feComponentTransfer>
          </filter>
        ))}
      </defs>
    </svg>
  );
}
