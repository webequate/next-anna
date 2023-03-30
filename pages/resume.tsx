// pages/experience.tsx
import { GetStaticProps, NextPage } from 'next';
import { School, Job } from '@/types/experience';
import { connectToDatabase } from '@/lib/mongodb';
import Layout from '@/components/Layout';
  
type ExperienceProps = {
  schools: School[];
  jobs: Job[];
}

const Resume: NextPage<ExperienceProps> = ({ schools, jobs }) => {
  return (
    <Layout>
      <div>
        <h1>Resume</h1>
        {/* Education */}
        <h2>Education</h2>
        {schools.map((school, index) => (
          <div key={index}>
            <h3>{school.school}</h3>
            <p>
              <span>{school.program}</span>
              <span> • </span>
              {school.city}
              <span> • </span>
              {school.endDate}
            </p>
          </div>
        ))}
        {/* Work */}
        <h2>Work Experience</h2>
        {jobs.map((job, index) => (
          <div key={index}>
            <h3>{job.company}</h3>
            <p>
              <span>{job.role}</span>
              <span> • </span>
              <em>{job.city}</em>
              <span> • </span>
              <span>{job.startDate}</span>
              <span> - </span>
              <span>{job.endDate}</span>
              <ul className="list-disc list-outside">
                {job.achievements.map((achievement, index) => (
                  <li key={index}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </p>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ExperienceProps> = async () => {
  const db = await connectToDatabase(process.env.MONGODB_URI!);

  const schoolsCollection = db.collection<School>('schools');
  const schools: School[] = await schoolsCollection.find().sort({ order: 1 }).toArray();

  const jobsCollection = db.collection<Job>('jobs');
  const jobs: Job[] = await jobsCollection.find().sort({ order: -1 }).toArray();

  return {
    props: {
      schools: JSON.parse(JSON.stringify(schools)),
      jobs: JSON.parse(JSON.stringify(jobs))
    },
    revalidate: 60,
  };
};

export default Resume;