import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import AnimatedFade from "@/components/AnimatedFade";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: basics.name,
  description: "Anna Elise Johnson's artist website.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
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
      <AnimatedFade className="text-base text-dark-2 dark:text-light-2">
        <ProjectGrid projects={projects} path="works" />
      </AnimatedFade>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
