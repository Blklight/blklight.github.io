import { StarIcon } from "lucide-react";

export const DocumentFooter = () => {
  return (
    <div className="flex gap-2 items-center justify-between dark:bg-[#eaeaea] bg-[#252525] background-texture texture-item py-3 px-6 text-center mt-4 texture-item font-mono">
      <div
        className="dark:text-[#121212] text-[#eaeaea]
          inline-flex items-center gap-2"
      >
        <StarIcon size={16} className="" />
        <StarIcon size={20} className="" />
        <StarIcon size={24} className="" />
      </div>
      <div className="">
        <div className="text-lg font-bold dark:text-[#121212] text-[#eaeaea] uppercase">
          República da Aurora
        </div>
      </div>

      <div
        className="dark:text-[#121212] text-[#eaeaea]
          inline-flex items-center gap-2"
      >
        <StarIcon size={24} className="" />
        <StarIcon size={20} className="" />
        <StarIcon size={16} className="" />
      </div>
    </div>
  );
};
