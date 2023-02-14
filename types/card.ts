interface document {
  title: string;
  cover: string;
  imageHeader: string;
  filter: string;
  channel: string;
  date: string;
  slug: string;
  category: string;
}

interface author {
  name: string;
  slug: string;
  avatar: string;
}

export interface Card {
  document: document;
  authors: author[];
  isFeatured?: boolean;
}
