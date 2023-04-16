// pages/about.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { Basics } from "@/types/basics";
import Header from "@/components/Header";
import AboutContent from "@/components/AboutContent";
import AboutDetails from "@/components/AboutDetails";
import Footer from "@/components/Footer";

type AboutProps = {
  basics: Basics[];
};

const About: NextPage<AboutProps> = ({ basics }) => {
  const {
    aboutIntro,
    aboutItems,
    name,
    location,
    phone,
    website,
    socialLinks,
  } = basics[0];
  return (
    <div className="mx-auto">
      <Header name={name} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="text-base text-dark-2 dark:text-light-2">
          <h1 className="text-xl font-bold uppercase text-dark-1 dark:text-light-1 sm:text-3xl mb-6">
            About
          </h1>
          <div className="mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-5">
            <AboutDetails
              name={name}
              location={location}
              phone={phone}
              website={website}
            />
            <AboutContent
              aboutIntro={aboutIntro}
              aboutItems={aboutItems}
              socialLinks={socialLinks}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      basics: JSON.parse(JSON.stringify(basics)),
    },
    revalidate: 60,
  };
};

export default About;
