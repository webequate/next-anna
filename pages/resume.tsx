// pages/resume.tsx
import { GetStaticProps, NextPage } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import { School, Job } from '@/types/experience';
import { Basics, SocialLink } from '@/types/basics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type ResumeProps = {
  schools: School[];
  jobs: Job[];
  name: string;
  socialLinks: SocialLink[];
}

const Resume: NextPage<ResumeProps> = ({ schools, jobs, name, socialLinks }) => {
  return (
    <div className="container mx-auto">

      <Header name={ name } />

      <h1 className="text-4xl font-bold">Resume</h1>

      <h2>Education</h2>
      { schools.map(( school, index ) => (
        <div key={ index }>
          <h3>{ school.school }</h3>
          <p>
            <span>{ school.program }</span>
            <span> • </span>
            { school.city }
            <span> • </span>
            { school.endDate }
          </p>
        </div>
      ))}

      <h2>Work Experience</h2>
      { jobs.map(( job, index ) => (
        <div key={ index }>
          <h3>{ job.company }</h3>
          <p>
            <span>{ job.role }</span>
            <span> • </span>
            <em>{ job.city }</em>
            <span> • </span>
            <span>{ job.startDate }</span>
            <span> - </span>
            <span>{ job.endDate }</span>
            <ul className="list-disc list-outside">
              { job.achievements.map(( achievement, index ) => (
                <li key={ index }>
                  { achievement }
                </li>
              ))}
            </ul>
          </p>
        </div>
      ))}

      <Footer
        name={ name }
        socialLinks={ socialLinks }
      />

    </div>
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
      socialLinks: basics[0].socialLinks
    },
    revalidate: 60,
  };
};
  
export default Resume;