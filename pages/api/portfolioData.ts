import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '../../lib/mongodb';
import { Db } from 'mongodb';

const fetchCollectionData = async (db: Db, collectionName: string) => {
  try {
    const data = await db.collection(collectionName).find().toArray();
    console.log(data);
    return JSON.stringify(data);
  } catch (error) {
    console.error(`Error fetching data from ${collectionName}`, error);
    return null;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { db } = await connectToDB();

      const projectsData = await fetchCollectionData(db, 'Projects');
      console.log("projectsData");
      console.log(projectsData);
      const workData = await fetchCollectionData(db, 'Work');
      console.log(workData);
      const skillsData = await fetchCollectionData(db, 'Skills');
      const skillSummaryData = await fetchCollectionData(db, 'SkillSummary');
      const testimonialData = await fetchCollectionData(db, 'Testimonial');
      const educationData = await fetchCollectionData(db, 'Education');
      const mainData = await fetchCollectionData(db, 'Main');

      const portfolioData = {
        projects: projectsData,
        work: workData,
        skills: skillsData,
        skillSummary: skillSummaryData,
        testimonial: testimonialData,
        education: educationData,  
        main: mainData,
      };
      console.log(portfolioData);

      res.status(200).json(JSON.stringify(portfolioData));
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
