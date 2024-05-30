import * as service from "../services/cartServices.js";

export const getAll = async (req, res, next) => {
  try {
    const carts = await service.getAll();
      return res.status(200).json(carts);
    
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);

    if (!cart) {
      return res.status(404).json({ msg: "cart not found" });
    } else {
      return res.status(200).json(cart);
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newCart = await service.create(req.body);

    if (!newCart) {
      return res.status(404).json({ msg: "not creating cart" });
    } else {
      return res.status(200).json(`${newCart} : cart created Ok`);
    }
  } catch (error) {
    next(error.message);
  }
};

export const addProductToCart = async (req, res, next)=>{
  try {
    const {cId}=req.params
    const {pId}=req.params
    const response = await service.addProductToCard(cId,pId)

    if(!response){
      return res.status(404).json({msg:'Error to update cart'})
    }else{
      return res.status(200).json(response);
    }
  } catch (error) {
    next(error.message)
  }
}

export const remove = async(req, res, next)=>{
  try {
    const {id}=req.params
    const cartDel = await service.remove(id)
    if(!cartDel){res.status(404).json({msg:'Error remove cart'})}else{
      return res.status(200).json(cartDel);
    }
  } catch (error) {
    next(error.message)
  }
}
