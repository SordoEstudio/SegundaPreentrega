import { Router } from "express";
import {
  logout,
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
      failureRedirect: "/error",
      successRedirect: "/",
      passReqToCallback: true,
    }
  )
);

router.post(
  "/loginlocal",
  passport.authenticate("login", {
    failureRedirect: "/error",
    successRedirect: "/products",
    passReqToCallback: true,
  })
);

router.get(
  "/profilegithub",
  passport.authenticate("github", {
    failureRedirect: "/error",
    successRedirect: "/products",
    passReqToCallback: true,
  })
);

router.get("/logout", logout);

export default router;
