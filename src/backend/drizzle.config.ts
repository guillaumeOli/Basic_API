import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"
 
export default defineConfig({
  schema: "./db/schemas/*",
  out: "./drizzle",
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  }
});
