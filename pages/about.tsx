// pages/experience.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { ExperienceSection } from "@/types/experience";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

type ExperienceProps = {
  name: string;
  socialLinks: SocialLink[];
  experienceSections: ExperienceSection[];
};

const Experience: NextPage<ExperienceProps> = ({
  name,
  socialLinks,
  experienceSections,
}) => {
  return (
    <>
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
              <h1 className="text-2xl lg:text-4xl font-bold uppercase mt-4 mb-4">
                {name}
              </h1>
              <hr />
            </div>
          </div>

          {experienceSections.map((section, index) => (
            <div
              key={index}
              className="lg:flex lg:flex-row mx-auto align-top mb-10"
            >
              <div className="w-full lg:w-1/3">
                <h2 className="text-xl text-align-top font-bold uppercase decoration-dark-1 dark:decoration-light-1 pr-8 pb-6 lg:pb-0">
                  {section.title}
                </h2>
              </div>
              <div className="w-full lg:w-2/3">
                {section.subsections.map((subsection, index) => (
                  <div
                    key={index}
                    className="text-base text-dark-2 dark:text-light-2 mb-5"
                  >
                    <h3 className="text-lg font-bold text-dark-1 dark:text-light-1 mb-2">
                      {subsection.name}
                    </h3>
                    <ul className="list-disc list-outside ml-5 lg:ml-0">
                      {subsection.items.map((item, index) => (
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

export const getStaticProps: GetStaticProps<ExperienceProps> = async () => {
  const experienceRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/experience`
  );
  const experienceSections: ExperienceSection[] = await experienceRes.json();

  const basicsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/basics`
  );
  const basics: Basics = await basicsRes.json();

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      experienceSections: JSON.parse(JSON.stringify(experienceSections)),
    },
    revalidate: 60,
  };
};

export default Experience;
