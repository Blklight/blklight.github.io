import type { PlatformApp } from "@/types/api.types";

/** What a badge shows, whatever its model. */
export interface BadgeData {
  name: string;
  handle: string;
  avatarUrl?: string | null;
  /** ISO date the account was created. */
  memberSince: string;
  memberId: string;
  apps?: PlatformApp[];
}

/** draft: being built in onboarding; confirmed: onboarding just finished; none: someone else's badge. */
export type BadgeStatus = "draft" | "confirmed";

export interface BadgeModelProps {
  data: BadgeData;
  status?: BadgeStatus;
  className?: string;
}
