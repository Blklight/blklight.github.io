import { cn } from "@/lib/utils";
import type { SocialLink, SocialNetwork } from "./types";

const LABEL: Record<SocialNetwork, string> = {
  github: "GitHub",
  x: "X",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  bluesky: "Bluesky",
};

// Brand marks from svgl.app, saved in public/social. Black marks get a light variant on dark cards.
const ON_DARK: Partial<Record<SocialNetwork, string>> = {
  github: "/social/github-on-dark.svg",
  x: "/social/x-on-dark.svg",
};

interface Props {
  links: SocialLink[];
  /** true: card is always dark; "auto": card follows the theme. */
  onDark?: boolean | "auto";
  className?: string;
}

/** Social profile icons on a badge. Clicks open the link without flipping the card. */
export const SocialRow = ({ links, onDark = false, className }: Props) => (
  <ul className={cn("flex items-center gap-2.5", className)}>
    {links.map(({ network, url }) => (
      <li key={network}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={LABEL[network]}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="block rounded-xs p-0.5 opacity-85 transition-opacity hover:opacity-100 outline-none focus-visible:outline-2 focus-visible:outline-current"
        >
          {/* biome-ignore lint/performance/noImgElement: tiny static SVGs, no optimization to gain */}
          <img
            src={
              (onDark === true && ON_DARK[network]) || `/social/${network}.svg`
            }
            alt=""
            className={cn(
              "size-5",
              onDark === "auto" && ON_DARK[network] && "dark:hidden",
            )}
          />
          {onDark === "auto" && ON_DARK[network] && (
            // biome-ignore lint/performance/noImgElement: tiny static SVGs, no optimization to gain
            <img
              src={ON_DARK[network]}
              alt=""
              className="hidden size-5 dark:block"
            />
          )}
        </a>
      </li>
    ))}
  </ul>
);
