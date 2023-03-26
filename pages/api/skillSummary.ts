import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const fetchSkillSummaryData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const mainData = await db
        .collection("SkillSummary")
        .find({})
        .toArray();

    res.json(mainData);
  } catch (e) {
    console.error(e);
  }
};

export default fetchSkillSummaryData;