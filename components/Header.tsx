import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useThemeSwitcher from '@/hooks/useThemeSwitcher';
import { FiSun, FiMoon, FiX, FiMenu } from 'react-icons/fi';
import logoLight from '@/public/images/allen.png';
import logoDark from '@/public/images/allen.png';

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
	const [showMenu, setShowMenu] = useState(false);
	const [activeTheme, setTheme] = useThemeSwitcher();

	function toggleMenu() {
		if (!showMenu) {
			setShowMenu(true);
		} else {
			setShowMenu(false);
		}
	}

	return (
		<div className="container mx-auto flex py-6">

      {/* Header menu links and small screen hamburger menu */}

      <div className="flex-start">
        <Link href="/">
          <Image
            src={activeTheme === 'dark' ? logoDark : logoLight}
            className="w-12 cursor-pointer"
            alt={`${ name }`}
            width={100}
            height={100}
          />
        </Link>
      </div>

      {/* Theme switcher small screen */}
      <div
        onClick={() => setTheme(activeTheme)}
        aria-label="Theme Switcher"
        className="block sm:hidden bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
      >
        {activeTheme === 'dark' ? (
          <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
        ) : (
          <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
        )}
      </div>

      {/* Small screen hamburger menu */}
      <div className="sm:hidden">
        <button
          onClick={toggleMenu}
          type="button"
          className="focus:outline-none"
          aria-label="Hamburger Menu"
        >
          {showMenu ? (
            <FiX className="text-3xl" />
          ) : (
            <FiMenu className="text-3xl" />
          )}
        </button>
      </div>

      {/* Header links small screen */}
      <div
        className={
          showMenu
            ? 'block m-0 sm:ml-4 sm:mt-3 md:flex px-5 py-3 sm:p-0 justify-between items-center shadow-lg sm:shadow-none'
            : 'hidden'
        }
      >
        <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2">
          <Link href="/about" aria-label="About">About</Link>
        </div>
        <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
          <Link href="/projects" aria-label="Projects">Projects</Link>
        </div>
        <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
          <Link href="/resume" aria-label="Resume">Resume</Link>
        </div>
        <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
          <Link href="/skills" aria-label="Skills">Skills</Link>
        </div>
        <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
          <Link href="/testimonials" aria-label="Testimonials">Testimonials</Link>
        </div>
        <div className="block text-left text-lg text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-primary-light dark:border-secondary-dark">
          <Link href="/contact" aria-label="Contact">Contact</Link>
        </div>
      </div>

      {/* Header links large screen */}
      <div className="font-general-medium m-0 sm:ml-4 sm:flex sm:p-0 justify-center items-center shadow-lg sm:shadow-none">
        <ul className="flex rounded-full bg-white/90 px-3 mx-6 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="About">
            <Link href="/about">About</Link>
          </li>
          <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Projects">
            <Link href="/projects">Projects</Link>
          </li>
          <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Resume">
            <Link href="/resume">Resume</Link>
          </li>
          <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Skills">
            <Link href="/skills">Skills</Link>
          </li>
          <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Testimonials">
            <Link href="/testimonials">Testimonials</Link>
          </li>
          <li className="text-left text-lg font-medium text-primary-dark dark:text-ternary-light hover:text-secondary-dark dark:hover:text-secondary-light sm:mx-4 sm:py-2" aria-label="Contact">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>

      {/* Theme switcher large screen */}
      <div
        onClick={() => setTheme(activeTheme)}
        aria-label="Theme Switcher"
        className="bg-primary-light dark:bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer flex-end"
      >
        {activeTheme === 'dark' ? (
          <FiMoon className="text-ternary-dark hover:text-gray-400 dark:text-ternary-light dark:hover:text-primary-light text-xl" />
        ) : (
          <FiSun className="text-gray-200 hover:text-gray-50 text-xl" />
        )}
      </div>

		</div>
	);
}

export default Header;