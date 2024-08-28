import { Router } from "express";
import * as controller from "../controllers/viewsControllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import { logger } from "../utils/logger.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/error", (req, res) => {
  res.render("error");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/products", controller.index);
 

router.get("/profilegithub", isAuth, (req, res) => {
  const user = req.user.toObject();
  res.get("/products", { user });
});
router.get("/loggerTest", async(req, res) => {
  try {
    logger.silly("This is a silly log.");
    logger.debug("This is a debug log.");
    logger.verbose("This is a verbose log.");
    logger.info("This is an info log.");
    logger.http("This is a http log.");
    logger.warn("This is a warning log.");
    logger.error("This is an error log.");
  } catch (error) {
    logger.error(error)
  }
})
export default router;
