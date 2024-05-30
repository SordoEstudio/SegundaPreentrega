import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../Manager/productManager.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/data/products.json`)



router.get("/index",async (req, res) => {
  try{
    const products = await productManager.getProducts()
    res.render("index");
    socketClient.emit('productsUpdate', product);

  }catch(error){
    console.log("Error al obtener productos")
    res.status(500).send("Error al obtener productos")
  }
});

router.get("/realtimeproducts", async (req,res)=>{
res.render("realtimeproducts")
})


export default router;
