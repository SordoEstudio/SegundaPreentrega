import { UserModel } from "./models/userModel.js";

export default class UserDao {
  constructor(model) {
    this.model = model;
  }
  async findByEmail(email) {
    try {
      const currentUser = await UserModel.findOne({ email: email });

      return currentUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async register(user) {
    try {
      const { email } = user;
      const existUser = await UserModel.findOne({ email: email });
      if (!existUser) return await UserModel.create(user);
      else return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(email) {
    try {
      return await this.model.findOne({'email': email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
