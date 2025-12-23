import { describe, expect, it } from "vitest";
import { cn } from "../cn";

describe("cn", () => {
  it("concatène les valeurs simples", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("ignore les valeurs falsy (false/null/undefined/0/'')", () => {
    // clsx ignore déjà la plupart; on valide le comportement global
    expect(cn("a", false && "b", null, undefined, "", "c")).toBe("a c");
  });

  it("supporte les tableaux", () => {
    expect(cn(["a", "b"], ["c"])).toBe("a b c");
  });

  it("supporte les objets (clsx)", () => {
    expect(cn({ a: true, b: false, c: 1 })).toBe("a c");
  });

  it("résout les conflits Tailwind (padding)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("px-2", "px-6", "py-1", "py-3")).toBe("px-6 py-3");
  });

  it("résout les conflits Tailwind (text size)", () => {
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });

  it("garde la dernière classe compatible si conflit multiple", () => {
    expect(cn("p-2", "p-4", "p-1")).toBe("p-1");
  });
});
