// components/ProjectGrid.tsx
import { Project } from "@/types/project";
import Image from "next/image";

interface ProjectGridProps {
  projects: Project[];
  setActiveModal: (index: number | null) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  setActiveModal,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10 text-light-1 dark:text-light-1">
      {projects.map((project, index) => (
        <a
          key={index}
          onClick={() => setActiveModal(index)}
          className="group relative cursor-pointer"
        >
          <Image
            src={`/images/${project.image}`}
            alt={project.title}
            width={600}
            height={600}
            className="rounded shadow-md transition duration-200 ease-in-out transform"
          />
          <div className="absolute inset-0 bg-black opacity-0 sm:group-hover:opacity-50 transition duration-200 rounded shadow-md"></div>
          <div className="absolute inset-0 items-center justify-center opacity-0 sm:group-hover:opacity-100 transition duration-200 p-4">
            <h2 className="text-lg mb-2">{project.title}</h2>
            <p className="mb-2">
              {project.dimensions.replace(/(\d+)(?!\d)/g, '$1"')}
            </p>
            <p>{project.media}</p>
          </div>
          <div className="absolute inset-0 sm:flex items-center justify-center text-white opacity-0 sm:group-hover:opacity-100 transition duration-200">
            <span className="text-4xl">+</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid;
