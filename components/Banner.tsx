import { SocialLink } from '@/types/basics';
import Social from '@/components/Social';
import DownloadCV from '@/components/DownloadCV';
import { motion } from 'framer-motion';
import ThemedImage from '@/components/ThemedImage';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface BannerProps {
  name: string;
  title: string;
  abouts: string[];
  resumeLink: string;
  socialLinks: SocialLink[];
}

const Banner: React.FC<BannerProps> = ({ name, title, abouts, resumeLink, socialLinks }) => {
  const { theme, setTheme } = useTheme();
	return (
		<section className="flex flex-col items-top sm:justify-between sm:flex-row mt-5 md:mt-2">
			<motion.div className="text-left">
				<h1 className="text-5xl font-bold text-primary-dark dark:text-primary-light sm:text-5xl mb-6 uppercase">
					{ name }
				</h1>
        <h2 className="text-xl font-bold tracking-tight text-accent-light dark:text-accent-light sm:text-3xl mb-6">
					{ title }
        </h2>
        { abouts.map((about, index) => (
          <p key={index} className="text-base text-secondary-dark dark:text-secondary-light mt-4 mb-4">{ about }</p>
        ))}
        <Social socialLinks={socialLinks} />
				<div className="justify-left sm:block">
          <DownloadCV resumelink={ resumeLink } />
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
				className="ml-10"
			>
        <ThemedImage />
			</motion.div>
		</section>
	);
}

export default Banner;