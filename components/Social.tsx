import { SocialLink } from '@/types/basics';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useThemeSwitcher from '../hooks/useThemeSwitcher';
import {
  FaFacebook,
	FaGithub,
  FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';

interface SocialProps {
  socialLinks: SocialLink[];
}

const Social: React.FC<SocialProps> = ({ socialLinks }) => {
	const [activeTheme] = useThemeSwitcher();

  const iconFromName = (name: string) => {
    switch (name) {
      case 'facebook':
        return <FaFacebook />;
      case 'github':
        return <FaGithub />;
      case 'instagram':
        return <FaInstagram />;
      case 'linkedin':
        return <FaLinkedin />;
      case 'twitter':
        return <FaTwitter />;
      case 'youtube':
        return <FaYoutube />;
      default:
        return <FaFacebook />;
    }
  }

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
			className="font-general-regular flex flex-col justify-center items-center mb-12 sm:mb-28"
		>
      <ul className="flex gap-4 sm:gap-8">
      { socialLinks.map((socialLink, index) => (
        <Link
          key={index}
          href={socialLink.url}
          className={`text-xl sm:text-2xl md:text-3xl text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-2 duration-300`}
        >
          {iconFromName(socialLink.name)}
        </Link>
      ))}
      </ul>
    </motion.div>
	);
}

export default Social;