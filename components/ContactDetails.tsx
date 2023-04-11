// components/ContactDetails.tsx
import DownloadCV from '@/components/DownloadCV';
import Link from 'next/link';
import { FiUser, FiPhone, FiMapPin, FiMail, FiGlobe } from 'react-icons/fi';

interface ContactDetailsProps {
  name: string;
  contactIntro: string;
  location: string;
  phone: string;
  website: string;
  resumeLink: string;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ name, contactIntro, location, phone, website, resumeLink }) => {
  return (
    <div className="w-full lg:w-1/2">
			<div className="text-base text-left max-w-xl text-secondary-dark dark:text-secondary-light px-6">
				<h2 className="font-general-medium text-2xl text-primary-dark dark:text-primary-light mt-12 mb-8">
					Contact Details
				</h2>
        <p className="mt-4 mb-4">{ contactIntro }</p>
        <ul>
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiUser />
            </i>
            <span className="text-lg">
              { name }
            </span>
          </li>
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiMapPin />
            </i>
            <span className="text-lg">
              { location }
            </span>
          </li>
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiPhone />
            </i>
            <span className="text-lg">
              { phone }
            </span>
          </li>
          {/* <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiMail />
            </i>
            <span className="text-lg">
              { email }
            </span>
          </li> */}
          <li className="flex mb-4">
            <i className="text-2xl mr-4 mt-1">
              <FiGlobe />
            </i>
            <span className="text-lg">
              <Link
                href={ website }
              >
                portfolio.webequate.com
              </Link>
            </span>
          </li>
        </ul>
        <DownloadCV resumelink={ resumeLink } />
			</div>
		</div>
  );
};

export default ContactDetails;
