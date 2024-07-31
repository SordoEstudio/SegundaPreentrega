import { UserModel } from "./models/userModel.js";

export default class UserDao {

  async getUserByEmail(email) {
    try {
      const currentUser = await UserModel.findOne( {email} );
      return currentUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserById(id) {
    try {
      const currentUser = await UserModel.findById( id ).populate("cart");
      return currentUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async register(user) {
    try {
      return await UserModel.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
