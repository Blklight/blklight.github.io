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
import { FileJson, Save, Send } from "lucide-react";
import { motion } from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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
import { BlockHandle } from "@/components/escrever/block-handle";
import type { DesignTab } from "@/components/escrever/design/sidebar";
import { DocumentPaperFooter } from "@/components/escrever/document-paper-footer";
import {
  ACTION,
  DocumentPaperHeader,
} from "@/components/escrever/document-paper-header";
import {
  EditorBlockMenu,
  EditorBubbleMenu,
} from "@/components/escrever/editor-toolbar";
import {
  ImageInsertDialog,
  imageFiles,
  uploadAndInsert,
} from "@/components/escrever/image-insert";
import { JsonPreviewModal, LinkModal } from "@/components/escrever/modals";
import { PublishPanel } from "@/components/escrever/publish-panel";
import {
  DesignPanel,
  DesignRegion,
  type SidePanel,
  SidePanelFrame,
  SideTabs,
} from "@/components/escrever/side-panel";
import { SlashCommand, SlashMenu } from "@/components/escrever/slash-command";
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
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import type { SignatureContext } from "@/features/documents/design/signature";
import {
  type DocumentKind,
  kindByType,
} from "@/features/documents/document-kinds";
import {
  usePublishDocument,
  useSaveDocument,
} from "@/features/documents/queries";
import { useMyOrganizations } from "@/features/organizations/queries";
import { documentDesignKey } from "@/lib/user-storage";
import { cn } from "@/lib/utils";
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
  /** Type of a new document, from its /escrever/<tipo> page. */
  kind?: DocumentKind;
}

