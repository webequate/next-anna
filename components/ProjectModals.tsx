// components/ProjectModals.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import { useRef } from "react";

interface ProjectModalsProps {
  projects: Project[];
  activeModal: number | null;
  setActiveModal: (index: number | null) => void;
}

const ProjectModals: React.FC<ProjectModalsProps> = ({
  projects,
  activeModal,
  setActiveModal,
}) => {
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {projects.map((project, index) => (
        <div
          key={index}
          id={`modal-${project.id}`}
          className={`modal ${activeModal === index ? "modal-open" : ""}`}
          onClick={() => setActiveModal(null)}
        >
          <div
            ref={modalContentRef}
            className="modal-content text-dark-2 dark:text-light-2 bg-light-1 dark:bg-dark-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/images/${project.image}`}
              alt={project.title}
              width={1000}
              height={1000}
              className="w-full mb-4"
            />
            <h2 className="text-2xl text-dark-1 dark:text-light-1 mb-4">
              {project.title}
            </h2>
            <p className="mb-4">
              Dimensions: {project.dimensions.replace(/(\d+)(?!\d)/g, '$1"')}
            </p>
            <p className="mb-6">Media: {project.media}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectModals;
