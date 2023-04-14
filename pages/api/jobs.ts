// pages/work.tsx
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

const fetchJobs = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Portfolio");

    const data = await db
      .collection("jobs")
      .find({})
      .sort({ order: -1 })
      .toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

export default fetchJobs;
