import { SocialLink } from '@/types/basics';
import Social from '@/components/Social';
import Copyright from '@/components/Copyright';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';

interface FooterProps {
  name: string;
  socialLinks: SocialLink[];
}

const Footer: React.FC<FooterProps> = ({ name, socialLinks }) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="mx-auto">
			<div className="pt-20 sm:pt-30 pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
				{/* Footer social links */}
				<div className="font-general-regular flex flex-col justify-center items-center mb-12 sm:mb-28">
          <Social socialLinks={ socialLinks } />
  			</div>
        {/* Header links large screen */}
				<div className="font-general-medium hidden m-0 sm:ml-4 mt-5 sm:mt-3 sm:flex p-5 sm:p-0 shadow-lg sm:shadow-none">
          <div className="flex justify-left">
            <div className="text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2" aria-label="About">
						  <Link href="/about">About</Link>
					  </div>
            <div className="text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2" aria-label="Projects">
              <Link href="/projects">Projects</Link>
            </div>
            <div className="text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2" aria-label="Resume">
              <Link href="/resume">Resume</Link>
            </div>
            <div className="text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2" aria-label="Skills">
              <Link href="/skills">Skills</Link>
            </div>
            <div className="text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2" aria-label="Testimonials">
              <Link href="/testimonials">Testimonials</Link>
            </div>
            <div className="text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light  sm:mx-4 mb-2 sm:py-2" aria-label="Contact">
              <Link href="/contact">Contact</Link>
            </div>
				  </div>
          <div className="flex justify-right">
				    <Copyright name={ name } />
          </div>
        </div>
			</div>
		</div>
	);
}

export default Footer;