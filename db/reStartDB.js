#! /usr/bin/env node

import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const SQL = `
DELETE FROM users;

DELETE FROM messages;
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
