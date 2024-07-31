
import { createHash, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { userDao, prodDao, cartDao } from '../daos/factory.js'
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository();

export const generateToken = (user, time = "5m") =>{
  const payload = {
    userId: user._id,
  };
  return jwt.sign(payload, process.env.SECRET_KEY_JWT, { expiresIn: time });
}
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
          cart: cartUser._id
        });
        return newUser;
      } else {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          cart: cartUser._id
        });
        return newUser;
      }
    } else return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (email,password) => {
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
export const loginJWT = async (user)=> {
  try {
    const { email, password } = user;
    const userExist = await userDao.getUserByEmail(email);
    if (!userExist) return null;
    const passValid = isValidPassword(password, userExist);
    if (!passValid) return null;
    if (userExist && passValid) return generateToken(userExist);
  } catch (error) {
    throw new Error(error);
  }
}