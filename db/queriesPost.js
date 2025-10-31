import Pool from "./pool.js";

export async function insertUser(username, fullname, password, isAdmin) {
  await Pool.query(
    `INSERT INTO users (username, fullname, password, is_admin)
        VALUES ($1, $2, $3, $4)`,
    [username, fullname, password, isAdmin]
  );
}
