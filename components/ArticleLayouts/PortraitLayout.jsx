import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleSEO } from "@/components/SEO";
import Image from "@/components/Image";
import Tag from "@/components/Tag";
import siteMetadata from "@/content/siteMetadata";
import CardBackground from "@/components/Cards/Background";
import AuthorInfo from "../ArticleRelated/AuthorInfo";
import ScrollTopAndComment from "@/components/ArticleRelated/ScrollTopAndComment";
import DateFormat from "@/components/DateFormat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PortraitLayout = ({
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
      <section className="main-article">
        <ScrollTopAndComment />

        <header className="header-portrait hover:hover-header">
          <div className="header-portrait-column">
            <div
              className={`header-portrait-background-full ${filter}`}
              style={{
                backgroundImage: `url(${
                  frontmatter.imageHeader
                    ? frontmatter.imageHeader
                    : frontmatter.cover
                })`,
              }}
            ></div>
          </div>
          <div className="header-overlay">
            <div className="h-full flex flex-col justify-center">
              <div className="header-portrait-content">
                <h5 className="md:text-2xl text-xl font-semibold tracking-wide text-center mb-4">
                  <span className="marker-line rounded-md background-texture !py-1 dark:bg-dark-500 dark:text-light-500 bg-light-500 text-dark-500">
                    <DateFormat date={date} fulltimestamp />
                  </span>
                </h5>
                <h1 className="md:text-5xl text-4xl font-extrabold tracking-wide text-center">
                  <span className="marker-line rounded-md background-texture !py-1 dark:bg-dark-500 dark:text-light-500 bg-light-500 text-dark-500">
                    {title}
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </header>

        <article
          className={`article-grid prose dark:prose-dark !pb-12 ${typography}-article`}
        >
          {children}
        </article>
        {frontmatter.gallery && frontmatter.gallery.length > 0 && (
          <div className="article-grid">
            <h3 className="text-3xl font-bold bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 mb-4">
              <span className="marker-line !py-2 !px-3">Galeria:</span>
            </h3>
            <ScrollArea className="h-full w-full p-4">
              <div className="table min-w-full">
                <div className="flex space-x-4 pb-4">
                  {frontmatter.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className="max-w-full object-cover mx-auto"
                      alt={`${title} image ${index}`}
                    />
                  ))}
                </div>
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            {/* {frontmatter.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                className="max-w-full block mx-auto mb-4"
                alt={`${title} image ${index}`}
              />
            ))} */}
          </div>
        )}
        <div className="article-grid mb-8">
          <h3 className="rounded-md text-3xl font-bold bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 mb-4">
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
      </section>
      {(next.frontmatter || prev.frontmatter) && (
        <div className="main-article">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {prev.frontmatter && (
                <div className="mb-6">
                  <h4 className="text-2xl font-bold tracking-wide mb-4">
                    <span className="marker-line rounded-md !py-1 bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Artigo anterior
                    </span>
                  </h4>
                  <CardBackground
                    document={prev.frontmatter}
                    authors={prev.authordetails}
                    isFeatured={false}
                  />
                </div>
              )}
              {next.frontmatter && (
                <div className="mb-6">
                  <h4 className="text-2xl font-bold tracking-wide md:text-right mb-4">
                    <span className="marker-line !p-2 bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Próximo artigo
                    </span>
                  </h4>
                  <CardBackground
                    document={next.frontmatter}
                    authors={next.authordetails}
                    isFeatured={false}
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

export default PortraitLayout;
