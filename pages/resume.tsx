// pages/resume.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { School, Job } from '@/types/experience';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTheme } from 'next-themes';

type ResumeProps = {
  schools: School[];
  jobs: Job[];
  name: string;
  title: string;
  socialLinks: SocialLink[];
}

const Resume: NextPage<ResumeProps> = ({ schools, jobs, name, title, socialLinks }) => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Header name={ name } />

        <h1 className="text-4xl font-semibold mb-2">{ name }</h1>
        <h3 className="text-xl font-semibold text-secondary-dark dark:text-secondary-light mb-4">{ title }</h3>
  
        <h2 className="text-2xl font-semibold mt-12 mb-6">Education</h2>
        { schools.map(( school, index ) => (
          <div key={ index } className="text-secondary-dark dark:text-secondary-light mb-4">
            <h3 className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-2">{ school.school }</h3>
            <p className="text-base mt-4 mb-4">
              <em>{ school.program }</em>
              <span> • { school.city } • </span>
              <span>{ school.endDate }</span>
            </p>
          </div>
        ))}

        <h2 className="text-2xl font-semibold mt-12 mb-6">Work Experience</h2>
        { jobs.map(( job, index ) => (
          <div key={ index } className="text-secondary-dark dark:text-secondary-light mb-12">
            <h3 className="text-xl font-semibold text-primary-dark dark:text-primary-light mb-2">{ job.company }</h3>
            <p className="text-base mt-4 mb-4">
              <em>{ job.role }</em>
              <span> • { job.city } • </span>
              <span>{ job.startDate } - { job.endDate }</span>
            </p>
            <ul className="list-disc list-outside">
              { job.achievements.map(( achievement, index ) => (
                <li key={ index } className="text-base mb-2">
                  { achievement }
                </li>
              ))}
            </ul>
          </div>
        ))}

      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />

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