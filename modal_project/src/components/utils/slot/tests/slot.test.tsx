import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Slot } from "../slot";

describe("Slot", () => {
  it("rend l'enfant comme racine et merge className (Tailwind conflicts)", () => {
    render(
      <Slot className="p-4 text-sm">
        <a href="/x" className="p-2 text-lg" data-testid="root">
          Link
        </a>
      </Slot>,
    );

    const root = screen.getByTestId("root");
    // Avec cn (tailwind-merge), p-4 doit écraser p-2 et text-sm écrase text-lg.
    expect(root.className).toContain("p-4");
    expect(root.className).not.toContain("p-2");
    expect(root.className).toContain("text-sm");
    expect(root.className).not.toContain("text-lg");
    expect(root).toHaveAttribute("href", "/x");
  });

  it("compose les handlers (enfant d'abord) et respecte preventDefault", async () => {
    const user = userEvent.setup();
    const childClick = vi.fn((e: React.MouseEvent) => {
      e.preventDefault();
    });
    const slotClick = vi.fn();

    render(
      <Slot onClick={slotClick}>
        <button onClick={childClick}>Click</button>
      </Slot>,
    );

    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(childClick).toHaveBeenCalledTimes(1);
    // child a preventDefault => parent ne doit pas être appelé
    expect(slotClick).toHaveBeenCalledTimes(0);
  });

  it("forwardRef pointe vers l'élément racine", () => {
    const ref = React.createRef<HTMLElement>();

    render(
      <Slot ref={ref}>
        <button>OK</button>
      </Slot>,
    );

    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current?.tagName.toLowerCase()).toBe("button");
  });
});
