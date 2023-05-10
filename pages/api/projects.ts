// pages/api/projects.ts
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { SortDirection } from "mongodb";

type SortOptions = {
  [key: string]: SortDirection;
};

const fetchProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("Anna");

    // Parse the query parameters
    const featured = req.query.featured === "true" ? true : false;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 0;

    // Update the find and sort options based on the query parameters
    const findOptions = featured ? { featured: true } : { featured: false };
    const sortOptions: SortOptions = featured ? { order: 1 } : { order: 1 };

    const data = await db
      .collection("projects")
      .find(findOptions)
      .sort(sortOptions)
      .limit(limit)
      .toArray();

    res.json(data);
  } catch (e) {
    console.error(e);
  }
};

export default fetchProjects;
