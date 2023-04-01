import { SocialLink } from '@/types/basics';
import Social from '@/components/Social';
import DownloadCV from '@/components/DownloadCV';
import { motion } from 'framer-motion';
import ThemedImage from '@/components/ThemedImage';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface BannerProps {
  name: string;
  role: string;
  roleDescription: string;
  aboutme: string;
  socialLinks: SocialLink[];
  resumelink: string;
}

const Banner: React.FC<BannerProps> = ({ name, role, roleDescription, aboutme, socialLinks, resumelink }) => {
  const { theme, setTheme } = useTheme();
	return (
		<section className="flex flex-col items-top sm:justify-between sm:flex-row mt-5 md:mt-2">
			<motion.div className="text-left">
				<h1 className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left uppercase">
					{ name }
				</h1>
        <h2 className="text-xl mt-4 mb-4">
					{ role }
        </h2>
        <p className="mt-4 mb-4">
          { aboutme }
        </p>
        <p className="mt-4 mb-4">
          { roleDescription }
        </p>
        <Social socialLinks={socialLinks} />
				<div className="justify-left sm:block">
          <DownloadCV resumelink={ resumelink } />
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
				className="w-full ml-10"
			>
        <ThemedImage />
			</motion.div>
		</section>
	);
}

export default Banner;