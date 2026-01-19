import {render, screen} from "@testing-library/react";

import {Navbar} from "../navbar";

vi.mock("@/components/ui/theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

describe("Navbar", () => {
  it("rend le header avec le toggle", () => {
    render(<Navbar />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });
});
