// pages/skills.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { connectToDatabase } from "@/lib/mongodb";
import { FeaturedSkill, RatedSkill } from "@/types/skills";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkillBar from "@/components/SkillBar";

type SkillsProps = {
  featuredSkills: FeaturedSkill[];
  ratedSkills: RatedSkill[];
  name: string;
  socialLinks: SocialLink[];
};

const Skills: NextPage<SkillsProps> = ({
  featuredSkills,
  ratedSkills,
  name,
  socialLinks,
}) => {
  return (
    <div className="mx-auto">
      <Header name={name} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className={"text-base text-dark-2 dark:text-light-2"}
      >
        <h1 className="text-xl font-bold uppercase text-dark-1 dark:text-light-1 sm:text-3xl mb-6">
          Skills
        </h1>

        {/* Featured Skills */}
        <p className="mt-4 mb-8">
          {featuredSkills.map((featuredSkill, index) => (
            <span key={index}>{featuredSkill.description}, </span>
          ))}
        </p>

        {/* Rated Skills */}
        <ul>
          {ratedSkills.map((ratedSkill, index) => (
            <SkillBar
              key={index}
              name={ratedSkill.name}
              level={ratedSkill.level}
            />
          ))}
        </ul>
      </motion.div>

      <Footer name={name} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<SkillsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const featuredSkillsCollection =
    db.collection<FeaturedSkill>("featuredSkills");
  const featuredSkills: FeaturedSkill[] = await featuredSkillsCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const ratedSkillsCollection = db.collection<RatedSkill>("ratedSkills");
  const ratedSkills: RatedSkill[] = await ratedSkillsCollection
    .find()
    .sort({ order: 1 })
    .toArray();

  const basicsCollection = db.collection<Basics>("basics");
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      featuredSkills: JSON.parse(JSON.stringify(featuredSkills)),
      ratedSkills: JSON.parse(JSON.stringify(ratedSkills)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks,
    },
    revalidate: 60,
  };
};

export default Skills;
