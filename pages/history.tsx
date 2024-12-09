// pages/history.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

interface HistoryPageProps {
  name: string;
  socialLinks: SocialLink[];
  projects: Project[];
}

const HistoryPage: NextPage<HistoryPageProps> = ({
  name,
  socialLinks,
  projects,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | History`}</title>
        <meta
          name="description"
          content="History of artwork by Anna Elise Johnson."
          key="desc"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

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

export const getStaticProps: GetStaticProps<HistoryPageProps> = async () => {
  // Sort projects by "order" field in descending order
  const projects = projectsData.sort((a, b) => b.order - a.order);

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      projects,
    },
    revalidate: 60,
  };
};

export default HistoryPage;
