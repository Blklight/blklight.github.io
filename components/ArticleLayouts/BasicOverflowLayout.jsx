import { useState, useEffect } from "react";
import Link from "next/link";
import { ArticleSEO } from "@/components/SEO";
import siteMetadata from "@/lib/siteMetadata";
import ScrollTopAndComment from "@/components/ArticleRelated/ScrollTopAndComment";
import CardBackground from "@/components/Cards/Background";
import CardBasic from "../Cards/Basic";
import AuthorInfo from "../ArticleRelated/AuthorInfo";
import DateFormat from "@/components/DateFormat";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Tags from "@/components/Tags";
import ImageGallery from "@/components/ArticleRelated/ImageGallery";

const BasicOverflowLayout = ({ doc, authordetails, next, prev, children }) => {
  const { authors, slug, fileName, date, title, tags } = doc;
  const [filter, setFilter] = useState(() =>
    doc.filter ? doc.filter : "filter-black-white"
  );
  const [typography, setTypography] = useState(() =>
    doc.typography ? `${doc.typography}-article` : ""
  );

  const images = [doc.cover || null, doc.imageHeader || null];
  return (
    <>
      <ArticleSEO
        url={`${siteMetadata.siteUrl}${slug}`}
        canonicalUrl={`${siteMetadata.siteUrl}${slug}`}
        authorDetails={authordetails}
        cover={doc.cover ? doc.cover : doc.imageHeader}
        images={images}
        {...doc}
      />
      <section className="alter-article">
        <ScrollTopAndComment />
        <div
          className={`alter-article-header hover:hover-header ${filter}`}
          style={{
            backgroundImage: `url(${
              doc.imageHeader ? doc.imageHeader : doc.cover
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
              {doc.gallery && doc.gallery.length > 0 && (
                <>
                  <h3 className="text-3xl font-bold rounded-sm bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 mb-4">
                    <span className="marker-line !py-2 !px-3">Galeria:</span>
                  </h3>
                  <ScrollArea className="h-full w-full p-4">
                    <div className="table min-w-full">
                      <div className="flex gap-5 pb-4">
                        {doc.gallery.map((image, index) => (
                          <ImageGallery
                            key={index}
                            image={image}
                            title={title}
                          />
                        ))}
                      </div>
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </>
              )}
              {tags && tags.length > 0 && (
                <>
                  <h4 className="text-2xl font-bold mb-4">Tags:</h4>
                  <div className="flex gap-4">
                    {tags.map((tag) => (
                      <Tags key={tag} tag={tag} />
                    ))}
                  </div>
                </>
              )}

              <div className="my-8">
                <h3 className="rounded-sm text-3xl font-bold bg-dark-500 text-light-500 dark:bg-light-500 dark:text-dark-500 mb-4">
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
            </article>
          </div>
        </div>
      </section>
      {(next.document || prev.document) && (
        <div className="">
          <div className="mx-auto max-w-[1200px] px-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              {prev.document && (
                <div className="mb-6">
                  <h4 className="mb-4 text-2xl font-bold tracking-wide">
                    <span className="marker-line rounded-sm bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
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
                    <span className="marker-line rounded-sm bg-dark-500 !p-2 text-light-500 dark:bg-light-500 dark:text-dark-500">
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

export default BasicOverflowLayout;
