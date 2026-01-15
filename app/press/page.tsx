import basics from "@/data/basics.json";
import pressLinksData from "@/data/press.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedFade from "@/components/AnimatedFade";
import Image from "next/image";
import Link from "next/link";
import { PressLink } from "@/types/press";
import { SocialLink } from "@/types/basics";

export const metadata = {
  title: `${basics.name} | Recent Press`,
  description: "Recent press about Anna Elise Johnson.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/press",
  },
};

export const revalidate = 60;

function getPressLinks(): PressLink[] {
  return (pressLinksData as PressLink[]).sort((a, b) => a.order - b.order);
}

export default function PressPage() {
  const name = basics.name;
  const socialLinks: SocialLink[] = basics.socialLinks as any;
  const pressLinks = getPressLinks();
  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />
      <AnimatedFade className="text-base text-dark-2 dark:text-light-2">
        {pressLinks.map((pressLink, index) => (
          <div key={index} className="flex mx-auto justify-center">
            <Link
              href={pressLink.url}
              aria-label={pressLink.name}
              target="_blank"
              className="mx-auto mt-4 mb-4"
            >
              <Image
                src={`/images/press/${pressLink.image}`}
                alt={pressLink.name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <p className="font-bold mx-auto text-center mt-2 mb-4">
                {pressLink.text}
              </p>
            </Link>
          </div>
        ))}
      </AnimatedFade>
      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
}
