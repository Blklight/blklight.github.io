"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { currentUserId, documentDraftKey } from "@/lib/user-storage";

export const documentFormSchema = z.object({
  title: z
    .string()
    .min(1, "Titulo e obrigatorio")
    .max(200, "Titulo muito longo"),
  subtitle: z.string().max(300, "Subtitulo muito longo").optional(),
  content: z.record(z.string(), z.unknown()).nullable().optional(),
});

export type DocumentFormValues = z.infer<typeof documentFormSchema>;

export const defaultDocumentValues: DocumentFormValues = {
  title: "",
  subtitle: "",
  content: null,
};

export function useDocumentForm(initialValues?: Partial<DocumentFormValues>) {
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentFormSchema),
    defaultValues: {
      ...defaultDocumentValues,
      ...initialValues,
    },
    mode: "onChange",
  });

  const title = useWatch({ control: form.control, name: "title" });
  const content = useWatch({ control: form.control, name: "content" });
  const [draftContent, setDraftContent] = useState<
    DocumentFormValues["content"] | null
  >(null);

  // Auto-save the draft under the signed-in user's key.
  useEffect(() => {
    if (initialValues || !currentUserId()) return;
    const timeout = setTimeout(() => {
      if (form.formState.isDirty) {
        localStorage.setItem(
          documentDraftKey(),
          JSON.stringify({ title, content }),
        );
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [title, content, form.formState.isDirty, initialValues]);

  // Expose the loaded draft so the editor can rehydrate TipTap (resetting RHF
  // alone does not update the editor view).
  useEffect(() => {
    if (initialValues || !currentUserId()) return;
    const draft = localStorage.getItem(documentDraftKey());
    if (!draft) return;
    try {
      const parsed = JSON.parse(draft) as Partial<DocumentFormValues>;
      const values = { ...defaultDocumentValues, ...parsed };
      form.reset(values);
      setDraftContent(values.content ?? null);
    } catch {
      // ignore invalid json
    }
  }, [form, initialValues]);

  const clearDraft = useCallback(() => {
    if (currentUserId()) localStorage.removeItem(documentDraftKey());
    setDraftContent(null);
    form.reset(defaultDocumentValues);
  }, [form]);

  return {
    form,
    title,
    content,
    draftContent,
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    clearDraft,
    reset: form.reset,
    handleSubmit: form.handleSubmit,
    register: form.register,
    setValue: form.setValue,
    getValues: form.getValues,
    control: form.control,
  };
}
