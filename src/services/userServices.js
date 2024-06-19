
import UserDao from '../daos/mongodb/userDao.js'
import "dotenv/config";

const userDao = new UserDao()

export const findByEmail = async (email)=>{
    try {
        const response = await userDao.findByEmail(email)
        return  response
    } catch (error) {
        throw new Error(error)
    }
}