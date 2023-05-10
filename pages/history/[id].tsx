// pages/history/[id].tsx
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import Image from "next/image";
import ProjectFooter from "@/components/ProjectFooter";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

interface ProjectProps {
  project: Project;
  projects: Project[];
  name: string;
  socialLinks: SocialLink[];
}

const Project: NextPage<ProjectProps> = ({
  project,
  projects,
  name,
  socialLinks,
}) => {
  const router = useRouter();
  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?featured=false`
    );
    const projects: Project[] = await res.json();

    const paths = projects.map((project) => ({
      params: { id: project.id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error("Error in getStaticPaths:", error);
    throw error;
  }
};

export const getStaticProps: GetStaticProps<ProjectProps> = async ({
  params,
}) => {
  try {
    if (!params) {
      return { notFound: true };
    }

    const resProjects = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?featured=false`
    );
    const projects: Project[] = await resProjects.json();
    const project: Project | undefined = projects.find(
      (p) => p.id === params.id
    );

    if (!project) {
      return { notFound: true };
    }

    const resBasics = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/basics`
    );
    const basics: Basics = await resBasics.json();
    const name = basics.name || null;
    const socialLinks = basics.socialLinks || null;

    return {
      props: {
        name: name,
        socialLinks: socialLinks,
        projects,
        project,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error in getStaticProps:", error);
    throw error;
  }
};

export default Project;
