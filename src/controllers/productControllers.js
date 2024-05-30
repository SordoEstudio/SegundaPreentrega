import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) => {
  try {
    const products = await service.getAll();
      return res.status(200).json(products);
  } catch (error) {
    next(error.message);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id);

    if (!prod) {
      return res.status(404).json({ msg: "product not found" });
    } else {
      return res.status(200).json(prod);
    }
  } catch (error) {
    next(error.message);
  }
};

export const create = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);

    if (!newProd) {
      return res.status(404).json({ msg: "Error creating product" });
    } else {
      return res.status(200).json(newProd);
    }
  } catch (error) {
    next(error.message);
  }
};

export const update = async (req, res, next)=>{
  try {
    const {id}=req.params
    const prodUpdate = await service.update(id, req.body)
    if(!prodUpdate){
      return res.status(404).json({msg:'Error update product'})
    }else{
      return res.status(200).json(prodUpdate);
    }
  } catch (error) {
    next(error.message)
  }
}

export const remove = async(req, res, next)=>{
  try {
    const {id}=req.params
    const prodDelete = await service.remove(id)
    if(!prodDelete){res.status(404).json({msg:'Error remove product'})}else{
      return res.status(200).json(prodDel);

    }
  } catch (error) {
    next(error.message)
  }
}
