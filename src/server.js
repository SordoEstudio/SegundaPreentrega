import { initMongoDb } from "./daos/mongodb/connection.js";
import express from "express";
import handlebars from "express-handlebars";
import productRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/user.router.js";
 import viewsRouter from "./routes/views.router.js";
 import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./path.js";

import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/views", viewsRouter);

app.use(errorHandler);

initMongoDb();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER OK in ${PORT}`));


  