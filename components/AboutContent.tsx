// components/AboutContent.tsx
import Social from "@/components/Social";
import { SocialLink } from "@/types/basics";

interface AboutContentProps {
  aboutIntro: string;
  aboutItems: string[];
  socialLinks: SocialLink[];
}

const AboutContent: React.FC<AboutContentProps> = ({
  aboutIntro,
  aboutItems,
  socialLinks,
}) => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="text-base text-left max-w-xl text-dark-2 dark:text-light-2 p-0 md:ml-6">
        <h1 className="text-4xl font-bold text-dark-1 dark:text-light-1 mb-6">
          {aboutIntro}
        </h1>
        {aboutItems.map((aboutItem, index) => (
          <p
            key={index}
            className="text-base text-dark-2 dark:text-light-2 mt-4 mb-4"
          >
            {aboutItem}
          </p>
        ))}
        <Social socialLinks={socialLinks} />
      </div>
    </div>
  );
};

export default AboutContent;
