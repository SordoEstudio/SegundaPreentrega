
import express from "express";
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from "express-handlebars";
import productRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/user.router.js";
 import viewsRouter from "./routes/views.router.js";
 import errorHandler  from "./middlewares/errorHandler.js";
 import config from './config/index.js'
import { __dirname } from "./path.js";
import passport from "passport";
import './passport/localStrategy.js'
import './passport/githubStrategy.js'
/*  */import cors from 'cors'
import { logger } from "./utils/logger.js";
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import {info} from './docs/info.js'


const storeConfig = {
    store: MongoStore.create({
        mongoUrl: config.MONGO_URL,
        crypto: { secret: config.SECRET_KEY },
        ttl: 180,
    }),
    secret: config.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
};
const app = express();

const specs = swaggerJSDoc(info); 

app.use('/docs', swaggerUI.serve,swaggerUI.setup(specs))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);
app.use("/", viewsRouter);

app.use(errorHandler);


const PORT = config.PORT;

app.listen(PORT, () => logger.info(`SERVER OK in ${PORT}`));

export default app