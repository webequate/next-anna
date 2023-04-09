// pages/contact.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Basics } from '@/types/basics';
import Header from '@/components/Header';
import ContactForm from '@/components/ContactForm';
import ContactDetails from '@/components/ContactDetails';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';

type ContactProps = {
  basics: Basics[];
}

const Contact: NextPage<ContactProps> = ({ basics }) => {
  const { name, contactIntro, location, phone, website, resumeLink, socialLinks } = basics[0];
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">

      <Header name={ name } />

      <div>

        <h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl mb-6">Contact</h1>

        <div className="mx-auto flex flex-col-reverse lg:flex-row py-5 lg:py-10 lg:mt-5">

          <ContactForm />

          <ContactDetails
            name={ name }
            contactIntro={ contactIntro }
            location={ location }
            phone={ phone }
            website={ website }
            resumeLink={ resumeLink }
          />

        </div>

      </div>

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