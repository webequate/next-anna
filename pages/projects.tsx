// pages/projects.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/project';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';
import Image from 'next/image';

type ProjectsProps = {
  projects: Project[];
  name: string;
  socialLinks: SocialLink[];
}

const Projects: NextPage<ProjectsProps> = ({ projects, name, socialLinks }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">

      <Header name={ name } />

      <div>

        <h1 className="text-4xl font-bold">Projects</h1>

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

      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />

    </div>
  );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const projectsCollection = db.collection<Project>('projects');
  const projects: Project[] = await projectsCollection.find().sort({ order: 1 }).toArray();

  const basicsCollection = db.collection<Basics>('basics');
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks
    },
    revalidate: 60,
  };
};
  
export default Projects;