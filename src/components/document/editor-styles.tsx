"use client";

export function EditorStyles() {
  return (
    <style jsx global>{`
      .editor-wrapper .ProseMirror {
        min-height: 50vh;
        outline: none;
      }

      .editor-sans .ProseMirror {
        font-family: var(--font-sans);
      }

      .editor-mono .ProseMirror {
        font-family: var(--font-mono);
      }

      .editor-serif .ProseMirror {
        font-family: var(--font-serif);
      }

      .editor-wrapper .ProseMirror p {
        margin: 1em 0;
        line-height: 1.8;
      }

      .editor-wrapper .ProseMirror h1 {
        font-size: 2.25rem;
        font-weight: 700;
        letter-spacing: -0.025em;
        margin: 2.5rem 0 1rem;
      }

      .editor-wrapper .ProseMirror h2 {
        font-size: 1.75rem;
        font-weight: 600;
        letter-spacing: -0.025em;
        margin: 2rem 0 0.75rem;
      }

      .editor-wrapper .ProseMirror h3 {
        font-size: 1.35rem;
        font-weight: 600;
        margin: 1.75rem 0 0.5rem;
      }

      .editor-wrapper .ProseMirror ul,
      .editor-wrapper .ProseMirror ol {
        padding-left: 1.5rem;
        margin: 1em 0;
      }

      .editor-wrapper .ProseMirror li {
        margin: 0.5em 0;
      }

      .editor-wrapper .ProseMirror blockquote {
        border-left: 3px solid var(--accent);
        padding-left: 1.5rem;
        margin: 2rem 0;
        font-style: italic;
        color: var(--muted-foreground);
      }

      .editor-wrapper .ProseMirror code {
        background: var(--secondary);
        padding: 0.2em 0.4em;
        font-family: var(--font-mono);
        font-size: 0.9em;
      }

      .editor-wrapper .ProseMirror pre {
        background: var(--secondary);
        padding: 1rem;
        overflow-x: auto;
        margin: 1.5rem 0;
        font-family: var(--font-mono);
      }

      .editor-wrapper .ProseMirror pre code {
        background: none;
        padding: 0;
      }

      .editor-wrapper .ProseMirror hr {
        border: none;
        height: 1px;
        background: var(--foreground);
        opacity: 0.2;
        margin: 3rem 0;
      }

      .editor-wrapper .ProseMirror img {
        max-width: 100%;
        height: auto;
        margin: 2rem 0;
      }

      .editor-wrapper .ProseMirror p.is-editor-empty:first-child::before {
        color: var(--muted-foreground);
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }

      .editor-wrapper .ProseMirror .is-empty::before {
        color: var(--muted-foreground);
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
      }

      /* Custom Paper Color Styles */
      .custom-paper .ProseMirror {
        color: var(--custom-text-color);
      }

      .custom-paper .ProseMirror p,
      .custom-paper .ProseMirror h1,
      .custom-paper .ProseMirror h2,
      .custom-paper .ProseMirror h3,
      .custom-paper .ProseMirror li,
      .custom-paper .ProseMirror a,
      .custom-paper .ProseMirror strong,
      .custom-paper .ProseMirror code {
        color: var(--custom-text-color);
      }

      .custom-paper .ProseMirror blockquote {
        color: var(--custom-muted-color);
      }

      .custom-paper .ProseMirror p.is-editor-empty:first-child::before,
      .custom-paper .ProseMirror .is-empty::before {
        color: var(--custom-muted-color);
      }

      .custom-paper .ProseMirror hr {
        background: var(--custom-text-color);
      }

      .custom-paper .ProseMirror code {
        background: rgba(128, 128, 128, 0.15);
      }

      .custom-paper .ProseMirror pre {
        background: rgba(128, 128, 128, 0.15);
      }
    `}</style>
  );
}
