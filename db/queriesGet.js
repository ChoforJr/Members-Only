import Pool from "./pool.js";

export async function getAllGamesInfo() {
  const { rows } = await Pool.query(
    `SELECT games.id AS id, games.game AS game, games.res_year AS year, 
    developers.dev AS dev, genres.genre AS genre, games.sales_in_millions AS sales 
    FROM games JOIN developers ON games.main_dev=developers.id JOIN genres ON games.main_genre=genres.id;`
  );
  return rows;
}

export async function getDevList() {
  const { rows } = await Pool.query(
    "SELECT developers.id AS id, developers.dev AS dev FROM  developers;"
  );
  return rows;
}

export async function getGenreList() {
  const { rows } = await Pool.query(
    "SELECT genres.id AS id, genres.genre AS genre FROM  genres;"
  );
  return rows;
}
