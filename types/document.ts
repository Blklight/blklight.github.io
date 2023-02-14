export interface document {
  title: string;
  description: string;
  date: string;
  modifiedDate: string;
  cover: string;
  imageHeader: string;
  filter: string;
  channel: string;
  category: string;
  slug: string;
  layout: string;
  tags: Array<any>;
  typography: string;
  draft: boolean;
  gallery: Array<string>;
  authors: Array<any>;
}
