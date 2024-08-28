import mongoose from "mongoose";
import 'dotenv/config'
import { logger } from "../../utils/logger.js";

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce'

export const initMongoDb = async()=>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL)
        logger.info('Conectado a la Db de MongoDb')
    } catch (error) {
        logger.info(`conection ${error}`)
    }
}