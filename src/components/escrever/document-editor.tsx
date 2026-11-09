"use client";

import type { Content } from "@tiptap/core";
import Highlight from "@tiptap/extension-highlight";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Palette, Send } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
  CoverImageEditor,
  CoverUrlDialog,
  DEFAULT_COVER_SETTINGS,
  EditorStyles,
  useDocumentDesign,
} from "@/components/document";
import type { CoverImageSettings } from "@/components/document/cover-image-editor";
import {
  DocumentFooterRenderer,
  DocumentHeaderRenderer,
} from "@/components/document/letterhead-renderer";
import {
  isSignatureVisible,
  SignatureBlock,
} from "@/components/document/signature-block";
import type {
  DocumentFooter,
  DocumentHeader,
  DocumentSignature,
  PaperTexture,
} from "@/components/document/types";
import type { DesignTab } from "@/components/escrever/design/sidebar";
import { DesignOverlay } from "@/components/escrever/design-overlay";
import { DocumentPaperFooter } from "@/components/escrever/document-paper-footer";
import { DocumentPaperHeader } from "@/components/escrever/document-paper-header";
import { EditorToolbar } from "@/components/escrever/editor-toolbar";
import { FloatingActionBar } from "@/components/escrever/floating-action-bar";
import { JsonPreviewModal, LinkModal } from "@/components/escrever/modals";
import { PublishPanel } from "@/components/escrever/publish-panel";
import { TemplatePicker } from "@/components/escrever/template-picker";
import { useAutosave } from "@/components/escrever/use-autosave";
import { useCurrentAuthorContext } from "@/components/escrever/use-current-author-context";
import { useDocumentForm } from "@/components/escrever/use-document-form";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import type { SignatureContext } from "@/features/documents/design/signature";

import {
  usePublishDocument,
  useSaveDocument,
} from "@/features/documents/queries";

import { useMyOrganizations } from "@/features/organizations/queries";
import { documentDesignKey } from "@/lib/user-storage";
import {
  createDocumentDesignStore,
  type DesignInput,
  defaultDocumentDesign,
  normalizePaperStyle,
  selectDesignState,
} from "@/store/create-document-design-store";
import { useAuthStore } from "@/store/useAuthStore";
import { useEditorOverlaysStore } from "@/store/useEditorOverlaysStore";
import type {
  DocumentStatus,
  MyDocumentDetail,
  UpdateDocumentRequest,
} from "@/types/api.types";

/**
 * Convert a MyDocumentDetail (GET /documents/:id) into a DesignInput for the
 * design store. Missing/null fields fall back to the module defaults; the
 * store's loadDesignSnapshot normalizes letterhead styles on the way in.
 */
/** The form values autosave compares, with a fixed shape and key order. */
function toSaveSnapshot(values: {
  title?: string;
  subtitle?: string;
  content?: unknown;
}) {
  return {
    title: values.title ?? "",
    subtitle: values.subtitle ?? "",
    content: values.content ?? null,
  };
}

function documentToDesign(detail: MyDocumentDetail): DesignInput {
  const style = detail.style;
  const merge = <T,>(value: unknown, fallback: T): T =>
    value && typeof value === "object"
      ? ({ ...fallback, ...(value as Partial<T>) } as T)
      : fallback;

  return {
    typography: style?.typography ?? defaultDocumentDesign.typography,
    paperStyle: normalizePaperStyle(style?.paperStyle),
    paperTexture: merge<PaperTexture>(
      style?.paperTexture,
      defaultDocumentDesign.paperTexture,
    ),
    documentHeader: merge<DocumentHeader>(
      style?.documentHeader,
      defaultDocumentDesign.documentHeader,
    ),
    documentFooter: merge<DocumentFooter>(
      style?.documentFooter,
      defaultDocumentDesign.documentFooter,
    ),
    documentSignature: merge<DocumentSignature>(
      style?.documentSignature,
      defaultDocumentDesign.documentSignature,
    ),
    coverImage: detail.coverImageUrl ?? null,
    coverSettings: merge<CoverImageSettings>(
      style?.coverSettings,
      defaultDocumentDesign.coverSettings,
    ),
  };
}

