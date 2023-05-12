// lib/experience.ts
import { connectToDatabase } from "./mongodb";
import { SortDirection } from "mongodb";

type SortOptions = {
  [key: string]: SortDirection;
};

const fetchExperience = async (featured: boolean, limit: number) => {
  try {
    const db = await connectToDatabase();

    // Parse the parameters
    const limitSetting = limit && limit > 0 ? limit : 0;

    // Update the find and sort options based on the parameters
    const findOptions = featured ? { featured: true } : {};
    const sortOptions: SortOptions = featured
      ? { order: "asc" }
      : { order: "asc" };

    const data = await db
      .collection("experience")
      .find(findOptions)
      .sort(sortOptions)
      .limit(limitSetting)
      .toArray();

    return data;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default fetchExperience;
