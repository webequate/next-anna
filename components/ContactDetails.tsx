// components/ContactDetails.tsx
import DownloadCV from '@/components/DownloadCV';
import { FiPhone, FiMapPin, FiMail } from 'react-icons/fi';

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
			<div className="text-left max-w-xl px-6">
				<h2 className="font-general-medium text-2xl text-primary-dark dark:text-primary-light mt-12 mb-8">
					Contact Details
				</h2>
        <p className="mt-4 mb-4">{ contactIntro }</p>
        <p className="mt-4 mb-4">{ name }</p>
        <p className="mt-4 mb-4">
          <i className="text-2xl text-neutral-500 dark:text-neutral-400 mr-4 mt-1">
            <FiMapPin />
          </i>
          <span className="text-lg mb-4 text-ternary-dark dark:text-ternary-light">
            { location }
          </span>
        </p>
				<p className="mt-4 mb-4">
					<i className="text-2xl text-neutral-500 dark:text-neutral-400 mr-4 mt-1">
						<FiPhone />
					</i>
					<span className="text-lg mb-4 text-ternary-dark dark:text-ternary-light">
						{ phone }
					</span>
        </p>
        <p className="mt-4 mb-4">
					<i className="text-2xl text-neutral-500 dark:text-neutral-400 mr-4 mt-1">
						<FiMail />
					</i>
					<span className="text-lg mb-4 text-ternary-dark dark:text-ternary-light">
						{ website }
					</span>
        </p>
        <DownloadCV resumelink={ resumeLink } />
			</div>
		</div>
  );
};

export default ContactDetails;
