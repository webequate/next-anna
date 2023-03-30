// pages/about.tsx
import { GetStaticProps, NextPage } from 'next';
import { Basics } from '@/types/basics';
import { connectToDatabase } from '@/lib/mongodb';
import Layout from '@/components/Layout';
import Image from 'next/image';
  
type AboutProps = {
  basics: Basics[];
}

const About: NextPage<AboutProps> = ({ basics }) => {
  return (
    <Layout>
      <div>
        <h1>About</h1>
        <p>{basics[0].resumelink}</p>
        <p>{basics[0].name}</p>
        <p>{basics[0].role}</p>
        <p>{basics[0].linkedinId}</p>
        <p>{basics[0].twitterId}</p>
        <p>{basics[0].githubId}</p>
        <p>{basics[0].roleDescription}</p>
        <ul>
          {basics[0].socialLinks.map((socialLink, index) => (
            <li key={index}>{socialLink.name}, {socialLink.url}, {socialLink.className}</li>
          ))}
        </ul>
        <p>{basics[0].aboutme}</p>
        <p>{basics[0].address1}</p>
        <p>{basics[0].phone}</p>
        <p>{basics[0].website}</p>
        <p>{basics[0].contactIntro}</p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const basicsCollection = db.collection<Basics>('basics');
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      basics: JSON.parse(JSON.stringify(basics)),
    },
    revalidate: 60,
  };
};

  
export default About;