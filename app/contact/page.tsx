import basics from "@/data/basics.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import PageFade from "@/components/PageFade";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: "Contact",
  description: "Send a message to Anna Elise Johnson.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Anna Elise Johnson",
    description: "Send a message to Anna Elise Johnson.",
    url: "https://annaelisejohnson.com/contact",
    siteName: "Anna Elise Johnson",
    images: [
      {
        url: "https://annaelisejohnson.com/images/anna-og.jpg",
        alt: "Anna Elise Johnson",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Anna Elise Johnson",
    description: "Send a message to Anna Elise Johnson.",
    images: ["https://annaelisejohnson.com/images/anna-og.jpg"],
  },
};

export const revalidate = 60;

export default function ContactPage() {
  const name = basics.name;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <PageFade>
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
      </PageFade>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
