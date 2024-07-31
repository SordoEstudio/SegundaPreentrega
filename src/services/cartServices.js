
import { userDao, prodDao, cartDao } from '../daos/factory.js'

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
