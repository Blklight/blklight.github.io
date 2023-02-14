import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/types/card";
import DateFormat from "@/components/DateFormat";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllDocuments } from "@/lib/services";
const CardHorizontal = ({ document, authors }: any) => {
  const [mounted, setMounted] = useState(false);
  const fallbackImage = "/images/blklight-thumb.jpg";

  let image;

  if (document.cover || document.imageHeader) {
    image = document.cover ? document.cover : document.imageHeader;
  } else {
    image = fallbackImage;
  }
  return (
    <div className="card card-plain hover:hover-card hover:hover-card-uv hover:dark:hover-card-neon-yellow">
      <div className="card-body">
        <div className="lg:flex">
          <div className="shrink-0">
            <img
              src={image}
              className={` ${document.filter} lg:w-[250px] w-full lg:h-[250px] h-[300px] object-cover rounded-lg`}
              alt={`${document.title} image`}
            />
          </div>
          <div className="grow md:py-1 py-2 md:px-6">
            <div className="flex flex-wrap items-center mb-1">
              <span className="dark:text-light-500 text-lg font-medium text-dark-500">
                <DateFormat date={document.date} fulldate />
              </span>
            </div>
            <div className="flex flex-wrap items-center">
              <div className="flex items-center leading-normal !text-base mr-2 mb-1">
                <span className="marker-line !py-1 bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 capitalize font-medium">
                  {document.channel}
                </span>
              </div>

              <div className="flex items-center leading-normal !text-base mb-1 ">
                <span className="marker-line !py-1 bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 capitalize font-medium">
                  {document.category}
                </span>
              </div>
            </div>
            <h3 className="card-title text-3xl">
              <Link className="" href={`/articles/${document.slug}`}>
                <span className=" dark:text-light-500 text-dark-500 hover:underline underline-offset-1">
                  {document.title}
                </span>
              </Link>
            </h3>

            {document.description && (
              <p className="text-dark-500 dark:text-light-500 text-lg mb-2">
                {document.description}
              </p>
            )}

            {document.tags && (
              <div className="flex gap-2 items-center mb-2">
                {document.tags.map((tag: any) => (
                  <span
                    key={tag}
                    className="py-1 px-2 bg-slate-400 text-dark tracking-wide font-medium rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex mt-auto">
              {authors.map((author: any) => (
                <div key={author.name} className="flex items-center my-1">
                  <div className="shrink-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <img
                          id={`anchor-${author.slug}-${document.slug}`}
                          src={author.avatar}
                          className="w-[50px] h-[50px] object-cover rounded-full border border-dark mr-2"
                          alt={`${author.name} avatar`}
                        />
                      </TooltipTrigger>
                      <TooltipContent align="center" side="bottom">
                        <p>{author.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              ))}

              <div className="flex flex-1 items-center">
                <Link className="ml-auto" href={`/articles/${document.slug}`}>
                  <button className="tracking-wider text-light-500 dark:text-dark-500 bg-uv-500 dark:bg-neon-yellow-500 hover:ring-2 ring-uv-300 dark:ring-neon-yellow-200 py-1 px-3 rounded font-medium transition-all !text-base">
                    Ler mais...
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHorizontal;
