import { insertUser } from "../db/queriesPost.js";
import { matchedData } from "express-validator";
import { hash } from "bcryptjs";

export async function addNewUser(req, res, next) {
  try {
    const { fullname, username, password, isAdmin = false } = matchedData(req);
    const hashedPassword = await hash(password, 10);
    let isMember = false;
    if (isAdmin) {
      isMember = true;
    }
    await insertUser(username, fullname, hashedPassword, isAdmin, isMember);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
}
