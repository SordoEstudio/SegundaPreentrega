import { createHash, isValidPassword } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import config from '../config/index.js'

import { userDao, prodDao, cartDao } from "../daos/factory.js";
import UserRepository from "../repository/user.repository.js";
import { sendMail } from "./mailing.services.js";
const userRepository = new UserRepository();

export const generateToken = (user, time = "5m") => {
  const payload = {
    userId: user._id,
  };
  return jwt.sign(payload, config.SECRET_KEY_JWT, { expiresIn: time });
};
export const getUserByEmail = async (email) => {
  try {
    const response = await userDao.getUserByEmail(email);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await userDao.getUserById(id);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export const userById = async (id) => {
  try {
    const response = await userRepository.getUserById(id);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      const cartUser = await cartDao.create();
      if (email === "adminCoder@coder.com" && password === "admin") {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          role: "admin",
          cart: cartUser._id,
        });
        await sendMail(user,'register')
        return newUser;
      } else {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          cart: cartUser._id,
        });
        await sendMail(user,'register')
        return newUser;
      }
    } else return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (email, password) => {
  try {
    const userExist = await userDao.getUserByEmail(email);
    if (!userExist) return null;
    const isValid = isValidPassword(password, userExist);
    if (!isValid) return null;
    return userExist;
  } catch (error) {
    throw new Error(error);
  }
};
export const loginJWT = async (user) => {
  try {
    const { email, password } = user;
    const userExist = await userDao.getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    if (userExist && passValid) return generateToken(userExist) 
  } catch (error) {
    throw new Error(error);
  }
};

export const sendMailReset = async (user) => {
  try {
return generateToken(user, '1h')
  } catch (error) {
    throw new Error(error);
  }
};

export const updatePass =  async (pass, user)=>{
  try {
   const isEqual= isValidPassword(pass, user)
if(isEqual) return null
const newPass = createHash(pass)
return await userDao.update(user._id, {password:newPass})
  } catch (error) {
    
  }
}
// DESDE 01:19:47

// https://coderhouse.zoom.us/rec/play/tIFyyUvb4cAa67swXdd0-uXX13eODPaUtyomcbWJhP1Gf1WtJ0b4IsCRElmfNDcZCxmzr9cA8ltOPzHQ.pATsiFQqJo5aDep0?canPlayFromShare=true&from=share_recording_detail&continueMode=true&componentName=rec-play&originRequestUrl=https%3A%2F%2Fcoderhouse.zoom.us%2Frec%2Fshare%2FaSgDb3WukywS9ksJ1wLOX7f7e-dLJMivW6rsPUxhtug3GUuTU_JrqJWP_wN6q0ok.LbJ2NXjF3hVBLLJn