import { describe, expect, it } from "vitest";
import { unwrap } from "@/lib/api-client";

describe("unwrap", () => {
  it("returns the envelope data", () => {
    expect(
      unwrap({ data: { data: { id: "1" }, error: null, message: "ok" } }),
    ).toEqual({ id: "1" });
  });

  it("throws with the API message when data is missing", () => {
    expect(() =>
      unwrap({ data: { data: null, error: null, message: "Nada aqui" } }),
    ).toThrow("Nada aqui");
  });
});