export function DocumentEditor({
  initialValues,
  kind: newKind,
}: DocumentEditorProps) {
  const kind = initialValues
    ? kindByType(initialValues.typeName)
    : (newKind ?? kindByType("article"));
  const docType = kind.type;
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
    typography,
    setTypography,
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
      typeLabel: kind.label,
    };
  }, [
    kind.label,
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

  // --- Side panel (themes / design mode) and publish (UI only) ---
  const [sidePanel, setSidePanel] = useState<SidePanel | null>(null);
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [activeTab, setActiveTab] = useState<DesignTab>("colors");
  const isDesignMode = sidePanel === "design";
  const isWide = useIsWide();
  const toggleSidePanel = useCallback(
    (panel: SidePanel) =>
      setSidePanel((current) => (current === panel ? null : panel)),
    [],
  );
  // Wide screens split design controls: paper on the left, parts on the right.
  const [paperTab, setPaperTab] = useState<DesignTab>("colors");
  const [partsTab, setPartsTab] = useState<DesignTab>("letterhead");
  const pickRegion = useCallback((tab: DesignTab) => {
    setActiveTab(tab);
    if (PAPER_TABS.includes(tab)) setPaperTab(tab);
    else setPartsTab(tab);
    setSidePanel("design");
  }, []);

  // --- TipTap Editor ---
  // Seed the initial content only once (mounted instance is keyed by the id
  // at the page level, so a fresh editor is created per document).
  const editor = useEditor({
    immediatelyRender: false,
    content:
      (initialValues?.content as Content | null | undefined) ?? undefined,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] }, link: false }),
      Placeholder.configure({ placeholder: kind.contentPlaceholder }),
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
      SlashCommand,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[50vh] text-foreground",
      },
      // Pasted or dropped image files are uploaded instead of embedded as data URLs.
      handlePaste: (view, event) => {
        const files = imageFiles(event.clipboardData?.files);
        if (files.length === 0) return false;
        for (const file of files) void uploadAndInsert(view, file);
        return true;
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = moved ? [] : imageFiles(event.dataTransfer?.files);
        if (files.length === 0) return false;
        event.preventDefault();
        const pos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;
        for (const file of files) void uploadAndInsert(view, file, pos);
        return true;
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

  // Step the global navbar out of the way while the themes sheet, the design
  // bottom sheet (narrow screens) or the publish overlay is open (they render at z-50; the navbar is z-99).
  useEffect(() => {
    const open =
      sidePanel === "themes" || (isDesignMode && !isWide) || isPublishOpen;
    useEditorOverlaysStore.getState().setOverlaysOpen(open);
    return () => {
      useEditorOverlaysStore.getState().setOverlaysOpen(false);
    };
  }, [sidePanel, isDesignMode, isWide, isPublishOpen]);

  // Design mode shows the paper as it will look: the text is read-only.
  useEffect(() => {
    editor?.setEditable(!isDesignMode);
  }, [editor, isDesignMode]);

  useEffect(() => {
    if (!sidePanel) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidePanel(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sidePanel]);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setShowLinkModal(false);
      setShowCoverUrlInput(false);
      setShowJsonPreview(false);
      setSidePanel(null);
      setIsPublishOpen(false);
    };
  }, []);

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
        type: docType,
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
    [designStore, organizationId, docType],
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

  const publishTrigger = (
    <ExpandableScreenTrigger>
      <Button
        size="sm"
        disabled={!isValid || !title?.trim() || isPublishing}
        data-testid="publish-button"
        aria-label="Publicar"
        className="ml-1 h-8 bg-background font-mono text-xs uppercase tracking-wider text-foreground hover:bg-background/90"
      >
        <Send className="w-4 h-4" />
        <span className="ml-2 hidden sm:inline">Publicar</span>
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

  const region = (tab: DesignTab) => ({
    active: isDesignMode,
    tab,
    selected:
      isDesignMode &&
      (isWide ? tab === paperTab || tab === partsTab : tab === activeTab),
    onSelect: pickRegion,
  });

  const designPanel = (
    tab: DesignTab,
    onTabChange: (tab: DesignTab) => void,
    tabs?: DesignTab[],
  ) => (
    <DesignPanel
      designStore={designStore}
      tab={tab}
      onTabChange={onTabChange}
      tabs={tabs}
      signatureContext={signatureContext}
    />
  );

  return (
    <>
      <Navbar />
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

        {/* Publish flow: the trigger sits in the paper bar, the panel opens full screen. */}
        <ExpandableScreen
          layoutId="escrever-publish"
          contentRadius="0px"
          onExpandChange={setIsPublishOpen}
        >
          <main className="relative z-10 py-12 bg-background rounded-xs">
            <div className="mx-auto max-w-3xl px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <DocumentPaperHeader
                  editor={editor}
                  status={documentStatus}
                  typography={typography}
                  onTypographyChange={setTypography}
                  type={kind.type}
                  typeLabel={kind.label}
                  locked={isDesignMode}
                  actions={
                    <>
                      <button
                        type="button"
                        onClick={handleSubmit(onSave)}
                        disabled={isSaving}
                        title="Salvar"
                        className={cn(ACTION, "px-1.5")}
                      >
                        {isSaving ? (
                          <span className="size-4 animate-spin border-2 border-current border-t-transparent" />
                        ) : (
                          <Save />
                        )}
                        <span className="sr-only">Salvar</span>
                      </button>
                      {process.env.NODE_ENV === "development" && (
                        <button
                          type="button"
                          onClick={onPreview}
                          disabled={isSaving}
                          title="Visualizar payload JSON"
                          className={cn(ACTION, "hidden px-1.5 sm:flex")}
                        >
                          <FileJson />
                          <span className="sr-only">Preview</span>
                        </button>
                      )}
                      {publishTrigger}
                    </>
                  }
                  save={{ lastSaved, isSaving }}
                  extraTabs={
                    <SideTabs
                      open={sidePanel}
                      onToggle={toggleSidePanel}
                      className="h-8 items-center lg:hidden"
                    />
                  }
                />

                {/* Side tabs pinned to the paper's right edge (wide screens);
                  hidden while the design panels sit in the margins. */}
                <div
                  className={cn(
                    "absolute top-24 bottom-0 left-full hidden lg:block",
                    isDesignMode && isWide && "lg:hidden",
                  )}
                >
                  <SideTabs
                    vertical
                    open={sidePanel}
                    onToggle={toggleSidePanel}
                    className="sticky top-32"
                  />
                </div>

                {/* Document Container */}
                <PaperSurface
                  paperColors={paperColors}
                  paperTexture={paperTexture}
                  textureStyle={textureStyle}
                  grains={paperStyle.grains}
                  grainSettings={paperStyle.grainSettings}
                  className={cn(
                    "shadow-[0_28px_56px_-28px_rgb(0_0_0/0.45),0_2px_8px_-2px_rgb(0_0_0/0.12)]",
                    isDesignMode &&
                      "outline-2 outline-dashed outline-offset-4 outline-foreground/40",
                  )}
                  contentClassName="md:p-10 p-8"
                >
                  {/* Paper itself (color, texture, grain): the background of design mode. */}
                  {isDesignMode && (
                    <button
                      type="button"
                      aria-label="Editar papel"
                      onClick={() => {
                        // Keep the paper tab already open (texture, grain) instead of jumping back to colors.
                        const current = isWide ? paperTab : activeTab;
                        pickRegion(
                          SURFACE_TABS.includes(current) ? current : "colors",
                        );
                      }}
                      className="absolute inset-0 z-0 cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-current"
                    />
                  )}

                  {/* Header Letterhead */}
                  {documentHeader.enabled && (
                    <DesignRegion {...region("letterhead")} className="mb-4">
                      <DocumentHeaderRenderer
                        header={documentHeader}
                        textContext={letterheadContext}
                      />
                    </DesignRegion>
                  )}

                  <DesignRegion {...region("font")} label="Título e fonte">
                    {/* Title */}
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          readOnly={isDesignMode}
                          placeholder={kind.titlePlaceholder}
                          data-testid="editor-title-input"
                          className={`w-full text-4xl md:text-5xl font-bold tracking-tight bg-transparent border-none outline-none mb-4 transition-colors duration-300 ${fontClass}`}
                          style={{ color: paperColors?.text || undefined }}
                        />
                      )}
                    />
                    <style>{`
            input[placeholder={kind.titlePlaceholder}]::placeholder {
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
                          readOnly={isDesignMode}
                          placeholder={kind.abstractPlaceholder}
                          data-testid="editor-subtitle-input"
                          className={`w-full text-xl bg-transparent border-none outline-none mb-8 transition-colors duration-300 ${fontClass}`}
                          style={{ color: paperColors?.muted || undefined }}
                        />
                      )}
                    />
                    <style>{`
            input[placeholder={kind.abstractPlaceholder}]::placeholder {
              color: ${paperColors?.muted || "hsl(var(--muted-foreground) / 0.5)"};
            }
          `}</style>
                  </DesignRegion>

                  {/* Cover Image */}
                  <DesignRegion {...region("cover")} className="mb-10">
                    <div>
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
                  </DesignRegion>

                  {/* Editor (read-only and faded in design mode) */}
                  <div
                    data-testid="editor-content"
                    lang="pt-BR"
                    inert={isDesignMode}
                    className={`relative z-10 editor-wrapper doc-prose editor-${typography} ${paperColors ? "custom-paper" : ""} ${isDesignMode ? "pointer-events-none select-none opacity-50 transition-opacity" : ""}`}
                    style={{
                      ["--custom-text-color" as string]: paperColors?.text,
                      ["--custom-muted-color" as string]: paperColors?.muted,
                    }}
                  >
                    {isDesignMode && editor.isEmpty && <DesignSample />}
                    <div hidden={isDesignMode && editor.isEmpty}>
                      <EditorContent editor={editor} />
                    </div>
                    {!isDesignMode && (
                      <>
                        <EditorBubbleMenu
                          editor={editor}
                          onShowLinkModal={() => setShowLinkModal(true)}
                        />
                        <EditorBlockMenu editor={editor} />
                        <BlockHandle editor={editor} />
                        <SlashMenu />
                        <ImageInsertDialog />
                      </>
                    )}
                  </div>

                  {/* Signature */}
                  {isSignatureVisible(signatureContext) && (
                    <DesignRegion {...region("signature")} className="mt-12">
                      <SignatureBlock
                        context={signatureContext}
                        color={paperColors?.text}
                        background={paperColors?.bg}
                      />
                    </DesignRegion>
                  )}

                  {/* Footer Letterhead */}
                  {documentFooter.enabled && (
                    <DesignRegion
                      {...region("letterhead")}
                      label="Rodapé"
                      className="mt-4"
                    >
                      <DocumentFooterRenderer
                        footer={documentFooter}
                        textContext={letterheadContext}
                      />
                    </DesignRegion>
                  )}
                </PaperSurface>
                {/* Paper status footer */}
                <DocumentPaperFooter
                  wordCount={wordCount}
                  charCount={charCount}
                />
              </motion.div>
            </div>
          </main>

          {/* Design panels in the page margins (xl and up): the paper stays put. */}
          {isDesignMode && isWide && (
            <>
              <aside className={cn(DESIGN_ASIDE, "right-[calc(50%+23.5rem)]")}>
                <SidePanelFrame
                  title="Papel"
                  closeLabel="Sair do modo design"
                  onClose={() => setSidePanel(null)}
                >
                  {designPanel(paperTab, setPaperTab, PAPER_TABS)}
                </SidePanelFrame>
              </aside>
              <aside className={cn(DESIGN_ASIDE, "left-[calc(50%+23.5rem)]")}>
                <SidePanelFrame
                  title="Partes do documento"
                  closeLabel="Sair do modo design"
                  onClose={() => setSidePanel(null)}
                >
                  {designPanel(partsTab, setPartsTab, PARTS_TABS)}
                </SidePanelFrame>
              </aside>
            </>
          )}

          {/* Themes: right sheet over the page, as before the side tabs. */}
          <Sheet
            open={sidePanel === "themes"}
            onOpenChange={(open) => !open && setSidePanel(null)}
          >
            <SheetContent side="right" className="p-0">
              <TemplatePicker
                designStore={designStore}
                onClose={() => setSidePanel(null)}
              />
            </SheetContent>
          </Sheet>

          <Sheet
            open={isDesignMode && !isWide}
            onOpenChange={(open) => !open && setSidePanel(null)}
          >
            <SheetContent
              side="bottom"
              className="data-[side=bottom]:h-[75dvh] p-0"
            >
              <SheetTitle className="sr-only">Design</SheetTitle>
              <div className="h-full overflow-y-auto pt-10">
                {designPanel(activeTab, setActiveTab)}
              </div>
            </SheetContent>
          </Sheet>

          <ExpandableScreenContent className="bg-background">
            <PublishPanel
              status={documentStatus}
              hasUnsavedChanges={hasUnsavedChanges || !documentId}
              isPublishing={isPublishing}
              initialCategoryId={initialValues?.category?.id ?? null}
              initialTags={initialValues?.tags.map((t) => t.name) ?? undefined}
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
      </div>
    </>
  );
}

const WIDE_QUERY = "(min-width: 80rem)";

const PAPER_TABS: DesignTab[] = ["colors", "texture", "grain", "font"];
const SURFACE_TABS: DesignTab[] = ["colors", "texture", "grain"];
const PARTS_TABS: DesignTab[] = ["letterhead", "cover", "signature"];

// Flush against the paper (45rem wide, 1rem gap), filling the margin up to 22rem.
const DESIGN_ASIDE =
  "fixed top-28 bottom-28 z-40 w-[clamp(15rem,calc(50vw-24.5rem),22rem)]";

/** xl and up: design panels fit in the margins beside the paper; below, a bottom sheet. */
function useIsWide() {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(WIDE_QUERY);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true,
  );
}

/** Stand-in body for design mode when the document has no text yet. */
function DesignSample() {
  return (
    <div aria-hidden>
      <p>
        Este é um texto de exemplo para você ver o design com conteúdo. A fonte,
        as cores do papel e a textura aparecem aqui como no texto publicado.
      </p>
      <p>
        Quando você voltar a escrever, o seu texto ocupa este lugar. Cabeçalho,
        capa, assinatura e rodapé continuam onde estão.
      </p>
      <h2>Um intertítulo</h2>
      <p>
        Os parágrafos seguem o estilo de livro: recuo na primeira linha, sem
        espaço entre eles, e o primeiro depois de um título começa sem recuo.
      </p>
    </div>
  );
}
