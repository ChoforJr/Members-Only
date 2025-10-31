import { insertUser } from "../db/queriesPost";
import { matchedData } from "express-validator";
import { hash } from "bcryptjs";

export async function addNewUser(req, res) {
  try {
    const { fullname, username, password, isAdmin } = matchedData(req);
    const hashedPassword = await hash(password, 10);
    await insertUser(username, fullname, hashedPassword, isAdmin);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}
