import UserDao from "../daos/mongodb/userDao.js";
import { UserModel } from "../daos/mongodb/models/userModel.js";

const userDao = new UserDao(UserModel);

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.login(email, password);

    if (!user) {
      res.status(401).json({ msg: "No estas autorizado" });
      //res.redirect('/views/error-login)
    } else {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/views/products");
    }
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    if (mail === "adminCoder@coder.com" && password === "admin") {
      const user = await userDao.register({ ...req.body, role: "admin" });
      if(!user)res.status(401).json({ msg: "User already exist" });
      else res.redirect("/views/login");
    }else{
      const user = await userDao.register(req.body);
      if(!user)res.status(401).json({ msg: "User already exist" });
      else res.redirect("/views/login");
    }
  } catch (error) {
    next(error);
  }
};
export const visit = (req, res, next) => {
  try {
    req.session.info && req.session.info.contador++;
    res.json({
      msg: `${req.session.info.userName} ha visitado el sitio ${req.session.info.contador} veces`,
    });
  } catch (error) {
    next(error);
  }
};

export const infoSession = (req, res, next) => {
  try {
    res.json({
      session: req.session,
      sessionId: req.sessionId,
      cookies: req.cookies,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect("views/login");
  } catch (error) {
    next(error);
  }
};
