import { updateProductQuantity } from "../../services/cartServices.js";
import { ProductModel } from "./models/productModel.js";

export default class ProductDaoMongoDb {
  async getAll(page = 1, limit = 10, title, sort, category) {
    try {
      const filters = title
        ? { title: title }
        : category
        ? { category: category }
        : {};
      const sortOrder = {};
      if (sort)
        sortOrder.price = sort === "asc" ? 1 : sort === "desc" ? -1 : null;
      const response = ProductModel.paginate(filters, {
        page,
        limit,
        sort: sortOrder,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await ProductModel.findById(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await ProductModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await ProductModel.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
    async updateStock(id, stockChange) {
      try {
        const product = await ProductModel.findById(id);
        if (!product) {
          throw new Error(`Product with ID ${id} not found`);
        }
            const newStock = product.stock - stockChange;
        if (newStock < 0) {
          throw new Error(`Insufficient stock for product with ID ${id}`);
        }
            const updatedProduct = await ProductModel.findByIdAndUpdate(
          id,
          { stock: newStock },
          { new: true }
        );    
        return updatedProduct;
      } catch (error) {
        throw new Error(`Failed to update stock: ${error.message}`);
      }
    }
    
  async remove(id) {
    try {
      const response = await ProductModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
}
