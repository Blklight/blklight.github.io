import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Editor } from "@tiptap/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  ImageInsertDialog,
  imageFiles,
  pastedImageFiles,
  useImageInsertStore,
} from "@/components/escrever/image-insert";
import { uploadWithToast } from "@/features/uploads/api";

vi.mock("@/features/uploads/api", () => ({
  IMAGE_ACCEPT: "image/*",
  uploadWithToast: vi.fn(),
}));

function fakeEditor() {
  const setImage = vi.fn();
  const chain = {
    focus: () => chain,
    setImage: (attrs: unknown) => {
      setImage(attrs);
      return chain;
    },
    run: vi.fn(),
  };
  const dispatch = vi.fn();
  const node = { type: "image" };
  const create = vi.fn(() => node);
  const tr = {
    replaceSelectionWith: vi.fn(() => tr),
    scrollIntoView: vi.fn(() => tr),
  };
  const editor = {
    chain: () => chain,
    view: {
      isDestroyed: false,
      dispatch,
      state: {
        schema: { nodes: { image: { create } } },
        tr,
        doc: { content: { size: 0 } },
      },
    },
  } as unknown as Editor;
  return { editor, setImage, create, dispatch };
}

describe("ImageInsertDialog", () => {
  beforeEach(() => {
    vi.mocked(uploadWithToast).mockReset();
    act(() => useImageInsertStore.getState().close());
  });

  it("inserts an external URL with its description as alt", async () => {
    const { editor, setImage } = fakeEditor();
    render(<ImageInsertDialog />);
    act(() => useImageInsertStore.getState().open(editor));

    await userEvent.type(
      screen.getByLabelText("Descrição da imagem"),
      "Um gato",
    );
    await userEvent.type(
      screen.getByLabelText("URL da imagem"),
      "https://i.imgur.com/a.png",
    );
    await userEvent.click(screen.getByRole("button", { name: "Inserir URL" }));

    expect(setImage).toHaveBeenCalledWith({
      src: "https://i.imgur.com/a.png",
      alt: "Um gato",
    });
    expect(useImageInsertStore.getState().editor).toBeNull();
  });

  it("uploads a chosen file and inserts the returned URL with the alt", async () => {
    const { editor, create, dispatch } = fakeEditor();
    vi.mocked(uploadWithToast).mockResolvedValue({
      url: "http://s3/x.webp",
      width: 1,
      height: 1,
      bytes: 1,
    });
    const { baseElement } = render(<ImageInsertDialog />);
    act(() => useImageInsertStore.getState().open(editor));

    await userEvent.type(screen.getByLabelText("Descrição da imagem"), "Capa");
    const input = baseElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await userEvent.upload(
      input,
      new File(["x"], "a.png", { type: "image/png" }),
    );

    await vi.waitFor(() => expect(dispatch).toHaveBeenCalled());
    expect(uploadWithToast).toHaveBeenCalledWith(
      expect.any(File),
      "editor",
      expect.any(Object),
    );
    expect(create).toHaveBeenCalledWith({
      src: "http://s3/x.webp",
      alt: "Capa",
    });
  });

  it("inserts nothing when the upload fails", async () => {
    const { editor, dispatch } = fakeEditor();
    vi.mocked(uploadWithToast).mockResolvedValue(null);
    const { baseElement } = render(<ImageInsertDialog />);
    act(() => useImageInsertStore.getState().open(editor));

    const input = baseElement.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await userEvent.upload(
      input,
      new File(["x"], "a.png", { type: "image/png" }),
    );

    await vi.waitFor(() => expect(uploadWithToast).toHaveBeenCalled());
    expect(dispatch).not.toHaveBeenCalled();
  });
});

describe("imageFiles", () => {
  it("keeps only image files", () => {
    const list = [
      new File(["a"], "a.png", { type: "image/png" }),
      new File(["b"], "b.txt", { type: "text/plain" }),
    ] as unknown as FileList;
    expect(imageFiles(list).map((f) => f.name)).toEqual(["a.png"]);
    expect(imageFiles(null)).toEqual([]);
  });
});

describe("pastedImageFiles", () => {
  const image = new File(["a"], "a.png", { type: "image/png" });
  const clipboard = (text: string) =>
    ({
      getData: (type: string) => (type === "text/plain" ? text : ""),
      files: [image] as unknown as FileList,
    }) as unknown as DataTransfer;

  it("uploads a pasted image", () => {
    expect(pastedImageFiles(clipboard(""))).toEqual([image]);
  });

  it("leaves a paste with text to the editor (Word/Docs add a picture of the selection)", () => {
    expect(pastedImageFiles(clipboard("Olá mundo"))).toEqual([]);
  });
});
