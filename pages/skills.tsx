// pages/skills.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { FeaturedSkill, RatedSkill } from '@/types/skills';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';

type SkillsProps = {
  featuredSkills: FeaturedSkill[];
  ratedSkills: RatedSkill[];
  name: string;
  socialLinks: SocialLink[];
}

const Skills: NextPage<SkillsProps> = ({ featuredSkills, ratedSkills, name, socialLinks }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">

      <Header name={ name } />

      <div>

        <h1 className="text-4xl font-bold">Skills</h1>

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

      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />
      
    </div>
  );
}

export const getStaticProps: GetStaticProps<SkillsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const featuredSkillsCollection = db.collection<FeaturedSkill>('featuredSkills');
  const featuredSkills: FeaturedSkill[] = await featuredSkillsCollection.find().sort({ order: 1 }).toArray();

  const ratedSkillsCollection = db.collection<RatedSkill>('ratedSkills');
  const ratedSkills: RatedSkill[] = await ratedSkillsCollection.find().sort({ order: 1 }).toArray();

  const basicsCollection = db.collection<Basics>('basics');
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      featuredSkills: JSON.parse(JSON.stringify(featuredSkills)),
      ratedSkills: JSON.parse(JSON.stringify(ratedSkills)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks
    },
    revalidate: 60,
  };
};

export default Skills;