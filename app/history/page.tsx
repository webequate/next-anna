import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: `${basics.name} | History`,
  description: "History of artwork by Anna Elise Johnson.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/history",
  },
};

export const revalidate = 60;

function getHistoryProjects(): Project[] {
  return (projectsData as Project[]).sort((a, b) => b.order - a.order);
}

export default function HistoryPage() {
  const name = basics.name;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  const projects = getHistoryProjects();
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <div className="fade-in text-base text-dark-2 dark:text-light-2">
        <ProjectGrid projects={projects} path="history" />
      </div>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
