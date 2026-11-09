import { StarIcon } from "lucide-react";

export const DocumentFooter = () => {
  return (
    <div className="flex gap-2 items-center justify-between bg-primary background-texture texture-item py-3 px-6 text-center mt-4 texture-item font-mono">
      <div
        className="text-primary-foreground
          inline-flex items-center gap-2"
      >
        <StarIcon size={16} className="" />
        <StarIcon size={20} className="" />
        <StarIcon size={24} className="" />
      </div>
      <div className="">
        <div className="text-lg font-bold text-primary-foreground uppercase">
          República da Aurora
        </div>
      </div>

      <div
        className="text-primary-foreground
          inline-flex items-center gap-2"
      >
        <StarIcon size={24} className="" />
        <StarIcon size={20} className="" />
        <StarIcon size={16} className="" />
      </div>
    </div>
  );
};
