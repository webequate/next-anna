import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const fetchProjectsData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const mainData = await db
        .collection("Projects")
        .find({})
        .toArray();

    res.json(mainData);
  } catch (e) {
    console.error(e);
  }
};

export default fetchProjectsData;