import { Router } from "express";
import * as controller from "../controllers/cartControllers.js";

const router = Router();


router.get("/:id", controller.getById);

router.get("/", controller.getAll);

router.post("/", controller.create);

router.post("/:cId/products/:pId", controller.addProductToCart); 

router.put("/:cId/products/:pId", controller.updateProductQuantity);

router.put("/:cId", controller.update);

router.delete("/:id", controller.remove);

router.delete("/clear/:id", controller.clearCart);

router.delete("/:cId/products/:pId", controller.removeProductToCart);

export default router;
