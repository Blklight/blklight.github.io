import { describe, expect, it } from "vitest";
import {
  ARTICLE_BODIES,
  ARTICLES_BY_ID,
  TRAIL_NODE,
  TRAIL_REACT,
} from "@/features/dossier/mock";
import { trailToDossier } from "@/features/dossier/trail-adapter";
import {
  type DossierState,
  dossierReducer,
} from "@/features/dossier/use-dossier-state";

describe("trailToDossier", () => {
  it("orders sheets and maps sections", () => {
    const d = trailToDossier(TRAIL_REACT, ARTICLES_BY_ID);
    expect(d.sheets).toHaveLength(TRAIL_REACT.items.length);
    expect(d.sheets.map((s) => s.data.order)).toEqual(
      [...d.sheets.map((s) => s.data.order)].sort((a, b) => a - b),
    );
    expect(d.sections).toHaveLength(4);
    expect(d.cover.code).toBe("TRL-004");
  });

  it("shares the same article object across trails, without body", () => {
    const react = trailToDossier(TRAIL_REACT, ARTICLES_BY_ID);
    const node = trailToDossier(TRAIL_NODE, ARTICLES_BY_ID);
    const a = react.sheets.find((s) => s.slug === "configurar-node-local");
    const b = node.sheets.find((s) => s.slug === "configurar-node-local");
    expect(a?.data.article).toBe(b?.data.article);
    expect(a?.data.intro).not.toBe(b?.data.intro);
    expect(a?.data.article.body).toBeUndefined();
  });

  it("skips items whose article is missing", () => {
    const d = trailToDossier(
      {
        ...TRAIL_NODE,
        items: [...TRAIL_NODE.items, { articleId: "nope", order: 9 }],
      },
      ARTICLES_BY_ID,
    );
    expect(d.sheets).toHaveLength(TRAIL_NODE.items.length);
  });

  it("body headings match the declared headings", () => {
    for (const article of ARTICLES_BY_ID.values()) {
      for (const h of article.headings) {
        expect(ARTICLE_BODIES[article.id]).toContain(`id="${h.id}"`);
      }
    }
  });
});

describe("dossierReducer", () => {
  const closed: DossierState = { mode: "closed", index: 0 };
  const r = (s: DossierState, a: Parameters<typeof dossierReducer>[1]) =>
    dossierReducer(s, a, 3);

  it("opens on next from closed and clamps at the end", () => {
    let s = r(closed, { type: "next" });
    expect(s).toEqual({ mode: "open", index: 0 });
    s = r(r(r(s, { type: "next" }), { type: "next" }), { type: "next" });
    expect(s.index).toBe(2);
  });

  it("closes on prev from the first sheet", () => {
    expect(r({ mode: "open", index: 0 }, { type: "prev" }).mode).toBe("closed");
  });

  it("focus and unfocus keep the index", () => {
    const f = r(closed, { type: "focus", index: 2 });
    expect(f).toEqual({ mode: "focus", index: 2 });
    expect(r(f, { type: "unfocus" })).toEqual({ mode: "open", index: 2 });
  });

  it("goTo from closed opens the folder", () => {
    expect(r(closed, { type: "goTo", index: 1 })).toEqual({
      mode: "open",
      index: 1,
    });
  });
});
