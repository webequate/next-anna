// components/DownloadCV.tsx
import Link from "next/link";
import { FaDownload } from "react-icons/fa";

interface DownloadCVProps {
  resumelink: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ resumelink }) => {
  return (
    <Link
      href={`${resumelink}`}
      className="text-light-1 dark:text-light-1 hover:text-light-1 dark:hover:text-light-1 bg-accent-2 dark:bg-accent-2 hover:bg-accent-1 dark:hover:bg-accent-1 ring-1 ring-dark-3 dark:ring-light-3 font-general-medium flex justify-center items-center w-56 sm:w-56 mt-12 mb-6 sm:mb-0 text-lg py-2.5 sm:py-3 rounded-lg duration-300"
      aria-label="Download Resume"
    >
      <FaDownload className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-6 w-6"></FaDownload>
      <span className="text-lg">Download Resume</span>
    </Link>
  );
};

export default DownloadCV;
