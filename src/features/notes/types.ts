/** Text-quote selector (W3C Web Annotation): survives re-rendering of the same text. */
export interface TextQuote {
  exact: string;
  prefix: string;
  suffix: string;
}

export interface Annotation {
  id: string;
  /** What the note belongs to (a trail, a course...). */
  scopeId: string;
  /** Document it was taken on; absent for a loose note. */
  docId?: string;
  /** Tab (section) a loose note is filed under; notes on a document follow the document's. */
  sectionId?: string;
  /** Marked passage; absent for a note without a quote. */
  anchor?: TextQuote;
  text: string;
  /** Paper and highlight color (the section's tab color). */
  color?: string;
  /** Position on the board, once placed there. */
  board?: { x: number; y: number };
  /** Size on the board, once resized there. */
  size?: { w: number; h: number };
  createdAt: string;
  updatedAt: string;
}
