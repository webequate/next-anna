// pages/resume.tsx
import { GetStaticProps, NextPage } from 'next';
import { motion } from 'framer-motion';
import { connectToDatabase } from '@/lib/mongodb';
import { School, Job } from '@/types/experience';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type ResumeProps = {
  schools: School[];
  jobs: Job[];
  name: string;
  title: string;
  socialLinks: SocialLink[];
}

const Resume: NextPage<ResumeProps> = ({ schools, jobs, name, title, socialLinks }) => {
  return (
    <>
      <Header name={ name } />

      <motion.div
			  initial={{ opacity: 0 }}
			  animate={{ opacity: 1 }}
			  transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
		  >

        <h1 className="text-5xl font-bold uppercase mb-2">{ name }</h1>
        <h3 className="text-3xl font-bold text-accent-light dark:text-accent-light mb-4">{ title }</h3>
  
        <h2 className="text-3xl font-bold uppercase underline underline-offset-8 decoration-accent-dark dark:decoration-accent-light mt-12 mb-12">Education</h2>
        { schools.map(( school, index ) => (
          <div key={ index } className="text-base text-secondary-dark dark:text-secondary-light mb-6">
            <h3 className="text-2xl font-bold text-primary-dark dark:text-primary-light">{ school.school }</h3>
            <p className="mt-1 mb-2">
              <span className="text-xl font-bold text-accent-light dark:text-accent-light">{ school.program }</span>
              <span className="font-semibold"> • { school.city } • </span>
              <span className="font-semibold italic">{ school.endDate }</span>
            </p>
          </div>
        ))}

        <h2 className="text-3xl font-bold uppercase underline underline-offset-8 decoration-accent-dark dark:decoration-accent-light mt-12 mb-12">Work Experience</h2>
        { jobs.map(( job, index ) => (
          <div key={ index } className="text-base text-secondary-dark dark:text-secondary-light mb-8">
            <h3 className="text-2xl font-bold text-primary-dark dark:text-primary-light">{ job.company }</h3>
            <p className="mt-1 mb-2">
              <span className="text-xl font-bold text-accent-light dark:text-accent-light">{ job.role }</span>
              <span className="font-semibold"> • { job.city } • </span>
              <span className="font-semibold italic">{ job.startDate } - { job.endDate }</span>
            </p>
            <ul className="list-disc list-outside">
              { job.achievements.map(( achievement, index ) => (
                <li key={ index } className="mb-1">
                  { achievement }
                </li>
              ))}
            </ul>
          </div>
        ))}

      </motion.div>

      <Footer name={ name } socialLinks={ socialLinks } />
    </>
  );
}

export const getStaticProps: GetStaticProps<ResumeProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const basicsCollection = db.collection<Basics>('basics');
  const basics: Basics[] = await basicsCollection.find().toArray();

  const schoolsCollection = db.collection<School>('schools');
  const schools: School[] = await schoolsCollection.find().sort({ order: 1 }).toArray();

  const jobsCollection = db.collection<Job>('jobs');
  const jobs: Job[] = await jobsCollection.find().sort({ order: -1 }).toArray();

  return {
    props: {
      schools: JSON.parse(JSON.stringify(schools)),
      jobs: JSON.parse(JSON.stringify(jobs)),
      name: basics[0].name,
      title: basics[0].title,
      socialLinks: basics[0].socialLinks
    },
    revalidate: 60,
  };
};
  
export default Resume;