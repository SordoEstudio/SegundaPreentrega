import { Router } from "express";
import {
  loginResponse,
  logout,
  infoSession,
  registerResponse,
} from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { isAuth } from "../middlewares/isAuth.js";
import passport from "passport";

const router = Router();

router.post("/login", passport.authenticate("login"), loginResponse);

router.post("/register", passport.authenticate("register"), registerResponse);

router.get(
  "/registergithub",
  passport.authenticate("github", {
    failureRedirect: "/login",
    successRedirect: "/api/users/profileGithub",
  }),
  (req, res) => res.send("ok")
);

router.get("/profile", isAuth, (req,res)=>{
    const user = req.user.toObject()
    res.render('/views/profilegithub',{user})})

router.get("/info", validateLogin, infoSession);
router.get("/logout", logout);

export default router;
