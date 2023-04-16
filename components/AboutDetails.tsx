// components/AboutDetails.tsx
import { SocialLink } from "@/types/basics";
import Image from "next/image";

interface AboutDetailsProps {
  name: string;
  location: string;
  phone: string;
  website: string;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({
  name,
  location,
  phone,
  website,
}) => {
  return (
    <div className="w-full lg:w-1/2">
      <div className="text-base text-left max-w-xl text-dark-2 dark:text-light-2 md:mr-6">
        <Image
          src="/images/allen-ai.jpg"
          alt="Allen"
          width={500}
          height={625}
          className="w-100 h-100 rounded-xl p-0 m-0"
        />
      </div>
    </div>
  );
};

export default AboutDetails;
