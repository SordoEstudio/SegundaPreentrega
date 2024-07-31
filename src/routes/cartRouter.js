import { Router } from "express";
import * as controller from "../controllers/cartControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import  {purchase} from '../controllers/ticketController.js'
const router = Router();


router.get("/:id",[checkAuth], controller.getById);

router.get("/",[checkAuth, checkAdmin], controller.getAll);

router.post("/",[checkAuth,checkAdmin], controller.create);

router.post("/purchase",[checkAuth], purchase);

router.post("/products/:pId",[checkAuth], controller.addProductToCart); 

router.put("/:cId/products/:pId",[checkAuth], controller.updateProductQuantity);

router.put("/:cId",[checkAuth,checkAdmin], controller.update);

router.delete("/:id",[checkAuth,checkAdmin], controller.remove);

router.delete("/clear/:id", [checkAuth],controller.clearCart);

router.delete("/:cId/products/:pId",[checkAuth], controller.removeProductToCart);

export default router;
