 import { Router } from "express";
import * as controller from "../controllers/viewsControllers.js";

const router = Router();

router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/register',(req,res)=>{
    res.render('register')
})

router.get("/products", controller.index);

export default router;
 