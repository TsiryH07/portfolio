import {render, screen} from "@testing-library/react";

import {HomePageView} from "../home-page-view";
import type {HomePageViewModel} from "../../types";

const viewModel: HomePageViewModel = {
  hero: {
    name: "Jane Doe",
    role: "UI Designer",
    description: "Description test",
    badge: "Portfolio",
    imageSrc: "/avatar-placeholder.svg",
  },
  cards: {
    title: "Explorer",
    subtitle: "Choisis une section",
    items: {
      about: {
        title: "A propos",
        description: "Description A propos",
        href: "/about",
        imageSrc: "/home-about.svg",
        imageAlt: "Illustration A propos",
      },
      projects: {
        title: "Projets",
        description: "Description Projets",
        href: "/projects",
        imageSrc: "/home-projects.svg",
        imageAlt: "Illustration Projets",
      },
      skills: {
        title: "Competences",
        description: "Description Competences",
        href: "/skills",
        imageSrc: "/home-skills.svg",
        imageAlt: "Illustration Competences",
      },
      story: {
        title: "Story",
        description: "Description Story",
        href: "/story",
        imageSrc: "/home-story.svg",
        imageAlt: "Illustration Story",
      },
    },
  },
};

describe("HomePageView", () => {
  it("affiche le hero et les cartes", () => {
    render(<HomePageView {...viewModel} />);

    const heroHeading = screen.getByRole("heading", {level: 1});

    expect(heroHeading).toHaveTextContent("Jane Doe");
    expect(heroHeading).toHaveTextContent("UI Designer");
    expect(screen.getByText("A propos")).toBeInTheDocument();
  });
});
