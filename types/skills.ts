// types/skills.ts
export type FeaturedSkill = {
  _id: string;
  description: string;
  order: number;
}

export type RatedSkill = {
  _id: string;
  name: string;
  level: number;
  order: number;
}
