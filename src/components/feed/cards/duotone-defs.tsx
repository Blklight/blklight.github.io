import { SURFACES, TYPE_THEME } from "./card-theme";

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
        {[
          ...Object.entries(TYPE_THEME),
          ...SURFACES.map((surface) => [surface.id, surface] as const),
        ].map(([type, theme]) => (
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
        {/* Brand gradient map (ink -> ultravioleta -> azul céu -> paper), TCC "blklightBlueskyWhiteBlack". */}
        <filter id="duo-brand" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.071 0.416 0.157 0.969" />
            <feFuncG type="table" tableValues="0.071 0.302 0.675 0.969" />
            <feFuncB type="table" tableValues="0.071 1 1 0.969" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  );
}
