import express from "express";
import productRouter from "../src/routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER OK in ${PORT}`));
 