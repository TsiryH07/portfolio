export type SkillsMetric = {
  value: string;
  label: string;
};

export type SkillBlock = {
  title: string;
  description: string;
  level: number;
};

export type ToolHighlight = {
  name: string;
  logoSrc: string;
  logoAlt: string;
};

export type ToolGridItem = {
  name: string;
  note: string;
  logoSrc: string;
  logoAlt: string;
};

export type Deliverable = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type SkillsPageViewModel = {
  heroTitle: string;
  heroSubtitle: string;
  focusTags: string[];
  metrics: SkillsMetric[];
  skillBlocks: SkillBlock[];
  toolGrid: ToolGridItem[];
  toolHighlights: ToolHighlight[];
  deliverables: Deliverable[];
};
