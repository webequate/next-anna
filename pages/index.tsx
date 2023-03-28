// index.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Main from './main';

const Index: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
      </Head>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/projects">
                <a>Projects</a>
              </Link>
            </li>
            <li>
              <Link href="/resume">
                <a>Resume</a>
              </Link>
            </li>
            <li>
              <Link href="/testimonials">
                <a>Testimonials</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Main props={} />
      </main>
    </>
  );
};

export default Index;
