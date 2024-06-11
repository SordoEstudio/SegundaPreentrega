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

export const update = async(req,res,next)=>{
  try {
    const {cId}= req.params

    const cartUpd = await service.update(cId,req.body)
    if(!cartUpd){
      throw{status:404, message:'Error to update cart'}
    }else{
      res.status(200).json(cartUpd)
    }
  } catch (error) {
    next(error.message)
  }
}

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { cId } = req.params;
    const { pId } = req.params;
    const {quantity} = req.body
    const updateProdQuantity = await service.updateProductQuantity(cId,pId,quantity)
    if(!updateProdQuantity){
      throw { status: 404, message: "Error update quantity product to cart" };
  } else {
    return res.status(200).json(updateProdQuantity);
  }
    }catch(error){
      next(error.message);
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
}
  export const removeProductToCart = async (req, res, next) => {
    try {
      const { cId } = req.params;
      const { pId } = req.params;
      const removeProdToCart = await service.removeProductToCart(cId,pId)
      if(!removeProdToCart){
         throw {status: 404, message :"Error remove product to Cart"}
        }else{
          res.json({status:200,message:`Product ${pId} removed to cart ${cId}`})
        }
      }catch(error){
        next(error.message);
      }
  };

  export const clearCart = async(req,res,next)=>{
    try {
      const {cId} = rec.params
      const removeCart = await service.clearCart(cId)
      if(!removeCart) {
        throw {status: 404, message: 'error to clear cart'}
      }else{
        res.json(clearCart)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

