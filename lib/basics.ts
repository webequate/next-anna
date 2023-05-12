// lib/basics.ts
import { connectToDatabase } from "./mongodb";

const fetchBasics = async () => {
  try {
    const db = await connectToDatabase();

    const data = await db.collection("basics").findOne({});

    return data;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

export default fetchBasics;
