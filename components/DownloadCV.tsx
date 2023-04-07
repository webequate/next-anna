import { SocialLink } from '@/types/basics';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import {
  FaDownload
} from 'react-icons/fa';

interface DownloadCVProps {
  resumelink: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ resumelink }) => {
	const { theme, setTheme } = useTheme();

	return (
    <a
			href={`${ resumelink }`}
			className="bg-neutral-100 dark:bg-neutral-800 hover:bg-lime-500 hover:dark:bg-lime-500 font-general-medium flex justify-center items-center w-56 sm:w-56 mt-12 mb-6 sm:mb-0 text-lg border border-lime-200 py-2.5 sm:py-3 shadow-lg rounded-lg focus:ring-1 focus:ring-lime-900 text-gray-500 hover:text-white duration-500"
			aria-label="Download Resume"
		>
			<FaDownload className="ml-0 sm:ml-1 mr-2 sm:mr-3 h-5 w-5 sm:w-6 sm:h-6 duration-100"></FaDownload>
			<span className="text-sm sm:text-lg duration-100">
				Download Resume
			</span>
		</a>
  );
}

export default DownloadCV;