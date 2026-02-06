"use client";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import Image from "next/image";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectFooter from "@/components/ProjectFooter";
import type { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";

interface ProjectViewerProps {
  name: string;
  socialLinks: SocialLink[];
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  path: string; // works or history
}

export default function ProjectViewer({
  name, // currently unused but kept for parity
  socialLinks, // currently unused but kept for parity
  project,
  prevProject,
  nextProject,
  path,
}: ProjectViewerProps) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", checkMobile);
    checkMobile();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!nextProject) return;
      if (isMobile) router.push(`/${path}/${nextProject.id}`);
    },
    onSwipedRight: () => {
      if (!prevProject) return;
      if (isMobile) router.push(`/${path}/${prevProject.id}`);
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="fade-in">
      <div className="justify-center mx-auto text-dark-1 dark:text-light-1">
          <ProjectHeader
            title={project.title}
            prevId={prevProject?.id}
            nextId={nextProject?.id}
            path={path}
          />
          <Image
            {...handlers}
            src={`/images/${project.image}`}
            alt={project.title}
            width={600}
            height={600}
            priority
            className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-2"
          />
          <ProjectFooter
            dimensions={project.dimensions}
            media={project.media}
            {...(path === "history" && (project as any).year
              ? { year: (project as any).year }
              : {})}
          />
        </div>
      </div>
    </div>
  );
}
