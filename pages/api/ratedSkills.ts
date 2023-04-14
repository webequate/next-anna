import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

const fetchRatedSklls = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const data = await db
      .collection("ratedSkills")
      .find({})
      .sort({ order: 1 })
      .toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

export default fetchRatedSklls;
