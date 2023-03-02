import { compareDesc } from "date-fns";

import { allArticles } from "contentlayer/generated";
import { allAuthors } from "contentlayer/generated";

export const DOCS_PER_PAGE = 18;
export const pathName = "articles";

export const rawDocuments = allArticles
  .filter((obj) => obj.draft === false)
  .sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

export const getAuthors = () => {
  return allAuthors;
};

export const frontmatter = (doc) => {
  return {
    title: doc.title,
    description: doc.description,
    imageHeader: doc.imageHeader,
    cover: doc.cover,
    date: doc.date,
    modifiedDate: doc.modifiedDate,
    channel: doc.channel,
    category: doc.category,
    tags: doc.tags,
    layout: doc.layout,
    filter: doc.filter,
    typography: doc.typography,
    draft: doc.draft,
    authors: doc.authors,
    gallery: doc.gallery,
    slug: doc.slug,
  };
};

export const fetchDocuments = (docs) => {
  return docs.map(async (doc) => {
    const document = frontmatter(doc);
    const authorList = doc.authors;
    const authorPromise = authorList.map(async (author) => {
      const authorResults = await allAuthors.filter(
        (obj) => obj.name === author.name
      );
      return authorResults;
    });
    let authordetails = await Promise.all(authorPromise);
    authordetails = authordetails.flat();
    return { document, authordetails };
  });
};

export const initialDisplayDocs = (docs, pageNumber) => {
  let initialDisplayDocuments;
  if (pageNumber) {
    initialDisplayDocuments = docs.slice(
      DOCS_PER_PAGE * (pageNumber - 1),
      DOCS_PER_PAGE * pageNumber
    );
  } else {
    initialDisplayDocuments = docs.slice(0, DOCS_PER_PAGE);
  }

  return initialDisplayDocuments;
};

export const paginationDocs = (docs, pageNumber) => {
  return {
    currentPage: pageNumber ? pageNumber : 1,
    totalPages: Math.ceil(docs.length / DOCS_PER_PAGE),
    totalDocs: docs.length,
  };
};

export const getDocuments = async (pageNumber) => {
  const documents = await Promise.all(fetchDocuments(rawDocuments));
  const initialDisplayDocuments = initialDisplayDocs(documents, pageNumber);
  const pagination = paginationDocs(documents, pageNumber);

  return { props: { documents, initialDisplayDocuments, pagination } };
};

export const getDocument = async (params) => {
  const allDocuments = await Promise.all(fetchDocuments(rawDocuments));

  const formattedRoute = `/${pathName}/${params.slug.join("/")}`;
  const documentIndex = allDocuments.findIndex(
    (data) => data.document.slug === formattedRoute
  );

  const prev = {
    document: allDocuments[documentIndex + 1]
      ? allDocuments[documentIndex + 1].document
      : null,
    authordetails: allDocuments[documentIndex + 1]
      ? allDocuments[documentIndex + 1].authordetails
      : null,
  };

  const next = {
    document: allDocuments[documentIndex - 1]
      ? allDocuments[documentIndex - 1].document
      : null,
    authordetails: allDocuments[documentIndex - 1]
      ? allDocuments[documentIndex - 1].authordetails
      : null,
  };

  // console.log("Line 111:", prev, next);
  const doc = await rawDocuments.find((obj) => obj.slug === formattedRoute);

  const authorList = doc.authors;

  const authorPromise = authorList.map((author) =>
    allAuthors.filter((obj) => obj.name === author.name)
  );
  let authordetails = await Promise.all(authorPromise);
  authordetails = authordetails.flat();
  return { props: { doc, authordetails, prev, next } };
};

export const getDocumentsByChannel = async (channel, pageNumber) => {
  const filteredDocuments = channel
    ? rawDocuments.filter((doc) => doc.channel === channel)
    : rawDocuments;

  const documents = await Promise.all(fetchDocuments(filteredDocuments));

  const initialDisplayDocuments = initialDisplayDocs(documents, pageNumber);

  const pagination = paginationDocs(documents, pageNumber);
  return { props: { documents, initialDisplayDocuments, pagination } };
};

export const getDocumentsByCategory = async (category, pageNumber) => {
  const filteredDocuments = category
    ? rawDocuments.filter((doc) => doc.category === category)
    : rawDocuments;

  const documents = await Promise.all(fetchDocuments(filteredDocuments));

  const initialDisplayDocuments = initialDisplayDocs(documents, pageNumber);

  const pagination = paginationDocs(documents, pageNumber);
  return { props: { documents, initialDisplayDocuments, pagination } };
};

export const getDocumentsByTag = async (tag, pageNumber) => {
  const filteredDocuments = tag
    ? rawDocuments.filter((doc) => doc.tags.includes(tag))
    : rawDocuments;

  const documents = await Promise.all(fetchDocuments(filteredDocuments));

  const initialDisplayDocuments = initialDisplayDocs(documents, pageNumber);

  const pagination = paginationDocs(documents, pageNumber);
  return { props: { documents, initialDisplayDocuments, pagination } };
};
