import * as service from "../services/cartServices.js";

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
    return res.status(200).json(carts);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);

    if (!cart) {
      throw { status: 404, message: "Cart not found" };
    } else {
      return res.status(200).json(cart);
    }
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const newCart = await service.create(req.body);

    if (!newCart) {
      throw { status: 404, message: "not creating cart" };
    } else {
      return res.status(200).json(`${newCart} : cart created Ok`);
    }
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { cId } = req.params;
    const { pId } = req.params;
    const response = await service.addProductToCard(cId, pId);

    if (!response) {
      throw { status: 404, message: "Error to update cart" };
    } else {
      return res.status(200).json(response);
    }
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cartDel = await service.remove(id);
    if (!cartDel) {
      throw { status: 404, message: "Error remove cart" };
    } else {
      return res.status(200).json(cartDel);
    }
  } catch (error) {
    next(error);
  }
};
