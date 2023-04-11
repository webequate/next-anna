// components/DownloadCV.tsx
import Link from 'next/link';
import {
  FaDownload
} from 'react-icons/fa';

interface DownloadCVProps {
  resumelink: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ resumelink }) => {
	return (
    <Link
			href={`${ resumelink }`}
			className="text-secondary-dark dark:text-secondary-light hover:text-primary-light dark:hover:text-primary-light bg-primary-light dark:bg-primary-dark hover:bg-accent-light dark:hover:bg-accent-light font-general-medium flex justify-center items-center w-56 sm:w-56 mt-12 mb-6 sm:mb-0 text-lg py-2.5 sm:py-3 rounded-lg duration-300"
			aria-label="Download Resume"
		>
			<FaDownload className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-5 w-5 sm:w-6 sm:h-6"></FaDownload>
			<span className="text-sm sm:text-lg">
				Download Resume
			</span>
		</Link>
  );
}

export default DownloadCV;