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
 * engrave: cut into a foil (dark groove, bright lip below), for the holographic seals.
 */
export type StampFinish = "ink" | "emboss" | "engrave";

interface StampProps {
  data: OrgStampData;
  /** Ink color; defaults to the surrounding text color. */
  color?: string;
  /** Degrees; stamps look hand-applied when slightly turned. */
  rotate?: number;
  finish?: StampFinish;
  className?: string;
}

const FINISH: Record<StampFinish, string | undefined> = {
  ink: undefined,
  emboss:
    "drop-shadow(0 1px 0 rgb(255 255 255 / 0.22)) drop-shadow(0 -1px 0 rgb(0 0 0 / 0.55))",
  engrave:
    "drop-shadow(0 1px 0 rgb(255 255 255 / 0.75)) drop-shadow(0 -0.5px 0 rgb(0 0 0 / 0.35))",
};

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

/** Polygon with soft corners; `seed` nudges the corners for the retrace. */
function polyPath(corners: [number, number][], radius: number, seed: number) {
  const j = (k: number) => Math.sin(seed * 3.7 + k) * 1.2;
  const points = corners.map(([x, y], i): [number, number] => [
    x + j(i * 2 + 1),
    y + j(i * 2 + 2),
  ]);
  const r = radius + j(9);
  const n = points.length;
  const parts = points.map((p, i) => {
    const prev = points[(i + n - 1) % n];
    const next = points[(i + 1) % n];
    const toward = (q: [number, number]) => {
      const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
      return `${round(p[0] + ((q[0] - p[0]) / len) * r)} ${round(p[1] + ((q[1] - p[1]) / len) * r)}`;
    };
    return `${i === 0 ? "M" : "L"}${toward(prev)}Q${round(p[0])} ${round(p[1])} ${toward(next)}`;
  });
  return `${parts.join("")}Z`;
}

const triPath = (seed: number) =>
  polyPath(
    [
      [110, 10],
      [212, 184],
      [8, 184],
    ],
    24,
    seed,
  );

/** The Blklight mark is nested diamonds: `inset` steps in from the outer one. */
const diamondPath = (seed: number, inset = 0) =>
  polyPath(
    [
      [110, 6 + inset],
      [214 - inset, 110],
      [110, 214 - inset],
      [6 + inset, 110],
    ],
    inset ? 10 : 16,
    seed,
  );

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
        filter: FINISH[finish],
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

const diamond = (y: number, size: number) => (
  <rect
    x={110 - size / 2}
    y={y - size / 2}
    width={size}
    height={size}
    transform={`rotate(45 110 ${y})`}
    fill="currentColor"
    stroke="none"
  />
);

/** The Blklight mark as a stamp: nested diamonds, a solid diamond at each tip, data in the middle. */
export function DiamondStamp({ data, ...props }: StampProps) {
  return (
    <StampSvg {...props} label={`Carimbo de ${data.name}`}>
      <Outline d={diamondPath(0)} retrace={diamondPath(2)} />
      <path d={diamondPath(1, 16)} strokeWidth={1} opacity={0.8} />
      {diamond(44, 9)}
      {diamond(176, 9)}
      <Line y={80} size={10} max={70}>
        BLKLIGHT
      </Line>
      <Line y={106} size={14} max={126}>
        {data.name}
      </Line>
      <Line y={126} size={11} max={118}>
        {data.date.replace(/·/g, " · ")}
      </Line>
      <Line y={146} size={10} max={84}>
        {data.ref}
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
        filter: FINISH[finish],
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

const SHEEN =
  "linear-gradient(115deg, transparent 30%, rgb(255 255 255 / 0.5) 45%, transparent 60%)";

const foil = (tint?: string) =>
  tint
    ? `${SHEEN}, radial-gradient(ellipse at 35% 30%, color-mix(in srgb, ${tint} 55%, white), ${tint} 55%, color-mix(in srgb, ${tint} 75%, black))`
    : `${SHEEN}, ${HOLO}`;

/** Grooves cut into the foil: dark, translucent, so the foil shows through. */
const GROOVE = "rgb(38 38 50 / 0.62)";

export const ORG_STAMPS = {
  triangle: TriangleStamp,
  wax: WaxStamp,
  gear: GearStamp,
  diamond: DiamondStamp,
} as const;

export type StampShape = keyof typeof ORG_STAMPS;

/** Silhouette of each drawn stamp, used to cut the foil to the same shape. */
const SILHOUETTE: Record<StampShape, string> = {
  triangle: `<path transform='translate(0 14)' d='${triPath(0)}'/>`,
  wax: `<path d='${waxPath(0)}'/>`,
  gear: `<path d='${gearPath(0)}'/>`,
  diamond: `<path d='${diamondPath(0)}'/>`,
};

const maskOf = (shape: StampShape) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 220'>${SILHOUETTE[shape]}</svg>`,
  )}")`;

