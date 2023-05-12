// types/experience.ts
export type ExperienceSection = {
  name: string;
  items: string[];
};

export type Experience = {
  _id: string;
  title: string;
  sections: ExperienceSection[];
};
