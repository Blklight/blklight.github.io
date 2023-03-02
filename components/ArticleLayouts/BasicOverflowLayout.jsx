import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleSEO } from "@/components/SEO";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import siteMetadata from "@/content/siteMetadata";
import ScrollTopAndComment from "@/components/ArticleRelated/ScrollTopAndComment";
import CardBackground from "@/components/Cards/Background";
import CardBasic from "../Cards/Basic";
import AuthorInfo from "../ArticleRelated/AuthorInfo";
import DateFormat from "@/components/DateFormat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const BasicOverflowLayout = ({
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
        url={`${siteMetadata.siteUrl}/articles/${slug}`}
        canonicalUrl={`${siteMetadata.siteUrl}/articles/${slug}`}
        authorDetails={authordetails}
        cover={frontmatter.cover ? frontmatter.cover : frontmatter.imageHeader}
        images={images}
        {...frontmatter}
      />
      <section className="alter-article">
        <ScrollTopAndComment />
        <div
          className={`alter-article-header hover:hover-header ${filter}`}
          style={{
            backgroundImage: `url(${
              frontmatter.imageHeader
                ? frontmatter.imageHeader
                : frontmatter.cover
            })`,
          }}
        ></div>
        <div className="alter-article-block">
          <div className="alter-article-container -mt-96 background-texture bg-light-500 dark:bg-dark-500">
            <div className="alter-article-container-title">
              <h5 className="md:text-2xl text-xl font-medium tracking-wide">
                <DateFormat date={date} fulltimestamp />
              </h5>
              <h1 className="md:text-5xl text-3xl font-extrabold tracking-wide mb-4">
                {title}
              </h1>
            </div>
            <article
              className={`alter-article-content prose !pb-12 dark:prose-dark text-xl !leading-normal ${typography}-article`}
            >
              {children}
              {frontmatter.gallery && frontmatter.gallery.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold rounded-md bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 mb-4">
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
                </>
              )}
              {tags && tags.length > 0 && (
                <>
                  <h4 className="text-2xl font-bold rounded-md bg-dark-500 text-light-500 dark:!bg-light-500 dark:!text-dark-500 my-4">
                    <span className="marker-line !py-2 !px-3">Tags:</span>
                  </h4>
                  <div className="flex gap-4">
                    {tags.map((tag) => (
                      <span
                        className="py-1 px-3 bg-gray-300 text-dark-500 font-medium rounded"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </article>
          </div>
        </div>
      </section>
      {(next.frontmatter || prev.frontmatter) && (
        <div className="main-article">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {prev.frontmatter && (
                <div className="mb-6">
                  <h4 className="mb-4 text-2xl font-bold tracking-wide">
                    <span className="marker-line rounded-md bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Artigo anterior
                    </span>
                  </h4>
                  <CardBasic
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
                  <CardBasic
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

export default BasicOverflowLayout;