// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import type { SocialLink } from "@/types/basics";
import AnnaEliseJohnson from "@/components/AnnaEliseJohnson";
import SocialButton from "@/components/SocialButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  name: string;
  socialLink: SocialLink;
}

const Header: React.FC<HeaderProps> = ({ name, socialLink }) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      {/* Home link */}
      <Link
        href="/"
        className="text-dark-1 dark:text-light-1 hover:text-accent-light dark:hover:text-accent-light my-4"
      >
        <AnnaEliseJohnson />
      </Link>

      <div className="container mx-auto px-2 py-3 mb-6 md:mb-10">
        <div className="flex justify-center items-center">
          {/* Extraneous invisible layout widget */}
          <div className="invisible flex mr-auto">
            <SocialButton name={socialLink.name} url={socialLink.url} />
          </div>

          {/* Navigation links - Large screen */}
          <div className="hidden md:flex font-general-medium m-0 sm:p-0">
            <div className="nav-primary">
              <Link href="/" aria-label="Home" className="nav-link">
                Home
              </Link>
              <Link href="/about" aria-label="About" className="nav-link">
                About the Artist
              </Link>
              <Link href="/press" aria-label="Press" className="nav-link">
                Recent Press
              </Link>
              <Link href="/contact" aria-label="Contact" className="nav-link">
                Contact Me
              </Link>
            </div>
          </div>

          {/* Hamburger menu - Small screen */}
          <div className="flex md:hidden">
            <Hamburger showMenu={showMenu} toggleMenu={toggleMenu} />
          </div>

          {/* Theme switcher */}
          <div className="flex ml-auto">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Navigation links - Small screen */}
        <div className={showMenu ? "nav-mobile" : "hidden"}>
          <Link href="/" aria-label="Home" className="nav-link">
            Home
          </Link>
          <Link href="/about" aria-label="About" className="nav-link">
            About the Artist
          </Link>
          <Link href="/press" aria-label="Press" className="nav-link">
            Recent Press
          </Link>
          <Link href="/contact" aria-label="Contact" className="nav-link">
            Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
