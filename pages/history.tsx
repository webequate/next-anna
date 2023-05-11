// pages/history.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

interface ProjectsHistoryProps {
  name: string;
  socialLinks: SocialLink[];
  projects: Project[];
}

const ProjectsHistory: NextPage<ProjectsHistoryProps> = ({
  name,
  socialLinks,
  projects,
}) => {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <ProjectGrid projects={projects} path="history" />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<
  ProjectsHistoryProps
> = async () => {
  try {
    const projectsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects?featured=false&limit=6`
    );
    const projects: Project[] = await projectsRes.json();
    console.log("getStaticProps::projects", projects);

    const basicsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/basics`
    );
    const basics: Basics = await basicsRes.json();
    console.log("getStaticProps::basics", basics);

    return {
      props: {
        name: JSON.parse(JSON.stringify(basics.name)),
        socialLinks: JSON.parse(JSON.stringify(basics.socialLinks)),
        projects: projects,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data in history.tsx:", error);
    throw error;
  }
};

export default ProjectsHistory;
