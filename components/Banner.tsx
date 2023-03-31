import { SocialLink } from '@/types/basics';
import Social from '@/components/Social';
import DownloadCV from '@/components/DownloadCV';
import { motion } from 'framer-motion';
import Image from 'next/image';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';

interface BannerProps {
  name: string;
  role: string;
  roleDescription: string;
  aboutme: string;
  socialLinks: SocialLink[];
  resumelink: string;
}

const Banner: React.FC<BannerProps> = ({ name, role, roleDescription, aboutme, socialLinks, resumelink }) => {
	const [activeTheme] = useThemeSwitcher();

	return (
		<section className="flex flex-col sm:justify-between items-center sm:flex-row mt-5 md:mt-2">
			<motion.div
				initial={{ opacity: 0, y: -180 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
				className="w-full sm:w-2/3 float-left mt-8 sm:mt-0"
			>
				<Image
					src={
						activeTheme === 'dark'
							? '/images/allen.png'
							: '/images/allen.png'
					}
					alt="Allen"
          width={500}
          height={500}
				/>
			</motion.div>
			<motion.div className="w-full md:w-2/3 text-left">
				<h1 className="font-general-semibold text-2xl lg:text-3xl xl:text-4xl text-center sm:text-left text-ternary-dark dark:text-primary-light uppercase">
					{ name }
				</h1>
        <p>
					{ role }
        </p>
        <p>
          { roleDescription } { aboutme }
        </p>
        <Social socialLinks={socialLinks} />
				<div className="flex justify-center sm:block">
          <DownloadCV resumelink={ resumelink } />
				</div>
			</motion.div>
		</section>
	);
}

export default Banner;