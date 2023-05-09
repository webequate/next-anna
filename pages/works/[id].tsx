// pages/works/[id].tsx
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { Project } from "@/types/project";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
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
      <Header name={name} socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="justify-center text-dark-1 dark:text-light-1">
          <div className="flex justify-between text-xl sm:text-2xl md:text-3xl">
            {prevProject ? (
              <Link href={`/works/${prevProject.id}`}>
                <FaArrowLeft className="hover:text-accent-dark dark:hover:text-accent-light" />
              </Link>
            ) : (
              <div className="invisible">
                <FaArrowLeft />
              </div>
            )}
            <h2 className="text-xl sm:text-2xl md:text-3xl text-center mb-4">
              {project.title}
            </h2>
            {nextProject ? (
              <Link href={`/works/${nextProject.id}`}>
                <FaArrowRight className="hover:text-accent-dark dark:hover:text-accent-light" />
              </Link>
            ) : (
              <div className="invisible">
                <FaArrowRight />
              </div>
            )}
          </div>
          <Image
            src={`/images/${project.image}`}
            alt={project.title}
            width={600}
            height={600}
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-4"
          />
          <p className="text-center mb-2">
            Dimensions: {project.dimensions.replace(/(\d+)(?!\d|\.)/g, '$1"')}
          </p>
          <p className="text-center mb-2">Media: {project.media}</p>
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const paths = projects.map((project) => ({
    params: { id: project.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<ProjectProps> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find()
    .sort({ order: 1 })
    .toArray();
  const project: Project | null = await projectsCollection.findOne({
    id: params.id,
  });

  if (!project) {
    return {
      notFound: true,
    };
  }

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
      projects: JSON.parse(JSON.stringify(projects)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks,
    },
    revalidate: 60,
  };
};

export default Project;
