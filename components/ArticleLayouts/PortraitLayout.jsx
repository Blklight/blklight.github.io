import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleSEO } from "@/components/SEO";
import siteMetadata from "@/content/siteMetadata";
import CardBackground from "@/components/Cards/Background";
import AuthorInfo from "../ArticleRelated/AuthorInfo";
import ScrollTopAndComment from "@/components/ArticleRelated/ScrollTopAndComment";
import DateFormat from "@/components/DateFormat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const PortraitLayout = ({ doc, authordetails, next, prev, children }) => {
  const { authors, slug, fileName, date, title, tags } = doc;

  const [filter, setFilter] = useState(() =>
    doc.filter ? doc.filter : "filter-cyberpunk-v"
  );
  const [typography, setTypography] = useState(() =>
    doc.typography ? `${doc.typography}-article` : ""
  );

  const images = [doc.cover || null, doc.imageHeader || null];

  return (
    <>
      <ArticleSEO
        url={`${siteMetadata.siteUrl}/articles/${slug}`}
        canonicalUrl={`${siteMetadata.siteUrl}/articles/${slug}`}
        authorDetails={authordetails}
        cover={doc.cover ? doc.cover : doc.imageHeader}
        images={images}
        {...doc}
      />
      <section className="main-article">
        <ScrollTopAndComment />

        <header className="header-portrait hover:hover-header">
          <div className="header-portrait-column">
            <div
              className={`header-portrait-background-full ${filter}`}
              style={{
                backgroundImage: `url(${
                  doc.imageHeader ? doc.imageHeader : doc.cover
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
        {doc.gallery && doc.gallery.length > 0 && (
          <div className="article-grid">
            <h3 className="text-3xl font-bold bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 mb-4">
              <span className="marker-line !py-2 !px-3">Galeria:</span>
            </h3>
            <figure>
              <ScrollArea className="h-full w-full p-4">
                <div className="table min-w-full">
                  <div className="flex space-x-4 pb-4">
                    {doc.gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className="max-w-full object-cover mx-auto shadow-lg"
                        alt={`${title} image ${index}`}
                      />
                    ))}
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </figure>

            {/* {doc.gallery.map((image, index) => (
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
      {(next.document || prev.document) && (
        <div className="main-article">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {prev.document && (
                <div className="mb-6">
                  <h4 className="text-2xl font-bold tracking-wide mb-4">
                    <span className="marker-line rounded-md !py-1 bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Artigo anterior
                    </span>
                  </h4>
                  <CardBackground
                    document={prev.document}
                    authors={prev.authordetails}
                    isFeatured={false}
                  />
                </div>
              )}
              {next.document && (
                <div className="mb-6">
                  <h4 className="text-2xl font-bold tracking-wide md:text-right mb-4">
                    <span className="marker-line !p-2 bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500">
                      Próximo artigo
                    </span>
                  </h4>
                  <CardBackground
                    document={next.document}
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
