import basics from "@/data/basics.json";
import experiences from "@/data/experience.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedFade from "@/components/AnimatedFade";
import Image from "next/image";
import { Experience } from "@/types/experience";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: "About",
  description: "About Anna Elise Johnson.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | Anna Elise Johnson",
    description: "About Anna Elise Johnson.",
    url: "https://annaelisejohnson.com/about",
    siteName: "Anna Elise Johnson",
    images: [
      {
        url: "https://annaelisejohnson.com/images/anna-og.jpg",
        width: 1200,
        height: 630,
        alt: "Anna Elise Johnson",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Anna Elise Johnson",
    description: "About Anna Elise Johnson.",
    images: ["https://annaelisejohnson.com/images/anna-og.jpg"],
  },
};

export const revalidate = 60;

export default function AboutPage() {
  const name: string = basics.name;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  const experienceList: Experience[] = experiences as any;
  return (
    <>
      <Header socialLink={socialLinks[0]} />
      <AnimatedFade>
        <div className="mx-auto text-base text-dark-2 dark:text-light-2 mb-10">
          <div className="mb-10">
            <Image
              src="/images/anna.jpg"
              width={1080}
              height={720}
              alt="Anna Elise Johnson"
              className="w-full"
            />
          </div>
          <div className="mx-auto lg:flex lg:flex-row mb-4 lg:mb-10">
            <div className="w-full lg:w-1/3" />
            <div className="w-full lg:w-2/3">
              <h1 className="montserrat text-2xl lg:text-4xl font-bold uppercase mt-4 mb-4">
                Anna Elise Johnson
              </h1>
              <hr />
            </div>
          </div>
          <div className="mx-auto lg:flex lg:flex-row mb-4 lg:mb-10">
            <div className="w-full lg:w-1/3" />
            <div className="w-full lg:w-2/3">
              {basics.abouts.map((about: string, index: number) => (
                <p key={index} className="mb-5">
                  {about}
                </p>
              ))}
            </div>
          </div>
          <div className="mx-auto lg:flex lg:flex-row mb-4 lg:mb-10">
            <div className="w-full lg:w-1/3" />
            <div className="w-full lg:w-2/3">
              <h1 className="montserrat text-2xl lg:text-4xl font-bold uppercase mt-4 mb-4">
                C.V. (Curriculum Vitae)
              </h1>
              <hr />
            </div>
          </div>
          {experienceList.map((experience, index) => (
            <div
              key={index}
              className="lg:flex lg:flex-row mx-auto align-top mb-10"
            >
              <div className="w-full lg:w-1/3">
                <h2 className="montserrat text-xl text-align-top font-bold uppercase decoration-dark-1 dark:decoration-light-1 pr-8 pb-6 lg:pb-0">
                  {experience.title || ""}
                </h2>
              </div>
              <div className="w-full lg:w-2/3">
                {experience.sections.map((section, sIndex) => (
                  <div
                    key={sIndex}
                    className="text-base text-dark-2 dark:text-light-2 mb-5"
                  >
                    <h3 className="montserrat text-lg font-bold text-dark-1 dark:text-light-1 mb-2">
                      {section.name}
                    </h3>
                    <ul className="list-disc list-outside ml-5 lg:ml-0">
                      {section.items.map((item, iIndex) => (
                        <li key={iIndex} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedFade>
      <Footer name={name} socialLinks={socialLinks} />
    </>
  );
}
