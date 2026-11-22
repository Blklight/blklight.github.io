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

/**
 * ink: crisp hand-drawn line, as if stamped.
 * emboss: pressed into the stock (light edge below, shadow above), for dark or colored paper.
 */
export type StampFinish = "ink" | "emboss";

interface StampProps {
  data: OrgStampData;
  /** Ink color; defaults to the surrounding text color. */
  color?: string;
  /** Degrees; stamps look hand-applied when slightly turned. */
  rotate?: number;
  finish?: StampFinish;
  className?: string;
}

const EMBOSS =
  "drop-shadow(0 1px 0 rgb(255 255 255 / 0.22)) drop-shadow(0 -1px 0 rgb(0 0 0 / 0.55))";

const round = (n: number) => Math.round(n * 10) / 10;

/** Slow, deterministic wobble: a hand-drawn line never stays on the exact curve. */
const wobble = (t: number, seed: number) =>
  0.9 * Math.sin(3 * t + seed) +
  0.55 * Math.sin(7 * t + seed * 2.3) +
  0.3 * Math.sin(13 * t + seed * 4.1);

/** Closed path from a radius function around (cx, cy). */
function radialPath(
  cx: number,
  cy: number,
  radius: (theta: number) => number,
  steps = 360,
) {
  const points = Array.from({ length: steps }, (_, i) => {
    const theta = (i / steps) * Math.PI * 2;
    const r = radius(theta);
    return `${round(cx + r * Math.cos(theta))} ${round(cy + r * Math.sin(theta))}`;
  });
  return `M${points.join("L")}Z`;
}

/** Rounded square with a few soft, uneven lobes: a wax seal's poured edge. */
const waxPath = (seed: number) =>
  radialPath(110, 110, (t) => {
    const squircle =
      86 / (Math.abs(Math.cos(t)) ** 5 + Math.abs(Math.sin(t)) ** 5) ** 0.2;
    // Twelve shallow scallops of slightly different heights, so it never looks machined.
    const lobe = Math.sin(12 * t + 0.4) * (3.4 + 0.9 * Math.sin(5 * t + 1));
    return squircle + lobe + wobble(t, seed) * 0.6;
  });

/** Round body with eight notches cut in, like a cog-shaped rubber stamp. */
const gearPath = (seed: number) =>
  radialPath(110, 110, (t) => {
    const notch = Math.max(0, Math.cos(8 * t + 0.2)) ** 6;
    return 98 - 11 * notch + wobble(t, seed);
  });

/** Triangle with soft corners; `seed` nudges the corners for the retrace. */
function triPath(seed: number) {
  const j = (k: number) => Math.sin(seed * 3.7 + k) * 1.2;
  const points: [number, number][] = [
    [110 + j(1), 10 + j(2)],
    [212 + j(3), 184 + j(4)],
    [8 + j(5), 184 + j(6)],
  ];
  const radius = 24 + j(7);
  const parts = points.map((p, i) => {
    const prev = points[(i + 2) % 3];
    const next = points[(i + 1) % 3];
    const toward = (q: [number, number]) => {
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
      return `${round(p[0] + ((q[0] - p[0]) / len) * radius)} ${round(p[1] + ((q[1] - p[1]) / len) * radius)}`;
    };
    return `${i === 0 ? "M" : "L"}${toward(prev)}Q${p[0]} ${p[1]} ${toward(next)}`;
  });
  return `${parts.join("")}Z`;
}

/** Monospace glyphs are ~0.62em wide with the tracking: squeeze only when a line would overflow. */
const textWidth = (text: string, size: number) => text.length * size * 0.68;

function Line({
  y,
  size = 12,
  max = 150,
  underline = false,
  children,
}: {
  y: number;
  size?: number;
  max?: number;
  underline?: boolean;
  children: string;
}) {
  const width = Math.min(textWidth(children, size), max);
  const squeeze =
    textWidth(children, size) > max
      ? { textLength: max, lengthAdjust: "spacingAndGlyphs" as const }
      : {};
  return (
    <>
      <text
        x={110}
        y={y}
        fontSize={size}
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        letterSpacing="0.08em"
        {...squeeze}
      >
        {children}
      </text>
      {underline && (
        <path
          d={`M${round(110 - width / 2)} ${y + 4}l${round(width)} 0.6`}
          strokeWidth={1.2}
        />
      )}
    </>
  );
}

