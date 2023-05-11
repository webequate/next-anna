// pages/works/[id].tsx
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import Image from "next/image";
import ProjectFooter from "@/components/ProjectFooter";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface ProjectPageProps {
  project: Project;
  name: string;
  socialLinks: SocialLink[];
  prevProject: Project | null;
  nextProject: Project | null;
}

const Project = ({
  project,
  name,
  socialLinks,
  prevProject,
  nextProject,
}: ProjectPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="justify-center text-dark-1 dark:text-light-1">
          <ProjectHeader
            title={project.title}
            prevId={prevProject?.id}
            nextId={nextProject?.id}
            path="history"
          />
          <Image
            src={`/images/${project.image}`}
            alt={project.title}
            width={600}
            height={600}
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-4"
          />
          <ProjectFooter
            dimensions={project.dimensions}
            media={project.media}
          />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?featured=false`
  );
  const projects: Project[] = await res.json();

  const paths = projects.map((project) => ({
    params: { id: project.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as Params;

  const resBasics = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/basics`
  );
  const basics = await resBasics.json();
  console.log("basics", basics);

  const resProjects = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?featured=false`
  );
  const projects: Project[] = await resProjects.json();
  console.log("projects", projects);

  const projectIndex = projects.findIndex((p) => p.id === id);
  const project = projects[projectIndex];
  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  console.log("project", project);
  console.log("prevProject", prevProject);
  console.log("nextProject", nextProject);

  return {
    props: {
      project,
      name: JSON.parse(JSON.stringify(basics.name)),
      socialLinks: JSON.parse(JSON.stringify(basics.socialLinks)),
      prevProject,
      nextProject,
    },
    revalidate: 60,
  };
};

export default Project;
