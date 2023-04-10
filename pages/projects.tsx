// pages/projects.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/project';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaMobileAlt,
	FaTabletAlt,
  FaLaptop,
	FaDesktop
} from 'react-icons/fa';

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

      <div className="text-secondary-dark dark:text-secondary-light">

        <h1 className="text-xl font-bold tracking-tight text-primary-dark dark:text-primary-light sm:text-3xl mb-6">Projects</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <a
              key={index}
              href={`#modal-${project.id}`}
              className="group relative cursor-pointer"
            >
              <Image
                src={ `/${project.thumb.imgurl}` }
                alt={ project.thumb.name }
                width={ 400 }
                height={ 400 }
                className="rounded shadow-md transition duration-200 ease-in-out transform"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-200 rounded shadow-md"></div>
              <div className="absolute inset-0 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 p-4">
                <h2 className="text-xl">{ project.name }</h2>
                <p>{ project.thumb.type } @ { project.thumb.company }</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
                <span className="text-4xl">+</span>
              </div>
            </a>
          ))}
        </div>

        {projects.map((project, index) => (
          <div key={ index } id={ `modal-${project.id}` } className="modal">
            <div className="modal-content text-secondary-dark dark:text-secondary-light bg-primary-light dark:bg-primary-dark">
              <a href="#" className="modal-close">
                &times;
              </a>
              <Image
                src={ `/${project.modal.imgurl}` }
                alt={ project.modal.name }
                width={ 1050 }
                height={ 700 }
                className="w-full mb-4"
              />
              <h2 className="text-2xl mb-4">{ project.modal.name }</h2>
              <p className="mb-4">{ project.modal.description }</p>
              <p className="mb-6">{ project.modal.tags }</p>
              {project.modal.mobile && project.modal.path && (
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <span>Screenshots:</span>
                  <Link href={ `/${project.modal.path}/${project.modal.mobile}` }>
                    <div className="flex space-x-4"><FaMobileAlt />Mobile</div>
                  </Link>
                  <Link href={ `/${project.modal.path}/${project.modal.tablet}` }>
                    <div className="flex"><FaTabletAlt />Tablet</div>
                  </Link>
                  <Link href={ `/${project.modal.path}/${project.modal.laptop}` }>
                    <div className="flex"><FaLaptop />Laptop</div>
                  </Link>
                  <Link href={ `/${project.modal.path}/${project.modal.desktop}` }>
                    <div className="flex"><FaDesktop />Desktop</div>
                  </Link>
                </div>
              )}
              <a
                href="#"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Close
              </a>
            </div>
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