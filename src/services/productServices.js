//----------------------| Dao de File System |----------------------//
import {__dirname } from "../path.js"
import ProductDaoFs from "../daos/filesystem/productDao.js"
const daoFs = new ProductDaoFs(`${__dirname}/data/products.json`)
//-------------------------| Dao de Mongo |-------------------------//
import ProductDaoMongoDb from '../daos/mongodb/productDao.js'
const daoMongo = new ProductDaoMongoDb()
//------------------------------------------------------------------//
import "dotenv/config";
let prodDao

if (process.env.PERSISTENCE === "MONGO") {
     prodDao = daoMongo
}else{
    prodDao = daoFs
}
export const getAll = async(page, limit, title, sort, category)=>{
    try {
        return await prodDao.getAll(page, limit, title, sort, category)
    } catch (error) {
        throw new Error(error)
    }
}

export const getById = async(id)=>{
    try {
        return await prodDao.getById(id)
    } catch (error) {
        throw new Error(error)

    }
}

export const create = async(obj)=>{
    try {
        return await prodDao.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}

export const update = async(id, obj)=>{
    try {
        return await prodDao.update(id, obj)
    } catch (error) {
        throw new Error(error)
    }
}

export const remove = async(id)=>{
    try {
        return await prodDao.remove(id)
    } catch (error) {
        throw new Error(error)
    }
}