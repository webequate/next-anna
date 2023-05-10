// pages/press.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { PressItem } from "@/types/press";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

type PressProps = {
  name: string;
  socialLinks: SocialLink[];
  pressItems: PressItem[];
};

const Press: NextPage<PressProps> = ({ name, socialLinks, pressItems }) => {
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
      >
        {pressItems.map((pressItem, index) => (
          <div key={index} className="flex mx-auto justify-center">
            <Link
              key={index}
              href={pressItem.url}
              aria-label={pressItem.name}
              target="_blank"
              className="mx-auto mt-4 mb-8"
            >
              <Image
                src={`/images/press/${pressItem.image}`}
                alt={pressItem.name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <p className="font-bold mx-auto text-center mt-2 mb-4">
                {pressItem.text}
              </p>
            </Link>
          </div>
        ))}
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<PressProps> = async () => {
  try {
    const pressRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/press`
    );
    const pressItems: PressItem[] = await pressRes.json();

    const basicsRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/basics`
    );
    const basics: Basics = await basicsRes.json();

    return {
      props: {
        name: JSON.parse(JSON.stringify(basics.name)),
        socialLinks: JSON.parse(JSON.stringify(basics.socialLinks)),
        pressItems: JSON.parse(JSON.stringify(pressItems)),
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data in press.tsx:", error);
    throw error;
  }
};

export default Press;
