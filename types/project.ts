// types/project.ts
export type Project = {
  id: string;
  title: string;
  dimensions: string;
  media: string;
  year?: string;
  image: string;
  featured: boolean;
  order: number;
};
