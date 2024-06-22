import UserDao from "../daos/mongodb/userDao.js";
import * as productService from "../services/productServices.js";
import * as userService from "../services/userServices.js";
//import user controller

export const index = async (req, res, next) => {
  try {
    console.log("req user",req.user)
    const { page, limit} = req.query;
    const payload = await productService.getAll(page, limit);
    const products = payload.docs;
    const obj = products.map((p) => p.toObject());
const user = req.user
/*     const currentUser = await userService.findByEmail(req.session.email);
*/
const objUser = user.toObject();
console.log(objUser);
res.render("products", { products: obj, info: payload, user: objUser });
console.log(user)
  } catch (error) {
    console.log("Error al obtener productos");
    next(error);
  }
};
