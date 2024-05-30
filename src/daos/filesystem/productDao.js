import { __dirname } from "../../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const path = `${__dirname}/data/products.json`

export default class ProductDaoFs {
  constructor(path) {
    this.path = path;
    this.code = "utf8";
  }
  async getAll() {
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

  async create(obj) {
    try {
        const { title, description, price, code, stock, category } = obj;
        if (!title || !description || !price || !stock|| !category || !code) {
          console.log("Todos los campos son olbigatorios");
          return;
        }
       const product = {
        id: uuidv4(),
        status:true,
        ...obj,
      };
      const products = await this.getAll();
      const codeExist = products.some((p) => p.code == product.code);
      if (codeExist) {
          console.log("Product code already exist")
          return 
        }
     else{ products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;}
    } catch (error) {
      console.log(error);
    }
  }
  async update(obj, id) {
    try {
      const products = await this.getAll();
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
  async remove(id) {
    const products = await this.getAll();
    if (products.length > 0) {
      const productExist = await this.getById(id);
      if (productExist) {
        const newProducts = products.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
        return productExist
      } 
    } else return null
  }
  async getById(id) {
    try {
      const products = await this.getAll();
      const productExist = products.find((p) => p.id === parseInt(id));
      if (!productExist) return null;
      return productExist;
    } catch (error) {
      console.log(error);
    }
  }
}
