import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { cn } from "../cn";
import { cnVariants } from "../variants/cn.variants";

function CnDemo() {
  const [comfy, setComfy] = React.useState(true);
  const [brand, setBrand] = React.useState(false);
  const [danger, setDanger] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  const padding = comfy ? cnVariants.padding.comfy : cnVariants.padding.compact;

  const tone = danger
    ? cnVariants.tone.danger
    : brand
      ? cnVariants.tone.brand
      : cnVariants.tone.neutral;

  const className = cn(
    "inline-flex items-center justify-center rounded-xl font-medium transition",
    padding,
    tone,
    cnVariants.state.focusRing,
    disabled && cnVariants.state.disabled,
    // conflit volontaire : la dernière gagne (tailwind-merge)
    comfy ? "p-2" : "p-6",
  );

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">cn() — démo visuelle</h2>
        <p className="text-sm text-slate-600">
          Active/désactive des états pour voir les classes se combiner (et les conflits se résoudre).
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input type="checkbox" checked={comfy} onChange={(e) => setComfy(e.target.checked)} />
            Padding comfy
          </label>
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input type="checkbox" checked={brand} onChange={(e) => setBrand(e.target.checked)} />
            Ton “brand”
          </label>
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input type="checkbox" checked={danger} onChange={(e) => setDanger(e.target.checked)} />
            Ton “danger”
          </label>
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            Disabled
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <button className={className} disabled={disabled}>
          Bouton exemple
        </button>

        <div className="mt-4">
          <div className="text-xs font-medium text-slate-500 mb-2">className générée</div>
          <pre className="text-xs overflow-auto rounded-xl bg-slate-950 text-slate-50 p-4">
            {className}
          </pre>
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof CnDemo> = {
  title: "utils/cn",
  component: CnDemo,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CnDemo>;

export const Default: Story = {};
