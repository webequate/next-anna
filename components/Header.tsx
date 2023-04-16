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
      <div className="container mx-auto px-2 pt-6 pb-3 mb-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center text-dark-2 dark:text-light-2 bg-light-1 dark:bg-dark-1 ring-1 ring-dark-3 dark:ring-light-3 p-1 ml-0 rounded-xl cursor-pointer duration-300"
          >
            <Image src={logo} alt="Logo" width={40} height={40} />
          </Link>

          <div className="items-center hidden md:block font-general-medium m-0 sm:ml-4 sm:p-0">
            {/* Large screen - Header navigation links */}
            <div className="flex items-center rounded-full text-sm lg:text-lg font-semibold text-dark-2 dark:text-light-2 bg-light-1 dark:bg-dark-1 ring-1 ring-dark-3 dark:ring-light-3 px-3 mx-6">
              <Link
                href="/about"
                className="hover:text-accent-1 dark:hover:text-accent-1 mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="hover:text-accent-1 dark:hover:text-accent-1 mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Projects
              </Link>
              <Link
                href="/resume"
                className="hover:text-accent-1 dark:hover:text-accent-1 mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Resume
              </Link>
              <Link
                href="/skills"
                className="hover:text-accent-1 dark:hover:text-accent-1 mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Skills
              </Link>
              <Link
                href="/testimonials"
                className="hover:text-accent-1 dark:hover:text-accent-1 mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="hover:text-accent-1 dark:hover:text-accent-1 mx-2 lg:mx-4 py-1 lg:py-2 duration-300"
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

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>

        {/* Small screen - Header navigation links */}
        <div
          className={
            showMenu
              ? "block text-lg text-left m-0 mt-3 py-3 justify-between items-center"
              : "hidden"
          }
        >
          <Link
            href="/"
            aria-label="Home"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2"
          >
            Home
          </Link>
          <Link
            href="/about"
            aria-label="About"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2 border-t-2 md:border-t-0 border-dark-3 dark:border-light-3"
          >
            About
          </Link>
          <Link
            href="/projects"
            aria-label="Projects"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2 border-t-2 md:border-t-0 border-dark-3 dark:border-light-3"
          >
            Projects
          </Link>
          <Link
            href="/resume"
            aria-label="Resume"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2 border-t-2 md:border-t-0 border-dark-3 dark:border-light-3"
          >
            Resume
          </Link>
          <Link
            href="/skills"
            aria-label="Skills"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2 border-t-2 md:border-t-0 border-dark-3 dark:border-light-3"
          >
            Skills
          </Link>
          <Link
            href="/testimonials"
            aria-label="Testimonials"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2 border-t-2 md:border-t-0 border-dark-3 dark:border-light-3"
          >
            Testimonials
          </Link>
          <Link
            href="/contact"
            aria-label="Contact"
            className="block text-dark-2 dark:text-light-2 hover:text-accent-1 dark:hover:text-accent-1 py-2 border-t-2 md:border-t-0 border-dark-3 dark:border-light-3"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
