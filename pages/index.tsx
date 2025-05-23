// pages/index.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projects from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

interface HomePageProps {
  name: string;
  socialLinks: SocialLink[];
  projects: Project[];
}

const HomePage: NextPage<HomePageProps> = ({ name, socialLinks, projects }) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name}`}</title>
        <meta
          name="description"
          content="Anna Elise Johnson's artist website."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <ProjectGrid projects={projects} path="works" />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

// Load data from the projects.json file at build time
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Filter featured projects and sort them
  const featuredProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => b.order - a.order);

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      projects: featuredProjects,
    },
    revalidate: 60,
  };
};

export default HomePage;
