import dotenv from "dotenv";
import path from "path";
import { Pool } from "pg";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
export default new Pool({
  // Use the single connection string from your hosting provider
  connectionString: process.env.DATABASE_URL,
  // Add this SSL configuration for production databases like Neon
  ssl: {
    rejectUnauthorized: false,
  },
});
