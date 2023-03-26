import clientPromise from '../lib/mongodb';
import { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';

interface Testimonial {
  _id: string;
  description: string;
  name: string;
}
  
interface TestimonialsProps {
  testimonialsData: Testimonial[];
}

const Testimonials: NextPage<TestimonialsProps> = ({ testimonialsData }) => {
  return (
    <Layout>
      <div>
        <h1>Testimonials</h1>
        <ul>
          {testimonialsData.map((testimonial, index) => (
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
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");
  
    const data = await db
      .collection("Testimonials")
      .find({})
      .toArray();
  
    return {
      props: { testimonialsData: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
     console.error(e);
  }
}
  
export default Testimonials;