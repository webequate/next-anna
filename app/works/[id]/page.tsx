import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectViewer from "@/components/ProjectViewer";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import { notFound } from "next/navigation";

export const revalidate = 60;

export function generateStaticParams() {
  return (projectsData as Project[])
    .filter((p) => p.featured)
    .map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = (projectsData as Project[]).find((p) => p.id === params.id);
  if (!project) return {};
  return {
    title: `${basics.name} | ${project.title}`,
    description: `${project.title} by ${basics.name}`,
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/works/${params.id}`,
    },
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projects = (projectsData as Project[]).filter((p) => p.featured);
  const index = projects.findIndex((p) => p.id === params.id);
  if (index === -1) return notFound();
  const project = projects[index];
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <ProjectViewer
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        name={basics.name}
        socialLinks={socialLinks}
        path="works"
      />
      <Footer name={basics.name} socialLinks={socialLinks} />
    </div>
  );
}
