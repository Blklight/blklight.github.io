"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { DesignLayout } from "@/components/escrever/design";
import { DesignGallery } from "@/components/escrever/design/gallery";
import { Navbar } from "@/components/navbar";
import { cloneSnapshot } from "@/lib/design-template-storage";
import {
  createDocumentDesignStore,
  type DocumentDesignStore,
  selectDesignState,
} from "@/store/create-document-design-store";
import { useDesignTemplatesStore } from "@/store/useDesignTemplatesStore";

type DesignStore = UseBoundStore<StoreApi<DocumentDesignStore>>;
type View = "gallery" | "editor";

export default function DesignPage() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<View>("gallery");
  const [designStore] = useState<DesignStore>(() =>
    createDocumentDesignStore(),
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  );

  const { templates, saveTemplateSnapshot } = useDesignTemplatesStore();

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.id === selectedTemplateId) ?? null,
    [templates, selectedTemplateId],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // One-time legacy migration (client only, gated by the store). Runs after
  // the persisted store finishes hydrating to avoid racing its rehydrate.
  useEffect(() => {
    const templatesStore = useDesignTemplatesStore;
    if (templatesStore.persist.hasHydrated()) {
      templatesStore.getState().runLegacyMigration();
      return;
    }
    return templatesStore.persist.onFinishHydration(() => {
      templatesStore.getState().runLegacyMigration();
    });
  }, []);

  // --- Auto-save (1s debounce) back into the selected template ---
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fingerprintRef = useRef<string>("");

  const writeBack = useCallback(() => {
    if (!selectedTemplateId) return;
    const current = selectDesignState(designStore.getState());
    const fingerprint = JSON.stringify(current);
    if (fingerprint === fingerprintRef.current) return;
    fingerprintRef.current = fingerprint;
    saveTemplateSnapshot(selectedTemplateId, current);
  }, [designStore, selectedTemplateId, saveTemplateSnapshot]);

  const flushSave = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    writeBack();
  }, [writeBack]);

  useEffect(() => {
    const unsubscribe = designStore.subscribe(() => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(writeBack, 1000);
    });
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      unsubscribe();
    };
  }, [designStore, writeBack]);

  // --- Navigation / template switching ---
  const enterEditor = useCallback(
    (id: string) => {
      flushSave();
      const template = useDesignTemplatesStore
        .getState()
        .templates.find((t) => t.id === id);
      if (!template) return;
      fingerprintRef.current = JSON.stringify(template.snapshot);
      designStore
        .getState()
        .loadDesignSnapshot(cloneSnapshot(template.snapshot));
      setSelectedTemplateId(id);
      setView("editor");
    },
    [designStore, flushSave],
  );

  const createAndOpen = useCallback(() => {
    flushSave();
    const template = useDesignTemplatesStore.getState().createTemplate();
    fingerprintRef.current = JSON.stringify(template.snapshot);
    designStore.getState().loadDesignSnapshot(cloneSnapshot(template.snapshot));
    setSelectedTemplateId(template.id);
    setView("editor");
  }, [designStore, flushSave]);

  const backToGallery = useCallback(() => {
    flushSave();
    setSelectedTemplateId(null);
    setView("gallery");
  }, [flushSave]);

  // --- CRUD handlers ---
  const handleRename = useCallback((id: string, name: string) => {
    useDesignTemplatesStore.getState().renameTemplate(id, name);
  }, []);

  const handleRenameSelected = useCallback(
    (name: string) => {
      if (selectedTemplateId) {
        useDesignTemplatesStore
          .getState()
          .renameTemplate(selectedTemplateId, name);
      }
    },
    [selectedTemplateId],
  );

  const handleDuplicate = useCallback((id: string) => {
    useDesignTemplatesStore.getState().duplicateTemplate(id);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      useDesignTemplatesStore.getState().deleteTemplate(id);
      if (selectedTemplateId === id) {
        setSelectedTemplateId(null);
        setView("gallery");
      }
    },
    [selectedTemplateId],
  );

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  if (view === "gallery" || !selectedTemplate) {
    return (
      <DesignGallery
        templates={templates}
        onCreate={createAndOpen}
        onEdit={enterEditor}
        onRename={handleRename}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <>
      <Navbar />
      <DesignLayout
        designStore={designStore}
        templateName={selectedTemplate.name}
        onBack={backToGallery}
        onRename={handleRenameSelected}
        onSave={flushSave}
      />
    </>
  );
}
