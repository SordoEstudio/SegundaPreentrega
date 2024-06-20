import { UserModel } from "../daos/mongodb/models/userModel.js";
import UserDao from "../daos/mongodb/userDao.js";
import { createHash, isValidPassword } from "../utils.js";
import "dotenv/config";

const userDao = new UserDao(UserModel);

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

export const register = async (user) => {
  try {
    const { email, password } = user;
    const existUser = await getUserByEmail(email);
    if (!existUser) {
      if (email === "adminCoder@coder.com" && password === "admin") {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
          role: "admin",
        });
        return newUser;
      } else {
        const newUser = await userDao.register({
          ...user,
          password: createHash(password),
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
