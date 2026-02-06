import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: basics.name,
  description: "Anna Elise Johnson's artist website.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: basics.name,
    description: "Anna Elise Johnson's artist website.",
    url: "https://annaelisejohnson.com",
    siteName: "Anna Elise Johnson",
    images: [
      {
        url: "https://annaelisejohnson.com/images/anna-og.jpg",
        alt: "Anna Elise Johnson",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: basics.name,
    description: "Anna Elise Johnson's artist website.",
    images: ["https://annaelisejohnson.com/images/anna-og.jpg"],
  },
};

export const revalidate = 60;

function getFeaturedProjects(): Project[] {
  return (projectsData as Project[])
    .filter((p) => p.featured)
    .sort((a, b) => b.order - a.order);
}

export default function HomePage() {
  const name: string = basics.name;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  const projects = getFeaturedProjects();
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <div className="fade-in text-base text-dark-2 dark:text-light-2">
        <ProjectGrid projects={projects} path="works" />
      </div>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
