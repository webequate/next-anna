// pages/testimonials.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { Testimonial } from '@/types/testimonial';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type TestimonialsProps = {
  testimonials: Testimonial[];
  name: string;
  socialLinks: SocialLink[];
}

const Testimonials: NextPage<TestimonialsProps> = ({ testimonials, name, socialLinks }) => {
  return (
    <div className="mx-auto">

      <Header name={ name } />

      <div className="text-base text-secondary-dark dark:text-secondary-light">

        <h1 className="text-xl font-bold text-primary-dark dark:text-primary-light sm:text-3xl mb-6">Testimonials</h1>

        <ul>
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <p className="mt-4 mb-4">{ testimonial.description }</p>
            <p className="mt-4 mb-4">{ testimonial.name }</p>
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