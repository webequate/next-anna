// types/experience.ts
export type ExperienceSection = {
  name: string;
  items: string[];
};

export type Experience = {
  title: string;
  sections: ExperienceSection[];
};
