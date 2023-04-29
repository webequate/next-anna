// components/Header.tsx
import Link from "next/link";
import { useState } from "react";
import AnnaEliseJohnson from "@/components/AnnaEliseJohnson";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  name: string;
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <nav>
      {/* Home link */}
      <Link href="/">
        <AnnaEliseJohnson />
      </Link>

      <div className="container mx-auto px-2 py-3 mb-10">
        <div className="flex justify-center">
          {/* Navigation links - Large screen */}
          <div className="items-center hidden md:block font-general-medium m-0 sm:ml-4 sm:p-0">
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
          <Hamburger showMenu={showMenu} toggleMenu={toggleMenu} />

          {/* Theme switcher */}
          <ThemeSwitcher />
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
