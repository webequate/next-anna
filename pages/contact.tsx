// pages/contact.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";

type ContactPageProps = {
  name: string;
  contactIntro: string;
  location: string;
  email: string;
  website: string;
  resumeLink: string;
  socialLinks: SocialLink[];
};

const ContactPage: NextPage<ContactPageProps> = ({
  name,
  contactIntro,
  location,
  email,
  website,
  resumeLink,
  socialLinks,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Contact`}</title>
        <meta
          name="description"
          content="Send a message to Anna Elise Johnson."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="mx-auto flex flex-col-reverse lg:flex-row text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:mr-6">
            <ContactForm />
          </div>

          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:ml-6">
            <ContactDetails
              name={name}
              contactIntro={contactIntro}
              location={location}
              email={email}
              website={website}
              resumeLink={resumeLink}
            />
          </div>
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  return {
    props: {
      name: basics.name,
      contactIntro: basics.contactIntro,
      location: basics.location,
      email: basics.email,
      website: basics.website,
      resumeLink: basics.resumeLink,
      socialLinks: basics.socialLinks,
    },
    revalidate: 60,
  };
};

export default ContactPage;
