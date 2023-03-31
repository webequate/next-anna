// pages/contact.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Basics } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DownloadCV from '@/components/DownloadCV';

type ContactProps = {
  basics: Basics[];
}

const Contact: NextPage<ContactProps> = ({ basics }) => {
  const { name, role, socialLinks, resumelink, address1, phone, website, contactIntro } = basics[0];
  return (
    <div className="container mx-auto">
      <Header name={ name } />
      <h1 className="text-4xl font-bold">Contact</h1>
      <p>{ name }</p>
      <p>{ role }</p>
      <p>{ address1 }</p>
      <p>{ phone }</p>
      <p>{ website }</p>
      <p>{ contactIntro }</p>
      <DownloadCV resumelink={ resumelink } />
      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ContactProps> = async () => {
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

export default Contact;