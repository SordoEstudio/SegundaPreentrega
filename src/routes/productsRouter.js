import { Router } from "express";
import * as controller from "../controllers/productControllers.js";
//import { isAuth } from "../middlewares/isAuth.js";
import { checkAdmin } from "../middlewares/checkAdmin.js";
import { checkAuth } from "../middlewares/authJwt.js";

const router = Router();

router.get("/",checkAuth, controller.getAll);

router.get("/:id",checkAuth, controller.getById);

router.post("/",[checkAuth,checkAdmin], controller.create);

router.put("/:id",[checkAuth,checkAdmin], controller.update);

router.delete("/:id",[checkAuth,checkAdmin], controller.remove);

router.post('/mockingproducts', controller.createProducts)
router.get('/mockingproducts', controller.getProducts)

export default router;
