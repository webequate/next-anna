import { SocialLink } from '@/types/basics';
import Link from 'next/link';
import { useTheme } from 'next-themes';
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
  const { theme, setTheme } = useTheme();

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
		<div className="font-general-regular flex justify-left items-center mt-6 mb-6">
      <ul className="flex gap-4 sm:gap-8">
      { socialLinks.map((socialLink, index) => (
        <Link
          key={index}
          href={socialLink.url}
          className={`text-xl sm:text-2xl md:text-3xl text-secondary-dark dark:text-secondary-light hover:text-primary-light dark:hover:text-primary-light bg-primary-light dark:bg-primary-dark hover:bg-accent-light dark:hover:bg-accent-light ring-1 ring-tertiary-dark dark:ring-tertiary-light cursor-pointer rounded-lg p-2 duration-300`}
        >
          {iconFromName(socialLink.name)}
        </Link>
      ))}
      </ul>
    </div>
	);
}

export default Social;