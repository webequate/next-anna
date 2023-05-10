// components/ProjectGrid.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

interface ProjectGridProps {
  projects: Project[];
  path: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, path }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-light-1 dark:text-light-1">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/${path}/${project.id}`}
          className="group relative cursor-pointer"
        >
          <Image
            src={`/images/${project.image}`}
            alt={project.title}
            width={600}
            height={600}
            className="rounded shadow-md transition ease-in-out transform duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-50 transition duration-300 rounded shadow-md"></div>
          <div className="absolute inset-0 items-center justify-center opacity-0 md:group-hover:opacity-100 transition duration-300 p-4">
            <h2 className="text-lg mb-2">{project.title}</h2>
            <p className="mb-2">
              {project.dimensions.replace(/(\d+)(?!\d|\.)/g, '$1"')}
            </p>
            <p>{project.media}</p>
          </div>
          <div className="absolute inset-0 sm:flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition duration-300">
            <span className="text-4xl">+</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectGrid;
