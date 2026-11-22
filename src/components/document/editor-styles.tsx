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
