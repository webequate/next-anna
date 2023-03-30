// pages/projects.tsx
import { GetStaticProps, NextPage } from 'next';
import { Project } from '@/types/project';
import { connectToDatabase } from '@/lib/mongodb';
import Layout from '@/components/Layout';
import Image from 'next/image';

type ProjectsProps = {
  projects: Project[];
}

const Projects: NextPage<ProjectsProps> = ({ projects }) => {
  return (
    <Layout>
      <div>
        <h1>Projects</h1>
        {projects.map((project, index) => (
          <div key={index}>
            <h2>{project.name}</h2>
            <p>{project.thumb.name}</p>
            <p>{project.thumb.type}</p>
            <p>{project.thumb.company}</p>
            <p>
              <Image
                src={`/${project.thumb.imgurl}`}
                alt={project.thumb.name}
                width={200}
                height={200}
              />
            </p>
            <p>{project.modal.name}</p>
            <p>{project.modal.tags}</p>
            <p>{project.modal.description}</p>
            <p>
              <Image
                src={`/${project.modal.imgurl}`}
                alt={project.modal.name}
                width={525}
                height={350}
              />
            </p>
            <p>{project.modal.details}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const projectsCollection = db.collection<Project>('projects');
  const projects: Project[] = await projectsCollection.find().sort({ order: 1 }).toArray();

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: 60,
  };
};

export default Projects;