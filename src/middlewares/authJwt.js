import jwt from "jsonwebtoken";
import * as userService from "../services/userServices.js";
import "dotenv/config";
 import config from "../config/index.js";
export const checkAuth = async (req, res, next) => {
  try {
    // console.log(req.cookies)
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ msg: "Unhautorized" });
    const decode = jwt.verify(token, config.SECRET_KEY_JWT);
    const user = await userService.getUserById(decode.userId);
    if (!user) res.status(404).json({ msg: "User not found" });
    //REFRESH TOKEN
    const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const tokenExp = decode.exp; // Tiempo de expiración del token
    const timeUntilExp = tokenExp - now; // Tiempo hasta la expiración en segundos

    if (timeUntilExp <= 300) {
      // 300 segundos = 5 minutos
      // Generar un nuevo token con un tiempo de expiración renovado
      const newToken = await userService.generateToken(user, "5m");
      console.log(">>>>>>SE REFRESCÓ EL TOKEN");
      res.cookie("token", newToken, { httpOnly: true }); // Agregar el nuevo token a la cookie
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
