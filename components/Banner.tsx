import { SocialLink } from "@/types/basics";
import Social from "@/components/Social";
import DownloadCV from "@/components/DownloadCV";
import { motion } from "framer-motion";
import ThemedImage from "@/components/ThemedImage";

interface BannerProps {
  name: string;
  titles: string[];
  abouts: string[];
  resumeLink: string;
  socialLinks: SocialLink[];
}

const Banner: React.FC<BannerProps> = ({
  name,
  titles,
  abouts,
  resumeLink,
  socialLinks,
}) => {
  return (
    <section className="flex flex-col items-top sm:justify-between sm:flex-row mt-5 md:mt-2">
      <div className="text-left">
        <h1 className="text-5xl font-bold text-primary-dark dark:text-primary-light sm:text-5xl mb-6 uppercase">
          {name}
        </h1>
        {titles.map((title, index) => (
          <h2
            key={index}
            className="text-3xl font-bold tracking-tight text-accent-light dark:text-accent-light"
          >
            {title}
          </h2>
        ))}
        {abouts.map((about, index) => (
          <p
            key={index}
            className="text-base text-secondary-dark dark:text-secondary-light mt-4 mb-4"
          >
            {about}
          </p>
        ))}
        <Social socialLinks={socialLinks} />
        <div className="justify-left sm:block">
          <DownloadCV resumelink={resumeLink} />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="ml-10"
      >
        <ThemedImage />
      </motion.div>
    </section>
  );
};

export default Banner;
