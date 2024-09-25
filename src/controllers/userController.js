import { sendMail } from "../services/mailing.services.js";
import * as services from "../services/userServices.js";
import { createHash, isValidPassword } from "../utils/utils.js";
import { createResponse } from "../utils/utils.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({ msg: "Registro ok", session: req.session });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const data = await services.register(req.body);
    !data ? createResponse(res, 404, data) : createResponse(res, 200, data);
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
    return {
      msg: "Login Ok",
      user: {
        first_name,
        last_name,
        email,
        age,
        role,
      },
    };
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const token = await services.loginJWT(req.body);
    res.cookie("token", token, { httpOnly: true });
    !token ? createResponse(res, 404, token) : createResponse(res, 200, token);
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
export const profile = async (req, res, next) => {
  try {
    if (req.user) {
      const { _id } = req.user;
      const user = await services.userById(_id);
      createResponse(res, 200, user);
    } else createResponse(res, 401, { msg: "Unhautorized" });
  } catch (error) {
    next(error);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, role } = req.user;
    res.json({
      msg: "Loguin ok con github",
      user: {
        first_name,
        last_name,
        email,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const sendMailReset = async (req, res, next) => {
  try {
    const user = req.user;
    const token = await services.sendMailReset(user);
    if (token) {
      await sendMail(user, "resetPass", token);
      res.cookie('tokenpass',token)
      createResponse(res, 200, "Email de restablecimiento enviado" );
    }else{
      createResponse(res, 404, "Error al enviar email de restablecimiento");
    }
  } catch (error) {
    next(error);
  }
};

export const updatePass = async (req, res, next) => {
  try {
    const user = req.user
    const {password}= req.body
    const {tokenpass} = req.cookies
    if(!tokenpass) return createResponse(res, 401, 'Invalid or expired token')
    const updPass = await services.updatePass(password,user)
    if(!updPass) return createResponse(res, 404,'Intente con una contraseña diferente')
      res.clearCookie('tokenpass')
      return createResponse(res, 200, updPass)
  } catch (error) {
next(error) 
}
}
export const checkUsersLastConection = async(req,res,next)=>{
try {
  const response = await services.checkUsersLastConection()
    createResponse(res, 200, response)
 } catch (error) {
  next(error)
}
}
export const getAllUsers = async(req, res, next)=>{
  try {
    const response = await services.getAllUsersResponse()
return     createResponse(res, 200, response)

  } catch (error) {
   next(error) 
  }
}
