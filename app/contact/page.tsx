import basics from "@/data/basics.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import AnimatedFade from "@/components/AnimatedFade";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: `${basics.name} | Contact`,
  description: "Send a message to Anna Elise Johnson.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/contact",
  },
};

export const revalidate = 60;

export default function ContactPage() {
  const name = basics.name;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <AnimatedFade>
        <div className="mx-auto flex flex-col-reverse lg:flex-row text-base text-dark-2 dark:text-light-2">
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:mr-6">
            <ContactForm />
          </div>
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:ml-6">
            <ContactDetails
              name={name}
              contactIntro={basics.contactIntro}
              location={basics.location}
              email={basics.email}
              website={basics.website}
              resumeLink={basics.resumeLink}
            />
          </div>
        </div>
      </AnimatedFade>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
