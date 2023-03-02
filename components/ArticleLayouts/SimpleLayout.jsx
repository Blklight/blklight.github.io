import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleSEO } from "@/components/SEO";
import siteMetadata from "@/content/siteMetadata";
import ScrollTopAndComment from "@/components/ArticleRelated/ScrollTopAndComment";
import CardBackground from "@/components/Cards/Background";
import CardBasic from "../Cards/Basic";
import AuthorInfo from "../ArticleRelated/AuthorInfo";
import DateFormat from "@/components/DateFormat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SimpleLayout = ({ doc, authordetails, next, prev, children }) => {
  const { authors, slug, fileName, date, title, tags } = doc;
  const [filter, setFilter] = useState(() =>
    doc.filter ? doc.filter : "filter-cyberpunk-v"
  );
  const [typography, setTypography] = useState(() =>
    doc.typography ? `${doc.typography}-article` : ""
  );

  const fallbackImage = "/images/blklight-thumb.jpg";

  const images = [doc.cover || null, doc.imageHeader || null, fallbackImage];

  return (
    <>
      <ArticleSEO
        url={`${siteMetadata.siteUrl}/articles/${slug}`}
        canonicalUrl={`${siteMetadata.siteUrl}/articles/${slug}`}
        authorDetails={authordetails}
        images={images}
        {...doc}
      />
      <section className="main-article py-4">
        <ScrollTopAndComment />
        <header className="article-grid">
          <h5 className="md:text-2xl text-xl font-semibold tracking-wide">
            <DateFormat date={date} fulltimestamp />
          </h5>
          <h1 className="md:text-5xl text-3xl font-extrabold tracking-wide mb-4">
            {title}
          </h1>
        </header>
        <article
          className={`article-grid prose !pb-12 dark:prose-dark ${typography}-article`}
        >
          {children}
        </article>
        {doc.gallery && doc.gallery.length > 0 && (
          <div className="article-grid">
            <h3 className="mb-4 rounded-md bg-dark-500 text-3xl font-bold text-light-500 dark:bg-light-500 dark:text-dark-500">
              <span className="marker-line  !py-2 !px-3">Galeria:</span>
            </h3>
            <ScrollArea className="h-full w-full p-4">
              <div className="table min-w-full">
                <div className="flex gap-5 pb-4">
                  {doc.gallery.map((image, index) => (
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
        <div className="article-grid mb-8">
          <h3 className="mb-4 rounded-md bg-dark-500 text-3xl font-bold text-light-500 dark:bg-light-500 dark:text-dark-500">
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
      {(next.document || prev.document) && (
        <div className="main-article">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {prev.document && (
                <div className="mb-6">
                  <h4 className="mb-4 text-2xl font-bold tracking-wide">
                    <span className="marker-line rounded-md bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Artigo anterior
                    </span>
                  </h4>
                  <CardBasic
                    document={prev.document}
                    authors={prev.authordetails}
                  />
                </div>
              )}
              {next.document && (
                <div className="mb-6">
                  <h4 className="mb-4 text-2xl font-bold tracking-wide md:text-right">
                    <span className="marker-line rounded-md bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Próximo artigo
                    </span>
                  </h4>
                  <CardBasic
                    document={next.document}
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

export default SimpleLayout;
