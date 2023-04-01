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
  const { name, title, abouts, resumeLink, socialLinks, website, location, phone, contactIntro } = basics[0];
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">
      <Header name={ name } />
      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl mb-6">About</h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ name }</p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ title }</p>
        { abouts.map((about, index) => (
          <p key={index} className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ about }</p>
        ))}
        <DownloadCV resumelink={ resumeLink } />
        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ website }</p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ location }</p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ phone }</p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 mb-4">{ contactIntro }</p>
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