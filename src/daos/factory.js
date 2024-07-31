import ProductDaoFs from "./filesystem/productDao.js";
import ProductDaoMongo from "./mongodb/productDao.js";
import CartDaoFs from "./filesystem/cartDao.js";
import CartDaoMongo from "./mongodb/cartDao.js";
import UserDao from "./mongodb/userDao.js";
import {initMongoDb} from "./mongodb/connection.js"

let prodDao = null
let cartDao = null
let userDao = null

let persistence = process.argv[2]

switch (persistence) {
    case 'fs':
        console.log("persistencia:",persistence)
        prodDao = new ProductDaoFs('./src/data/products.json');
        cartDao = new CartDaoFs('./src/data/carts.json')
        break;
    case 'mongo':
        console.log("persistencia:",persistence)
        initMongoDb();
        userDao = new UserDao();
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongo();
        break;
    default:
        console.log("persistencia: default")
        initMongoDb();
        userDao = new UserDao();
        prodDao = new ProductDaoMongo();
        cartDao = new CartDaoMongo();
    break;
}

export  { userDao, prodDao, cartDao };
