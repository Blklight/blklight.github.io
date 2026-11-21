import type { PlatformApp } from "@/types/api.types";

export type SocialNetwork =
  | "github"
  | "x"
  | "linkedin"
  | "instagram"
  | "bluesky";

export interface SocialLink {
  network: SocialNetwork;
  url: string;
}

/** What a badge shows, whatever its model. */
export interface BadgeData {
  name: string;
  handle: string;
  avatarUrl?: string | null;
  /** ISO date the account was created. */
  memberSince: string;
  memberId: string;
  apps?: PlatformApp[];
  socials?: SocialLink[];
  /** Optional tint (CSS color) for models that support one, e.g. holo-card. */
  accent?: string;
}

/** draft: being built in onboarding; confirmed: onboarding just finished; none: someone else's badge. */
export type BadgeStatus = "draft" | "confirmed";

export interface BadgeModelProps {
  data: BadgeData;
  status?: BadgeStatus;
  className?: string;
}
