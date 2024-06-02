//----------------------| Dao de File System |----------------------//
//import {__dirname } from "../path"
//import ProductDaoFs from "../daos/filesystem/productDao"
//const prodDao = new ProductDaoFs(`${__dirname}/data/products.json`)
//------------------------------------------------------------------//
//-------------------------| Dao de Mongo |-------------------------//
import ProductDaoMongoDb from '../daos/mongodb/productDao.js'
const prodDao = new ProductDaoMongoDb()
//------------------------------------------------------------------//

export const getAll = async()=>{
    try {
        return await prodDao.getAll()
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