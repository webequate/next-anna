// pages/api/experience.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

const fetchExperience = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Anna");

    const data = await db.collection("experience").find({}).toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

export default fetchExperience;
