import mongoose from "mongoose";
import 'dotenv/config'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/ecommerce'

export const initMongoDb = async()=>{
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(MONGO_URL)
        console.log('Conectado a la Db de MongoDb')
    } catch (error) {
        console.log(`conection ${error}`)
    }
}