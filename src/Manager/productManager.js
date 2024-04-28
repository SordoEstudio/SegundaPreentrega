import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.code = "utf8";
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, this.code);
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(obj) {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getProducts();
      const productExist = products.some((p) => p.name == product.name);
      if (productExist) {return "Product already exist";}
     else{ products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;}
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct(obj, id) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        return "Product not found";
      }
      products[productIndex] = {
        ...products[productIndex],
        ...obj,
      };
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return obj;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct(id) {
    const products = await this.getProducts();
    if (products.length > 0) {
      const productExist = await this.getProductById(id);
      if (productExist) {
        const newProducts = products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
        return productExist
      } 
    } else return null
  }
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productExist = products.find((p) => p.id === id);
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }
}
