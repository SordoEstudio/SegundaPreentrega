import { Router } from "express";
import fs from "fs";

const router = Router();
const path = "./src/users.json";

router.post("/", async (req, res) => {
  let users = [];
  if (fs.existsSync(path)) {
    let usersJSON = await fs.promises.readFile(path, "utf-8");
    users = JSON.parse(usersJSON);
  }
  users.push(req.body);
  await fs.promises.writeFile(path, JSON.stringify(users));
  res.redirect("/users")
});

export default router