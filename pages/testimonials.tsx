// pages/projects.tsx
import { GetStaticProps, NextPage } from 'next';
import { Testimonial } from '@/types/testimonial';
import { connectToDatabase } from '@/lib/mongodb';
import Layout from '@/components/Layout';
import Image from 'next/image';
  
type TestimonialsProps = {
  testimonials: Testimonial[];
}

const Testimonials: NextPage<TestimonialsProps> = ({ testimonials }) => {
  return (
    <Layout>
      <div>
        <h1>Testimonials</h1>
        <ul>
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <p>{testimonial.description}</p>
              <p>{testimonial.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<TestimonialsProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const testimonialsCollection = db.collection<Testimonial>('testimonials');
  const testimonials: Testimonial[] = await testimonialsCollection.find().sort({ order: 1 }).toArray();

  return {
    props: {
      testimonials: JSON.parse(JSON.stringify(testimonials)),
    },
    revalidate: 60,
  };
};

  
export default Testimonials;