import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); //Load environment variables

const { Pool } = pkg;

//Create a connection ppol to PostgreSQL
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Only enable SSL if DATABASE_URL indicates it
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false // needed for cloud DBs
});