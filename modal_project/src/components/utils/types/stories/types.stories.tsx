  import React from "react";
  import type { Meta, StoryObj } from "@storybook/react";
  import type { Prettify, Override, Nullable } from "../types";

  function Code({ children }: { children: string }) {
    return (
      <pre className="text-xs overflow-auto rounded-xl bg-slate-950 text-slate-50 p-4">
        <code>{children}</code>
      </pre>
    );
  }

  function TypesDemo() {
    const user: Nullable<{ id: string; name: string }> = { id: "u_1", name: "Mina" };
    const patch = { name: "Mina V2" };

    type User = { id: string; name: string; age: number };
    type UserPatch = Override<User, { age?: number }>;
    type Pretty = Prettify<{ a: string } & { b: number }>;

    void (null as unknown as UserPatch);
    void (null as unknown as Pretty);

    return (
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">types — utilitaires TypeScript</h2>
          <p className="text-sm text-slate-600">
            Centralise des types réutilisables (DX). Ces types n'ont pas de rendu direct, mais on peut les documenter
            visuellement avec des exemples.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <h3 className="font-semibold">Nullable&lt;T&gt;</h3>
            <p className="text-sm text-slate-600">Pratique pour données chargées / optionnelles.</p>
            <Code>{`type UserOrNull = Nullable<User>;

const user: UserOrNull = ${JSON.stringify(user, null, 2)};`}</Code>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
            <h3 className="font-semibold">Override&lt;T, U&gt;</h3>
            <p className="text-sm text-slate-600">Remplace des clés sans se battre avec Omit & intersection.</p>
            <Code>{`type User = { id: string; name: string; age: number };

type UserPatch = Override<User, { age?: number }>;

const patch: Partial<UserPatch> = ${JSON.stringify(patch, null, 2)};`}</Code>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3 lg:col-span-2">
            <h3 className="font-semibold">Prettify&lt;T&gt;</h3>
            <p className="text-sm text-slate-600">Ne change pas le type au runtime : améliore la lisibilité dans l'IDE.</p>
            <Code>{`type Pretty = Prettify<{ a: string } & { b: number }>;
// Dans l'IDE : Pretty = { a: string; b: number }
`}</Code>
            <div className="text-xs text-slate-500">
              (Ici, l'effet se voit surtout dans TypeScript/IDE, pas dans l'UI.)
            </div>
          </div>
        </div>
      </div>
    );
  }

  const meta: Meta<typeof TypesDemo> = {
    title: "utils/types",
    component: TypesDemo,
    parameters: { layout: "fullscreen" },
  };

  export default meta;
  type Story = StoryObj<typeof TypesDemo>;
  export const Default: Story = {};
