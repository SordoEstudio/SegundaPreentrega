import * as services from "../services/userServices.js";
import { createHash, isValidPassword } from "../utils.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({ msg: "Registro ok", session: req.session });
  } catch (error) {
    next(error);
  }
};
export const loginResponse = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user) {
      id = req.session.passport.user;
    }
    const user = await services.getUserById(id);
    if (!user) res.status(401).json({ msg: "Error de autenticacion" });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: "Login Ok",
      user: {
        first_name,
        last_name,
        email,
        age,
        role
      },
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
