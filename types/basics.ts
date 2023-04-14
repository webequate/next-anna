// types/basics.ts
export type SocialLink = {
  name: string;
  url: string;
}

export type Basics = {
  _id: string;
  name: string;
  titles: string[];
  abouts: string[];
  resumeLink: string;
  socialLinks: SocialLink[];
  website: string;
  location: string;
  phone: string;
  contactIntro: string;
}
  