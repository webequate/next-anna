// pages/testimonials.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { PressItem } from "@/types/press";
import { Basics } from "@/types/basics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

type PressProps = {
  pressItems: PressItem[];
  name: string;
};

const Press: NextPage<PressProps> = ({ pressItems, name }) => {
  return (
    <div className="mx-auto">
      <Header name={name} />

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
              className="mx-auto mt-4 mb-8"
            >
              <Image
                src={`/images/press/${pressItem.image}`}
                alt={pressItem.name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <p className="flex font-bold mx-auto justify-center mt-2 mb-4">
                {pressItem.text}
              </p>
            </Link>
          </div>
        ))}
      </motion.div>

      <Footer name={name} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<PressProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const pressCollection = db.collection<PressItem>("press");
  const pressItems: PressItem[] = await pressCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      pressItems: JSON.parse(JSON.stringify(pressItems)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks,
    },
    revalidate: 60,
  };
};

export default Press;
