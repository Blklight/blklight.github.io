import { writeFileSync } from "fs";
import RSS from "rss";

import { rawDocuments } from "../lib/services";

async function generate() {
  const feed = new RSS({
    title: "blklight.dev",
    site_url: "https://blklight.dev",
    feed_url: "https://blklight.dev/feed.xml",
    image_url: "https://blklight.dev/blklight-seo.jpg",
    description: "Blklight",
  });

  rawDocuments.map((document) => {
    feed.item({
      title: document.title,
      url: `https://blklight.dev/${document.slug}`,
      date: document.date,
      description: document.description ?? "",
      custom_elements: [{ channel: document.channel }],
    });
  });

  writeFileSync("./public/rss.xml", feed.xml({ indent: true }));
}
