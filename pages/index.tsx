import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { PageSEO } from "@/components/SEO";
import CardBackground from "@/components/Cards/Background";
import ListArticles from "@/components/List/Articles";
import siteMetadata from "@/lib/siteMetadata";
import CardHorizontal from "@/components/Cards/Horizontal";
import CardBasic from "@/components/Cards/Basic";

import { getDocuments } from "@/lib/services";

export async function getStaticProps() {
  const docs = await getDocuments();
  return docs;
}

interface HomeProp {
  documents: Array<object>;
  initialDisplayDocuments: any;
  pagination: number;
}

const Home = ({ documents, initialDisplayDocuments, pagination }: HomeProp) => {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <section className="background-texture min-h-screen">
        {/* <ListArticles
          documents={documents}
          initialDisplayDocuments={initialDisplayDocuments}
          pagination={pagination}
        /> */}
        <div className="container mx-auto px-6">
          <div className="space-y-2 pt-6 md:space-y-5 border-b border-b-dark-500 dark:border-b-light-500 mb-4">
            <h1 className="text-3xl font-extrabold leading-9 tracking-wide text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:leading-14">
              Últimos artigos
            </h1>
          </div>
          {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-5">
            {documents.map((frontmatter) => (
              <CardBasic
                key={frontmatter.document.slug}
                document={frontmatter.document}
                authors={frontmatter.authordetails}
              />
            ))}
          </div> */}

          <div className="grid grid-cols-1 gap-2">
            {documents.map((frontmatter) => (
              <CardHorizontal
                key={frontmatter.document.slug}
                document={frontmatter.document}
                authors={frontmatter.authordetails}
              />
            ))}
          </div>
          {/* <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            {documents.map((frontmatter) => (
              <CardBackground
                key={frontmatter.document.slug}
                document={frontmatter.document}
                authors={frontmatter.authordetails}
                isFeatured={false}
              />
            ))}
          </div> */}
        </div>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-blue-red-golden"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-cyberpunk-v"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-burn"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-linear-burn"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-cyberpunk-vi"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-cyberpunk-vii"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-cyberpunk-viii"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-cyberpunk-ix"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-dark-red"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-dunastone"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-icecream"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-icecream-plus"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-neon-lights"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-pink-blue"
              alt=""
            />

            <img
              src="https://i.imgur.com/7ZTDbTz.png"
              className="max-w-full block mx-auto filter-purple-red-orange"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
