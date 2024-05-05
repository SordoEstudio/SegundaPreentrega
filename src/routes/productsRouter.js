
import { __dirname } from "../path.js";
import { Router} from "express"
import ProductManager from "../Manager/productManager.js";

const productManager = new ProductManager(`${__dirname}/data/products.json`);
const router = Router()

router.get("/", async (req, res) => {
    try {
      const products = await productManager.getProducts();
      const {limit} = req.query
      if(limit){
       const productsLimited = products.slice(0,limit)
        return res.status(200).json(productsLimited);
      }else{
        return res.status(200).json(products);
      }
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const product =await productManager.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await productManager.getProductById(id);
      if (!product) res.status(404).json({ msg: "Product not found" });
      else res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
  router.put("/:id",async (req, res) => {
    try {
      const { id } = req.params;
  const productUpdate = await productManager.updateProduct(req.body,id)
  if(!productUpdate)res.status(404).json({msg:'error updating product'})
  res.status(200).json(productUpdate)
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });
  
  router.delete("/:id",async (req, res) => {
    try {
      const {id}=req.params;
      const delProduct = await productManager.deleteProduct(id)
      if(!delProduct)res.status(404).json({msg:'error delete product'})
      else res.status(200).json({msg:`Product id ${id} deleted`})
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

  export default router