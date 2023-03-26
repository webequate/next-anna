import clientPromise from '../lib/mongodb';
import { GetStaticProps } from 'next';
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
  
interface HomeProps {
  mainData: MainData;
}

const HomePage: React.FC<HomeProps> = ({ mainData }) => {
  <Layout title="Top">
    <div>
      <h1>Top 1000 Movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        <h2>{mainData.name}</h2>
        <h3>{mainData.role}</h3>
        <p>{mainData.roleDescription}</p>
      </ul>
    </div>
  </Layout>
}

export const getServerSideProps: GetStaticProps = async () => {
  try {
      const client = await clientPromise;
      const db = client.db("Portfolio");

      const data = await db
        .collection("Main")
        .find({})
        .limit(1);

      return {
          props: { mainData: JSON.parse(JSON.stringify(data)) },
      };
  } catch (e) {
      console.error(e);
  }
}

export default HomePage;


        