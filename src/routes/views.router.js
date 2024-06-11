 import { Router } from "express";
import * as controller from "../controllers/viewsControllers.js";

const router = Router();

router.get("/products", controller.index);

export default router;
 