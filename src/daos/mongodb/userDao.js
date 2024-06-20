import { UserModel } from "./models/userModel.js";

export default class UserDao {
  constructor(model) {
    this.model = model;
  }
  async getUserByEmail(email) {
    try {
      const currentUser = await this.model.findOne( {email} );
      return currentUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getUserById(id) {
    try {
      const currentUser = await this.model.findById( id );
      return currentUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async register(user) {
    try {
      return await this.model.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }
  async login(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }
}
