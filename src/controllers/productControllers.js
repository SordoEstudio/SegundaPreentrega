import * as service from "../services/productServices.js";

export const getAll = async (req, res, next) => {
  try {
    const { page, limit, title, sort, category } = req.query;
    const response = await service.getAll(page, limit, title, sort, category);
    const nextLink = response.nextPage
      ? `http://localhost:8080/products/?page=${response.nextPage}`
      : null;
    const prevLink = response.prevPage
      ? `http://localhost:8080/products/?page=${response.prevPage}`
      : null;
    res.json({
      payload: response.docs,
      info: {
        totalPages: response.totalPages,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page: response.page,
        prevLink: prevLink,
        nextLink: nextLink,
        hasPrevPage: response.hasPrevPage,
        hasNextPage: response.hasNextPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prod = await service.getById(id);

    if (!prod) {
      throw { status: 404, message: "Product not found" };
    } else {
      return res.status(200).json(prod);
    }
  } catch (error) {
    next(error);
  }
}; */

export const create = async (req, res, next) => {
  try {
    const newProd = await service.create(req.body);
    if (!newProd) {
      throw { status: 404, message: "Error create product" };
    } else {
      return res.status(200).json(newProd);
    }
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodUpdate = await service.update(id, req.body);
    if (!prodUpdate) {
      throw { status: 404, message: "Error update product" };
    } else {
      return res.status(200).json(prodUpdate);
    }
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const prodDelete = await service.remove(id);
    if (!prodDelete) {
      throw { status: 404, message: "Error remove product" };
    } else {
      return res.status(200).json(prodDelete);
    }
  } catch (error) {
    next(error);
  }
};

/* export const createProducts = async (req,res)=>{
  try {
    const {cant} = req.query
    res.json(await service.createMockingProducts(cant))
  } catch (error) {
    console.log(error)
  }
} */
 export const getProducts = async (req,res)=>{
  try {
    const products = await service.getMockingProducts()
    res.json(products)
  } catch (error) {
    console.log(error)
  }
 }

//createMockingProducts - services
//getMockingProducts
//createProducts - controller
//getProducts