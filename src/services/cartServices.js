//----------------------| Dao de File System |----------------------//
import { __dirname } from "../path.js";
import CartDaoFs from "../daos/filesystem/cartDao.js";
import ProductDaoFs from "../daos/filesystem/productDao.js";
const cartDaoFs = new CartDaoFs(`${__dirname}/data/carts.json`);
const prodDaoFs = new ProductDaoFs(`${__dirname}/data/products.json`);
//-------------------------| Dao de Mongo |-------------------------//
import CartDaoMongoDb from "../daos/mongodb/cartDao.js";
import ProductDaoMongoDb from "../daos/mongodb/productDao.js";
const cartDaoMongo = new CartDaoMongoDb();
const prodDaoMongo = new ProductDaoMongoDb();
//------------------------------------------------------------------//
import "dotenv/config";

let prodDao;
let cartDao;

if (process.env.PERSISTENCE === "MONGO") {
  prodDao = prodDaoMongo;
  cartDao = cartDaoMongo;
} else {
  prodDao = prodDaoFs;
  cartDao = cartDaoFs;
}

export const addProductToCard = async (cId, pId) => {
  try {
    const existCart = await getById(cId);
    const existProd = await prodDao.getById(pId);
    if (!existCart || !existProd) return null;
    const existProdCart = await cartDao.existProdInCart(cId, pId);
    if (existProdCart) {
      const quantity =
        existProdCart.products.find((p) => p.product.toString() === pId)
          .quantity + 1;
      return await cartDao.addProductToCard(cId, pId, quantity);
    }
    return await cartDao.addProductToCard(cId, pId);
  } catch (error) {
    throw new Error(error);
  }
};

export const getAll = async () => {
  try {
    return await cartDao.getAll();
  } catch (error) {
    throw new Error(error);
  }
};

export const getById = async (id) => {
  try {
    return await cartDao.getById(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const create = async (obj) => {
  try {
    return await cartDao.create(obj);
  } catch (error) {
    throw new Error(error);
  }
};

export const update = async (cId, prodObj) => {
  try {
    const cartUpd =  await cartDao.update(cId, prodObj);
    if(!cartUpd) return false
    else return cartUpd
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductQuantity = async (cId, pId, quantity) => {
  try {
    const existCart = await getById(cId);
    const existProd = existCart.products.find(
      (p) => p.product._id.toString() === pId
    );
    if (!existCart || !existProd) return null;
    return await cartDao.updateProductQuantity(cId, pId, quantity);
  } catch (error) {
    throw new Error(error);
  }
};

export const remove = async (id) => {
  try {
    return await cartDao.remove(id);
  } catch (error) {
    throw new Error(error);
  }
};

export const removeProductToCart = async (cId, pId) => {
  try {
    const existCart = await getById(cId);
    const existProd = existCart.products.find(
      (p) => p.product._id.toString() === pId
    );
    if (!existCart || !existProd) return null;
    return await cartDao.removeProductToCart(cId, pId);
  } catch (error) {
    throw new Error(error);
  }
};

export const clearCart = async (cId) => {
  try {
    const existCart = await getById(cId);
    if (!existCart) return null;
    return cartDao.clearCart(cId);
  } catch (error) {
    throw new Error(error);
  }
};
