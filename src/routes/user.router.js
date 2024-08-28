import { Router } from "express";
import {
  logout,login,
  profile, sendMailReset,
  updatePass
} from "../controllers/userController.js";
import { validateLogin } from "../middlewares/validateLogin.js";
import { isAuth } from "../middlewares/isAuth.js";
import passport from "passport";
import { checkAuth } from "../middlewares/authJwt.js";

const router = Router();

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

router.post('/login', login);
router.post('/profile', [checkAuth] ,profile);

router.post('/reset-pass',[checkAuth] , sendMailReset)

router.put('/new-pass',[checkAuth] , updatePass)

export default router;
