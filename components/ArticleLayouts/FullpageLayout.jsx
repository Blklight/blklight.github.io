import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleSEO } from "@/components/SEO";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import siteMetadata from "@/content/siteMetadata";
import CardBackground from "@/components/Cards/Background";
import CardHorizontal from "@/components/Cards/Horizontal";

import AuthorInfo from "../ArticleRelated/AuthorInfo";
import ScrollTopAndComment from "@/components/ArticleRelated/ScrollTopAndComment";
import DateFormat from "@/components/DateFormat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const postDateTemplate = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const FullpageLayout = ({
  frontmatter,
  authordetails,
  next,
  prev,
  children,
}) => {
  const { authors, slug, fileName, date, title, tags } = frontmatter;

  const [filter, setFilter] = useState(() =>
    frontmatter.filter ? frontmatter.filter : "filter-cyberpunk-v"
  );
  const [typography, setTypography] = useState(() =>
    frontmatter.typography ? `${frontmatter.typography}-article` : ""
  );

  const images = [frontmatter.cover || null, frontmatter.imageHeader || null];

  return (
    <>
      <ArticleSEO
        url={`${siteMetadata.siteUrl}/projects/${slug}`}
        canonicalUrl={`${siteMetadata.siteUrl}/projects/${slug}`}
        authorDetails={authordetails}
        cover={frontmatter.cover ? frontmatter.cover : frontmatter.imageHeader}
        images={images}
        {...frontmatter}
      />
      <section className="two-column-article">
        <ScrollTopAndComment />
        <div className="info-article">
          <div className="sticky-content hover:hover-header">
            <img
              src={
                frontmatter.cover ? frontmatter.cover : frontmatter.imageHeader
              }
              className={`info-article-image ${filter}`}
              alt={`${title} image`}
            />
            <div className="info-article-overlay">
              <div className="flex h-full flex-col justify-end">
                <h5 className="article-meta">
                  <span className="bg-dark-500 p-1 rounded-md text-light-500">
                    <span className="marker-line">
                      <DateFormat date={date} fulltimestamp />
                    </span>
                  </span>
                </h5>
                <h1 className="md:text-5xl text-3xl font-extrabold tracking-wide mb-2">
                  <span className="marker-line bg-dark-500 !py-1 !px-3 rounded-md text-light-500">
                    {title}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="content-article">
          <div
            className={`tc-article-grid prose !pb-8 dark:prose-dark ${typography}-article`}
          >
            {children}
          </div>
          {frontmatter.gallery && frontmatter.gallery.length > 0 && (
            <div className="tc-article-grid">
              <h3 className="rounded-md mb-4 bg-dark-500 text-3xl font-bold text-light-500 dark:bg-light-500 dark:text-dark-500">
                <span className="marker-line !py-2 !px-3">Galeria:</span>
              </h3>
              <ScrollArea className="h-full w-full p-4">
                <div className="table min-w-full">
                  <div className="flex gap-5 pb-4">
                    {frontmatter.gallery.map((image, index) => (
                      <Link
                        href={image}
                        target="_blank"
                        key={index}
                        className="contents"
                      >
                        <img
                          src={image}
                          className="max-w-full object-cover mx-auto"
                          alt={`${title} image ${index}`}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}
          {tags && tags.length > 0 && (
            <div className="tc-article-grid mb-10">
              <h4 className="text-2xl font-bold mb-4">Tags:</h4>
              <div className="flex gap-4">
                {tags.map((tag) => (
                  <span
                    className="text-base font-mono leading-normal py-1 px-3 bg-gray-300 text-dark-500 font-medium rounded"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="tc-article-grid mb-4">
            <h3 className="mb-4 bg-dark-500 rounded-md text-3xl font-bold text-light-500 dark:bg-light-500 dark:text-dark-500">
              <span className="marker-line !py-2 !px-3">Escrito por:</span>
            </h3>
            {authordetails.map((author, index) => (
              <AuthorInfo
                key={index}
                author={author}
                quote={authors[index].quote}
              />
            ))}
          </div>
        </div>
      </section>
      {(next.frontmatter || prev.frontmatter) && (
        <div className="main-article py-8">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-5">
              {prev.frontmatter && (
                <div className="mb-6">
                  <h4 className="mb-4 text-2xl font-bold tracking-wide">
                    <span className="marker-line rounded-md bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Artigo anterior
                    </span>
                  </h4>
                  <CardHorizontal
                    document={prev.frontmatter}
                    authors={prev.authordetails}
                  />
                </div>
              )}
              {next.frontmatter && (
                <div className="mb-6">
                  <h4 className="mb-4 text-2xl font-bold tracking-wide md:text-right">
                    <span className="marker-line rounded-md bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Próximo artigo
                    </span>
                  </h4>
                  <CardHorizontal
                    document={next.frontmatter}
                    authors={next.authordetails}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullpageLayout;
