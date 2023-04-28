// types/experience.ts
export type ExperienceSubSection = {
  name: string;
  items: string[];
};

export type ExperienceSection = {
  title: string;
  subsections: ExperienceSubSection[];
};
