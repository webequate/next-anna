import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const fetchSkillsData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const mainData = await db
        .collection("Skills")
        .find({})
        .toArray();

    res.json(mainData);
  } catch (e) {
    console.error(e);
  }
};

export default fetchSkillsData;