/**
 * Holographic seal: a foil sticker lying flat on the paper, with the stamp
 * engraved into it. `shape` reuses a stamp's outline; "oval" is the classic
 * date sticker.
 */
export function HoloSeal({
  data,
  shape = "oval",
  rotate = 0,
  tint,
  className,
}: Omit<StampProps, "color" | "finish"> & {
  shape?: "oval" | StampShape;
  /** Solid foil (e.g. orange, silver) instead of the rainbow. */
  tint?: string;
}) {
  const id = useId().replace(/:/g, "");
  const transform = rotate ? `rotate(${rotate}deg)` : undefined;

  if (shape !== "oval") {
    const Stamp = ORG_STAMPS[shape];
    const mask = maskOf(shape);
    return (
      <div
        className={cn("relative aspect-square w-44", className)}
        style={{ transform }}
      >
        {/* Contact shadow only: the sticker is stuck down, not floating. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: foil(tint),
            maskImage: mask,
            WebkitMaskImage: mask,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
            filter: "drop-shadow(0 0.5px 0.5px rgb(0 0 0 / 0.35))",
          }}
        />
        <Stamp
          data={data}
          finish="engrave"
          color={GROOVE}
          className="relative size-full"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Selo holográfico de ${data.name}, ${data.shortDate}, referência ${data.ref}`}
      className={cn(
        "relative aspect-[1.35] w-44 overflow-hidden rounded-[50%] shadow-[0_0.5px_1px_rgb(0_0_0/0.35),inset_0_0_0_1px_rgb(0_0_0/0.12),inset_0_1px_1px_rgb(255_255_255/0.6)]",
        className,
      )}
      style={{ background: foil(tint), transform }}
    >
      <svg
        viewBox="0 0 270 200"
        className="relative size-full font-mono uppercase"
        aria-hidden="true"
        style={{ filter: FINISH.engrave }}
      >
        <defs>
          <path id={`top-${id}`} d="M52 110 A83 70 0 0 1 218 110" />
          <path id={`bottom-${id}`} d="M56 104 A79 72 0 0 0 214 104" />
        </defs>
        <ellipse
          cx={135}
          cy={100}
          rx={124}
          ry={88}
          fill="none"
          stroke={GROOVE}
          strokeWidth={1.6}
        />
        <g fill={GROOVE} letterSpacing="0.08em">
          <text fontSize={20}>
            <textPath href={`#top-${id}`} startOffset="50%" textAnchor="middle">
              {data.name}
            </textPath>
          </text>
          <text
            fontSize={40}
            x={135}
            y={116}
            textAnchor="middle"
            letterSpacing="0.02em"
          >
            {data.shortDate}
          </text>
          <text fontSize={18}>
            <textPath
              href={`#bottom-${id}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {`REF: ${data.ref}`}
            </textPath>
          </text>
          <circle cx={135} cy={60} r={3.5} />
          <circle cx={135} cy={144} r={3.5} />
        </g>
      </svg>
    </div>
  );
}
