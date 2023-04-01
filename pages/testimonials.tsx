// pages/testimonials.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Testimonial } from '@/types/testimonial';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';

type TestimonialsProps = {
  testimonials: Testimonial[];
  name: string;
  socialLinks: SocialLink[];
}

const Testimonials: NextPage<TestimonialsProps> = ({ testimonials, name, socialLinks }) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="mx-auto">

      <Header name={ name } />

      <div>

        <h1 className="text-4xl font-bold">Testimonials</h1>

        <ul>
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <p>{ testimonial.description }</p>
            <p>{ testimonial.name }</p>
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

export const getStaticProps: GetStaticProps<TestimonialsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const testimonialsCollection = db.collection<Testimonial>('testimonials');
  const testimonials: Testimonial[] = await testimonialsCollection.find().sort({ order: 1 }).toArray();

  const basicsCollection = db.collection<Basics>('basics');
  const basics: Basics[] = await basicsCollection.find().toArray();

  return {
    props: {
      testimonials: JSON.parse(JSON.stringify(testimonials)),
      name: basics[0].name,
      socialLinks: basics[0].socialLinks
    },
    revalidate: 60,
  };
};

export default Testimonials;