import { SocialLink } from '@/types/basics';
import Social from '@/components/Social';
import Copyright from '@/components/Copyright';
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
			<div className="pb-8 mt-20 border-t-2 border-primary-light dark:border-secondary-dark">
				{/* Footer social links */}
				<div className="font-general-regular flex flex-col justify-center items-center mb-2">
          <Social socialLinks={ socialLinks } />
  			</div>
        <div>
          {/* Footer links large screen */}
          <div className="m-0 sm:ml-4 sm:flex sm:p-0 justify-center items-center">
            <ul className="flex text-base font-semibold text-secondary-dark dark:text-secondary-light rounded-full px-3 mx-6 text-sm bg-primary-light dark:bg-primary-dark ring-1 ring-tertiary-dark dark:ring-tertiary-light">
              <li className="hover:text-accent-light dark:hover:text-accent-light sm:mx-4 sm:py-2 duration-300" aria-label="About">
                <Link href="/about">About</Link>
              </li>
              <li className="hover:text-accent-light dark:hover:text-accent-light sm:mx-4 sm:py-2 duration-300" aria-label="Projects">
                <Link href="/projects">Projects</Link>
              </li>
              <li className="hover:text-accent-light dark:hover:text-accent-light sm:mx-4 sm:py-2 duration-300" aria-label="Resume">
                <Link href="/resume">Resume</Link>
              </li>
              <li className="hover:text-accent-light dark:hover:text-accent-light sm:mx-4 sm:py-2 duration-300" aria-label="Skills">
                <Link href="/skills">Skills</Link>
              </li>
              <li className="hover:text-accent-light dark:hover:text-accent-light sm:mx-4 sm:py-2 duration-300" aria-label="Testimonials">
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li className="hover:text-accent-light dark:hover:text-accent-light sm:mx-4 sm:py-2 duration-300" aria-label="Contact">
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
				    <Copyright name={ name } />
          </div>
        </div>
			</div>
		</div>
	);
}

export default Footer;