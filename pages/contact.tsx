// pages/contact.tsx
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { Basics, SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";

type ContactProps = {
  name: string;
  contactIntro?: string;
  location?: string;
  email?: string;
  website?: string;
  resumeLink?: string;
  socialLinks: SocialLink[];
};

const Contact: NextPage<ContactProps> = ({
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

export const getStaticProps: GetStaticProps<ContactProps> = async () => {
  const basicsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/basics`
  );
  const basics: Basics = await basicsRes.json();

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

export default Contact;
