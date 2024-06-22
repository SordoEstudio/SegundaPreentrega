import { Router } from "express";
import {
  loginResponse,
  logout,
  infoSession,
  registerResponse,
  githubResponse,
} from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { isAuth } from "../middlewares/isAuth.js";
import passport from "passport";

const router = Router();

/* router.post("/login", passport.authenticate("login"), loginResponse); */

router.post(
  "/register",
  passport.authenticate(
    "register",

    {
      failureRedirect: "/",
      successRedirect: "/",
      passReqToCallback: true,
    }
  )
);

router.post(
  "/loginlocal",
  passport.authenticate("login", {
    failureRedirect: "/",
    successRedirect: "/products",
    passReqToCallback: true,
  })
);

router.get(
  "/profile",
  passport.authenticate("github", {
    failureRedirect: "/",
    successRedirect: "/products",
    passReqToCallback: true,
  })
);

router.get("/info", validateLogin, infoSession);
router.get("/logout", logout);

export default router;
