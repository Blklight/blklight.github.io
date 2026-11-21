import { blklightCategory } from "@/components/showcase/demos/blklight";
import { chamferCategory } from "@/components/showcase/demos/chamfer";
import { customCategory } from "@/components/showcase/demos/custom";
import { dataCategory } from "@/components/showcase/demos/data";
import { formsCategory } from "@/components/showcase/demos/forms";
import { menusCategory } from "@/components/showcase/demos/menus";
import { overlaysCategory } from "@/components/showcase/demos/overlays";
import { primitivesCategory } from "@/components/showcase/demos/primitives";
import type { ShowcaseCategory } from "@/components/showcase/types";

export const categories: ShowcaseCategory[] = [
  blklightCategory,
  primitivesCategory,
  formsCategory,
  overlaysCategory,
  menusCategory,
  dataCategory,
  customCategory,
  chamferCategory,
].filter((category) => category.items.length > 0);
