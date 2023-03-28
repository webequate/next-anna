import clientPromise from '../lib/mongodb';
import { GetStaticProps, NextPage } from 'next';
import Layout from '../components/Layout';

interface Education {
  _id: string;
  school: string;
  program: string;
  city: string;
  endDate: string;
}

interface Work {
  _id: string;
  company: string;
  role: string;
  city: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}
  
interface SummarySkill {
  _id: string;
  description: string;
}

interface Skill {
  _id: string;
  skillName: string;
  skillLevel: string;
}
  
interface ResumeProps {
  workData: Work[];
  skillsData: Skill[];
  skillSummaryData: SummarySkill[];
  educationData: Education[];
}

const Resume: NextPage<ResumeProps> = ({ educationData, workData, skillSummaryData, skillsData }) => {
  return (
    <Layout>
      <div>
        <h1>Resume and Skills</h1>
        {/* Education */}
        <h2>Education</h2>
        <ul>
          {educationData.map((education) => (
            <li key={education._id}>
              <h3>{education.school}</h3>
              <p>{education.program}</p>
              <p>{education.city}</p>
              <p>{education.endDate}</p>
            </li>
          ))}
        </ul>
        {/* Work */}
        <h2>Work Experience</h2>
        <ul>
          {workData.map((work) => (
            <li key={work._id}>
              <h3>{work.company}</h3>
              <p>{work.role}</p>
              <p>{work.city}</p>
              <p>{work.startDate}</p>
              <p>{work.endDate}</p>
              <ul>
                {work.achievements.map((achievement, index) => (
                  <li key={index}>
                    {achievement}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        {/* Skills */}
        <h2>Skills</h2>
        <p>
          {skillSummaryData.map((summarySkill, index) => (
            <span key={index}>{summarySkill.description}, </span>
          ))}
        </p>
        <ul>
          {skillsData.map((skill) => (
            <li key={skill._id}>
              <p>{skill.skillName}</p>
              <p>{skill.skillLevel}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<ResumeProps> = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");
  
    const educationData = await db
      .collection("Education")
      .find({})
      .toArray();
  
    const workData = await db
      .collection("Work")
      .find({})
      .sort({ id: -1 })
      .toArray();

    const skillSummaryData = await db
      .collection("SkillSummary")
      .find({})
      .toArray();

    const skillsData = await db
      .collection("Skills")
      .find({})
      .toArray();

    return {
      props: {
        educationData: JSON.parse(JSON.stringify(educationData)),
        workData: JSON.parse(JSON.stringify(workData)),
        skillSummaryData: JSON.parse(JSON.stringify(skillSummaryData)),
        skillsData: JSON.parse(JSON.stringify(skillsData))
      },
    };
  } catch (e) {
     console.error(e);
  }
}

export default Resume;