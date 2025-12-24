import { describe, it, expectTypeOf } from "vitest";
import type {
  Nullable,
  Prettify,
  Override,
  RequireKeys,
  OptionalKeys,
  DeepPartial,
  DeepNullable,
  AwaitedValue,
} from "../types";

describe("types utils", () => {
  it("Nullable<T> ajoute null", () => {
    type T = Nullable<string>;
    expectTypeOf<T>().toEqualTypeOf<string | null>();
  });

  it("Prettify<T> garde le même type (lisibilité IDE)", () => {
    type A = { a: string };
    type B = { b: number };
    type T = Prettify<A & B>;
    expectTypeOf<T>().toEqualTypeOf<{ a: string; b: number }>();
  });

  it("Override<T,U> remplace les clés de U", () => {
    type T = { id: string; count: number };
    type U = { count: string };
    type R = Override<T, U>;
    expectTypeOf<R>().toEqualTypeOf<{ id: string; count: string }>();
  });

  it("RequireKeys / OptionalKeys", () => {
    type T = { a?: string; b: number; c?: boolean };

    type R = RequireKeys<T, "a">;
    expectTypeOf<R>().toEqualTypeOf<{ a: string; b: number; c?: boolean }>();

    type O = OptionalKeys<T, "b">;
    expectTypeOf<O>().toEqualTypeOf<{ a?: string; b?: number; c?: boolean }>();
  });

  it("DeepPartial rend tout optionnel récursivement", () => {
    type T = { a: { b: { c: number } }; arr: Array<{ id: string }> };
    type R = DeepPartial<T>;
    expectTypeOf<R>().toEqualTypeOf<{
      a?: { b?: { c?: number } };
      arr?: Array<{ id?: string }>;
    }>();
  });

  it("DeepNullable rend tout nullable récursivement", () => {
    type T = { a: { b: number }; arr: Array<{ id: string }> };
    type R = DeepNullable<T>;
    expectTypeOf<R>().toEqualTypeOf<{
      a: { b: number | null } | null;
      arr: Array<{ id: string | null } | null> | null;
    }>();
  });

  it("AwaitedValue extrait la valeur d'une Promise", () => {
    type T = AwaitedValue<Promise<{ ok: true }>>;
    expectTypeOf<T>().toEqualTypeOf<{ ok: true }>();
  });
});
