import { describe, expect, it } from "vitest";
import { DEPTH, sheetPose } from "@/components/dossier/stack-pose";

const N = 12;

describe("sheetPose", () => {
  it("draws only the top DEPTH sheets of the pile", () => {
    expect(sheetPose(3, 3, 3, N)).toMatchObject({ top: true, depth: 0 });
    expect(sheetPose(3 + DEPTH - 1, 3, 3, N)).toMatchObject({
      depth: DEPTH - 1,
    });
    expect(sheetPose(3 + DEPTH, 3, 3, N)).toBeNull();
    expect(sheetPose(2, 3, 3, N)).toBeNull();
  });

  it("tucks the thrown sheet under the pile when going next", () => {
    expect(sheetPose(2, 3, 2, N)?.motion).toBe("tuck");
    expect(sheetPose(3, 3, 2, N)?.motion).toBeUndefined();
  });

  it("brings the previous sheet back out when going prev", () => {
    expect(sheetPose(2, 2, 3, N)?.motion).toBe("untuck");
  });

  it("turns every sheet face down at the notes, newest on top", () => {
    const last = sheetPose(N - 1, N, N - 1, N);
    expect(last).toMatchObject({ turned: true, depth: 0 });
    expect(last?.motion).toBeUndefined();
    expect(sheetPose(N - DEPTH - 1, N, N - 1, N)).toBeNull();
  });

  it("turns the pile back when leaving the notes", () => {
    expect(sheetPose(0, 0, N, N)?.motion).toBe("unturn");
    expect(sheetPose(DEPTH - 1, 0, N, N)?.motion).toBe("unturn");
    expect(sheetPose(N - 1, N - 1, N, N)?.motion).toBe("unturn");
  });
});
