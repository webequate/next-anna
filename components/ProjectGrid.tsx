// components/ProjectGrid.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import { useState, useRef } from "react";

interface ProjectGridProps {
  projects: Project[];
  setActiveModal: (index: number | null) => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  setActiveModal,
}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-primary-light dark:text-primary-light">
      {projects.map((project, index) => (
        <a
          key={index}
          onClick={() => setActiveModal(index)}
          className="group relative cursor-pointer"
        >
          <Image
            src={`/${project.thumb.imgurl}`}
            alt={project.thumb.name}
            width={400}
            height={400}
            className="rounded shadow-md transition duration-200 ease-in-out transform"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition duration-200 rounded shadow-md"></div>
          <div className="absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 p-4">
            <h2 className="text-xl mb-2">{project.name}</h2>
            <p>{project.thumb.type}</p>
            <p>@ {project.thumb.company}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200">
            <span className="text-4xl">+</span>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectGrid;
