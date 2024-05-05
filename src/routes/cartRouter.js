import { __dirname } from "../path.js";
import { Router } from "express";
import CartManager from "../Manager/cartManager.js";

const cartManager = new CartManager(`${__dirname}/data/carts.json`);
const router = Router();

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    if (!cart) res.status(404).json({ msg: "Cart is empty" });
    else res.status(200).json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const response = await cartManager.createCart();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    const response = await cartManager.addProductToCart(cid, pid);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

export default router;
