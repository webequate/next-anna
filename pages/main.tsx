import clientPromise from '../lib/mongodb';
import { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';

interface SocialLink {
  name: string;
  url: string;
  className: string;
}

interface MainData {
  _id: string;
  resumelink: string;
  name: string;
  role: string;
  linkedinId: string;
  twitterId: string;
  githubId: string;
  roleDescription: string;
  socialLinks: SocialLink[];
  aboutme: string;
  address1: string;
  phone: string;
  website: string;
  contactIntro: string;
}
  
interface MainProps {
  mainData: MainData[];
}

const Main: NextPage<MainProps> = ({ mainData }) => {
  return (
    <Layout>
      <div>
        <h1>I&apos;m {mainData[0].name}</h1>
        <h2>I am a {mainData[0].role}</h2>
        <p>{mainData[0].roleDescription}</p>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<MainProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");
  
    const data = await db
      .collection("Main")
      .find({})
      .limit(1)
      .toArray();
  
    return {
      props: { mainData: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
     console.error(e);
  }
}
  
export default Main;


        