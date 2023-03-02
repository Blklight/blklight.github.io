import { useEffect, useState } from "react";
import { Card } from "@/types/card";
import Image from "next/image";
import Link from "next/link";
import DateFormat from "@/components/DateFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CardBackground = ({ document, authors, isFeatured = false }) => {
  const [mounted, setMounted] = useState(false);

  const fallbackImage = "/images/blklight-thumb.jpg";

  let image;

  if (document.cover || document.imageHeader) {
    image = document.cover ? document.cover : document.imageHeader;
  } else {
    image = fallbackImage;
  }

  useEffect(() => setMounted(true), []);
  return (
    <div className="card card-background hover:hover-card !rounded-xl hover:hover-card-uv hover:dark:hover-card-neon-yellow view-anchor">
      <img
        src={image}
        className={`!rounded-xl ${document.filter} ${
          isFeatured
            ? "card-background-image-featured"
            : "card-background-image"
        }`}
        alt={`${document.title} image`}
      />
      <div className="mask texture-mask-4"></div>

      {/* <Image
        src={document.cover ? document.cover : document.imageHeader}
        className={`card-background-image-featured !rounded-2xl ${document.styles.filter}`}
        width={10000}
        height={10000}
        alt={`${document.title} image`}
      /> */}
      <div className="card-img-overlay flex flex-col">
        <div className="flex items-center leading-normal !text-base">
          <span className="marker-line text-light-500 rounded-md font-medium bg-dark-500 !py-1 text-lg tracking-wide">
            <DateFormat date={document.date} />
          </span>
        </div>
      </div>
      <div className="card-img-overlay flex flex-col justify-end">
        <div className="flex items-center mb-2 leading-normal !text-base">
          <span className="marker-line rounded-md !py-1 bg-dark-500 text-light-500 capitalize font-medium mr-2">
            {document.channel}
          </span>
          <span className="marker-line rounded-md !py-1 bg-dark-500 text-light-500 capitalize font-medium">
            {document.category}
          </span>
        </div>

        <h3 className="card-title text-3xl">
          <Link className="" href={document.slug}>
            <span className="marker-line rounded-md bg-dark-500 text-light-500 !py-1 hover:underline underline-offset-1">
              {document.title}
            </span>
          </Link>
        </h3>

        <div className="flex mt-1">
          {authors.map((author) => (
            <div key={author.name} className="flex items-center my-1">
              <div className="shrink-0">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <img
                      id={`anchor-${author.slug}-${document.slug}`}
                      src={author.avatar}
                      className="w-[50px] h-[50px] object-cover rounded-full border border-dark-500 mr-2"
                      alt={`${author.name} avatar`}
                    />
                  </TooltipTrigger>
                  <TooltipContent align="center" side="right">
                    <p>{author.name}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          ))}

          <div className="flex flex-1 items-center">
            <Link className="ml-auto" href={document.slug}>
              <button className="tracking-wider text-light-500 dark:text-dark-500 bg-uv-500 dark:bg-neon-yellow-500 hover:ring-2 ring-uv-300 dark:ring-neon-yellow-200 py-1.5 px-3 rounded-md font-medium transition-all !text-base">
                Ler mais...
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardBackground;
