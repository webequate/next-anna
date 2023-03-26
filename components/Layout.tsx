// components/Layout.tsx

import React from 'react';
import Head from 'next/head';

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title = 'My Portfolio', children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-blue-500 text-white p-4">
        {/* Add your header content here */}
        <h1>My Portfolio</h1>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-blue-500 text-white p-4">
        {/* Add your footer content here */}
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Layout;
