// pages/press.tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { PressLink } from "@/types/press";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
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
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
      >
        {pressLinks.map((pressLink, index) => (
          <div key={index} className="flex mx-auto justify-center">
            <Link
              key={index}
              href={pressLink.url}
              aria-label={pressLink.name}
              target="_blank"
              className="mx-auto mt-4 mb-8"
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
  const client = await clientPromise;
  const db = client.db("Anna");

  const pressLinksCollection = db.collection<PressLink>("press");
  const pressLinks: PressLink[] = await pressLinksCollection
    .find({})
    .sort({ order: 1 })
    .limit(0)
    .toArray();

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      pressLinks: JSON.parse(JSON.stringify(pressLinks)),
    },
    revalidate: 60,
  };
};

export default PressPage;
