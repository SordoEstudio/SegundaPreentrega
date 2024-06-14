import { initMongoDb } from "./daos/mongodb/connection.js";
import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';

import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import productRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/user.router.js";
 import viewsRouter from "./routes/views.router.js";
 import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./path.js";
import "dotenv/config";

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));


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


  