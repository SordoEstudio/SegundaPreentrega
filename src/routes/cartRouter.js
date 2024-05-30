import { Router } from "express";
import * as controller from '../controllers/cartControllers.js'

const router = Router();

router.get("/", controller.getAll)

router.get("/:id", controller.getById) 

router.post("/file", controller.create)

router.post("/add/:cId/:pId", controller.addProductToCart) 

router.delete("/:id", controller.remove)

export default router;
