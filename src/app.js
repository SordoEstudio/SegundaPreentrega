import { initMongoDb } from "./daos/mongodb/connection.js";
import express from "express";
import productRouter from "../src/routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/user.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/users", userRouter);

app.use(errorHandler)

initMongoDb()


const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER OK in ${PORT}`));
