import Pool from "./pool.js";

export async function insertUser(
  username,
  fullname,
  password,
  isAdmin,
  isMember
) {
  await Pool.query(
    `INSERT INTO users (username, fullname, password, is_admin, is_member)
        VALUES ($1, $2, $3, $4, $5)`,
    [username, fullname, password, isAdmin, isMember]
  );
}
