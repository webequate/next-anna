import clientPromise from '../lib/mongodb';
import { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';

interface Thumb {
  name: string;
  type: string;
  company: string;
  imgurl: string;
}

interface Modal {
  name: string;
  tags: string;
  description: string;
  imgurl: string;
  details: string;
}

interface Project {
  _id: string;
  id: string;
  name: string;
  thumb: Thumb;
  modal: Modal;
}
  
interface ProjectsProps {
  projectsData: Project[];
}

const Projects: NextPage<ProjectsProps> = ({ projectsData }) => {
  return (
    <Layout>
      <div>
        <h1>Projects</h1>
        <ul>
          {projectsData.map((project) => (
            <li key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.thumb.name}</p>
              <p>{project.thumb.type}</p>
              <p>{project.thumb.company}</p>
              <p>{project.thumb.imgurl}</p>
              <p>{project.modal.name}</p>
              <p>{project.modal.tags}</p>
              <p>{project.modal.description}</p>
              <p>{project.modal.imgurl}</p>
              <p>{project.modal.details}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");
  
    const data = await db
      .collection("Projects")
      .find({})
      .toArray();
  
    return {
      props: { projectsData: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
     console.error(e);
  }
}
  
export default Projects;