import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Example from './Example';
import AppHeader from './Header';
import AppFooter from './Footer';

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
      <AppHeader />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <AppFooter />
    </>
  );
};

export default Layout;
