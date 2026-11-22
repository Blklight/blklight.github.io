import { ClassicBadge } from "./classic-badge";
import { FactoryBadge } from "./factory-badge";
import { HoloBadge } from "./holo-badge";
import { HoloCardBadge } from "./holo-card-badge";
import { LabBadge } from "./lab-badge";
import { OpsBadge } from "./ops-badge";
import { PosterBadge } from "./poster-badge";
import { SpecBadge } from "./spec-badge";
import type { BadgeModelProps } from "./types";

export type {
  BadgeData,
  BadgeModelProps,
  BadgeStatus,
  SocialLink,
  SocialNetwork,
} from "./types";

/** Every badge model takes the same data, so any of them can show any member (onboarding, profile, search). */
export const BADGE_MODELS = {
  classic: ClassicBadge,
  holo: HoloBadge,
  "holo-card": HoloCardBadge,
  poster: PosterBadge,
  factory: FactoryBadge,
  ops: OpsBadge,
  spec: SpecBadge,
  lab: LabBadge,
} as const;

export type BadgeModel = keyof typeof BADGE_MODELS;

export const Badge = ({
  model = "classic",
  ...props
}: BadgeModelProps & { model?: BadgeModel }) => {
  const Model = BADGE_MODELS[model];
  return <Model {...props} />;
};
