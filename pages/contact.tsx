import { GetStaticProps } from 'next';

interface MainData {
  contactIntro: string;
}
  
interface ContactProps {
  mainData: MainData[];
}
  
export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:3000/api/portfolioData');
  const data = await response.json();
  return { props: { mainData: data.main } };
};

const ContactPage: React.FC<ContactProps> = ({ mainData }) => (
  <div>
    <h1>Contact</h1>
    <p>{mainData[0]?.contactIntro}</p>
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />

      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message"></textarea>

      <button type="submit">Send Message</button>
    </form>
  </div>
);

export default ContactPage;
