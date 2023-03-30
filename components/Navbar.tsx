import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          Home
        </Link>
      </li>
      <li>
        <Link href="/projects">
          Projects
        </Link>
      </li>
      <li>
        <Link href="/resume">
          Resume
        </Link>
      </li>
      <li>
        <Link href="/testimonials">
          Testimonials
        </Link>
      </li>
      <li>
        <Link href="/contact">
          Contact
        </Link>
      </li>
    </ul>
  );
}

export default Navbar;
