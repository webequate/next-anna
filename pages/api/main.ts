import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

const fetchMainData = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const mainData = await db
        .collection("Main")
        .find({})
        .limit(1)
        .toArray();

    res.json(mainData);
  } catch (e) {
    console.error(e);
  }
};

export default fetchMainData;