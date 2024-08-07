
import { userDao, prodDao, cartDao } from '../daos/factory.js'
import { ProductModel } from '../daos/mongodb/models/productModel.js'
import { generateProduct } from '../poduct.utils.js'

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
export const updateStock = async(id, stock)=>{
    try {
        return await prodDao.updateStock(id, stock)
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

export const createMockingProducts = async (cant = 100)=>{
    try {
        const productArray = []
        for (let i = 0; i < cant; i++) {
            const product = generateProduct()
            productArray.push(product)
        }
        return await ProductModel.create(productArray)
    } catch (error) {
        throw new Error(error)
    }
}
export const getMockingProducts = async()=>{
    try {
        return await ProductModel.find({})
    } catch (error) {
        throw new Error(error)
    }
}

//createMockingProducts - services
//getMockingProducts