interface DocumentEditorProps {
  /**
   * When provided, the editor starts in edit mode for this existing document
   * (GET /documents/:id already fetched): documentId starts set, the form and
   * the design store hydrate from it, and PublishPanel is pre-filled. When
   * absent, behavior is identical to the legacy /escrever create flow.
   */
  initialValues?: MyDocumentDetail;
}

export function DocumentEditor({ initialValues }: DocumentEditorProps) {
  const [mounted, setMounted] = useState(false);

  // --- Form (RHF — content only) ---
  const { form, title, isValid, errors, handleSubmit, setValue, draftContent } =
    useDocumentForm(
      initialValues
        ? {
            title: initialValues.title,
            subtitle: initialValues.abstract ?? undefined,
            content: initialValues.content ?? undefined,
          }
        : undefined,
    );

  // --- Design (per-document store instance, own localStorage key) ---
  const [designStore] = useState(() => {
    const name = documentDesignKey(initialValues?.id);
    const store = createDocumentDesignStore({ name });
    if (initialValues) {
      store.getState().loadDesignSnapshot(documentToDesign(initialValues));
    }
    return store;
  });

  // --- Design (store + computed — read-only for preview) ---
  const {
    paperTexture,
    documentHeader,
    documentFooter,
    documentSignature,
    typography,
    coverImage,
    coverSettings,
    setCoverImage,
    setCoverSettings,
    paperColors,
    fontClass,
    textureStyle,
    paperStyle,
  } = useDocumentDesign(designStore);

  // --- UI-only state (not persisted in document) ---
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // --- Document identity ---
  // Edits start with the id set (PATCH on every save); creation starts with
  // undefined and the first save POSTs, then stores the returned id so
  // subsequent saves (same session) PATCH the same doc.
  const [documentId, setDocumentId] = useState<string | undefined>(
    initialValues?.id,
  );
  const documentIdRef = useRef<string | undefined>(initialValues?.id);
  // Organization the document is published under (null = "Pessoal"). The
  // selection lives here so it travels with every save/autosave/publish and
  // can be changed from an already published document.
  const [organizationId, setOrganizationId] = useState<string | null>(
    initialValues?.organization?.id ?? null,
  );
  // Letterhead markers ({{publicador}}, {{autor}}, {{org}}) and the automatic
  // signature, resolved on display. Author: profile displayName (same
  // query/cache as the navbar), else the username. Org: the selected
  // organization's name (same query/cache as the PublishPanel), else the one
  // the document came with.
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const currentAuthor = useCurrentAuthorContext();
  const { data: myOrganizations } = useMyOrganizations(isAuthenticated);
  const letterheadContext = useMemo<LetterheadTextContext>(() => {
    const organizationName = organizationId
      ? (myOrganizations?.find((o) => o.id === organizationId)?.name ??
        (initialValues?.organization?.id === organizationId
          ? initialValues.organization.name
          : null))
      : null;
    return {
      author: currentAuthor,
      organization: organizationName ? { name: organizationName } : null,
    };
  }, [
    organizationId,
    myOrganizations,
    initialValues?.organization,
    currentAuthor,
  ]);
  // Before publishing there is no authorship/publishedAt: the signature uses
  // "@username" and today's date.
  const signatureContext = useMemo<SignatureContext>(
    () => ({
      ...letterheadContext,
      authorship: initialValues?.authorship ?? null,
      publishedAt: initialValues?.publishedAt ?? null,
    }),
    [letterheadContext, initialValues?.authorship, initialValues?.publishedAt],
  );
  // Live status: the panel needs to know the document is already published to
  // avoid a second PATCH /publish (the backend answers 400 in that case).
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>(
    initialValues?.status ?? "draft",
  );
  const saveMutation = useSaveDocument(documentId);
  const publishMutation = usePublishDocument(documentId);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showCoverUrlInput, setShowCoverUrlInput] = useState(false);
  const [showJsonPreview, setShowJsonPreview] = useState(false);
  const [jsonPreviewData, setJsonPreviewData] = useState<object | null>(null);
  const [jsonPreviewAction, setJsonPreviewAction] = useState<
    "save" | "publish"
  >("save");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // --- Design overlay / theme sheet / publish (UI only) ---
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isDesignOpen, setIsDesignOpen] = useState(false);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<DesignTab>("colors");

  // --- TipTap Editor ---
  // Seed the initial content only once (mounted instance is keyed by the id
  // at the page level, so a fresh editor is created per document).
  const editor = useEditor({
    immediatelyRender: false,
    content:
      (initialValues?.content as Content | null | undefined) ?? undefined,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false }),
      Placeholder.configure({ placeholder: "Comece a escrever seu artigo..." }),
      ImageExtension.configure({
        HTMLAttributes: { class: "max-w-full h-auto my-6" },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "underline underline-offset-4 hover:opacity-80 transition-colors",
        },
      }),
      Highlight.configure({
        HTMLAttributes: { class: "bg-accent/20 px-1" },
      }),
      Typography,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none focus:outline-none min-h-[50vh] text-foreground",
      },
    },
    onUpdate: ({ editor: e }) => {
      const text = e.getText();
      setValue("content", e.getJSON(), { shouldDirty: true });
      setWordCount(text.split(/\s+/).filter(Boolean).length);
      setCharCount(text.length);
    },
  });

  // --- Mount ---
  useEffect(() => {
    setMounted(true);
  }, []);

  // Restore the local draft into TipTap after the editor is mounted. RHF is
  // already reset by useDocumentForm, so this only rehydrates the editor view
  // without marking the form dirty.
  const restoredDraftRef = useRef(false);
  useEffect(() => {
    if (!editor || initialValues || !draftContent || restoredDraftRef.current) {
      return;
    }
    restoredDraftRef.current = true;
    editor.commands.setContent(draftContent as Content, {
      emitUpdate: false,
    });
    const text = editor.getText();
    setWordCount(text.split(/\s+/).filter(Boolean).length);
    setCharCount(text.length);
  }, [draftContent, editor, initialValues]);

  // Step the global navbar out of the way while the theme sheet or an overlay
  // is open (they render at z-50; the navbar is z-99).
  useEffect(() => {
    const open = isTemplatesOpen || isDesignOpen || isPublishOpen;
    useEditorOverlaysStore.getState().setOverlaysOpen(open);
    return () => {
      useEditorOverlaysStore.getState().setOverlaysOpen(false);
    };
  }, [isTemplatesOpen, isDesignOpen, isPublishOpen]);

  // --- Actions ---
  const buildSavePayload = useCallback(
    (
      data: {
        title?: string;
        subtitle?: string;
        content?: object | null;
      },
      metadata?: { categoryId?: string; tags?: string[] },
    ): UpdateDocumentRequest => {
      const design = selectDesignState(designStore.getState());
      const asRecord = (v: unknown): Record<string, unknown> | null =>
        v == null ? null : (v as Record<string, unknown>);
      return {
        title: data.title || "",
        type: "article",
        abstract: data.subtitle || null,
        content: (data.content as Record<string, unknown> | null) ?? null,
        coverImageUrl: design.coverImage || undefined,
        ...(metadata?.categoryId ? { categoryId: metadata.categoryId } : {}),
        ...(metadata?.tags && metadata.tags.length > 0
          ? { tags: metadata.tags }
          : {}),
        // The organization selection always travels with the save: an id
        // links the document, null makes it personal again.
        organizationId,
        typography: design.typography,
        paperStyle: asRecord(design.paperStyle),
        paperTexture: asRecord(design.paperTexture),
        coverSettings: asRecord(design.coverSettings),
        documentHeader: asRecord(design.documentHeader),
        documentFooter: asRecord(design.documentFooter),
        documentSignature: asRecord(design.documentSignature),
      };
    },
    [designStore, organizationId],
  );

  const persistDocumentId = useCallback((id: string | undefined) => {
    documentIdRef.current = id;
    setDocumentId(id);
  }, []);

  // --- Autosave (server) ---
  // Debounced save against the last saved snapshot. Only runs once the document
  // exists (documentId set) so it PATCHes instead of creating on every
  // keystroke; the first server save is manual. The localStorage draft
  // (use-document-form) still covers unsaved new documents.
  const watchedValues = useWatch({ control: form.control });
  const autosaveRef = useRef<() => Promise<boolean>>(async () => false);
  const { hasUnsavedChanges, markSaved } = useAutosave({
    values: toSaveSnapshot(watchedValues),
    enabled: !!documentId,
    onSave: () => autosaveRef.current(),
  });

  const onSave = useCallback(
    async (data: {
      title?: string;
      subtitle?: string;
      content?: object | null;
    }): Promise<boolean> => {
      if (!data.title?.trim()) return false;
      const snapshot = toSaveSnapshot(form.getValues());
      setIsSaving(true);
      try {
        const payload = buildSavePayload({
          ...data,
          content: editor?.getJSON() ?? data.content,
        });
        const saved = await saveMutation.mutateAsync(payload);
        if (saved?.id) persistDocumentId(saved.id);
        markSaved(snapshot);
        setLastSaved(new Date());
        return true;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Erro ao salvar documento:", error);
        toast.error(
          "Falha ao salvar o documento. Suas alterações ainda não foram salvas.",
        );
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [
      buildSavePayload,
      editor,
      form,
      markSaved,
      persistDocumentId,
      saveMutation,
    ],
  );
  autosaveRef.current = () => onSave(form.getValues());

  // Publish flow: save (with category + tags + organization) if needed, then
  // PATCH /publish. The overlay stays open while this runs; the PublishPanel
  // collapses it on success and surfaces errors inline. Throwing keeps the
  // panel open.
  const handleConfirmPublish = useCallback(
    async (metadata: { categoryId: string; tags: string[] }) => {
      setIsPublishing(true);
      try {
        let targetId = documentIdRef.current;
        const snapshot = toSaveSnapshot(form.getValues());
        const fullPayload = buildSavePayload(
          {
            ...form.getValues(),
            content: editor?.getJSON() ?? null,
          },
          metadata,
        );

        if (!targetId) {
          const saved = await saveMutation.mutateAsync(fullPayload);
          targetId = saved.id;
          persistDocumentId(targetId);
          markSaved(snapshot);
        } else if (hasUnsavedChanges) {
          await saveMutation.mutateAsync(fullPayload);
          markSaved(snapshot);
        } else {
          await saveMutation.mutateAsync({
            categoryId: metadata.categoryId,
            tags: metadata.tags,
            organizationId,
          });
        }

        // A document that is already published cannot be published again (the
        // backend answers 400), so the panel only updates its metadata and the
        // organization link.
        if (documentStatus === "published") {
          setLastSaved(new Date());
          toast.success("Artigo atualizado com sucesso");
          return;
        }

        await publishMutation.mutateAsync(targetId);
        setDocumentStatus("published");
        setLastSaved(new Date());
        toast.success("Artigo publicado com sucesso");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Erro ao publicar documento:", error);
        toast.error("Falha ao publicar o artigo");
        throw error;
      } finally {
        setIsPublishing(false);
      }
    },
    [
      buildSavePayload,
      documentStatus,
      editor,
      form,
      hasUnsavedChanges,
      markSaved,
      organizationId,
      persistDocumentId,
      publishMutation,
      saveMutation,
    ],
  );

  // Optional interactive preview of the exact payload that would be saved.
  const onPreview = useCallback(() => {
    const payload = buildSavePayload({
      title: form.getValues("title"),
      subtitle: form.getValues("subtitle"),
      content: editor?.getJSON() ?? null,
    });
    setJsonPreviewData(payload as unknown as object);
    setJsonPreviewAction("save");
    setShowJsonPreview(true);
  }, [buildSavePayload, editor, form]);

  const handleCoverUpload = useCallback(() => {
    setShowCoverUrlInput(true);
  }, []);

  const handleCoverSubmit = useCallback(
    (url: string) => {
      setCoverImage(url);
    },
    [setCoverImage],
  );

  // The design trigger is hidden while the publish overlay is open so the two
  // fullscreen ExpandableScreens are mutually exclusive.
  const designTrigger = isPublishOpen ? null : (
    <ExpandableScreenTrigger>
      <button
        type="button"
        className="flex items-center gap-1.5 px-2 py-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-xs hover:bg-black/5"
      >
        <Palette className="w-3.5 h-3.5" />
        <span className="text-[10px] font-mono uppercase tracking-wider">
          Editar design
        </span>
      </button>
    </ExpandableScreenTrigger>
  );

  const publishTrigger = (
    <ExpandableScreenTrigger>
      <Button
        size="sm"
        disabled={!isValid || !title?.trim() || isPublishing}
        data-testid="publish-button"
        className="font-mono text-xs uppercase tracking-wider"
      >
        <Send className="w-4 h-4" />
        <span className="ml-2">Publicar</span>
      </Button>
    </ExpandableScreenTrigger>
  );

  // --- Loading state ---
  if (!mounted || !editor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-foreground border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ExpandableScreen
        layoutId="escrever-design"
        contentRadius="0px"
        onExpandChange={setIsDesignOpen}
      >
        <div className={`min-h-screen ${fontClass}`}>
          {/* Background dots */}
          <div
            className="fixed inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, hsl(var(--foreground) / 0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Editor Styles */}
          <EditorStyles />

          {/* Toolbar */}
          <EditorToolbar
            editor={editor}
            onShowLinkModal={() => setShowLinkModal(true)}
          />
          <main className="relative z-10 py-12 bg-background rounded-xs">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto px-4 md:px-6"
            >
              <DocumentPaperHeader
                paperColors={paperColors}
                onOpenTemplates={() => setIsTemplatesOpen(true)}
                designTrigger={designTrigger}
              />
              {/* Document Container */}
              <PaperSurface
                paperColors={paperColors}
                paperTexture={paperTexture}
                textureStyle={textureStyle}
                grains={paperStyle.grains}
                grainSettings={paperStyle.grainSettings}
                contentClassName="md:p-10 p-8"
              >
                {/* Header Letterhead */}
                {documentHeader.enabled && (
                  <DocumentHeaderRenderer
                    header={documentHeader}
                    className="mb-4"
                    textContext={letterheadContext}
                  />
                )}
                {/* Title */}
                <Controller
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Titulo do artigo"
                      data-testid="editor-title-input"
                      className={`w-full text-4xl md:text-5xl font-bold tracking-tight bg-transparent border-none outline-none mb-4 transition-colors duration-300 ${fontClass}`}
                      style={{ color: paperColors?.text || undefined }}
                    />
                  )}
                />
                <style>{`
            input[placeholder="Titulo do artigo"]::placeholder {
              color: ${paperColors?.muted || "hsl(var(--muted-foreground) / 0.5)"};
            }
          `}</style>
                {errors.title && (
                  <p className="text-red-500 text-sm mb-2">
                    {errors.title.message}
                  </p>
                )}

                {/* Subtitle */}
                <Controller
                  name="subtitle"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value || ""}
                      type="text"
                      placeholder="Uma breve descricao do seu artigo..."
                      data-testid="editor-subtitle-input"
                      className={`w-full text-xl bg-transparent border-none outline-none mb-8 transition-colors duration-300 ${fontClass}`}
                      style={{ color: paperColors?.muted || undefined }}
                    />
                  )}
                />
                <style>{`
            input[placeholder="Uma breve descricao do seu artigo..."]::placeholder {
              color: ${paperColors?.muted || "hsl(var(--muted-foreground) / 0.5)"};
            }
          `}</style>

                {/* Cover Image */}
                <div className="mb-10">
                  <CoverImageEditor
                    coverImage={coverImage ?? null}
                    onCoverChange={handleCoverUpload}
                    onCoverRemove={() => {
                      setCoverImage(null);
                      setCoverSettings({ ...DEFAULT_COVER_SETTINGS });
                    }}
                    settings={coverSettings}
                    onSettingsChange={setCoverSettings}
                    paperColors={paperColors}
                  />
                </div>

                {/* Divider */}
                <div className="flex items-center gap-6 mb-10">
                  <div
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      backgroundColor: paperColors
                        ? `${paperColors.text}33`
                        : "hsl(var(--foreground) / 0.2)",
                    }}
                  />
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-accent" />
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300"
                      style={{ color: paperColors?.muted || undefined }}
                    >
                      Conteudo
                    </span>
                    <div className="w-1.5 h-1.5 bg-accent" />
                  </div>
                  <div
                    className="h-px flex-1 transition-colors duration-300"
                    style={{
                      backgroundColor: paperColors
                        ? `${paperColors.text}33`
                        : "hsl(var(--foreground) / 0.2)",
                    }}
                  />
                </div>

                {/* Editor */}
                <div
                  data-testid="editor-content"
                  className={`editor-wrapper editor-${typography} ${paperColors ? "custom-paper" : ""}`}
                  style={{
                    ["--custom-text-color" as string]: paperColors?.text,
                    ["--custom-muted-color" as string]: paperColors?.muted,
                  }}
                >
                  <EditorContent editor={editor} />
                </div>

                {/* Signature */}
                {isSignatureVisible(documentSignature, signatureContext) && (
                  <SignatureBlock
                    context={signatureContext}
                    color={paperColors?.text}
                    background={paperColors?.bg}
                  />
                )}

                {/* Footer Letterhead */}
                {documentFooter.enabled && (
                  <DocumentFooterRenderer
                    footer={documentFooter}
                    className="mt-4"
                    textContext={letterheadContext}
                  />
                )}
              </PaperSurface>
              {/* Paper status footer */}
              <DocumentPaperFooter
                wordCount={wordCount}
                charCount={charCount}
                paperColors={paperColors}
              />
            </motion.div>
          </main>

          {/* Publish flow: trigger (FAB button) + fullscreen panel. The
              layoutId is its own screen, mutually exclusive with the design
              overlay: the design trigger hides while publishing, and the FAB
              (with the publish trigger) hides while the design overlay is
              open. */}
          <ExpandableScreen
            layoutId="escrever-publish"
            contentRadius="0px"
            onExpandChange={setIsPublishOpen}
          >
            {!isDesignOpen && (
              <FloatingActionBar
                lastSaved={lastSaved}
                isSaving={isSaving}
                onSave={handleSubmit(onSave)}
                publishTrigger={publishTrigger}
                onPreview={onPreview}
              />
            )}
            <ExpandableScreenContent className="bg-background">
              <PublishPanel
                status={documentStatus}
                hasUnsavedChanges={hasUnsavedChanges || !documentId}
                isPublishing={isPublishing}
                initialCategoryId={initialValues?.category?.id ?? null}
                initialTags={
                  initialValues?.tags.map((t) => t.name) ?? undefined
                }
                organizationId={organizationId}
                onOrganizationChange={setOrganizationId}
                onConfirm={handleConfirmPublish}
              />
            </ExpandableScreenContent>
          </ExpandableScreen>

          {/* Modals */}
          <LinkModal
            isOpen={showLinkModal}
            onClose={() => setShowLinkModal(false)}
            onSubmit={(url: string) => {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
              setShowLinkModal(false);
            }}
            initialUrl={editor.getAttributes("link").href || ""}
          />

          <CoverUrlDialog
            isOpen={showCoverUrlInput}
            onClose={() => setShowCoverUrlInput(false)}
            onSubmit={handleCoverSubmit}
          />

          <JsonPreviewModal
            isOpen={showJsonPreview}
            onClose={() => setShowJsonPreview(false)}
            data={jsonPreviewData}
            action={jsonPreviewAction}
          />

          {/* Theme picker sheet */}
          <Sheet open={isTemplatesOpen} onOpenChange={setIsTemplatesOpen}>
            <SheetContent side="right" className="p-0">
              <TemplatePicker
                designStore={designStore}
                onClose={() => setIsTemplatesOpen(false)}
              />
            </SheetContent>
          </Sheet>

          {/* Design editor overlay (rendered after the FAB in DOM order) */}
          <ExpandableScreenContent className="bg-background">
            <DesignOverlay
              designStore={designStore}
              activeTab={activeTab}
              onActiveTabChange={setActiveTab}
              letterheadContext={letterheadContext}
              signatureContext={signatureContext}
            />
          </ExpandableScreenContent>
        </div>
      </ExpandableScreen>
    </>
  );
}
