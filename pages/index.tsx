// pages/index.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/types/project";
import { Basics } from "@/types/basics";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectModals from "@/components/ProjectModals";
import Footer from "@/components/Footer";
import { useState } from "react";

interface ProjectsProps {
  name: string;
  projects: Project[];
}

const Projects: NextPage<ProjectsProps> = ({ name, projects }) => {
  const [activeModal, setActiveModal] = useState<number | null>(null);

  return (
    <div className="mx-auto">
      <Header name={name} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <ProjectGrid projects={projects} setActiveModal={setActiveModal} />

        <ProjectModals
          projects={projects}
          activeModal={activeModal}
          setActiveModal={setActiveModal}
        />
      </motion.div>

      <Footer name={name} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      name: basics[0].name,
    },
    revalidate: 60,
  };
};

export default Projects;
