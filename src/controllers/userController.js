import UserDao from "../daos/mongodb/userDao.js";
import { UserModel } from "../daos/mongodb/models/userModel.js";
import { createHash, isValidPassword } from "../utils.js";

const userDao = new UserDao(UserModel);

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.login(email);
    if (!user) {
      res.status(401).json({ msg: "Fallo autenticacion" });
      //res.redirect('/views/error-login)
    }
    if (isValidPassword(password,user)) {
      req.session.email = email;
      req.session.password = password;
      res.redirect("/products");
    }
else{    res.status(401).json({ msg: "Fallo autenticacion" });
}  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "adminCoder@coder.com" && password === "admin") {
      const user = await userDao.register({
        ...req.body,
        role: "admin",
        password: createHash(password),
      });
      if (!user) res.status(401).json({ msg: "User already exist" });
      else res.redirect("/login");
    } else {
      const user = await userDao.register({
        ...req.body,
        password: createHash(password),
      });
      if (!user) res.status(401).json({ msg: "User already exist" });
      else res.redirect("/login");
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
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