/** Outline drawn twice: the stamp's edge plus a faint retrace a hair off it. */
const Outline = ({ d, retrace }: { d: string; retrace: string }) => (
  <>
    <path d={d} strokeWidth={1.8} />
    <path d={retrace} strokeWidth={0.7} opacity={0.55} />
  </>
);

/** SVG frame shared by the drawn stamps: color, finish and rotation. */
function StampSvg({
  label,
  color,
  rotate = 0,
  finish = "ink",
  className,
  children,
}: Omit<StampProps, "data"> & { label: string; children: ReactNode }) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 220 220"
      className={cn("font-mono uppercase", className)}
      style={{
        color,
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        filter: finish === "emboss" ? EMBOSS : undefined,
      }}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </g>
    </svg>
  );
}

const square = (x: number, y: number) => (
  <rect
    x={x - 3.5}
    y={y - 3.5}
    width={7}
    height={7}
    fill="currentColor"
    stroke="none"
  />
);

/** Triangle: mark on top, organization in the middle, motto and founding at the base. */
export function TriangleStamp({ data, ...props }: StampProps) {
  return (
    <StampSvg {...props} label={`Carimbo de ${data.name}`}>
      <g transform="translate(0 14)">
        <Outline d={triPath(0)} retrace={triPath(1)} />
        {square(110, 38)}
        <Line y={68} size={11} max={60}>
          SELO
        </Line>
        <Line y={82} size={11} max={76}>
          OFICIAL
        </Line>
        <Line y={118} size={15} max={104}>
          {data.name}
        </Line>
        <Line y={150} size={11} max={150}>
          {data.tagline}
        </Line>
        <Line y={170} size={11} max={130}>
          {`DESDE ${data.since}`}
        </Line>
        {square(32, 170)}
        {square(188, 170)}
      </g>
    </StampSvg>
  );
}

/** Wax seal: poured edge around a rounded square with name, city, year and status. */
export function WaxStamp({ data, ...props }: StampProps) {
  const year = data.date.slice(-4);
  const [first, ...rest] = data.status.split(" ");
  const status = rest.length > 0 ? [first, rest.join(" ")] : [first];
  return (
    <StampSvg {...props} label={`Selo de ${data.name}`}>
      <Outline d={waxPath(0)} retrace={waxPath(2)} />
      <rect x={47} y={47} width={126} height={126} rx={26} strokeWidth={1.8} />
      <Line y={74} size={12} max={104} underline>
        {data.name}
      </Line>
      <Line y={100} size={12} max={112}>
        {data.city}
      </Line>
      <Line y={126} size={12} max={112}>
        {`▪▪▪ ${year} ▪▪▪`}
      </Line>
      {status.map((line, i) => (
        <Line
          key={line}
          y={(status.length > 1 ? 150 : 156) + i * 17}
          size={12}
          max={104}
        >
          {line}
        </Line>
      ))}
    </StampSvg>
  );
}

/** Cog: signed by the organization, via Blklight. */
export function GearStamp({ data, ...props }: StampProps) {
  return (
    <StampSvg {...props} label={`Carimbo de entrega de ${data.name}`}>
      <Outline d={gearPath(0)} retrace={gearPath(3)} />
      <Line y={66} size={13}>
        ASSINADO
      </Line>
      <path d="M58 92.5 L94 91.5" strokeWidth={1.4} />
      <rect x={97} y={79} width={26} height={26} rx={3} strokeWidth={1.8} />
      <rect x={103} y={85} width={14} height={14} rx={1.5} strokeWidth={1.2} />
      <path d="M126 91.5 L162 92.5" strokeWidth={1.4} />
      <Line y={130} size={13}>
        POR:
      </Line>
      <Line y={150} size={13} max={150}>
        {data.name}
      </Line>
      <Line y={174} size={12}>
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
  finish = "ink",
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
        filter: finish === "emboss" ? EMBOSS : undefined,
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
}: Omit<StampProps, "color" | "finish"> & {
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
