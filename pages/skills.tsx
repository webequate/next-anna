// pages/skills.tsx
import { GetStaticProps, NextPage } from 'next';
import { FeaturedSkill, RatedSkill } from '@/types/skills';
import { connectToDatabase } from '@/lib/mongodb';
import Layout from '@/components/Layout';
  
type SkillsProps = {
  featuredSkills: FeaturedSkill[];
  ratedSkills: RatedSkill[];
}

const Skills: NextPage<SkillsProps> = ({ featuredSkills, ratedSkills }) => {
  return (
    <Layout>
      <div>
        <h1>Skills</h1>
        {/* Featured Skills */}
        <p>
          {featuredSkills.map((featuredSkill, index) => (
            <span key={index}>{featuredSkill.description}, </span>
          ))}
        </p>
        {/* Rated Skills */}
        <ul>
          {ratedSkills.map((ratedSkill, index) => (
            <li key={index}>
              <p>{ratedSkill.name}</p>
              <p>{ratedSkill.level}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<SkillsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const featuredSkillsCollection = db.collection<FeaturedSkill>('featuredSkills');
  const featuredSkills: FeaturedSkill[] = await featuredSkillsCollection.find().sort({ order: 1 }).toArray();

  const ratedSkillsCollection = db.collection<RatedSkill>('ratedSkills');
  const ratedSkills: RatedSkill[] = await ratedSkillsCollection.find().sort({ order: 1 }).toArray();

  return {
    props: {
      featuredSkills: JSON.parse(JSON.stringify(featuredSkills)),
      ratedSkills: JSON.parse(JSON.stringify(ratedSkills))
    },
    revalidate: 60,
  };
};

export default Skills;