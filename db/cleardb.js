#! /usr/bin/env node

import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const SQL = `
DROP TABLE IF EXISTS games_devs;

DROP TABLE IF EXISTS games_genres ;

DROP TABLE IF EXISTS games;

DROP TABLE IF EXISTS developers ;

DROP TABLE IF EXISTS genres;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.argv[2] || process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
