import React from "react";
import Head from "next/head";
import { useEffect } from "react";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title = "Portfolio", children }) => {
  useEffect(() => {
    document.body.classList.add("flex");
    document.body.classList.add("flex-col");
    document.body.classList.add("bg-primary-light");
    document.body.classList.add("dark:bg-black");
  });

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-white dark:bg-neutral-900 border-x border-tertiary-dark dark:border-tertiary-light px-6 sm:px-8 lg:px-16">
        <div className="bg-white dark:bg-neutral-900 px-6 sm:px-8 lg:px-16">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;
