import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import * as services from "../services/userServices.js";

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
    try {
        const user = await services.getUserByEmail(email);
        if(user) return done(null, false);
        const newUser = await services.register(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

const login = async (req, email, password, done) => {
    try {
      const userLogin = await services.login( email, password );
      if (!userLogin) {
        req.session.destroy();
        return done(null, false, { msg: "Error de autenticacion" });
      }
      return done(null, userLogin);
    } catch (error) {
      return done(error);
    }
  };

/*  VERSION ANTERIOR
const login = async (req, email, password, done) => {
  const userLogin = await services.login({ email, password });
  if (!userLogin) return done(null, false, { msg: "Error de autenticación" });
  return done(null, userLogin);
}; */

const registerStrategy = new localStrategy(strategyConfig, register);
const loginStrategy = new localStrategy(strategyConfig, login);

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await services.getUserById(id);
  return done(null, user);
});
