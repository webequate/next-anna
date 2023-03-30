// types/basics.ts
export type SocialLink = {
  name: string;
  url: string;
  className: string;
}

export type Basics = {
  _id: string;
  resumelink: string;
  name: string;
  role: string;
  linkedinId: string;
  twitterId: string;
  githubId: string;
  roleDescription: string;
  socialLinks: SocialLink[];
  aboutme: string;
  address1: string;
  phone: string;
  website: string;
  contactIntro: string;
}
  