// pages/api/press.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

const fetchPress = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Anna");

    const data = await db
      .collection("press")
      .find({})
      .sort({ order: 1 })
      .toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

export default fetchPress;
