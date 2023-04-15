import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import logo from "@/public/images/allen.png";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    if (!showMenu) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  }

  return (
    <nav>
      <div className="container mx-auto px-6 py-3 mb-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center text-secondary-dark dark:text-secondary-light bg-primary-light dark:bg-primary-dark ring-1 ring-tertiary-dark dark:ring-tertiary-light p-1 ml-0 rounded-xl cursor-pointer duration-300"
          >
            <Image src={logo} alt="Logo" width={40} height={40} />
          </Link>

          <div className="flex items-center hidden md:block font-general-medium m-0 sm:ml-4 sm:p-0">
            {/* Navigation links */}
            <div className="flex items-center rounded-full text-sm lg:text-lg font-semibold text-secondary-dark dark:text-secondary-light bg-primary-light dark:bg-primary-dark ring-1 ring-tertiary-dark dark:ring-tertiary-light px-3 mx-6">
              <Link
                href="/about"
                className="hover:text-accent-light dark:hover:text-accent-light mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="hover:text-accent-light dark:hover:text-accent-light mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Projects
              </Link>
              <Link
                href="/resume"
                className="hover:text-accent-light dark:hover:text-accent-light mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Resume
              </Link>
              <Link
                href="/skills"
                className="hover:text-accent-light dark:hover:text-accent-light mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Skills
              </Link>
              <Link
                href="/testimonials"
                className="hover:text-accent-light dark:hover:text-accent-light mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="hover:text-accent-light dark:hover:text-accent-light mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Small screen - Hamburger menu */}
          <div className="block md:hidden">
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

          {/* Small screen - Header links */}
          <div
            className={
              showMenu
                ? "block m-0 sm:ml-4 sm:mt-3 md:flex px-5 py-3 sm:p-0 justify-between items-center shadow-lg sm:shadow-none"
                : "hidden"
            }
          >
            <Link
              href="/"
              aria-label="Home"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 pt-3 sm:pt-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              aria-label="About"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-tertiary-dark dark:border-tertiary-light"
            >
              About
            </Link>
            <Link
              href="/projects"
              aria-label="Projects"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-tertiary-dark dark:border-tertiary-light"
            >
              Projects
            </Link>
            <Link
              href="/resume"
              aria-label="Resume"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-tertiary-dark dark:border-tertiary-light"
            >
              Resume
            </Link>
            <Link
              href="/skills"
              aria-label="Skills"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-tertiary-dark dark:border-tertiary-light"
            >
              Skills
            </Link>
            <Link
              href="/testimonials"
              aria-label="Testimonials"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-tertiary-dark dark:border-tertiary-light"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              aria-label="Contact"
              className="block text-left text-lg text-secondary-dark dark:text-secondary-light hover:text-accent-dark dark:hover:text-accent-light sm:mx-2 mb-2 sm:py-2 border-t-2 pt-3 sm:pt-2 sm:border-t-0 border-tertiary-dark dark:border-tertiary-light"
            >
              Contact
            </Link>
          </div>

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Header;
