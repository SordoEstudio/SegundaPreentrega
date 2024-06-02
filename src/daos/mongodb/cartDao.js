import { CartModel } from "./models/cartModel.js";

export default class ProductDaoMongoDb {
  async getAll() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await CartModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCard(cId, pId) {
    try {
      return await CartModel.findByIdAndUpdate(
        cId,
        { $push: { products: pId } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
