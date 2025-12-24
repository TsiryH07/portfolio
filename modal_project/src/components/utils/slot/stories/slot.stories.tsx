import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slot } from "../slot";
import { cn } from "../../cn";
import { slotDemoVariants } from "../variants/slot.variants";

type DemoButtonProps = {
  asChild?: boolean;
  disabled?: boolean;
  tone?: keyof typeof slotDemoVariants.tone;
  size?: keyof typeof slotDemoVariants.size;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Un mini Button "démo" pour illustrer Slot (style + accessibilité).
 * Dans ton vrai projet, ce Button serait dans components/ui/button.
 */
const DemoButton = React.forwardRef<HTMLButtonElement, DemoButtonProps>(function DemoButton(
  { asChild, className, tone = "brand", size = "md", disabled, children, ...props },
  ref,
) {
  const Comp: any = asChild ? Slot : "button";
  return (
    <Comp
      {...props}
      ref={ref}
      className={cn(
        slotDemoVariants.buttonBase,
        slotDemoVariants.size[size],
        slotDemoVariants.tone[tone],
        disabled && slotDemoVariants.disabled,
        className,
      )}
      aria-disabled={disabled ? true : undefined}
      disabled={asChild ? undefined : disabled}
    >
      {children}
    </Comp>
  );
});

function Demo() {
  const [asChild, setAsChild] = React.useState(true);
  const [disabled, setDisabled] = React.useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Slot — démo “asChild”</h2>
        <p className="text-sm text-slate-600">
          Toggle pour rendre un <code>Link</code> comme racine, tout en gardant les styles/props du Button.
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input type="checkbox" checked={asChild} onChange={(e) => setAsChild(e.target.checked)} />
            asChild (Slot)
          </label>
          <label className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            disabled
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
        {asChild ? (
          <DemoButton asChild disabled={disabled} onClick={() => console.log("Button handler")}>
            <a href="#slot" onClick={() => console.log("Child handler")}>
              Aller à “#slot”
            </a>
          </DemoButton>
        ) : (
          <DemoButton disabled={disabled} onClick={() => console.log("Native button click")}>
            Bouton natif
          </DemoButton>
        )}

        <p className="text-xs text-slate-500">
          Astuce : en asChild, l’élément racine devient un <code>a</code>, mais garde les classes, focus ring,
          etc.
        </p>
      </div>
    </div>
  );
}

const meta: Meta<typeof Demo> = {
  title: "utils/slot",
  component: Demo,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Demo>;
export const Default: Story = {};
