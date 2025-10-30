#! /usr/bin/env node

import { Client } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const SQL = `
CREATE TABLE IF NOT EXISTS developers (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  dev VARCHAR ( 255 ),
  found_year INTEGER
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR ( 255 )
);

CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  game VARCHAR ( 255 ),
  res_year INTEGER,
  main_dev INTEGER REFERENCES developers (id) ON DELETE CASCADE,
  main_genre INTEGER REFERENCES genres (id) ON DELETE CASCADE,
  sales_in_millions INTEGER
);

CREATE TABLE IF NOT EXISTS games_devs (
  game_id INTEGER REFERENCES games (id) ON DELETE CASCADE,
  dev_id INTEGER REFERENCES developers (id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, dev_id)
);

CREATE TABLE IF NOT EXISTS games_genres (
  game_id INTEGER REFERENCES games (id) ON DELETE CASCADE,
  genre_id INTEGER REFERENCES genres (id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, genre_id)
);

BEGIN;

INSERT INTO developers (dev, found_year) 
VALUES
  ('Capcom', 1985),
  ('Nintendo', 1986),
  ('Insomiac', 2010);

INSERT INTO genres (genre) 
VALUES
  ('Adventure'),
  ('Action'),
  ('Horror');

INSERT INTO games (game, res_year, main_dev, main_genre, sales_in_millions) 
VALUES
  ('Resident Evil 4 Remake', 2022, 1, 3, 1300),
  ('Resident Evil 2 Remake', 2021, 1, 3, 1300),
  ('Mario Cart 2', 2025, 2, 1, 400),
  ('Spider Man PS4', 2018, 3, 2, 1300);

INSERT INTO games_devs (game_id, dev_id) 
VALUES (1, 1), (2, 1), (3, 2), (4, 3);

INSERT INTO games_genres (game_id, genre_id) 
VALUES (1, 3), (1, 2), (1, 1), (2, 3), (2, 2), (2, 1), (3, 1), (4, 1), (4, 2);

COMMIT;
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
