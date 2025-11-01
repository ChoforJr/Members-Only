import { removeMessage } from "../db/queriesDelete.js";

export async function delMessage(req, res) {
  await removeMessage(req.params.id);
  res.redirect("/");
}
