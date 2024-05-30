import { __dirname } from "../../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductDaoFs from "./productDao.js";

const path = `${__dirname}/data/carts.json`;

export default class CartManager {
  constructor(path) {
    this.path = path;
    this.code = "utf8";
  }
  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, this.code);
        return JSON.parse(carts);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async create() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const cartsFile = await this.getAll();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const carts = await this.getAll();
      const cartExist = carts.find((c) => c.id === id);
      if (!cartExist) return null;
      return cartExist;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCard(cId, pId) {
    try {
      const prodExist = await ProductDaoFs.getById(pId);
      if (!prodExist) return console.log("Product not exist");
      const cartExist = await this.getById(cId);
      if (!cartExist) return console.log("Cart not exist");
      let cartFile = await this.getAll();
      const prodExistInCart = cartExist.products.find((p) => p.id === pId);
      if (!prodExistInCart) {
        const product = {
          id: pId,
          quantity: 1,
        };
        cartExist.products.push(product);
      } else prodExistInCart.quantity++;
      const updatedCarts = cartFile.map((c) => {
        if (c.id === cId) return cartExist;
        return c;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
      return cartExist;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id) {
    const carts = await this.getAll();
    if (carts.length > 0) {
      const cartExist = await this.getById(id);
      if (cartExist) {
        const newCart = carts.filter((p) => p.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(newCart));
        return cartExist;
      }
    } else return null;
  }
}
