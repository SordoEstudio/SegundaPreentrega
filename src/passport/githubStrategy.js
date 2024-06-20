import * as services from "../services/userServices.js";
import { Strategy as GithubStrategy } from "passport-github2";
import passport from 'passport';

import "dotenv/config";

const strategyConfig = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    //console.log(profile);
    const email = profile._json.email ?? ''
    const image = profile._json.avatar_url ?? ''
    const first_name = profile.displayName.split(' ')[0]
    const last_name = profile.displayName.split(' ')[1]
    const user = await services.getUserByEmail(email)
    if(user)return done(null,user)
      const newUser = await services.register({
        first_name,
        last_name,
        email,
        password: ' ',
        isGithub: true
      })
      return done(null, newUser)
  } catch (error) {
    return done(error);
  }
};


passport.use('github', new GithubStrategy(strategyConfig,registerOrLogin));

passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await services.getUserById(id);
      return done(null, user);
    } catch (error) {
      done(error)
    }
  });