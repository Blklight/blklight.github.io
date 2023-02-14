import fs from "fs";
import generateRss from "@/lib/generate-rss";
import { formatSlug, getAllFilesFrontMatter, getFileBySlug } from "@/lib/mdx";

export const DOCS_PER_PAGE = 30;

export const pathName = "articles";

export const getAllDocuments = async () => {
  const rawDocuments = await getAllFilesFrontMatter(pathName);

  const documents = await Promise.all(
    rawDocuments.map(async (document) => {
      const authorList = document.authors;
      const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFileBySlug("authors", [author.name]);
        return authorResults.frontmatter;
      });
      const authordetails = await Promise.all(authorPromise);
      return { document, authordetails };
    })
  );

  const initialDisplayDocuments = documents.slice(0, DOCS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(documents.length / DOCS_PER_PAGE),
  };
  return { props: { documents, initialDisplayDocuments, pagination } };
};

export const getDocument = async (params) => {
  const rawDocuments = await getAllFilesFrontMatter(pathName);

  const allDocuments = await Promise.all(
    rawDocuments.map(async (document) => {
      const authorList = document.authors;
      const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFileBySlug("authors", [author.name]);
        return authorResults.frontmatter;
      });
      const authordetails = await Promise.all(authorPromise);

      return { document, authordetails };
    })
  );

  const documentIndex = allDocuments.findIndex(
    (data) => formatSlug(data.document.slug) === params.slug.join("/")
  );

  const prev = {
    frontmatter: allDocuments[documentIndex + 1]
      ? allDocuments[documentIndex + 1].document
      : null,
    authordetails: allDocuments[documentIndex + 1]
      ? allDocuments[documentIndex + 1].authordetails
      : null,
  };

  const next = {
    frontmatter: allDocuments[documentIndex - 1]
      ? allDocuments[documentIndex - 1].document
      : null,
    authordetails: allDocuments[documentIndex - 1]
      ? allDocuments[documentIndex - 1].authordetails
      : null,
  };

  const doc = await getFileBySlug(pathName, params.slug.join("/"));

  const authorList = doc.frontmatter.authors;
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug("authors", [author.name]);
    return authorResults.frontmatter;
  });
  const authordetails = await Promise.all(authorPromise);

  if (rawDocuments.length > 0) {
    const rss = generateRss(rawDocuments);
    fs.writeFileSync("./public/feed.xml", rss);
  }

  return { props: { doc, authordetails, prev, next } };
};

export const getAllDocumentsByChannel = async (channel) => {
  const rawDocuments = await getAllFilesFrontMatter(pathName);

  const filteredDocuments = rawDocuments.filter(
    (doc) => doc.channel === channel
  );

  const documents = await Promise.all(
    filteredDocuments.map(async (document) => {
      const authorList = document.authors;
      const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFileBySlug("authors", [author.name]);
        return authorResults.frontmatter;
      });
      const authordetails = await Promise.all(authorPromise);
      return { document, authordetails };
    })
  );

  const initialDisplayDocuments = documents.slice(0, DOCS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(documents.length / DOCS_PER_PAGE),
  };
  return { props: { documents, initialDisplayDocuments, pagination } };
};

export const getAllDocumentsByCategory = async (category) => {
  const rawDocuments = await getAllFilesFrontMatter(pathName);

  const filteredDocuments = rawDocuments.filter(
    (doc) => doc.category === category
  );

  const documents = await Promise.all(
    filteredDocuments.map(async (document) => {
      const authorList = document.authors;
      const authorPromise = authorList.map(async (author) => {
        const authorResults = await getFileBySlug("authors", [author.name]);
        return authorResults.frontmatter;
      });
      const authordetails = await Promise.all(authorPromise);
      return { document, authordetails };
    })
  );

  const initialDisplayDocuments = documents.slice(0, DOCS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(documents.length / DOCS_PER_PAGE),
  };
  return { props: { documents, initialDisplayDocuments, pagination } };
};
