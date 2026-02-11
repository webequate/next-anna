import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProjectViewer from "@/components/ProjectViewer";
import PageFade from "@/components/PageFade";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import { notFound } from "next/navigation";

export const revalidate = 60;

export function generateStaticParams() {
  return (projectsData as Project[])
    .filter((p) => !p.featured)
    .map((p) => ({ id: p.id }));
}

type HistoryPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: HistoryPageProps) {
  const { id } = await params;
  const project = (projectsData as Project[]).find((p) => p.id === id);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.title} by ${basics.name}`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/history/${id}`,
    },
  };
}

export default async function HistoryProjectPage({ params }: HistoryPageProps) {
  const { id } = await params;
  const projects = (projectsData as Project[]).filter((p) => !p.featured);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return notFound();
  const project = projects[index];
  const prevProject = index > 0 ? projects[index - 1] : null;
  const nextProject = index < projects.length - 1 ? projects[index + 1] : null;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <PageFade mode="root">
        <ProjectViewer
          project={project}
          prevProject={prevProject}
          nextProject={nextProject}
          name={basics.name}
          socialLinks={socialLinks}
          path="history"
        />
      </PageFade>
      <Footer name={basics.name} socialLinks={socialLinks} />
    </div>
  );
}
