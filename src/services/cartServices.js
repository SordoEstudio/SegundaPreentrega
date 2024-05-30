//----------------------| Dao de File System |----------------------//
//import {__dirname } from "../path"
//import CartDaoFs from "../daos/filesystem/cartDao.js"
//import ProductDaoFs from "../daos/filesystem/productDao.js"
//const cartDao = new CartDaoFs(`${__dirname}/data/carts.json`)
//const productDao = new ProductDaoFs(`${__dirname}/data/products.json`)
//------------------------------------------------------------------//
//-------------------------| Dao de Mongo |-------------------------//
import CartDaoMongoDb from "../daos/mongodb/cartDao.js";
import ProductDaoMongoDb from "../daos/mongodb/productDao.js";
const CartDao = new CartDaoMongoDb();
const ProductDao = new ProductDaoMongoDb();

//------------------------------------------------------------------//

export const addProductToCard = async (cId, pId) => {
  try {
    const prodExist = ProductDao.getById(cId);
    if (!prodExist) {
      return null;
    } else {
      return await CartDao.addProductToCard(cId, pId);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getAll = async()=>{
    try {
        return await CartDao.getAll()
    } catch (error) {
        throw new Error(error)
    }
}

export const getById = async(id)=>{
    try {
        return await CartDao.getById(id)
    } catch (error) {
        throw new Error(error)

    }
}

export const create = async(obj)=>{
    try {
        return await CartDao.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}

export const remove = async(id)=>{
    try {
        return await CartDao.remove(id)
    } catch (error) {
        throw new Error(error)
    }
}