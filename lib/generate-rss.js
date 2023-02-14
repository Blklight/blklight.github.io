import { escape } from "@/lib/utils/htmlEscaper";

import siteMetadata from "@/content/siteMetadata";

const generateRssItem = (article) => `
  <item>
    <guid>${siteMetadata.siteUrl}/projects/${article.slug}</guid>
    <title>${escape(article.title)}</title>
    <link>${siteMetadata.siteUrl}/projects/${article.slug}</link>
    ${
      article.summary && `<description>${escape(article.summary)}</description>`
    }
    <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${
      article.tags &&
      article.tags.map((t) => `<category>${t}</category>`).join("")
    }
  </item>
`;

const generateRss = (articles, page = "feed.xml") => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/projects</link>
      <description>${escape(siteMetadata.description)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${
  siteMetadata.author
})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(articles[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${
        siteMetadata.siteUrl
      }/${page}" rel="self" type="application/rss+xml"/>
      ${articles.map(generateRssItem).join("")}
    </channel>
  </rss>
`;
export default generateRss;
