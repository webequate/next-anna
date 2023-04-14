// components/ProjectModals.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { FaMobileAlt, FaTabletAlt, FaLaptop, FaDesktop } from "react-icons/fa";
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
            className="modal-content text-secondary-dark dark:text-secondary-light bg-primary-light dark:bg-primary-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/${project.modal.imgurl}`}
              alt={project.modal.name}
              width={1050}
              height={700}
              className="w-full mb-4"
            />
            <h2 className="text-2xl text-primary-dark dark:text-primary-light mb-4">
              {project.modal.name}
            </h2>
            <p className="mb-4">{project.modal.description}</p>
            <p className="mb-6">{project.modal.tags}</p>
            {project.modal.mobile && project.modal.path && (
              <div className="grid grid-cols-5 gap-4 mb-6">
                <span>Screenshots:</span>
                <Link href={`/${project.modal.path}/${project.modal.mobile}`}>
                  <div className="flex space-x-4">
                    <FaMobileAlt />
                    Mobile
                  </div>
                </Link>
                <Link href={`/${project.modal.path}/${project.modal.tablet}`}>
                  <div className="flex">
                    <FaTabletAlt />
                    Tablet
                  </div>
                </Link>
                <Link href={`/${project.modal.path}/${project.modal.laptop}`}>
                  <div className="flex">
                    <FaLaptop />
                    Laptop
                  </div>
                </Link>
                <Link href={`/${project.modal.path}/${project.modal.desktop}`}>
                  <div className="flex">
                    <FaDesktop />
                    Desktop
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ProjectModals;
