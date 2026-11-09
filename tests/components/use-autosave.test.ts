import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAutosave } from "@/components/escrever/use-autosave";

describe("useAutosave", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function setup(onSave = vi.fn(async () => true)) {
    const hook = renderHook(
      ({ values }) =>
        useAutosave({ values, enabled: true, onSave, delay: 1000 }),
      { initialProps: { values: { text: "loaded" } } },
    );
    return { ...hook, onSave };
  }

  it("does not save the values it started with", async () => {
    const { result, onSave } = setup();
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(onSave).not.toHaveBeenCalled();
    expect(result.current.hasUnsavedChanges).toBe(false);
  });

  it("keeps saving every round of edits, not only the first", async () => {
    const { rerender, result, onSave } = setup();

    rerender({ values: { text: "first edit" } });
    expect(result.current.hasUnsavedChanges).toBe(true);
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(result.current.hasUnsavedChanges).toBe(false);

    rerender({ values: { text: "second edit" } });
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(onSave).toHaveBeenCalledTimes(2);
  });

  it("debounces rapid edits into one save", async () => {
    const { rerender, onSave } = setup();
    rerender({ values: { text: "a" } });
    await act(() => vi.advanceTimersByTimeAsync(500));
    rerender({ values: { text: "ab" } });
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it("stays unsaved and warns on unload when the save fails", async () => {
    const { rerender, result } = setup(vi.fn(async () => false));
    rerender({ values: { text: "edit" } });
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(result.current.hasUnsavedChanges).toBe(true);

    const event = new Event("beforeunload", { cancelable: true });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it("treats a manual save as the new baseline", async () => {
    const { rerender, result, onSave } = setup();
    rerender({ values: { text: "manual" } });
    act(() => result.current.markSaved({ text: "manual" }));
    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(onSave).not.toHaveBeenCalled();
    expect(result.current.hasUnsavedChanges).toBe(false);
  });
});
