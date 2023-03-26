import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const fetchEducationData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const educationData = await db
        .collection("Education")
        .find({})
        .toArray();

    res.json(educationData);
  } catch (e) {
    console.error(e);
  }
};

export default fetchEducationData;