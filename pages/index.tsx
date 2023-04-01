// pages/index.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Basics } from '@/types/basics';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';

type HomeProps = {
  basics: Basics[];
}

const Home: NextPage<HomeProps> = ({ basics }) => {
  const { name, title, abouts, resumeLink, socialLinks } = basics[0];
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">
      <Header name={ name } />
      <Banner
        name={ name }
        title={ title }
        abouts={ abouts }
        resumeLink={ resumeLink }
        socialLinks={ socialLinks }
      />
      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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

  
export default Home;