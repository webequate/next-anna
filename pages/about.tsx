// pages/about.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { Experience } from "@/types/experience";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import experiences from "@/data/experience.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

type AboutPageProps = {
  name: string;
  socialLinks: SocialLink[];
  experiences: Experience[];
};

const AboutPage: NextPage<AboutPageProps> = ({
  name,
  socialLinks,
  experiences,
}) => {
  return (
    <>
      <Head>
        <title>{`${name} | About`}</title>
        <meta
          name="description"
          content="About Anna Elise Johnson."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="mx-auto text-base text-dark-2 dark:text-light-2 mb-10">
          <div className="mb-10">
            <Image
              src="/images/anna.jpg"
              width={1080}
              height={720}
              alt="Anna Elise Johnson"
              className="w-full"
            />
          </div>

          <div className="mx-auto lg:flex lg:flex-row mb-4 lg:mb-10">
            <div className="w-full lg:w-1/3"></div>
            <div className="w-full lg:w-2/3">
              <h1 className="montserrat text-2xl lg:text-4xl font-bold uppercase mt-4 mb-4">
                Anna Elise Johnson
              </h1>
              <hr />
            </div>
          </div>

          <div className="mx-auto lg:flex lg:flex-row mb-4 lg:mb-10">
            <div className="w-full lg:w-1/3"></div>
            <div className="w-full lg:w-2/3">
              {basics.abouts.map((about, index) => (
                <p key={index} className="mb-5">
                  {about}
                </p>
              ))}
            </div>
          </div>

          <div className="mx-auto lg:flex lg:flex-row mb-4 lg:mb-10">
            <div className="w-full lg:w-1/3"></div>
            <div className="w-full lg:w-2/3">
              <h1 className="montserrat text-2xl lg:text-4xl font-bold uppercase mt-4 mb-4">
                C.V. (Curriculum Vitae)
              </h1>
              <hr />
            </div>
          </div>

          {experiences.map((experience, index) => (
            <div
              key={index}
              className="lg:flex lg:flex-row mx-auto align-top mb-10"
            >
              <div className="w-full lg:w-1/3">
                <h2 className="montserrat text-xl text-align-top font-bold uppercase decoration-dark-1 dark:decoration-light-1 pr-8 pb-6 lg:pb-0">
                  {experience.title || ""}
                </h2>
              </div>
              <div className="w-full lg:w-2/3">
                {experience.sections.map((section, index) => (
                  <div
                    key={index}
                    className="text-base text-dark-2 dark:text-light-2 mb-5"
                  >
                    <h3 className="montserrat text-lg font-bold text-dark-1 dark:text-light-1 mb-2">
                      {section.name}
                    </h3>
                    <ul className="list-disc list-outside ml-5 lg:ml-0">
                      {section.items.map((item, index) => (
                        <li key={index} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </>
  );
};

// Load data from experiences.json at build time
export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      experiences, // Use imported experiences.json
    },
    revalidate: 60,
  };
};

export default AboutPage;
