// pages/press.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { PressLink } from "@/types/press";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import pressLinksData from "@/data/press.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

type PressPageProps = {
  name: string;
  socialLinks: SocialLink[];
  pressLinks: PressLink[];
};

const PressPage: NextPage<PressPageProps> = ({
  name,
  socialLinks,
  pressLinks,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Recent Press`}</title>
        <meta
          name="description"
          content="Recent press about Anna Elise Johnson."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        {pressLinks.map((pressLink, index) => (
          <div key={index} className="flex mx-auto justify-center">
            <Link
              href={pressLink.url}
              aria-label={pressLink.name}
              target="_blank"
              className="mx-auto mt-4 mb-4"
            >
              <Image
                src={`/images/press/${pressLink.image}`}
                alt={pressLink.name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <p className="font-bold mx-auto text-center mt-2 mb-4">
                {pressLink.text}
              </p>
            </Link>
          </div>
        ))}
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<PressPageProps> = async () => {
  // Sort pressLinks by "order" field
  const pressLinks = pressLinksData.sort((a, b) => a.order - b.order);

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      pressLinks,
    },
    revalidate: 60,
  };
};

export default PressPage;
