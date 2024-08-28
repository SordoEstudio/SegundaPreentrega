import { createTransport } from "nodemailer";
import config from "../config/index.js";
const transporter = createTransport({
  service: "gmail",
  port: config.PORT_GMAIL,
  secure: true,
  auth: {
    user: config.EMAIL_GMAIL,
    pass: config.PASSWORD_GMAIL,
  },
});

const createMsgRegister = (first_name) =>
  `<h1>Hola ${first_name}, Bienvenido!</h1>`;

const createMsgReset = (first_name) => {
  return `<h1>Hola ${first_name}<h1>
    <p>para restablecer tu contraseña,
     hace click <a href="http://localhost:8080/new-pass">AQUÍ</a></p>`;
};

export const sendMail = async (user, service, token = null) => {
  try {
    const { first_name, email } = user;
    let msg = "";
    service === "register"
      ? (msg = createMsgRegister(first_name))
      : service === "resetPass"
      ? (msg = createMsgReset(first_name))
      : (msg = "");

    const gmailOptions = {
      from: config.EMAIL_GMAIL,
      to: email,
      subject:
        service === "register"
          ? "Bienbenido/a"
          : service === "resetPass"
          ? "Restablecer contraseña"
          : "",
      html: msg,
    };
    const response = await transporter.sendMail(gmailOptions);
    if (token) return token;
    console.log("email enviado", response);
  } catch (error) {
    throw new Error(error);
  }
};

