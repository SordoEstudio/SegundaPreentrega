 import { Router } from "express";
import * as controller from "../controllers/viewsControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = Router();

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>{
    res.render('register')
})

router.get("/products", controller.index);


router.get("/profilegithub", isAuth, async(req,res)=>{
    const user = req.user.toObject()
    res.render('/views/products',{user})
})
export default router;
 