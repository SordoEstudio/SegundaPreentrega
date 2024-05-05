import { __dirname } from "../path.js";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import ProductManager from "./productManager.js";

const productManager = new ProductManager(`${__dirname}/data/products.json`);
export default class CartManager {
  constructor(path) {
    this.path = path;
    this.code = "utf8";
  }
  async getAllCarts() {
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

  async createCart() {
    try {
      const cart = {
        id: uuidv4(),
        products: [],
      };
      const cartsFile = await this.getAllCarts();
      cartsFile.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getAllCarts();
      const cartExist = carts.find((c) => c.id === id);
      if (!cartExist) return null;
      return cartExist;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const prodExist = await productManager.getProductById(pid);
      if (!prodExist) return console.log("Product not exist");
      const cartExist = await this.getCartById(cid);
      if (!cartExist) return console.log("Cart not exist");
      let cartFile = await this.getAllCarts();
      const prodExistInCart = cartExist.products.find((p) => p.id === pid);
      if (!prodExistInCart) {
        const product = {
          id: pid,
          quantity: 1,
        };
        cartExist.products.push(product);
      } else prodExistInCart.quantity++;
      const updatedCarts = cartFile.map((c) => {
        if (c.id === cid) return cartExist;
        return c;
      });
      await fs.promises.writeFile(this.path,JSON.stringify(updatedCarts))
      return cartExist
    } catch (error) {
      console.log(error);
    }
  }
}
