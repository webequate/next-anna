// pages/about.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Basics } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DownloadCV from '@/components/DownloadCV';
import { useTheme } from 'next-themes';

type AboutProps = {
  basics: Basics[];
}

const About: NextPage<AboutProps> = ({ basics }) => {
  const { name, role, roleDescription, aboutme, socialLinks, resumelink, address1, phone, website, contactIntro } = basics[0];
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">
      <Header name={ name } />
      <div>
        <h1 className="text-4xl font-bold">About</h1>
        <p>{ name }</p>
        <p>{ role }</p>
        <p>{ roleDescription }</p>
        <p>{ aboutme }</p>
        <DownloadCV resumelink={ resumelink } />
        <p>{ address1 }</p>
        <p>{ phone }</p>
        <p>{ website }</p>
        <p>{ contactIntro }</p>
      </div>
      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />
    </div>
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