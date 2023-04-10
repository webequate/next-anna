// pages/projects.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/types/project';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaMobileAlt,
	FaTabletAlt,
  FaLaptop,
	FaDesktop
} from 'react-icons/fa';
import { useState, useRef } from 'react';

type ProjectsProps = {
  projects: Project[];
  name: string;
  socialLinks: SocialLink[];
}

const Projects: NextPage<ProjectsProps> = ({ projects, name, socialLinks }) => {
  const [ activeModal, setActiveModal ] = useState<number | null>(null);
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (modalContentRef.current && !modalContentRef.current.contains(e.target as Node)) {
      setActiveModal(null);
    }
  };

  return (

    <div className="mx-auto">

      <Header name={ name } />

      <div className="text-base text-secondary-dark dark:text-secondary-light">

        <h1 className="text-xl font-bold text-primary-dark dark:text-primary-light sm:text-3xl mb-6">Projects</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-primary-light dark:text-primary-light">
          {projects.map((project, index) => (
            <a
              key={index}
              onClick={() => setActiveModal(index)}
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
              <div className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 p-4">
                <h2 className="text-xl mb-2">{ project.name }</h2>
                <p>{ project.thumb.type }</p>
                <p>@ { project.thumb.company }</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
                <span className="text-4xl">+</span>
              </div>
            </a>
          ))}
        </div>

        {projects.map((project, index) => (
          <div
            key={ index }
            id={ `modal-${project.id}` }
            className={`modal ${activeModal === index ? 'modal-open' : ''}`}
            onClick={() => setActiveModal(null)}>
            <div
              ref={ modalContentRef }
              className="modal-content text-secondary-dark dark:text-secondary-light bg-primary-light dark:bg-primary-dark"
              onClick={ (e) => e.stopPropagation() }
            >
              <Image
                src={ `/${project.modal.imgurl}` }
                alt={ project.modal.name }
                width={ 1050 }
                height={ 700 }
                className="w-full mb-4"
              />
              <h2 className="text-2xl text-primary-dark dark:text-primary-light mb-4">{ project.modal.name }</h2>
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