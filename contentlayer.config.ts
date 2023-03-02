import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import { readFileSync } from "fs";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.(md|mdx)`,
  contentType: "markdown",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    avatar: {
      type: "string",
      required: false,
    },
    occupation: {
      type: "string",
      required: false,
    },
    email: {
      type: "string",
      required: false,
    },
    github: {
      type: "string",
      required: false,
    },
    medium: {
      type: "string",
      required: false,
    },
    twitter: {
      type: "string",
      required: false,
    },
    linkedin: {
      type: "string",
      required: false,
    },
    instagram: {
      type: "string",
      required: false,
    },
  },
}));

export const AuthorsArticle = defineNestedType(() => ({
  name: "AuthorsArticle",
  fields: {
    name: {
      type: "string",
      required: true,
    },
    quote: {
      type: "string",
      required: false,
    },
  },
}));

export const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: `articles/**/*.(md|mdx)`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    cover: {
      type: "string",
      required: false,
    },
    imageHeader: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    modifiedDate: {
      type: "date",
      required: false,
    },
    channel: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
      required: false,
    },
    layout: {
      type: "string",
      required: false,
    },
    filter: {
      type: "string",
      required: false,
    },
    typography: {
      type: "string",
      required: false,
    },
    draft: {
      type: "boolean",
      required: true,
    },
    authors: {
      type: "list",
      of: AuthorsArticle,
      required: true,
    },
    gallery: {
      type: "list",
      of: { type: "string" },
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (article) => `/${article._raw.flattenedPath}`,
    },
  },
}));

const themePath = "./assets/themes/OneHunter-Vercel-color-theme.json";

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Article, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          // theme: JSON.parse(readFileSync(themePath, "utf-8")),
          onVisitLine(node: any) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: any) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
