import { SocialLink } from "@/types/basics";
import Social from "@/components/Social";
import Copyright from "@/components/Copyright";
import Link from "next/link";
import { useTheme } from "next-themes";

interface FooterProps {
  name: string;
}

const Footer: React.FC<FooterProps> = ({ name }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="mx-auto">
      <div className="pb-8 mt-8 border-t-2 border-light-1 dark:border-dark-2">
        <div>
          {/* Footer links large screen */}
          <div className="m-0 sm:ml-4 mt-8 sm:flex sm:p-0 justify-center items-center">
            <ul className="flex text-sm font-semibold text-dark-2 dark:text-light-2 rounded-full px-3 mx-6 bg-light-1 dark:bg-dark-1 ring-1 ring-dark-3 dark:ring-light-3">
              <li
                className="hover:text-accent-1 dark:hover:text-accent-1 sm:mx-4 sm:py-2 duration-300"
                aria-label="About"
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className="hover:text-accent-1 dark:hover:text-accent-1 sm:mx-4 sm:py-2 duration-300"
                aria-label="Projects"
              >
                <Link href="/projects">Projects</Link>
              </li>
              <li
                className="hover:text-accent-1 dark:hover:text-accent-1 sm:mx-4 sm:py-2 duration-300"
                aria-label="Resume"
              >
                <Link href="/resume">Resume</Link>
              </li>
              <li
                className="hover:text-accent-1 dark:hover:text-accent-1 sm:mx-4 sm:py-2 duration-300"
                aria-label="Skills"
              >
                <Link href="/skills">Skills</Link>
              </li>
              <li
                className="hover:text-accent-1 dark:hover:text-accent-1 sm:mx-4 sm:py-2 duration-300"
                aria-label="Testimonials"
              >
                <Link href="/testimonials">Testimonials</Link>
              </li>
              <li
                className="hover:text-accent-1 dark:hover:text-accent-1 sm:mx-4 sm:py-2 duration-300"
                aria-label="Contact"
              >
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Copyright name={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
