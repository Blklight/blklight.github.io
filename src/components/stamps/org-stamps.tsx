import { type CSSProperties, type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

/** What an organization stamp prints. Everything is display text. */
export interface OrgStampData {
  name: string;
  handle: string;
  city: string;
  /** Already formatted (e.g. "22·11·2026"). */
  date: string;
  /** Short date for the holo seal (e.g. "22/11/26"). */
  shortDate: string;
  ref: string;
  tagline: string;
  since: string;
  status: string;
}

interface StampProps {
  data: OrgStampData;
  /** Ink color; defaults to the surrounding text color. */
  color?: string;
  /** Degrees; stamps look hand-applied when slightly turned. */
  rotate?: number;
  /** Worn ink: specks and rough edges. */
  worn?: boolean;
  className?: string;
}

const round = (n: number) => Math.round(n * 10) / 10;

/** Closed path from a radius function around (cx, cy). */
function radialPath(
  cx: number,
  cy: number,
  radius: (theta: number) => [number, number],
  steps = 240,
) {
  const points = Array.from({ length: steps }, (_, i) => {
    const theta = (i / steps) * Math.PI * 2;
    const [rx, ry] = radius(theta);
    return `${round(cx + rx * Math.cos(theta))} ${round(cy + ry * Math.sin(theta))}`;
  });
  return `M${points.join("L")}Z`;
}

/** Squircle with a scalloped edge, like a wax seal. */
const waxPath = (r: number, amp: number, waves: number) =>
  radialPath(100, 100, (t) => {
    // Superellipse (n=4) radius, so the seal reads as a rounded square.
    const base =
      r / (Math.abs(Math.cos(t)) ** 4 + Math.abs(Math.sin(t)) ** 4) ** 0.25;
    const k = base * (1 + amp * Math.sin(waves * t));
    return [k, k];
  });

/** Cog with soft teeth and a slightly uneven rim. */
const gearPath = (r: number, depth: number, teeth: number) =>
  radialPath(
    100,
    100,
    (t) => {
      const tooth = 0.5 + 0.5 * Math.tanh(3 * Math.sin(teeth * t));
      const wobble = 1.2 * Math.sin(5 * t) + 0.8 * Math.sin(11 * t + 1);
      const k = r - depth * (1 - tooth) + wobble;
      return [k, k];
    },
    360,
  );

/** Triangle with rounded corners. */
function triPath(points: [number, number][], radius: number) {
  const n = points.length;
  const parts = points.map((p, i) => {
    const prev = points[(i - 1 + n) % n];
    const next = points[(i + 1) % n];
    const toward = (q: [number, number]) => {
      const dx = q[0] - p[0];
      const dy = q[1] - p[1];
      const len = Math.hypot(dx, dy);
      return [
        round(p[0] + (dx / len) * radius),
        round(p[1] + (dy / len) * radius),
      ];
    };
    const a = toward(prev);
    const b = toward(next);
    return `${i === 0 ? "M" : "L"}${a[0]} ${a[1]}Q${p[0]} ${p[1]} ${b[0]} ${b[1]}`;
  });
  return `${parts.join("")}Z`;
}

/** Monospace glyphs are ~0.6em wide: squeeze a line only when it would overflow. */
const fit = (text: string, size: number, max: number) =>
  text.length * size * 0.6 > max
    ? { textLength: max, lengthAdjust: "spacingAndGlyphs" as const }
    : {};

function Line({
  y,
  size = 10,
  max = 140,
  underline = false,
  children,
}: {
  y: number;
  size?: number;
  max?: number;
  underline?: boolean;
  children: string;
}) {
  const width = Math.min(children.length * size * 0.6, max);
  return (
    <>
      <text
        x={100}
        y={y}
        fontSize={size}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        letterSpacing="0.06em"
        {...fit(children, size, max)}
      >
        {children}
      </text>
      {underline && (
        <line x1={100 - width / 2} x2={100 + width / 2} y1={y + 3} y2={y + 3} />
      )}
    </>
  );
}

/** SVG frame shared by the drawn stamps: ink filter, stroke and rotation. */
function StampSvg({
  label,
  viewBox,
  color,
  rotate = 0,
  worn = true,
  className,
  children,
}: Omit<StampProps, "data"> & {
  label: string;
  viewBox: string;
  children: ReactNode;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={viewBox}
      className={cn("font-mono uppercase", className)}
      style={{ color, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {worn && (
        <filter id={`ink-${id}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.4"
            numOctaves="1"
            seed="7"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.8 1.9"
            result="specks"
          />
          <feComposite
            in="SourceGraphic"
            in2="specks"
            operator="in"
            result="inked"
          />
          <feTurbulence
            type="turbulence"
            baseFrequency="0.05"
            numOctaves="2"
            seed="3"
            result="warp"
          />
          <feDisplacementMap in="inked" in2="warp" scale="1" />
        </filter>
      )}
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        filter={worn ? `url(#ink-${id})` : undefined}
      >
        {children}
      </g>
    </svg>
  );
}

const square = (x: number, y: number) => (
  <rect
    x={x - 3}
    y={y - 3}
    width={6}
    height={6}
    fill="currentColor"
    stroke="none"
  />
);

/** Triangle: class of mail on top, organization in the middle, motto and founding at the base. */
export function TriangleStamp({ data, ...props }: StampProps) {
  return (
    <StampSvg
      {...props}
      label={`Carimbo de ${data.name}`}
      viewBox="0 0 200 178"
    >
      <path
        d={triPath(
          [
            [100, 6],
            [194, 172],
            [6, 172],
          ],
          14,
        )}
        strokeWidth={2}
      />
      {square(100, 30)}
      <Line y={58} size={9}>
        SELO
      </Line>
      <Line y={70} size={9}>
        OFICIAL
      </Line>
      <Line y={100} size={15} max={110}>
        {data.name}
      </Line>
      <Line y={132} size={9} max={130}>
        {data.tagline}
      </Line>
      <Line y={152} size={9} max={110}>{`DESDE ${data.since}`}</Line>
      {square(26, 158)}
      {square(174, 158)}
    </StampSvg>
  );
}

/** Wax seal: scalloped rim around a rounded square with city, year and status. */
export function WaxStamp({ data, ...props }: StampProps) {
  const year = data.date.slice(-4);
  return (
    <StampSvg {...props} label={`Selo de ${data.name}`} viewBox="0 0 200 200">
      <path d={waxPath(88, 0.035, 16)} strokeWidth={2} />
      <path d={waxPath(80, 0.03, 16)} strokeWidth={1} opacity={0.7} />
      <rect x={34} y={34} width={132} height={132} rx={20} strokeWidth={2} />
      <Line y={66} size={11} max={112} underline>
        {data.name}
      </Line>
      <Line y={92} size={11} max={120}>
        {data.city}
      </Line>
      <Line y={116} size={11}>{`▪▪▪ ${year} ▪▪▪`}</Line>
      <Line y={140} size={11} max={112}>
        {data.status}
      </Line>
      <Line y={156} size={9} max={100}>{`@${data.handle}`}</Line>
    </StampSvg>
  );
}

/** Cog: delivered by the organization, via Blklight. */
export function GearStamp({ data, ...props }: StampProps) {
  return (
    <StampSvg
      {...props}
      label={`Carimbo de entrega de ${data.name}`}
      viewBox="0 0 200 200"
    >
      <path d={gearPath(92, 9, 10)} strokeWidth={2} />
      <Line y={58} size={11}>
        ASSINADO
      </Line>
      <line x1={52} x2={86} y1={82} y2={81} />
      <rect x={88} y={70} width={24} height={24} rx={3} strokeWidth={2} />
      <path d="M95 76v12h10" strokeWidth={1.6} />
      <line x1={114} x2={148} y1={81} y2={82} />
      <Line y={116} size={11}>
        POR:
      </Line>
      <Line y={134} size={12} max={130}>
        {data.name}
      </Line>
      <Line y={156} size={10}>
        VIA: BLKLIGHT
      </Line>
    </StampSvg>
  );
}

/** Ruled postage label: city and date, sender, reference. HTML so it scales with text. */
export function LabelStamp({
  data,
  color,
  rotate = 0,
  className,
  style,
}: StampProps & { style?: CSSProperties }) {
  return (
    <div
      role="img"
      aria-label={`Etiqueta de ${data.name}, referência ${data.ref}`}
      className={cn(
        "w-44 border border-current font-mono text-[0.7rem] uppercase leading-tight",
        className,
      )}
      style={{
        color,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...style,
      }}
    >
      <div className="border-b border-current px-2 py-1.5 text-center tracking-wider">
        <p className="truncate">{data.city}</p>
        <p className="mt-0.5">{data.date.replace(/·/g, " ∘ ")}</p>
      </div>
      <div className="border-b border-current px-2 py-1.5">
        <p>De:</p>
        <p className="truncate underline underline-offset-2">{data.name}</p>
      </div>
      <div className="flex justify-between gap-2 px-2 py-1">
        <span>Ref</span>
        <span className="truncate">{data.ref}</span>
      </div>
    </div>
  );
}

const HOLO =
  "conic-gradient(from 210deg at 45% 55%, #f5c6d8, #c8d8ff, #a6f0e0, #fff2b3, #ffc2a8, #d9c2ff, #b8e6ff, #f5c6d8)";

/** Holographic oval sticker: organization on the top arc, date in the middle, ref below. */
export function HoloSeal({
  data,
  rotate = 0,
  tint,
  className,
}: Omit<StampProps, "color" | "worn"> & {
  /** Solid foil (e.g. orange) instead of the rainbow. */
  tint?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div
      role="img"
      aria-label={`Selo holográfico de ${data.name}, ${data.shortDate}, referência ${data.ref}`}
      className={cn(
        "relative aspect-[1.35] w-44 overflow-hidden rounded-[50%] shadow-[inset_0_2px_3px_rgb(255_255_255/0.7),inset_0_-3px_6px_rgb(0_0_0/0.25),0_6px_14px_-6px_rgb(0_0_0/0.5)]",
        className,
      )}
      style={{
        background: tint
          ? `radial-gradient(ellipse at 35% 30%, color-mix(in srgb, ${tint} 55%, white), ${tint} 55%, color-mix(in srgb, ${tint} 70%, black))`
          : HOLO,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgb(255_255_255/0.55)_45%,transparent_60%)] mix-blend-overlay"
      />
      <svg
        viewBox="0 0 270 200"
        className="relative size-full font-sans"
        aria-hidden="true"
      >
        <defs>
          <path id={`top-${id}`} d="M40 110 A95 78 0 0 1 230 110" />
          <path id={`bottom-${id}`} d="M44 106 A91 82 0 0 0 226 106" />
        </defs>
        <g
          fill="rgb(40 40 52 / 0.72)"
          style={{ filter: "drop-shadow(0 1px 0 rgb(255 255 255 / 0.7))" }}
          fontWeight={700}
          letterSpacing="0.08em"
        >
          <text fontSize={22}>
            <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">
              {data.name.toUpperCase()}
            </textPath>
          </text>
          <text
            fontSize={46}
            x={135}
            y={118}
            textAnchor="middle"
            letterSpacing="0"
          >
            {data.shortDate}
          </text>
          <text fontSize={20}>
            <textPath
              href={`#bottom-${id}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {`REF: ${data.ref}`}
            </textPath>
          </text>
          <circle cx={135} cy={52} r={4} />
          <circle cx={135} cy={144} r={4} />
        </g>
      </svg>
    </div>
  );
}

export const ORG_STAMPS = {
  triangle: TriangleStamp,
  wax: WaxStamp,
  gear: GearStamp,
} as const;
