import { GetStaticProps } from 'next';
import Layout from '../components/Layout';

interface MainData {
  _id: string;
  resumelink: string;
  name: string;
  role: string;
  linkedinId: string;
  twitterId: string;
  githubId: string;
  roleDescription: string;
}

interface HomeProps {
  mainData: MainData[];
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/portfolioData');
  const data = await response.json();
  return { props: { mainData: data.main } };
};

const HomePage: React.FC<HomeProps> = ({ mainData }) => (
  <Layout title="Home">
  <div>
    <h1>{mainData[0]?.name}</h1>
    <h2>{mainData[0]?.role}</h2>
    <p>{mainData[0]?.roleDescription}</p>
  </div>
  </Layout>
);

export default HomePage;
