import type { ComponentType } from "react";
import type { BentoSize } from "@/components/bento/bento-layout";
import {
  CoverCard,
  HeadlineCard,
  MediaCard,
  PaperCard,
  StampCard,
  TextCard,
} from "../feed-cards";
import type { CardProps } from "../shell";
import { TemplateCard } from "./_template";
import { EnvelopeCard } from "./envelope-card";
import { FichaCard } from "./ficha-card";
import { FieldReportCard } from "./field-report-card";
import { HudCard } from "./hud-card";
import { JornalCard } from "./jornal-card";
import { LinhasCard } from "./linhas-card";
import { PastaCard } from "./pasta-card";
import { PostalCard } from "./postal-card";

export interface LabCard {
  id: string;
  label: string;
  component: ComponentType<CardProps>;
  /** Sizes the card is designed for; the lab shows only these. */
  sizes: BentoSize[];
  /** True when the feed already draws it. */
  inFeed?: boolean;
}

const ALL: BentoSize[] = ["1x1", "2x1", "1x2", "2x2"];

/** Every card model, for /lab/cards. A new card is a new file plus one line here. */
export const LAB_CARDS: LabCard[] = [
  { id: "template", label: "template", component: TemplateCard, sizes: ALL },
  { id: "ficha", label: "ficha técnica", component: FichaCard, sizes: ALL },
  {
    id: "field-report",
    label: "field report",
    component: FieldReportCard,
    sizes: ALL,
  },
  { id: "jornal", label: "jornal", component: JornalCard, sizes: ALL },
  { id: "pasta", label: "pasta", component: PastaCard, sizes: ALL },
  { id: "linhas", label: "linhas", component: LinhasCard, sizes: ALL },
  { id: "hud", label: "hud", component: HudCard, sizes: ALL },
  { id: "postal", label: "postal", component: PostalCard, sizes: ALL },
  { id: "envelope", label: "envelope", component: EnvelopeCard, sizes: ALL },
  {
    id: "text",
    label: "text",
    component: TextCard,
    sizes: ["1x1"],
    inFeed: true,
  },
  {
    id: "paper",
    label: "paper",
    component: PaperCard,
    sizes: ["1x1", "1x2"],
    inFeed: true,
  },
  {
    id: "cover",
    label: "cover",
    component: CoverCard,
    sizes: ["1x1", "2x1", "1x2", "2x2"],
    inFeed: true,
  },
  {
    id: "media",
    label: "media",
    component: MediaCard,
    sizes: ["1x2", "2x1"],
    inFeed: true,
  },
  {
    id: "stamp",
    label: "stamp",
    component: StampCard,
    sizes: ["1x1", "2x1", "1x2"],
    inFeed: true,
  },
  {
    id: "headline",
    label: "headline",
    component: HeadlineCard,
    sizes: ["1x1", "2x1"],
    inFeed: true,
  },
];
