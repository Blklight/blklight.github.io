import type { ShowcaseCategory } from "@/components/showcase/types";
import { ChamferButton } from "@/components/ui/chamfer-button";
import { CornerFrame } from "@/components/ui/corner-frame";

function ChamferButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ChamferButton>Default</ChamferButton>
      <ChamferButton variant="secondary" corner="tr">
        Secondary
      </ChamferButton>
      <ChamferButton variant="ghost" corner="tl">
        Ghost
      </ChamferButton>
      <ChamferButton variant="destructive" corner="bl">
        Destructive
      </ChamferButton>
      <ChamferButton size="lg">Large</ChamferButton>
    </div>
  );
}

function CornerFrameDemo() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <CornerFrame className="p-6 text-sm">Padrão (md)</CornerFrame>
      <CornerFrame
        className="p-6 text-sm"
        cornerSize="sm"
        corners={["tl", "br"]}
        color="var(--primary)"
        cornerOpacity={1}
      >
        Cor + tl/br
      </CornerFrame>
      <CornerFrame
        className="p-6 text-sm"
        cornerSize={[20, 8]}
        cornerOffset={4}
      >
        Assimétrico + offset
      </CornerFrame>
    </div>
  );
}

export const chamferCategory: ShowcaseCategory = {
  id: "chamfer",
  title: "Chamfer",
  items: [
    { slug: "chamfer-button", name: "Chamfer Button", demo: ChamferButtonDemo },
    { slug: "corner-frame", name: "Corner Frame", demo: CornerFrameDemo },
  ],
};
