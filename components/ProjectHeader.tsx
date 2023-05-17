// components/ProjectHeader.tsx
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface ProjectHeaderProps {
  title: string;
  prevId?: string;
  nextId?: string;
  path: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  prevId,
  nextId,
  path,
}) => {
  return (
    <div className="flex justify-between text-lg sm:text-2xl md:text-3xl">
      {prevId ? (
        <Link
          href={`/${path}/${prevId}`}
          title="Previous Artwork"
          aria-label="Previous Artwork"
        >
          <FaArrowLeft className="hover:text-accent-dark dark:hover:text-accent-light" />
        </Link>
      ) : (
        <div className="invisible">
          <FaArrowLeft />
        </div>
      )}
      <h2 className="text-lg sm:text-2xl md:text-3xl text-center mb-2 sm:mb-4">
        {title}
      </h2>
      {nextId ? (
        <Link
          href={`/${path}/${nextId}`}
          title="Next Artwork"
          aria-label="Next Artwork"
        >
          <FaArrowRight className="hover:text-accent-dark dark:hover:text-accent-light" />
        </Link>
      ) : (
        <div className="invisible">
          <FaArrowRight />
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
